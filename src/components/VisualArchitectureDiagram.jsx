import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectPitchData } from '../data/projectPitchData';
import { 
  Play, 
  RotateCcw, 
  Activity, 
  ShieldCheck, 
  Database, 
  Server, 
  Radio, 
  Bell, 
  Zap, 
  Smartphone, 
  ScanLine, 
  Layers, 
  Cpu, 
  Box, 
  Move,
  Sparkles,
  Table,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Code2,
  Brain,
  Shield,
  FileCode,
  Gauge,
  Workflow,
  Star,
  Clock,
  Lightbulb,
  Copy,
  Check,
  Target,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function VisualArchitectureDiagram({ projectId }) {
  const { lang, t } = useLanguage();
  const canvasRef = useRef(null);
  
  // States
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'tradeoffs' | 'security' | 'star'
  const [flowSpeed, setFlowSpeed] = useState('normal'); // 'normal' | 'fast'
  const [copied, setCopied] = useState(false);

  // Complete Architectures for all 4 projects
  const architectures = {
    omnipos: {
      title: "OmniPOS Real-Time Node Flow Architecture",
      subtitle: "Multi-Tenant Restaurant POS & Real-Time Kitchen Sync",
      benchmark: "38ms Latency",
      specs: {
        latency: "38ms Sub-50ms KDS",
        isolation: "Multi-Tenant Schema Level",
        concurrency: "Redis FIFO Queue & Locking",
        faultTolerance: "99.9% Uptime with Auto-Revert"
      },
      scenarios: [
        {
          id: "happy-path",
          nameTh: "🟢 1. สั่งอาหารหน้าร้าน (Happy Path)",
          nameEn: "🟢 1. Table Order (Happy Path)",
          descTh: "ลูกค้าสั่งอาหาร ➔ ส่งตรงเข้าจอครัว KDS ภายใน 38ms พร้อมบันทึกยอดขาย",
          descEn: "Customer orders at table ➔ Socket.io streams to KDS screen in 38ms ➔ Committed to PostgreSQL",
          activeColor: "#10B981"
        },
        {
          id: "out-of-stock",
          nameTh: "🔴 2. วัตถุดิบหมด (Rollback Handling)",
          nameEn: "🔴 2. Out-of-Stock Auto Rollback",
          descTh: "สต็อกไม่พอ ➔ Express Core ยกเลิกคำสั่งซื้อ ➔ ส่งสัญญาณเตือนให้แคชเชียร์ทันที",
          descEn: "Inventory check fails ➔ Controller rejects transaction ➔ Revert event emitted back to client",
          activeColor: "#EF4444"
        },
        {
          id: "lunch-rush",
          nameTh: "⚡ 3. คนแน่นร้าน (Peak Concurrency)",
          nameEn: "⚡ 3. Lunch Rush Peak Concurrency",
          descTh: "ออร์เดอร์เข้าพร้อมกัน ➔ จัดคิวแบบ FIFO ใน Redis ➔ จอครัวแสดงบัตรเรียงตามลำดับเวลา",
          descEn: "Concurrent burst traffic ➔ Redis in-memory queue sorts FIFO tickets ➔ Batched KDS display",
          activeColor: "#F59E0B"
        }
      ],
      nodes: [
        { 
          id: 'client', 
          label: 'Touch POS & QR', 
          sub: 'Client Ingestion', 
          icon: Smartphone, 
          x: 70, 
          y: 150, 
          color: '#38BDF8', 
          glow: 'rgba(56, 189, 248, 0.4)',
          endpoints: 'WS /order/stream • REST /api/v1/orders',
          role: 'รับออร์เดอร์จากโต๊ะและแคชเชียร์แบบสัมผัสความเร็วสูง พร้อม Optimistic UI Feedback',
          codeSnippet: `// Client-side Order Dispatch
const submitOrder = async (cartItems, tableNo) => {
  setOptimisticState('PLACING_ORDER');
  socket.emit('NEW_ORDER_INGEST', {
    tenantId: currentBranch.id,
    tableNo,
    items: cartItems,
    timestamp: Date.now()
  });
};`,
          payloadSample: `{
  "tenantId": "TENANT_RESTAURANT_BKK_01",
  "tableNo": "TB-08",
  "items": [
    { "menuId": "M-102", "name": "Serious Fried Chicken", "qty": 2, "price": 180 },
    { "menuId": "M-205", "name": "Matcha Iced Latte", "qty": 1, "price": 65 }
  ],
  "totalAmount": 425
}`,
          tradeoffs: {
            decision: "Dual Transport: WebSocket for KDS + REST for Financial Audit",
            why: "ใช้ WebSocket (Socket.io) สำหรับส่งข้อมูลเข้าครัวแบบเรียลไทม์ 0 delay แต่ใช้ RESTful POST สำหรับการชำระเงินและออกใบกำกับภาษี",
            vsAlternative: "เทียบกับ HTTP Long-Polling: WebSocket ลด Server Overhead ลง 82% และลด Latency จาก 3,000ms เหลือ <15ms"
          },
          security: {
            auth: "Tenant Scoped API Keys & Employee PIN Hashing",
            concurrency: "Debounced client inputs to prevent double-tap order duplication",
            validation: "Zod Schema validation for item quantities and positive pricing"
          }
        },
        { 
          id: 'gateway', 
          label: 'Socket.io Hub', 
          sub: 'Real-Time Bus', 
          icon: Radio, 
          x: 290, 
          y: 60, 
          color: '#60A5FA', 
          glow: 'rgba(96, 165, 250, 0.4)',
          endpoints: 'socket.to(tenantRoom).emit("KDS_NEW_TICKET")',
          role: 'กระจายสัญญาณ Event แยกตามห้องสาขา (Tenant Isolation Rooms) ภายใน <10ms',
          codeSnippet: `// Multi-Tenant WebSocket Router
io.on('connection', (socket) => {
  const { tenantId } = socket.handshake.auth;
  socket.join(\`tenant:\${tenantId}:kds\`);
  
  socket.on('NEW_ORDER_INGEST', async (payload) => {
    io.to(\`tenant:\${tenantId}:kds\`).emit('KDS_NEW_TICKET', payload);
  });
});`,
          payloadSample: `{
  "event": "KDS_NEW_TICKET",
  "room": "tenant:bkk_01:kds",
  "ticketNo": "A-042",
  "transport": "websocket",
  "room": "tenant_bkk_01_kitchen",
  "ticketId": "TCK-8841",
  "prepTimeEst": "12 mins"
}`,
          tradeoffs: {
            decision: "Room-based Socket.io Isolation",
            why: "แยก Namespace ของแต่ละร้านอาหารอย่างเด็ดขาด ป้องกันข้อมูลข้ามสาขา",
            vsAlternative: "เทียบกับ Global broadcast: ประหยัดแบนด์วิธเครือข่ายและรับประกัน Data Privacy"
          },
          security: {
            auth: "Signed Session Handshake with Tenant Scoping",
            concurrency: "Redis Adapter for multi-instance socket clustering",
            validation: "Message payload size limits (<64KB)"
          }
        },
        { 
          id: 'server', 
          label: 'Express Core API', 
          sub: 'Business Services', 
          icon: Server, 
          x: 290, 
          y: 220, 
          color: '#3B82F6', 
          glow: 'rgba(59, 130, 246, 0.4)',
          endpoints: 'POST /api/v1/orders',
          role: 'ประมวลผลคำสั่งซื้อ ตรวจสอบสต็อก และคิดเงินแบบ Type-Safe',
          codeSnippet: `// Order Controller Service
export async function createOrderController(req, res) {
  const parsed = orderSchema.parse(req.body);
  const result = await orderService.processOrder(parsed);
  return res.status(201).json(result);
}`,
          payloadSample: `{
  "status": "PROCESSING",
  "orderId": "ORD-2026-9912",
  "subtotal": 650.00,
  "vat": 45.50,
  "netTotal": 695.50
}`,
          tradeoffs: {
            decision: "Decoupled Controller-Service Layer Architecture",
            why: "แยก Business Logic ออกจาก Route Handlers เพื่อง่ายต่อการเขียน Unit Test และ Mock ข้อมูล",
            vsAlternative: "เทียบกับ Monolithic inline handlers: Modular services ดูแลง่ายและ Reuse ใน Background Jobs ได้"
          },
          security: {
            auth: "RBAC Middleware: CASHIER, KITCHEN, MANAGER, SUPERADMIN",
            concurrency: "Atomic inventory decrement using database row locking",
            validation: "Strict Zod payload validation with sanitization of special characters"
          }
        },
        { 
          id: 'db', 
          label: 'PostgreSQL DB', 
          sub: 'Multi-Tenant Store', 
          icon: Database, 
          x: 550, 
          y: 220, 
          color: '#F59E0B', 
          glow: 'rgba(245, 158, 11, 0.4)',
          endpoints: 'Prisma Client • pgBouncer Pool',
          role: 'บันทึก Transaction แยก Schema และจัดการ Session Cache ใน Redis',
          codeSnippet: `// Prisma ACID Multi-Row Transaction
const [savedOrder, updatedStock] = await prisma.$transaction([
  prisma.order.create({
    data: { tenantId, tableNo, totalAmount, status: 'PREPARING' }
  }),
  prisma.inventory.updateMany({
    where: { id: { in: itemIds } },
    data: { stockQty: { decrement: 1 } }
  })
]);`,
          payloadSample: `{
  "dbStatus": "COMMITTED_ACID",
  "schema": "tenant_bkk_01",
  "transactionId": "tx_88920194",
  "affectedTables": ["orders", "order_items", "inventory"]
}`,
          tradeoffs: {
            decision: "Prisma Multi-Schema Isolation + pgBouncer Pooling",
            why: "ป้องกัน Connection Exhaustion ในชั่วโมงเร่งด่วน และรับประกัน ACID Consistency",
            vsAlternative: "เทียบกับ Shared Schema with WHERE tenant_id: Schema Scoping ป้องกัน Data Leakage โดยสมบูรณ์"
          },
          security: {
            auth: "Database connection encryption with SSL/TLS and role credentials",
            concurrency: "pgBouncer Transaction Pooling managing up to 1,000 parallel clients",
            validation: "Foreign key relational integrity & unique constraint indexes"
          }
        },
        { 
          id: 'kds', 
          label: 'Kitchen Screen (KDS)', 
          sub: 'Chef Live Screen', 
          icon: Zap, 
          x: 550, 
          y: 80, 
          color: '#10B981', 
          glow: 'rgba(16, 185, 129, 0.4)',
          endpoints: 'React KDS Stream • Audio Chime API',
          role: 'จอในครัวส่งเสียงเตือนและแสดงเวลานับถอยหลังการปรุงแบบเรียลไทม์',
          codeSnippet: `// Kitchen Screen Live Component
socket.on('KDS_NEW_TICKET', (newTicket) => {
  playOrderChime();
  setCookingQueue((prev) => [newTicket, ...prev]);
  startCountdownTimer(newTicket.id, newTicket.estimatedPrepMinutes);
});`,
          payloadSample: `{
  "kdsState": "TICKET_DISPLAYED",
  "audioChime": "PLAYED_SUCCESS",
  "cookingCountdownStarted": "12:00",
  "endToEndLatency": "38ms"
}`,
          tradeoffs: {
            decision: "Local Optimistic Ticket State in KDS Client",
            why: "พ่อครัวสามารถกด 'เสร็จแล้ว' ได้ทันทีโดยไม่ต้องรอ DB roundtrip เพื่อความลื่นไหลสูงสุด",
            vsAlternative: "เทียบกับ Heavy Server Poll: 0ms UI latency ตอบโจทย์ห้องครัวที่ต้องทำความเร็ว"
          },
          security: {
            auth: "KDS Terminal Device UUID token",
            concurrency: "Auto-reconnect with local cache replay on Wi-Fi drops",
            validation: "Duplicate ticket detection in UI memory"
          }
        }
      ],
      connections: [
        { from: 'client', to: 'gateway', label: 'WebSocket Stream', speed: '2s' },
        { from: 'client', to: 'server', label: 'REST Order Payload', speed: '2.5s' },
        { from: 'gateway', to: 'kds', label: 'Instant KDS Broadcast (<15ms)', speed: '1.2s' },
        { from: 'server', to: 'db', label: 'Prisma ACID Commit', speed: '2s' },
        { from: 'server', to: 'gateway', label: 'Order State Sync', speed: '1.8s' }
      ]
    },

    mystudentroom: {
      title: "MyStudentRoom Smart School Flow Architecture",
      subtitle: "Smart Attendance & Parent Tracking Platform",
      benchmark: "68ms Latency",
      specs: {
        latency: "68ms Gate-to-Phone",
        isolation: "Role-Based Access Control (RBAC)",
        concurrency: "Next.js Server Actions with Transaction Lock",
        faultTolerance: "IndexedDB Offline Buffer & Auto-Sync"
      },
      scenarios: [
        {
          id: "happy-path",
          nameTh: "🟢 1. เช็กชื่อตรงเวลา (On-Time Attendance)",
          nameEn: "🟢 1. Morning On-Time Arrival",
          descTh: "นักเรียนสแกนรหัสที่ประตู ➔ Edge ตรวจสอบ ➔ Server Action บันทึก ➔ LINE เตือนผู้ปกครองทันที (68ms)",
          descEn: "Student scan ➔ Edge security check ➔ Server Action writes ➔ LINE notification sent in 68ms",
          activeColor: "#10B981"
        },
        {
          id: "late-arrival",
          nameTh: "🟡 2. นักเรียนมาสาย (Late Flag Alert)",
          nameEn: "🟡 2. Late Arrival Priority Alert",
          descTh: "สแกนหลัง 08:00 ➔ ระบบคำนวณสถานะ 'LATE' ➔ ส่งข้อความด่วนพร้อมเวลาเข้าเรียนถึงผู้ปกครอง",
          descEn: "Scan after 08:00 AM ➔ Rule engine flags 'LATE' ➔ Sends priority notification to parent",
          activeColor: "#F59E0B"
        },
        {
          id: "hardware-offline",
          nameTh: "🔴 3. เน็ตขัดข้อง (PWA Offline Buffer)",
          nameEn: "🔴 3. Offline Service Worker Cache Buffering",
          descTh: "เน็ตหลุด ➔ Web Client พักข้อมูลใน Local Storage / IndexedDB ➔ พอเน็ตกลับมา ยิง Sync ทั้งหมดแบบ Batch",
          descEn: "Network drop ➔ Client caches taps in IndexedDB storage ➔ Auto-syncs batch when connection restores",
          activeColor: "#EF4444"
        }
      ],
      nodes: [
        { 
          id: 'rfid', 
          label: 'Gate Scanner Portal', 
          sub: 'Web Client Ingestion', 
          icon: ScanLine, 
          x: 55, 
          y: 70, 
          color: '#38BDF8', 
          glow: 'rgba(56, 189, 248, 0.4)',
          endpoints: 'POST /api/gate/check-in',
          role: 'รับข้อมูลรหัสนักเรียนจากเครื่องสแกนหน้าประตู ส่งเข้า Server ภายใน 4ms',
          codeSnippet: `// Web Gate Check-in Ingestion
export async function sendGateCheckin(studentCode, gateId) {
  const response = await fetch("/api/gate/check-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gate-Auth-Token": process.env.GATE_SECRET_TOKEN
    },
    body: JSON.stringify({ studentCode, gateId, timestamp: new Date() })
  });
  return await response.json();
}`,
          payloadSample: `{
  "studentCode": "STU-640192",
  "gateId": "GATE_NORTH_01",
  "timestamp": "07:42:15 GMT+7"
}`,
          tradeoffs: {
            decision: "Web Ingestion Client with IndexedDB Offline Cache",
            why: "เพื่อให้หน้าเว็บสแกนเนอร์ยังบันทึกเวลาได้ต่อเนื่องแม้สัญญาณเน็ตจะหลุดชั่วคราว",
            vsAlternative: "เทียบกับ Direct Database Connection: มี Security Token ป้องกันไม่ให้ฝั่ง Client เข้าถึง Database โดยตรง"
          },
          security: {
            auth: "Hardware Secret Token & Device Signature Header",
            concurrency: "Debounced scan requests preventing double-read within 5 seconds",
            validation: "Zod regex verification on student code format"
          }
        },
        { 
          id: 'portal', 
          label: 'Teacher Web Portal', 
          sub: 'Next.js 14 SSR', 
          icon: Smartphone, 
          x: 55, 
          y: 230, 
          color: '#60A5FA', 
          glow: 'rgba(96, 165, 250, 0.4)',
          endpoints: 'Server Action: markClassAttendance()',
          role: 'ครูประจำชั้นเช็กชื่อและส่งสถานะผ่านเว็บแบบ Type-Safe',
          codeSnippet: `// Teacher Attendance Action
export async function markClassAttendance(classroomId, rosterStatus) {
  const session = await auth();
  if (session.user.role !== 'TEACHER') throw new Error("UNAUTHORIZED");
  
  return await prisma.attendanceLog.createMany({
    data: rosterStatus.map(s => ({
      studentId: s.studentId,
      status: s.status,
      teacherId: session.user.id
    }))
  });
}`,
          payloadSample: `{
  "classroomId": "CLASS_M4_2",
  "presentCount": 38,
  "absentCount": 2,
  "markedBy": "TEACHER_SOMCHAI"
}`,
          tradeoffs: {
            decision: "Server Actions instead of Traditional REST Endpoints",
            why: "ลดความซ้ำซ้อนของการเขียน API Route และได้ Type Safety 100% เชื่อมหน้าบ้านกับหลังบ้าน",
            vsAlternative: "เทียบกับ Traditional Client Fetch: Server Actions รันบน Server 100% ไม่ปล่อย Logic สำคัญหลุดไปที่ Client"
          },
          security: {
            auth: "NextAuth session check with RBAC Teacher Role validation",
            concurrency: "Batch insert mutations with single database roundtrip",
            validation: "Zod parse on classroom roster objects"
          }
        },
        { 
          id: 'edge', 
          label: 'Edge Auth Guard', 
          sub: 'Zod & JWT', 
          icon: ShieldCheck, 
          x: 230, 
          y: 150, 
          color: '#EC4899', 
          glow: 'rgba(236, 72, 153, 0.4)',
          endpoints: 'Next.js Edge Middleware',
          role: 'ตรวจสอบ Session, สิทธิ์ RBAC และสกัดคำขอซ้ำซ้อนด้วย Rate Limiter',
          codeSnippet: `// Edge Security Middleware
export function middleware(request) {
  const token = request.cookies.get('authjs.session-token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}`,
          payloadSample: `{
  "authStatus": "VERIFIED_BEARER",
  "role": "TEACHER_ADMIN",
  "rateLimitStatus": "OK (14/100 req/min)",
  "edgeLatency": "4ms"
}`,
          tradeoffs: {
            decision: "Edge Middleware Authentication Verification",
            why: "ตัดสิทธิ์ผู้ไม่มีความปลอดภัยตั้งแต่ Edge Gateway ก่อนคำขอจะเดินทางถึง Core Database",
            vsAlternative: "เทียบกับ In-route checking: Edge Middleware สกัดกั้น Bot & Unauthorized Request ได้เร็วกว่า 10 เท่า"
          },
          security: {
            auth: "Signed JWT verification with HTTP-only SameSite cookies",
            concurrency: "Edge-based IP rate limiting (100 req/min)",
            validation: "Strict URL path matching & CSRF Protection"
          }
        },
        { 
          id: 'actions', 
          label: 'Server Actions Core', 
          sub: 'Business Logic', 
          icon: Cpu, 
          x: 405, 
          y: 150, 
          color: '#A855F7', 
          glow: 'rgba(168, 85, 247, 0.4)',
          endpoints: 'calculateAttendanceStatus()',
          role: 'คำนวณสถานะตรงเวลา/มาสายและกระจาย Transaction',
          codeSnippet: `// Attendance Rule Engine
export function calculateAttendanceStatus(scanTime) {
  const cutoffTime = new Date();
  cutoffTime.setHours(8, 0, 0); // 08:00 AM cutoff
  
  return scanTime <= cutoffTime ? "PRESENT" : "LATE";
}`,
          payloadSample: `{
  "studentId": "STU-640192",
  "calculatedStatus": "PRESENT",
  "scanTime": "07:42:15",
  "requiresParentAlert": true
}`,
          tradeoffs: {
            decision: "Deterministic In-Memory Rule Calculation",
            why: "ประมวลผลเงื่อนไขการมาสายในหน่วยความจำทันที ไม่ต้อง Query ซ้ำ",
            vsAlternative: "เทียบกับ Stored Procedures ใน DB: Logic อยู่ใน Codebase ตรวจสอบและ Version Control ง่ายกว่า"
          },
          security: {
            auth: "Server-side context verification",
            concurrency: "Idempotent action execution (แตะบัตรซ้ำไม่สร้าง Log เบิ้ล)",
            validation: "Timestamp bounds checking"
          }
        },
        { 
          id: 'db', 
          label: 'PostgreSQL Cluster', 
          sub: 'Prisma Data Store', 
          icon: Database, 
          x: 580, 
          y: 230, 
          color: '#F59E0B', 
          glow: 'rgba(245, 158, 11, 0.4)',
          endpoints: 'PostgreSQL + pgBouncer Pool',
          role: 'บันทึก AttendanceLogs แบบ ACID และสถิติประจำวัน',
          codeSnippet: `// Prisma Attendance Log Persistence
const log = await prisma.attendanceLog.create({
  data: {
    studentId,
    gateId,
    status,
    timestamp: new Date()
  },
  include: { student: { include: { guardian: true } } }
});`,
          payloadSample: `{
  "dbCommit": "SUCCESS_ACID",
  "logId": "log_994812",
  "dbLatency": "14ms"
}`,
          tradeoffs: {
            decision: "pgBouncer Connection Pool for Morning Rush Traffic",
            why: "รองรับการแตะบัตรพร้อมกันของนักเรียน 1,000 คนตอนเช้าโดยฐานข้อมูลไม่ล่ม",
            vsAlternative: "เทียบกับ Direct Postgres Connection: pgBouncer ช่วยลด Connection Overhead ลง 90%"
          },
          security: {
            auth: "Database User Role Isolation (Read/Write Separation)",
            concurrency: "Optimistic locking on daily student summary records",
            validation: "Relational foreign key constraints"
          }
        },
        { 
          id: 'line', 
          label: 'Parent LINE Notify', 
          sub: 'Instant Smartphone Alert', 
          icon: Bell, 
          x: 580, 
          y: 70,  
          color: '#10B981', 
          glow: 'rgba(16, 185, 129, 0.4)',
          endpoints: 'LINE Messaging API Webhook',
          role: 'ส่งข้อความแจ้งเตือนถึงผู้ปกครองทันที ภายใน 68ms',
          codeSnippet: `// Asynchronous LINE Push Dispatcher
async function sendParentAlert(guardianLineId, studentName, time) {
  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${process.env.LINE_BOT_ACCESS_TOKEN}\`
    },
    body: JSON.stringify({
      to: guardianLineId,
      messages: [{ type: "text", text: \`น้อง \${studentName} เดินทางถึงโรงเรียนแล้ว (\${time} น.)\` }]
    })
  });
}`,
          payloadSample: `{
  "lineRecipient": "PARENT_GUARDIAN_09",
  "message": "น้องจักรภพ เดินทางถึงโรงเรียนแล้ว (07:42 น.)",
  "deliveryStatus": "DELIVERED_SUCCESS",
  "totalLatency": "68ms"
}`,
          tradeoffs: {
            decision: "Asynchronous Non-Blocking Notification Dispatch",
            why: "การยิง LINE ไม่บล็อก Transaction ของฐานข้อมูล ทำงานแบบ Background Worker",
            vsAlternative: "เทียบกับ Synchronous Waiting: Non-blocking ป้องกันหน้าจอค้างหาก LINE API ตอบสนองช้า"
          },
          security: {
            auth: "LINE Channel Secret HMAC Signature",
            concurrency: "Queue-backed rate throttling conforming to LINE API limits",
            validation: "Sanitized student name output"
          }
        }
      ],
      connections: [
        { from: 'rfid', to: 'edge', label: 'Sensor Payload', speed: '1.5s' },
        { from: 'portal', to: 'edge', label: 'Teacher Form Data', speed: '2s' },
        { from: 'edge', to: 'actions', label: 'Sanitized Request', speed: '1.2s' },
        { from: 'actions', to: 'db', label: 'Atomic DB Write', speed: '1.8s' },
        { from: 'actions', to: 'line', label: 'LINE Push Trigger (<68ms)', speed: '1.4s' }
      ]
    },

    blackboard: {
      title: "Blackboard Collaborative Kanban Architecture",
      subtitle: "Collaborative Project Management & Sprint Tracker",
      benchmark: "0ms UI + 45ms DB",
      specs: {
        latency: "0ms Instant UI + 45ms DB",
        isolation: "Workspace Scoped RBAC",
        concurrency: "Fractional Indexing & Atomic Batching",
        faultTolerance: "Instant Rollback on Network Failure"
      },
      scenarios: [
        {
          id: "happy-path",
          nameTh: "🟢 1. ลากวางการ์ดงาน (60fps Drag)",
          nameEn: "🟢 1. 60fps Optimistic Task Drag",
          descTh: "ผู้ใช้ลากการ์ด ➔ Zustand แสดงผลทันที 0ms ➔ Next.js Route รวมคำสั่ง ➔ บันทึก Prisma 45ms",
          descEn: "User drags task ➔ Zustand mutates UI at 0ms ➔ Debounced Route batches ➔ Prisma commits in 45ms",
          activeColor: "#10B981"
        },
        {
          id: "concurrent-edit",
          nameTh: "⚡ 2. ทีมงานแก้ไขพร้อมกัน (Concurrent Sync)",
          nameEn: "⚡ 2. Concurrent Sprint Collaboration",
          descTh: "ปรับลำดับการ์ดโดยใช้ Fractional Indexing ➔ เลี่ยงการเขียนทับทั้งคอลัมน์",
          descEn: "Uses Fractional Indexing to reorder items ➔ Prevents locking entire database column",
          activeColor: "#F59E0B"
        },
        {
          id: "network-drop",
          nameTh: "🔴 3. เน็ตหลุด / คืนตำแหน่งเดิม (Rollback)",
          nameEn: "🔴 3. Network Failure Rollback",
          descTh: "เซิร์ฟเวอร์ส่ง 500 หรือเน็ตหลุด ➔ Zustand ดึง Snapshot ใน Memory ย้ายการ์ดกลับที่เดิม",
          descEn: "API fails ➔ Zustand catches error and reverts card to original column from memory snapshot",
          activeColor: "#EF4444"
        }
      ],
      nodes: [
        { 
          id: 'ui', 
          label: 'Kanban Board UI', 
          sub: 'Next.js Drag & Drop', 
          icon: Layers, 
          x: 70, 
          y: 150, 
          color: '#6366F1', 
          glow: 'rgba(99, 102, 241, 0.4)',
          endpoints: 'HTML5 Drag & Drop API',
          role: 'ผู้ใช้ลากการ์ดงานข้ามคอลัมน์บนหน้ากระดานลื่นไหล 60fps',
          codeSnippet: `// Drag and Drop Handler with Zustand
const onDragEnd = (result) => {
  const { destination, draggableId } = result;
  if (!destination) return;
  
  // Instant 0ms Optimistic Update
  moveTaskOptimistically(draggableId, destination.droppableId, destination.index);
  debouncedSyncTaskPosition(draggableId, destination.droppableId, destination.index);
};`,
          payloadSample: `{
  "taskId": "TASK-1049",
  "fromColumn": "IN_PROGRESS",
  "toColumn": "DONE",
  "newIndex": 3
}`,
          tradeoffs: {
            decision: "Optimistic UI Updates with Local Store Snapshotting",
            why: "ให้ผู้ใช้รู้สึกว่าระบบเร็วที่สุดในโลก (0ms) โดยไม่ต้องรอให้เซิร์ฟเวอร์ตอบกลับก่อน",
            vsAlternative: "เทียบกับ Pessimistic Waiting: หน้าจอไม่ค้างกระตุกตอนผู้ใช้ลากการ์ดงานหลายๆ ใบติดต่อกัน"
          },
          security: {
            auth: "Workspace Member Authorization check",
            concurrency: "60fps requestAnimationFrame debouncing",
            validation: "Column boundary & task ownership verification"
          }
        },
        { 
          id: 'zustand', 
          label: 'Zustand State', 
          sub: 'Optimistic 0ms Render', 
          icon: Zap, 
          x: 290, 
          y: 60, 
          color: '#10B981', 
          glow: 'rgba(168, 85, 247, 0.4)',
          endpoints: 'useTaskStore.getState().moveTask()',
          role: 'เปลี่ยนตำแหน่งการ์ดบนจอทันที และเก็บ Snapshot ไว้กรณีต้อง Rollback',
          codeSnippet: `// Zustand Task Store with Revert Snapshot
export const useTaskStore = create((set, get) => ({
  tasks: [],
  moveTask: (id, newCol, newIdx) => {
    const previousSnapshot = get().tasks;
    set({
      tasks: reorderTasks(get().tasks, id, newCol, newIdx),
      rollbackSnapshot: previousSnapshot
    });
  }
}));`,
          payloadSample: `{
  "optimisticState": "RENDERED_0MS",
  "rollbackSnapshotSaved": true,
  "memoryUsage": "<1.5MB"
}`,
          tradeoffs: {
            decision: "Zustand instead of Heavy Redux Toolkit",
            why: "Zustand มีขนาด Bundle Size เล็กกว่า 90% และไม่มี Boilerplate ทำให้โค้ดกระชับ อ่านง่าย",
            vsAlternative: "เทียบกับ React Context: ป้องกันการ Re-render ทั้งหน้ากระดานเมื่อมีการขยับการ์ดเพียงใบเดียว"
          },
          security: {
            auth: "In-memory state sandboxing",
            concurrency: "Atomic local state mutations",
            validation: "Type-Safe TypeScript task interfaces"
          }
        },
        { 
          id: 'api', 
          label: 'Debounce Route Handler', 
          sub: 'API Layer', 
          icon: Server, 
          x: 310, 
          y: 240, 
          color: '#38BDF8', 
          glow: 'rgba(56, 189, 248, 0.4)',
          endpoints: 'PATCH /api/tasks/reorder',
          role: 'รวบคำสั่งลากถี่ๆ ด้วย Fractional Indexing ป้องกันการยิง Request ถี่เกินไป',
          codeSnippet: `// Fractional Indexing Reorder Route
export async function PATCH(req) {
  const { taskId, targetColumn, prevRank, nextRank } = await req.json();
  const calculatedFractionalRank = (prevRank + nextRank) / 2; // e.g. (3.0 + 4.0)/2 = 3.5
  
  await prisma.task.update({
    where: { id: taskId },
    data: { column: targetColumn, rank: calculatedFractionalRank }
  });
  return NextResponse.json({ success: true });
}`,
          payloadSample: `{
  "taskId": "TASK-1049",
  "fractionalIndex": 3.5,
  "targetColumn": "DONE"
}`,
          tradeoffs: {
            decision: "Fractional Indexing Algorithm for Sorting",
            why: "ปรับตำแหน่งการ์ดโดยอัปเดตแถวเดียว (Single Row Update) ไม่ต้องเรียงลำดับใหม่ทั้งคอลัมน์",
            vsAlternative: "เทียบกับ Integer Array Re-indexing: ประหยัดการเขียน Database จาก 50 แถว เหลือเพียง 1 แถว"
          },
          security: {
            auth: "Workspace RBAC Role verification (Owner / Member / Viewer)",
            concurrency: "Debounce timer (400ms) to merge continuous drag movements",
            validation: "Zod numeric schema bounds"
          }
        },
        { 
          id: 'prisma', 
          label: 'Prisma Batch Engine', 
          sub: 'Atomic Transaction', 
          icon: Cpu, 
          x: 560, 
          y: 240, 
          color: '#A855F7', 
          glow: 'rgba(168, 85, 247, 0.4)',
          endpoints: 'prisma.$transaction([...])',
          role: 'บันทึกลำดับการ์ดและสร้าง Activity Audit Log ใน Transaction เดียว',
          codeSnippet: `// Atomic Batch Transaction
await prisma.$transaction([
  prisma.task.update({
    where: { id: taskId },
    data: { column: newColumn, rank: newRank }
  }),
  prisma.activityLog.create({
    data: {
      workspaceId,
      action: \`Moved task \${task.title} to \${newColumn}\`,
      userId: session.user.id
    }
  })
]);`,
          payloadSample: `{
  "transactionStatus": "COMMITTED_ATOMIC",
  "auditLogCreated": true,
  "dbLatency": "22ms"
}`,
          tradeoffs: {
            decision: "Atomic Multi-Table Audit Transactions",
            why: "รับประกันว่าทุกการย้ายการ์ดจะมี Audit Log บันทึกคู่กันเสมอ หากขั้นตอนใดล้มเหลว จะ Rollback ทั้งคู่",
            vsAlternative: "เทียบกับ Non-transactional writes: ป้องกันข้อมูลการ์ดย้ายแต่ Log ไม่ขึ้น"
          },
          security: {
            auth: "Session User ID tagging on every audit trail",
            concurrency: "PostgreSQL row-level locks on affected tasks",
            validation: "Foreign key validation with Workspace scope"
          }
        },
        { 
          id: 'db', 
          label: 'PostgreSQL Relational', 
          sub: 'Workspaces & Audit Feed', 
          icon: Database, 
          x: 560, 
          y: 60, 
          color: '#F59E0B', 
          glow: 'rgba(245, 158, 11, 0.4)',
          endpoints: 'PostgreSQL Tasks & Activities Table',
          role: 'จัดเก็บข้อมูลโปรเจกต์ Sprints และประวัติการทำงานของทีมอย่างแม่นยำ',
          codeSnippet: `// Schema Model Definition
model Task {
  id          String   @id @default(cuid())
  title       String
  column      String
  rank        Float
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
}`,
          payloadSample: `{
  "dbState": "CONSISTENT_ACID",
  "tables": ["tasks", "activity_logs", "sprints"]
}`,
          tradeoffs: {
            decision: "Relational Schema with Cascading Deletes",
            why: "เมื่อลบ Workspace หรือ Project ข้อมูล Tasks ที่เกี่ยวข้องจะถูก Clean ขึ้นโดยอัตโนมัติ",
            vsAlternative: "เทียบกับ NoSQL Document DB: Relational Schema ป้องกันการเกิด Orphan Tasks ค้างในระบบ"
          },
          security: {
            auth: "Database SSL encryption at rest and in transit",
            concurrency: "B-Tree Indexes on (projectId, column, rank) for instant lookups",
            validation: "Strict enum types for task status"
          }
        }
      ],
      connections: [
        { from: 'ui', to: 'zustand', label: '0ms Instant Update', speed: '0.8s' },
        { from: 'ui', to: 'api', label: 'Debounced PATCH Call', speed: '2s' },
        { from: 'api', to: 'prisma', label: 'Batch Payload', speed: '1.4s' },
        { from: 'prisma', to: 'db', label: 'ACID Batch Commit', speed: '1.8s' },
        { from: 'db', to: 'zustand', label: 'Final State Sync', speed: '2.2s' }
      ]
    },

    matcha: {
      title: "MATCHA Multi-Role Recruitment Architecture",
      subtitle: "Generation Thailand (JSD13) Multi-Role Recruitment Portal",
      benchmark: "85ms Full Pipeline",
      specs: {
        latency: "85ms Ingestion & Match",
        isolation: "Multi-Role RBAC (Candidate/Recruiter)",
        concurrency: "Decoupled Service Layer with S3 Buffering",
        faultTolerance: "Sanitized PDF Upload Quarantine"
      },
      scenarios: [
        {
          id: "happy-path",
          nameTh: "🟢 1. ส่งใบสมัคร (Happy Path)",
          nameEn: "🟢 1. Candidate Application Submission",
          descTh: "ผู้สมัครกรอกฟอร์ม + อัปโหลด PDF ➔ Multer สแกน ➔ จับคู่ Skill Tags ➔ ส่งอีเมลเตือน HR (85ms)",
          descEn: "Candidate applies with PDF ➔ Multer sanitizes ➔ Skill match engine runs ➔ Alerts recruiter",
          activeColor: "#10B981"
        },
        {
          id: "hr-status",
          nameTh: "🟡 2. ฝ่ายบุคคลเปลี่ยนสถานะ (Status Transition)",
          nameEn: "🟡 2. HR Candidate Evaluation & Status",
          descTh: "HR กดเปลี่ยนสถานะเป็น 'INTERVIEW' ➔ บันทึก Activity Log ➔ ส่งอีเมลแจ้งเตือนผู้สมัครอัตโนมัติ",
          descEn: "Recruiter changes status to 'INTERVIEW' ➔ Logs state audit ➔ Triggers candidate email notification",
          activeColor: "#F59E0B"
        },
        {
          id: "invalid-file",
          nameTh: "🔴 3. ไฟล์เรซูเม่ไม่ถูกต้อง (File Quarantine)",
          nameEn: "🔴 3. Malformed File Security Shield",
          descTh: "ไฟล์ไม่ใช่ PDF หรือขนาดเกิน 5MB ➔ Multer สกัดกั้นทันที ไม่ให้โหลดเข้าหน่วยความจำเซิร์ฟเวอร์",
          descEn: "Non-PDF or >5MB file ➔ Middleware drops payload immediately before consuming server memory",
          activeColor: "#EF4444"
        }
      ],
      nodes: [
        { 
          id: 'candidate', 
          label: 'Candidate Portal', 
          sub: 'Job Application SPA', 
          icon: Smartphone, 
          x: 55, 
          y: 70, 
          color: '#10B981', 
          glow: 'rgba(168, 85, 129, 0.4)',
          endpoints: 'POST /api/applications/apply',
          role: 'ผู้สมัครกรอกข้อมูลและอัปโหลดไฟล์เรซูเม่ (PDF)',
          codeSnippet: `// Candidate Multipart Form Submit
const handleApply = async (formData) => {
  const response = await axios.post('/api/applications/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};`,
          payloadSample: `{
  "jobId": "JOB_SENIOR_FULLSTACK_01",
  "candidateName": "Jakkapon Wapakpet",
  "skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
  "resumeFile": "resume_jakkapon.pdf (1.2MB)"
}`,
          tradeoffs: {
            decision: "Single-Page Application Form with Multi-step Validation",
            why: "ลดอัตราการละทิ้งฟอร์มสมัครงาน (Drop-off Rate) ด้วยหน้าจอที่มีการตรวจเช็กความถูกต้องแบบเรียลไทม์",
            vsAlternative: "เทียบกับ Multi-page Reload: SPA ให้ประสบการณ์การกรอกฟอร์มที่เร็วกว่าและไม่เสียข้อมูลที่กรอกไว้"
          },
          security: {
            auth: "Candidate Session Verification & CSRF tokens",
            concurrency: "Prevent multi-click duplicate application submissions",
            validation: "Client-side MIME type and size checks before uploading"
          }
        },
        { 
          id: 'recruiter', 
          label: 'Recruiter Dashboard', 
          sub: 'HR Candidate Review', 
          icon: Layers, 
          x: 55, 
          y: 230, 
          color: '#38BDF8', 
          glow: 'rgba(56, 189, 248, 0.4)',
          endpoints: 'GET /api/applications?jobId=... • PATCH /status',
          role: 'ฝ่ายบุคคลตรวจรายชื่อผู้สมัคร ดูเรซูเม่ และเปลี่ยนสถานะการสัมภาษณ์',
          codeSnippet: `// Recruiter Status Transition
export async function updateCandidateStatus(applicationId, newStatus) {
  return await axios.patch(\`/api/applications/\${applicationId}/status\`, {
    status: newStatus // 'REVIEWING' | 'INTERVIEW' | 'ACCEPTED'
  });
} `,
          payloadSample: `{
  "applicationId": "APP_9941",
  "updatedStatus": "INTERVIEW_SCHEDULED",
  "evaluatedBy": "HR_LEAD_01"
}`,
          tradeoffs: {
            decision: "Role-Based Routing Isolation",
            why: "แยกหน้าจอการทำงานระหว่างผู้สมัครและฝ่ายบุคคลออกจากกันอย่างเด็ดขาด",
            vsAlternative: "เทียบกับ Shared Universal Dashboard: การแยก Portal ทำให้ UI ไม่ซับซ้อนและจำกัดสิทธิ์ได้ง่าย"
          },
          security: {
            auth: "Strict JWT verification with RECRUITER role scope",
            concurrency: "Optimistic UI locking during review updates",
            validation: "State machine validation on allowed status transitions"
          }
        },
        { 
          id: 'gateway', 
          label: 'Express REST Gateway', 
          sub: 'JWT & Multer Parser', 
          icon: ShieldCheck, 
          x: 230, 
          y: 150, 
          color: '#EC4899', 
          glow: 'rgba(236, 72, 153, 0.4)',
          endpoints: 'Express Middleware: jwtGuard, upload.single("resume")',
          role: 'ยืนยันตัวตน สแกนไฟล์เรซูเม่ และจัดการความปลอดภัยของคำขอ',
          codeSnippet: `// Multer Storage & Validation Guard
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error("ONLY_PDF_ALLOWED"), false);
    }
    cb(null, true);
  }
});`,
          payloadSample: `{
  "fileScanned": "CLEAN_PDF",
  "fileSize": "1.2MB",
  "jwtVerified": true,
  "candidateId": "CAN-6691"
}`,
          tradeoffs: {
            decision: "Multer Memory-Stream to Cloud S3 Storage",
            why: "ไม่เขียนไฟล์ลงดิสก์เซิร์ฟเวอร์โดยตรง เพื่อป้องกันปัญหา Disk Space เต็มและเพิ่มความปลอดภัย",
            vsAlternative: "เทียบกับ Local Disk Storage: Cloud Storage สเกลได้ไม่จำกัดและปลอดภัยกว่า"
          },
          security: {
            auth: "JWT Token Signature with Expiration & Refresh Rotation",
            concurrency: "Stream-based processing with low memory footprint",
            validation: "Magic byte inspection ensuring actual PDF file headers"
          }
        },
        { 
          id: 'service', 
          label: 'Service Business Layer', 
          sub: 'Match Engine', 
          icon: Cpu, 
          x: 405, 
          y: 150, 
          color: '#A855F7', 
          glow: 'rgba(168, 85, 247, 0.4)',
          endpoints: 'jobMatchingService.calculateScore()',
          role: 'จับคู่ทักษะผู้สมัครกับประกาศรับสมัครงานและคำนวณ Match Score',
          codeSnippet: `// Skill Matching Algorithm
export function calculateMatchScore(candidateSkills, requiredSkills) {
  const matched = candidateSkills.filter(s => requiredSkills.includes(s));
  const score = (matched.length / requiredSkills.length) * 100;
  return { score: Math.round(score), matchedSkills: matched };
}`,
          payloadSample: `{
  "matchScore": "92%",
  "matchedSkills": ["React", "Node.js", "TypeScript"],
  "missingSkills": ["Docker"]
}`,
          tradeoffs: {
            decision: "Decoupled Service Layer for Pure Business Calculations",
            why: "แยกฟังก์ชันคำนวณ Match Score ออกเป็น Pure Function เพื่อง่ายต่อการทดสอบ 100% Code Coverage",
            vsAlternative: "เทียบกับ Inline DB Queries: Service layer ช่วยให้สามารถสลับไปใช้ AI Matching ในอนาคตได้ง่าย"
          },
          security: {
            auth: "Internal business logic execution context",
            concurrency: "Pure CPU mathematical matching (<2ms execution)",
            validation: "Strict input type arrays"
          }
        },
        { 
          id: 'storage', 
          label: 'Database & Cloud S3', 
          sub: 'Relational & Files', 
          icon: Database, 
          x: 580, 
          y: 150,  
          color: '#F59E0B', 
          glow: 'rgba(245, 158, 11, 0.4)',
          endpoints: 'PostgreSQL DB & AWS S3 Bucket',
          role: 'บันทึกประวัติการสมัครงาน จัดเก็บไฟล์เรซูเม่ และยิง Email แจ้งเตือน',
          codeSnippet: `// Database Application Record
await prisma.application.create({
  data: {
    jobId,
    candidateId,
    resumeUrl: s3UploadResult.Location,
    matchScore,
    status: 'SUBMITTED'
  }
});`,
          payloadSample: `{
  "dbRecord": "SAVED",
  "s3ResumeUrl": "https://s3.ap-southeast-1.amazonaws.com/matcha/resumes/...",
  "recruiterAlertDispatched": true
}`,
          tradeoffs: {
            decision: "Relational Schema with Cloud Object Storage Reference",
            why: "จัดเก็บเพียง URL ของไฟล์ในฐานข้อมูล ช่วยให้ DB มีขนาดเล็กและ Query ได้รวดเร็ว",
            vsAlternative: "เทียบกับ BLOB ในฐานข้อมูล: การเก็บ URL ช่วยประหยัดค่า Database Memory มหาศาล"
          },
          security: {
            auth: "Signed S3 Presigned URLs for temporary secure download by HR only",
            concurrency: "Indexed foreign keys for sub-10ms applicant listing",
            validation: "Unique constraint preventing multiple applications to same job"
          }
        }
      ],
      connections: [
        { from: 'candidate', to: 'gateway', label: 'Resume Submission', speed: '2s' },
        { from: 'recruiter', to: 'gateway', label: 'HR Query', speed: '2s' },
        { from: 'gateway', to: 'service', label: 'Validated Payload', speed: '1.4s' },
        { from: 'service', to: 'storage', label: 'DB Write & S3 Upload', speed: '1.8s' }
      ]
    }
  };

  const currentArch = architectures[projectId] || architectures.omnipos;
  const pitchData = projectPitchData[projectId] || projectPitchData.mystudentroom;
  const [nodes, setNodes] = useState(currentArch.nodes);
  const connections = currentArch.connections;
  const currentScenario = currentArch.scenarios[selectedScenarioIdx] || currentArch.scenarios[0];

  useEffect(() => {
    setNodes(currentArch.nodes);
    setSelectedNodeId(currentArch.nodes[0]?.id || null);
    setSelectedScenarioIdx(0);
    setActiveTab('code');
  }, [projectId]);

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDraggingNodeId(id);
    setSelectedNodeId(id);
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggingNodeId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    
    const newX = Math.max(20, Math.min(rect.width - 85, e.clientX - rect.left - dragOffset.x));
    const newY = Math.max(20, Math.min(rect.height - 85, e.clientY - rect.top - dragOffset.y));

    setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n));
  }, [draggingNodeId, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggingNodeId(null);
  }, []);

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingNodeId, handleMouseMove, handleMouseUp]);

  const handleResetLayout = () => {
    setNodes(currentArch.nodes);
  };

  const handleCopyPitch = () => {
    const textToCopy = lang === 'th' ? pitchData.pitchScriptTh : pitchData.pitchScriptEn;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 }, colors: ['#F59E0B', '#10B981'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="w-full space-y-5 text-left selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. SCENARIO SWITCHER & CONTROLS HEADER */}
      <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        
        {/* Scenario Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono-code font-bold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
            Simulation Scenario:
          </span>
          {currentArch.scenarios.map((scen, sIdx) => {
            const isActive = selectedScenarioIdx === sIdx;
            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioIdx(sIdx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{t(scen.nameEn, scen.nameTh)}</span>
              </button>
            );
          })}
        </div>

        {/* Speed & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlowSpeed(flowSpeed === 'normal' ? 'fast' : 'normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold border transition-colors flex items-center gap-1.5 ${
              flowSpeed === 'fast'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{flowSpeed === 'fast' ? '⚡ 2x Speed' : '1x Speed'}</span>
          </button>

          <button
            onClick={handleResetLayout}
            className="p-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
            title="Reset Positions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 2. FULL-WIDTH CANVAS (100% UNCLUTTERED, NO DRAWER OVERLAY) */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[380px] sm:h-[420px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden cursor-crosshair select-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      >
        
        {/* Top Hint Bar */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-mono-code text-slate-300 shadow-md">
          <Move className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>Click circle to select • Drag circles to rearrange topology</span>
        </div>

        {/* SVG Bezier Cables & Pulsing Glowing Flow Particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <linearGradient id="fullFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentScenario.activeColor} stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>

            <filter id="fullGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + 36;
            const y1 = fromNode.y + 36;
            const x2 = toNode.x + 36;
            const y2 = toNode.y + 36;

            const dx = Math.abs(x2 - x1) * 0.5;
            const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            const baseSpeed = parseFloat(conn.speed) || 2;
            const actualDur = flowSpeed === 'fast' ? `${baseSpeed * 0.5}s` : `${baseSpeed}s`;

            return (
              <g key={idx}>
                {/* Thick background track */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Animated dash line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#fullFlowGrad)"
                  strokeWidth="2.5"
                  strokeOpacity="0.8"
                  strokeDasharray="6, 6"
                  className="animate-[dash_20s_linear_infinite]"
                />

                {/* Particle 1 */}
                <circle r="4.5" fill={currentScenario.activeColor} filter="url(#fullGlow)">
                  <animateMotion
                    path={pathD}
                    dur={actualDur}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Particle 2 */}
                <circle r="3" fill="#38BDF8">
                  <animateMotion
                    path={pathD}
                    dur={actualDur}
                    begin={`${parseFloat(actualDur) * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Draggable Circle Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isDragging = draggingNodeId === node.id;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: `scale(${isDragging ? 1.1 : isSelected ? 1.08 : 1})`,
                zIndex: isDragging ? 30 : isSelected ? 25 : 20,
                boxShadow: isSelected 
                  ? `0 0 25px ${node.glow}, 0 4px 20px rgba(0,0,0,0.8)` 
                  : '0 4px 15px rgba(0,0,0,0.6)'
              }}
              className={`absolute w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center cursor-pointer active:cursor-grabbing transition-shadow transition-transform duration-75 border-2 ${
                isSelected 
                  ? 'border-amber-400 bg-slate-900 ring-4 ring-amber-400/30' 
                  : 'border-slate-700/80 bg-slate-900/90 hover:border-amber-400'
              }`}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mb-0.5"
                style={{ backgroundColor: `${node.color}20`, color: node.color }}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className="text-[9px] font-mono-code font-bold text-white tracking-tight text-center px-1 truncate max-w-[64px]">
                {node.label.split(' ')[0]}
              </span>

              <div className="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 rounded-full bg-slate-900/95 border border-slate-800 text-[10px] font-mono-code text-slate-300 pointer-events-none shadow-md">
                {node.label}
              </div>
            </div>
          );
        })}

      </div>

      {/* 3. FULL-WIDTH SPACIOUS INSPECTOR TABS (BELOW CANVAS - WIDE & COMFORTABLE) */}
      {selectedNode && (
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6"
        >
          
          {/* Header Bar with Node Picker & Tab Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            
            {/* Selected Node Profile */}
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base shadow-sm shrink-0"
                style={{ backgroundColor: `${selectedNode.color}20`, color: selectedNode.color }}
              >
                <selectedNode.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white font-mono-code">
                    {selectedNode.label}
                  </h4>
                  <span className="text-xs text-slate-400 font-mono-code">({selectedNode.sub})</span>
                </div>
                <div className="text-xs font-mono-code text-amber-500 mt-0.5">
                  Target: <code>{selectedNode.endpoints}</code>
                </div>
              </div>
            </div>

            {/* Quick Node Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-bold transition-all ${
                    selectedNodeId === n.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-amber-500'
                  }`}
                >
                  {n.label.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono-code font-bold">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'code' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                }`}
              >
                Code & Payload
              </button>
              <button
                onClick={() => setActiveTab('tradeoffs')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tradeoffs' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                }`}
              >
                Trade-offs
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'security' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => setActiveTab('star')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'star' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                }`}
              >
                Project Story
              </button>
            </div>

          </div>

          {/* TAB 1: CODE & PAYLOAD */}
          {activeTab === 'code' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-2">
                <span className="text-xs font-mono-code font-bold text-amber-500 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-amber-500" />
                  <span>Real Implementation Code Snippet:</span>
                </span>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 font-mono-code text-xs overflow-x-auto leading-relaxed shadow-inner">
                  <code>{selectedNode.codeSnippet}</code>
                </pre>
              </div>

              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-mono-code font-bold text-sky-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>In-Transit JSON Data Packet:</span>
                </span>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-amber-300 font-mono-code text-xs overflow-x-auto leading-relaxed shadow-inner">
                  <code>{selectedNode.payloadSample}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: TRADEOFFS */}
          {activeTab === 'tradeoffs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-mono-code font-bold text-amber-500 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>Architectural Decision:</span>
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                  {selectedNode.tradeoffs.decision}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.tradeoffs.why}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-mono-code font-bold text-emerald-500 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4" />
                  <span>Why this beats alternatives:</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {selectedNode.tradeoffs.vsAlternative}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-amber-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authentication & RBAC</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.security.auth}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-sky-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Concurrency & Locking</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.security.concurrency}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-1.5">
                <div className="text-xs font-mono-code font-bold text-emerald-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Payload Sanitization</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedNode.security.validation}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT STORY & OVERVIEW */}
          {activeTab === 'star' && (
            <div className="space-y-5">
              
              {/* Core Narrative & Story Summary */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono-code font-bold text-amber-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{t('Project Overview & Architecture Story:', 'ภาพรวม & เรื่องราวเบื้องหลังโปรเจกต์:')}</span>
                  </span>
                  <button
                    onClick={handleCopyPitch}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-code text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('Copied!', 'คัดลอกแล้ว!') : t('Copy Summary', 'คัดลอกสรุป')}</span>
                  </button>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  "{t(pitchData.pitchScriptEn, pitchData.pitchScriptTh)}"
                </p>
              </div>

              {/* STAR Method 4-Pillar Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono-code">
                
                {/* Situation */}
                <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block uppercase">
                    1. Situation (ปัญหาเดิม)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                    {t(pitchData.star.situation.descEn, pitchData.star.situation.descTh)}
                  </p>
                </div>

                {/* Task */}
                <div className="p-4 rounded-2xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20 space-y-1.5">
                  <span className="font-bold text-sky-600 dark:text-sky-400 block uppercase">
                    2. Task (โจทย์ & เป้าหมาย)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                    {t(pitchData.star.task.descEn, pitchData.star.task.descTh)}
                  </p>
                </div>

                {/* Action */}
                <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block uppercase">
                    3. Action (สิ่งที่เราสร้าง)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                    {t(pitchData.star.action.descEn, pitchData.star.action.descTh)}
                  </p>
                </div>

                {/* Result */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
                    4. Result (ผลลัพธ์ที่ได้)
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 font-sans text-xs leading-relaxed">
                    {t(pitchData.star.result.descEn, pitchData.star.result.descTh)}
                  </p>
                </div>

              </div>

            </div>
          )}

        </motion.div>
      )}

      {/* 4. SLEEK BOTTOM STATUS & BENCHMARK RIBBON */}
      <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Latency: <strong className="text-amber-400">{currentArch.specs.latency}</strong></span>
        </div>
        <div>
          <span>Isolation: <strong className="text-sky-400">{currentArch.specs.isolation}</strong></span>
        </div>
        <div>
          <span>Concurrency: <strong className="text-purple-400">{currentArch.specs.concurrency}</strong></span>
        </div>
        <div>
          <span>Reliability: <strong className="text-emerald-400">{currentArch.specs.faultTolerance}</strong></span>
        </div>
      </div>

    </div>
  );
}
