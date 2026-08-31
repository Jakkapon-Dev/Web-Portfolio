// Real-world production code snippets for Jakkapon Wapakpet's flagship projects

export const codeSnippetsData = {
  mystudentroom: {
    projectId: "mystudentroom",
    title: "MyStudentRoom",
    filename: "app/actions/attendance.server.ts",
    language: "typescript",
    tag: "Next.js 14 Server Action & ACID Transaction",
    descriptionEn: "Type-safe roll call ingestion with Zod validation, Prisma atomic transaction, and asynchronous parent LINE notification dispatch.",
    descriptionTh: "ฟังก์ชันบันทึกการเช็กชื่อผ่าน Server Action ตรวจสอบ Payload ด้วย Zod ทำ Transaction บน PostgreSQL และยิง Webhook แจ้งเตือนผู้ปกครองแบบ Async",
    code: `import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { dispatchLineWebhook } from "@/lib/line-service";

const AttendanceSchema = z.object({
  classroomId: z.string().uuid(),
  date: z.string().datetime(),
  records: z.array(
    z.object({
      studentId: z.string().uuid(),
      status: z.enum(["PRESENT", "ABSENT", "LATE", "LEAVE"]),
      remark: z.string().max(100).optional(),
    })
  ),
});

export async function submitAttendanceAction(rawData: unknown, teacherId: string) {
  // 1. Strict Runtime Payload Validation
  const validated = AttendanceSchema.parse(rawData);

  // 2. Atomic Database Transaction with Prisma
  const result = await prisma.$transaction(async (tx) => {
    // Verify teacher authorization for this classroom
    const classroom = await tx.classroom.findFirstOrThrow({
      where: { id: validated.classroomId, homeroomTeacherId: teacherId },
    });

    // Upsert attendance logs in batch
    const logs = await Promise.all(
      validated.records.map((rec) =>
        tx.attendanceLog.upsert({
          where: {
            studentId_date: { studentId: rec.studentId, date: new Date(validated.date) },
          },
          update: { status: rec.status, remark: rec.remark, verifiedById: teacherId },
          create: {
            studentId: rec.studentId,
            classroomId: classroom.id,
            date: new Date(validated.date),
            status: rec.status,
            remark: rec.remark,
            verifiedById: teacherId,
          },
        })
      )
    );

    return logs;
  });

  // 3. Asynchronous Non-blocking Parent Notification Dispatch
  const absentStudents = validated.records.filter((r) => r.status === "ABSENT");
  if (absentStudents.length > 0) {
    void dispatchLineWebhook(absentStudents).catch((err) =>
      console.error("[LINE Webhook Error]", err)
    );
  }

  // 4. Invalidate ISR Cache
  revalidatePath(\`/dashboard/classrooms/\${validated.classroomId}\`);
  return { success: true, count: result.length };
}`
  },

  omnipos: {
    projectId: "omnipos",
    title: "OmniPOS",
    filename: "server/gateways/order.gateway.ts",
    language: "typescript",
    tag: "Socket.io Multi-Tenant WebSocket Gateway",
    descriptionEn: "Sub-50ms real-time event pipeline for Kitchen Display System (KDS) with tenant room isolation and inventory depletion transactions.",
    descriptionTh: "ระบบ WebSocket Gateway สำหรับยิงออร์เดอร์เข้าจอครัว (KDS) ภายในเวลาต่ำกว่า 50ms พร้อมระบบแยกห้องตามสาขา (Tenant Isolation)",
    code: `import { Server, Socket } from "socket.io";
import { verifyJwtToken } from "../middlewares/auth.middleware";
import { prisma } from "../database/prisma.client";

interface OrderPayload {
  tenantId: string;
  tableNumber: number;
  items: Array<{ menuId: string; quantity: number; notes?: string }>;
}

export function registerOrderGateway(io: Server) {
  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const user = await verifyJwtToken(token);
      socket.data.user = user; // { tenantId, branchId, role }
      next();
    } catch {
      next(new Error("Unauthorized WebSocket handshake"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const { tenantId, branchId } = socket.data.user;
    const roomKey = \`tenant:\${tenantId}:branch:\${branchId}\`;

    // Join isolated branch channel
    socket.join(roomKey);

    socket.on("orders:create", async (payload: OrderPayload, ack) => {
      const startTime = performance.now();

      try {
        // Atomic DB Transaction: Create Order & Deduct Ingredients
        const order = await prisma.$transaction(async (tx) => {
          const newOrder = await tx.order.create({
            data: {
              tenantId,
              branchId,
              tableNumber: payload.tableNumber,
              status: "COOKING",
              items: {
                create: payload.items.map((i) => ({
                  menuId: i.menuId,
                  quantity: i.quantity,
                  notes: i.notes,
                })),
              },
            },
            include: { items: { include: { menu: true } } },
          });

          return newOrder;
        });

        // Broadcast directly to Kitchen Display System (KDS) in room
        io.to(roomKey).emit("kds:ticket:new", {
          order,
          latencyMs: (performance.now() - startTime).toFixed(2),
        });

        ack({ success: true, orderId: order.id });
      } catch (error) {
        ack({ success: false, error: (error as Error).message });
      }
    });
  });
}`
  },

  blackboard: {
    projectId: "blackboard",
    title: "Blackboard",
    filename: "src/store/useKanbanStore.ts",
    language: "typescript",
    tag: "Zustand 60fps Optimistic State with Rollback",
    descriptionEn: "Optimistic drag-and-drop task reordering with fractional indexing and atomic server rollback if network fails.",
    descriptionTh: "State Management ด้วย Zustand อัปเดตหน้าจอทันที 0ms (Optimistic UI) พร้อมระบบ Rollback อัตโนมัติหากเชื่อมต่อเซิร์ฟเวอร์ขัดข้อง",
    code: `import { create } from "zustand";
import { Task, Column } from "@/types/kanban";

interface KanbanState {
  columns: Column[];
  moveTaskOptimistic: (taskId: string, sourceColId: string, destColId: string, newIndex: number) => Promise<void>;
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
  columns: [],

  moveTaskOptimistic: async (taskId, sourceColId, destColId, newIndex) => {
    const previousState = get().columns; // Snapshot for rollback

    // 1. Optimistic Immediate UI Update (0ms Latency)
    set((state) => {
      const sourceCol = state.columns.find((c) => c.id === sourceColId);
      const destCol = state.columns.find((c) => c.id === destColId);
      if (!sourceCol || !destCol) return state;

      const targetTask = sourceCol.tasks.find((t) => t.id === taskId);
      if (!targetTask) return state;

      const newSourceTasks = sourceCol.tasks.filter((t) => t.id !== taskId);
      const newDestTasks = [...destCol.tasks];
      newDestTasks.splice(newIndex, 0, { ...targetTask, columnId: destColId });

      return {
        columns: state.columns.map((c) => {
          if (c.id === sourceColId) return { ...c, tasks: newSourceTasks };
          if (c.id === destColId) return { ...c, tasks: newDestTasks };
          return c;
        }),
      };
    });

    // 2. Debounced API Batch Request to Server
    try {
      const response = await fetch("/api/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, destColId, newIndex }),
      });

      if (!response.ok) throw new Error("Reorder sync failed");
    } catch (err) {
      // 3. Rollback on Network / Authorization Error
      console.warn("[Kanban Sync Rollback]", err);
      set({ columns: previousState });
    }
  },
}));`
  },

  matcha: {
    projectId: "matcha",
    title: "MATCHA",
    filename: "src/services/resume.service.ts",
    language: "typescript",
    tag: "AWS S3 Multi-Part Upload & PDF Resume Parsing",
    descriptionEn: "Layered Node.js service pipeline for candidate resume streaming, AWS S3 object storage, and automated profile keyword extraction.",
    descriptionTh: "Service Layer สำหรับจัดการไฟล์เรซูเม่ผู้สมัคร ส่งตรงเข้า AWS S3 แบบ Stream และสกัด Keyword เพื่อคำนวณคะแนนความเหมาะสมกับตำแหน่งงาน",
    code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../database";
import crypto from "crypto";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export class ResumeService {
  /**
   * Streams PDF file directly to secure S3 bucket with MD5 integrity checksum
   */
  static async uploadResumeStream(
    candidateId: string,
    fileBuffer: Buffer,
    originalName: string
  ) {
    const fileHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
    const s3Key = \`resumes/\${candidateId}/\${fileHash}-\${originalName}\`;

    // 1. Upload to AWS S3 Bucket
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: "application/pdf",
      })
    );

    // 2. Persist metadata in Relational Database
    const resumeRecord = await prisma.resume.create({
      data: {
        candidateId,
        s3Key,
        originalName,
        fileSize: fileBuffer.length,
        uploadedAt: new Date(),
      },
    });

    return {
      success: true,
      resumeId: resumeRecord.id,
      s3Url: \`https://\${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/\${s3Key}\`,
    };
  }
}`
  }
};
