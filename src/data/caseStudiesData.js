export const caseStudiesData = {
  mystudentroom: {
    id: "mystudentroom",
    number: "01",
    tagFile: "school_os.ts",
    title: "MyStudentRoom",
    subtitleEn: "Smart Attendance & Parent Tracking Platform",
    subtitleTh: "ระบบบริหารจัดการนักเรียน เช็กชื่อ และติดตามข้อมูลสำหรับผู้ปกครอง",
    category: "Full-Stack / School OS",
    github: "https://github.com/Jakkapon-Dev/MyStudentRoom",
    techStack: ["Next.js 14", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS"],
    
    chapter1: {
      titleEn: "Chapter 1: The Morning Rush & Disconnected Data",
      titleTh: "บทที่ 1: ความวุ่นวายยามเช้า & ข้อมูลที่กระจัดกระจาย",
      dropCap: "M",
      narrativeEn: "orning attendance in traditional schools is often a bottleneck of manual paperwork and disconnected spreadsheets. Homeroom teachers spend the first 20 minutes manually checking roll calls, administrative offices struggle with delayed attendance reporting, and parents are left anxious with no real-time visibility into whether their children safely arrived at school.",
      narrativeTh: "การเช็กชื่อนักเรียนในโรงเรียนแบบดั้งเดิมมักเป็นคอขวดที่เต็มไปด้วยเอกสารกระดาษและไฟล์สเปรดชีตที่ไม่เชื่อมโยงกัน ครูประจำชั้นต้องเสียเวลาช่วงเช้า 15-20 นาทีในการขานชื่อ ฝ่ายธุรการได้รับข้อมูลล่าช้า และผู้ปกครองไม่มีทางรู้ได้แบบเรียลไทม์ว่าบุตรหลานเดินทางถึงโรงเรียนอย่างปลอดภัยหรือไม่",
      contextBoxTitleEn: "School Attendance Workflow Simulation",
      contextBoxTitleTh: "แบบจำลองกระบวนการเช็กชื่อและกระจายข้อมูล",
      principles: [
        {
          num: "1",
          titleEn: "Research & Empathize",
          titleTh: "1. ศึกษาปัญหาและความต้องการ",
          descEn: "Interviewed academic workflows: identified that manual roll-calls cause up to 15% reporting lag and create high parent inquiry volume during morning hours.",
          descTh: "วิเคราะห์ปัญหาหน้างานจริง พบว่าการเช็กชื่อด้วยกระดาษทำให้ข้อมูลล่าช้าถึง 15% และสร้างภาระให้ฝ่ายธุรการต้องตอบคำถามผู้ปกครองซ้ำซ้อน"
        },
        {
          num: "2",
          titleEn: "Define Role Boundaries",
          titleTh: "2. กำหนดขอบเขตสิทธิ์ผู้ใช้งาน",
          descEn: "Architected clear Role-Based Access Control (RBAC) separating Teacher grading tools, Parent status views, and Admin audit dashboards.",
          descTh: "ออกแบบระบบสิทธิ์ผู้ใช้งาน (RBAC) แยกหน้าที่ชัดเจนระหว่าง ครู (บันทึกข้อมูล), ผู้ปกครอง (ดูสถานะลูก), และฝ่ายวิชาการ (รายงานภาพรวม)"
        },
        {
          num: "3",
          titleEn: "Ideate Instant Synchronization",
          titleTh: "3. ออกแบบการเชื่อมต่อแบบเรียลไทม์",
          descEn: "Designed an automated Next.js + PostgreSQL data pipeline ensuring attendance marks trigger instant status updates with zero manual export steps.",
          descTh: "วางโครงสร้าง Data Pipeline ด้วย Next.js และ PostgreSQL ให้การบันทึกข้อมูลเช็กชื่ออัปเดตไปยังระบบส่วนกลางทันทีโดยไม่ต้องส่งไฟล์เอกสาร"
        }
      ]
    },

    methodology: {
      titleEn: "Engineering Thought Process & Deep Implementation",
      titleTh: "กระบวนการคิดเชิงวิศวกรรม & วิธีออกแบบระบบทีละขั้นตอน",
      steps: [
        {
          phase: "Step 1: Domain Modeling",
          titleEn: "Relational Modeling with Strict Referential Integrity",
          titleTh: "การวางโครงสร้างฐานข้อมูลเชิงสัมพันธ์ที่ปลอดภัย 100%",
          detailEn: "Designed PostgreSQL schema using Prisma ORM with compound unique constraints (@@unique([studentId, date])). This guarantees at the database level that a student can NEVER have duplicate attendance records for the same date, regardless of concurrent submissions.",
          detailTh: "ออกแบบ Schema ด้วย Prisma โดยใช้ Compound Unique Index (@@unique([studentId, date])) เพื่อการันตีระดับ Database ว่าจะไม่มีข้อมูลเช็กชื่อซ้ำซ้อนในวันเดียวกัน แม้จะมีการกดส่งข้อมูลซ้ำจากหลายอุปกรณ์"
        },
        {
          phase: "Step 2: Server Actions Pipeline",
          titleEn: "Type-Safe Server Action with Zod Guard",
          titleTh: "สร้าง Server Action ควบคู่กับการตรวจสอบความถูกต้องด้วย Zod",
          detailEn: "Replaced legacy REST API controllers with Next.js 14 Server Actions. Every incoming payload is parsed through a strict Zod schema before hitting the database, eliminating runtime type mismatch errors and preventing malicious injections.",
          detailTh: "เลือกใช้ Next.js 14 Server Action แทน REST API แยกแบบเดิม โดยดักจับทุก Payload ด้วย Zod Schema แบบ Strict ก่อนส่งต่อไปยังฐานข้อมูล ทำให้มั่นใจว่าไม่มี Type Error หรือ Malicious Payload หลุดรอดเข้าไปได้"
        },
        {
          phase: "Step 3: Asynchronous Webhooks",
          titleEn: "Non-Blocking Async Event Dispatching for LINE Alerts",
          titleTh: "ระบบยิง Webhook แจ้งเตือนแบบ Asynchronous ไม่บล็อกการทำงานหลัก",
          detailEn: "Parent push notifications (LINE Messaging API) are decoupled from the main database transaction. The DB transaction commits first (<50ms), and notification webhooks are dispatched asynchronously in the background so slow external APIs never lag teacher UI response times.",
          detailTh: "แยกการยิงแจ้งเตือน LINE ผู้ปกครองออกจาก Transaction หลักของฐานข้อมูล โดยให้ระบบบันทึกคะแนนเข้า DB ให้เสร็จก่อนใน 50ms แล้วยิง Webhook แบบ Async อยู่เบื้องหลัง ทำให้ครูไม่ต้องรอนานแม้ API ภายนอกจะช้า"
        }
      ]
    },

    warStory: {
      titleEn: "The War Story: Concurrency Spike at 7:55 AM",
      titleTh: "กรณีศึกษาบั๊กจริง: ปัญหา Traffic พุ่งสูงพร้อมกันตอน 07:55 น.",
      problemEn: "During testing with 40 simultaneous classrooms submitting attendance at 7:55 AM, direct PostgreSQL connections exhausted immediately (500 Connection Timeout Errors).",
      problemTh: "ช่วงทดสอบจำลองครู 40 ห้องกดส่งข้อมูลเช็กชื่อพร้อมกันในเวลา 07:55 น. ทำให้ Connection Pool ของ PostgreSQL เต็มทันทีและเกิด Error 500 Connection Timeout",
      solutionEn: "Implemented pgBouncer connection pooling with transaction mode and refactored individual database upserts into a single atomic prisma.$transaction() batch. This dropped connection contention by 75% and stabilized response times under 80ms.",
      solutionTh: "แก้ไขด้วยการติดตั้ง pgBouncer สำหรับทำ Connection Pooling และยุบ Query ย่อยๆ ของนักเรียนทั้งห้องให้รันรวมใน prisma.$transaction() เพียงคำสั่งเดียว ลดการใช้ Connection ลง 75% และความเร็วกลับมาเสถียรที่ต่ำกว่า 80ms"
    },

    chapter2: {
      titleEn: "Chapter 2: System Architecture & Relational Integrity",
      titleTh: "บทที่ 2: สถาปัตยกรรมระบบ & ความถูกต้องของข้อมูล",
      leadEn: "To guarantee data consistency across thousands of daily student logs, we selected a type-safe relational architecture with Next.js 14 App Router and Prisma ORM.",
      leadTh: "เพื่อรับประกันความถูกต้องของข้อมูลการเข้าเรียนนับพันรายการในแต่ละวัน ระบบถูกออกแบบด้วย Next.js 14 App Router ร่วมกับ Prisma ORM แบบ Type-Safe",
      flowSteps: [
        { step: "Client Layer", tech: "Next.js 14 App Router + Tailwind UI", role: "SSR & Interactive Multi-Role Dashboards" },
        { step: "API Handlers", tech: "TypeScript Route Handlers & Server Actions", role: "Validation & Role Permission Checks" },
        { step: "Data Access", tech: "Prisma ORM", role: "Type-Safe Relational Queries & Transactions" },
        { step: "Persistence", tech: "PostgreSQL Database", role: "Student Records, Logs & Attendance Data" }
      ],
      diagram: `[ Next.js SSR Client (Teachers / Parents) ]
                   │
                   ▼ (Server Actions / Type-Safe Requests)
      [ Route Handlers & RBAC Middleware ]
                   │
                   ▼ (Prisma ORM Relational Queries)
        [ PostgreSQL Attendance Database ]`,
      tradeoffs: [
        {
          decision: "Next.js 14 Server Actions vs Separate Express API",
          rationaleEn: "Co-locating server actions with Next.js reduced frontend-backend boilerplate by 40% and provided instant TypeScript type safety across queries.",
          rationaleTh: "การใช้ Server Actions ช่วยลดโค้ดซ้ำซ้อนระหว่างหน้าบ้านและหลังบ้านลง 40% พร้อมให้ความปลอดภัยด้าน Type-Safety ตลอดทั้งระบบ"
        },
        {
          decision: "Prisma ORM vs Raw SQL",
          rationaleEn: "Prisma schema migrations ensured strict relational integrity between Students, Classrooms, AttendanceLogs, and Guardians.",
          rationaleTh: "Prisma ช่วยควบคุม Schema Migrations ให้ความสัมพันธ์ระหว่างตารางนักเรียน ห้องเรียน และผู้ปกครองถูกต้องแม่นยำเสมอ"
        }
      ]
    },

    chapter3: {
      titleEn: "Chapter 3: Deliverables, Impact & Takeaways",
      titleTh: "บทที่ 3: ผลลัพธ์และการส่งมอบงาน",
      metrics: [
        { labelEn: "Attendance Latency", labelTh: "ความเร็วในการบันทึก", val: "< 100ms" },
        { labelEn: "Type Safety", labelTh: "ความปลอดภัยของโค้ด", val: "100%" },
        { labelEn: "User Roles", labelTh: "บทบาทผู้ใช้งาน", val: "3 Roles" }
      ],
      summaryEn: "MyStudentRoom demonstrates how modern web engineering can turn a chaotic administrative routine into a streamlined, type-safe digital platform that builds trust with parents.",
      summaryTh: "MyStudentRoom พิสูจน์ให้เห็นว่าการออกแบบซอฟต์แวร์ที่ดีสามารถเปลี่ยนขั้นตอนการทำงานที่วุ่นวายในโรงเรียนให้กลายเป็นระบบดิจิทัลที่รวดเร็ว แม่นยำ และสร้างความสบายใจให้แก่ผู้ปกครอง"
    }
  },

  omnipos: {
    id: "omnipos",
    number: "02",
    tagFile: "omnichannel_pos.ts",
    title: "OmniPOS",
    subtitleEn: "Multi-Tenant Restaurant POS & Queue Management",
    subtitleTh: "ระบบ POS ร้านอาหาร Multi-Tenant และจัดการคิวแบบเรียลไทม์",
    category: "Full-Stack / Real-Time Systems",
    github: "https://github.com/Jakkapon-Dev/Multi-Tenant-POS-Queue-Management",
    techStack: ["React", "Node.js", "Express", "Socket.io", "Prisma ORM", "PostgreSQL"],
    
    chapter1: {
      titleEn: "Chapter 1: Friday Dinner Rush & Restaurant Chaos",
      titleTh: "บทที่ 1: ความวุ่นวายช่วง Peak Hour ในร้านอาหาร",
      dropCap: "F",
      narrativeEn: "riday dinner rush in a busy restaurant isn't just cooking—it is synchronized chaos. Cashiers battle long lines at the register, kitchen staff shout over sizzling grills trying to decipher handwritten order slips, and customers grow impatient waiting for table queues. Traditional disconnected POS setups result in lost orders, delayed food prep, and revenue leakage.",
      narrativeTh: "ช่วงเวลาเร่งด่วนในร้านอาหารตอนหัวค่ำวันศุกร์ไม่ใช่แค่การทำอาหาร แต่คือความโกลาหลที่ต้องจัดการพร้อมกัน แคชเชียร์ต้องรับออร์เดอร์หน้าร้าน พ่อครัวในครัวตะโกนข้ามเตาเพื่อดูใบออร์เดอร์กระดาษที่อาจเปียกหรือสูญหาย และลูกค้าหน้าร้านยืนรอคิวโต๊ะด้วยความหงุดหงิด ระบบ POS แบบเดิมที่ไม่เชื่อมต่อแบบเรียลไทม์ทำให้เกิดออร์เดอร์ตกหล่นและสูญเสียโอกาสทางธุรกิจ",
      contextBoxTitleEn: "Omnichannel Kitchen-to-Cashier Sync",
      contextBoxTitleTh: "การเชื่อมต่อแบบเรียลไทม์ระหว่างแคชเชียร์ ครัว และลูกค้า",
      principles: [
        {
          num: "1",
          titleEn: "Analyze Concurrency Bottlenecks",
          titleTh: "1. วิเคราะห์จุดติดขัดของการส่งข้อมูล",
          descEn: "Identified that HTTP polling created intolerable 3-5s delays in kitchen display updates, leading to double-ticket orders during rushes.",
          descTh: "พบว่าการดึงข้อมูลแบบเดิม (HTTP Polling) มีความหน่วง 3-5 วินาที ทำให้จอในครัวอัปเดตไม่ทันและเกิดการทำอาหารซ้ำซ้อน"
        },
        {
          num: "2",
          titleEn: "Architect Multi-Tenant Isolation",
          titleTh: "2. วางโครงสร้างแยกข้อมูลร้านค้า (Multi-Tenant)",
          descEn: "Built a tenant-scoped database model allowing multiple restaurant branches to run on a single unified backend without data leaks.",
          descTh: "ออกแบบฐานข้อมูลแบบ Multi-Tenant ให้รองรับหลายสาขาหรือหลายร้านค้าในระบบเดียว โดยแยกข้อมูลเมนูและยอดขายอย่างปลอดภัย"
        },
        {
          num: "3",
          titleEn: "Touch-Optimized Cognitive Ergonomics",
          titleTh: "3. ออกแบบหน้าจอให้กดง่ายและรวดเร็ว",
          descEn: "Crafted high-contrast touch POS layouts with clear color-coded order states (Pending ➔ Cooking ➔ Ready ➔ Served).",
          descTh: "ออกแบบหน้าจอสัมผัสขนาดใหญ่ พร้อมแถบสีสถานะออร์เดอร์ที่ชัดเจน (รอรับ ➔ กำลังปรุง ➔ พร้อมเสิร์ฟ ➔ ส่งมอบแล้ว)"
        }
      ]
    },

    methodology: {
      titleEn: "Engineering Thought Process & Real-Time Pipeline",
      titleTh: "กระบวนการคิดเชิงวิศวกรรม & สถาปัตยกรรม Real-Time",
      steps: [
        {
          phase: "Step 1: Protocol Selection",
          titleEn: "Hybrid Transport Architecture (WebSockets + REST)",
          titleTh: "การผสมผสานสองโปรโตคอล: WebSockets สำหรับ KDS + REST สำหรับการคิดเงิน",
          detailEn: "Rather than forcing everything over one protocol, we used Socket.io for zero-latency bidirectional KDS broadcasting, while keeping financial payment transactions and receipt printings over idempotent REST endpoints with ACID transactional logging.",
          detailTh: "แยกการทำงานชัดเจน: ใช้ Socket.io สำหรับการกระจายสัญญาณเข้าจอครัวแบบเรียลไทม์ 0ms แต่ใช้ REST API สำหรับการชำระเงินและออกใบกำกับภาษี เพื่อให้มี Audit Trail และบันทึกประวัติทางการเงินที่ตรวจสอบได้ 100%"
        },
        {
          phase: "Step 2: Tenant Scoped Channels",
          titleEn: "Dynamic Room Partitioning in Socket.io",
          titleTh: "การแบ่ง Channel ห้องตาม Tenant ID และ Branch ID",
          detailEn: "Implemented JWT middleware on WebSocket handshakes to extract { tenantId, branchId }. Sockets automatically join isolated room channels (tenant:restaurant_1:branch_bkk). Events are broadcast exclusively to matching rooms, reducing network traffic and eliminating data cross-talk.",
          detailTh: "ใช้ JWT Middleware ตรวจสอบสิทธิ์ตั้งแต่ขั้นตอน Handshake และดึงข้อมูล { tenantId, branchId } เพื่อจับอุปกรณ์เข้าห้อง Socket เฉพาะสาขา (tenant:1:branch:bkk) ทำให้การ Broadcast ออร์เดอร์ไม่สิ้นเปลือง Bandwidth และไม่มีข้อมูลรั่วไหล"
        },
        {
          phase: "Step 3: Inventory Depletion Atomic Lock",
          titleEn: "Preventing Race Conditions on Last-Item Inventory",
          titleTh: "การล็อกสต็อกแบบ Transaction ป้องกันการสั่งเมนูสุดท้ายชนกัน",
          detailEn: "When multiple tables order the last remaining Wagyu steak simultaneously, Prisma $transaction executes an atomic decrement with a conditional stock >= quantity check. If stock is exhausted, the transaction immediately rolls back and emits an out-of-stock event to the client.",
          detailTh: "เมื่อ 2 โต๊ะสั่งเมนูจานสุดท้ายพร้อมกันในเสี้ยววินาที ระบบจะใช้ Prisma $transaction รันคำสั่งตัดสต็อกแบบ Atomic พร้อมเงื่อนไข stock >= qty หากสต็อกหมด Transaction จะ Rollback อัตโนมัติและแจ้งเตือนโต๊ะที่สั่งช้ากว่าทันที"
        }
      ]
    },

    warStory: {
      titleEn: "The War Story: The Ghost Double-Order Bug",
      titleTh: "กรณีศึกษาบั๊กจริง: ออร์เดอร์ผีเบิ้ล 2 จานเมื่อเน็ตกระตุก",
      problemEn: "During peak lunch testing with flaky Wi-Fi, cashiers tapped Confirm Order twice when the spinner paused, causing duplicate orders and double food prep in the kitchen.",
      problemTh: "ช่วงทดสอบที่สัญญาณ Wi-Fi ไม่เสถียร แคชเชียร์กดปุ่มยืนยันซ้ำเมื่อหน้าจอค้าง ส่งผลให้ออร์เดอร์ถูกส่งซ้ำและครัวทำอาหารเบิ้ล 2 จาน",
      solutionEn: "Implemented Client-Side Idempotency Keys (UUIDv4 per checkout session) stored in Redis with a 15-second TTL. The server checks the key before creating an order; duplicate requests within the window receive the cached original response without creating duplicate kitchen tickets.",
      solutionTh: "แก้ไขด้วยการสร้าง Idempotency Key (UUIDv4 ต่อการสั่ง 1 ครั้ง) และเก็บใน Redis 15 วินาที เมื่อเซิร์ฟเวอร์ได้รับ Key ซ้ำ จะส่งผลลัพธ์เดิมกลับไปโดยไม่สร้างออร์เดอร์ใหม่ในครัว แก้ปัญหาอาหารเบิ้ลได้อย่างเด็ดขาด"
    },

    chapter2: {
      titleEn: "Chapter 2: Real-Time Event Bus & Data Architecture",
      titleTh: "บทที่ 2: สถาปัตยกรรม Real-Time & Event Gateway",
      leadEn: "We engineered an event-driven architecture using Socket.io WebSockets paired with a transactional Express.js / Prisma backend.",
      leadTh: "เราออกแบบสถาปัตยกรรมแบบ Event-Driven ด้วย Socket.io ร่วมกับ Express.js และ Prisma เพื่อการส่งข้อมูลแบบ Sub-millisecond",
      flowSteps: [
        { step: "Cashier / Kiosk Client", tech: "React SPA + Real-time Listeners", role: "Touch-Optimized Ordering & Queue UI" },
        { step: "Event Gateway", tech: "Socket.io Gateway Server", role: "Sub-millisecond Bi-directional Order Broadcast" },
        { step: "Backend Core", tech: "Node.js & Express REST API", role: "Tenant Resolution, Billing & Business Logic" },
        { step: "Multi-Tenant Store", tech: "Prisma ORM + PostgreSQL", role: "Isolated Tenant Schemas & Transaction Logs" }
      ],
      diagram: `[ React Cashier POS ] <════(Socket.io WebSocket)════> [ Kitchen Display System (KDS) ]
            │                                                      │
            └───────────────(RESTful Order Payloads)───────────────┘
                                       │
                                       ▼
                     [ Express.js + Prisma ORM Gateway ]
                                       │
                                       ▼
                    [ PostgreSQL Multi-Tenant Database ]`,
      tradeoffs: [
        {
          decision: "Socket.io WebSockets vs Polling",
          rationaleEn: "Socket.io enabled sub-50ms event delivery to Kitchen Displays with automatic reconnection and room-based tenant scoping.",
          rationaleTh: "Socket.io ช่วยลดความล่าช้าในการส่งออร์เดอร์เข้าครัวเหลือต่ำกว่า 50ms พร้อมระบบแบ่งห้อง (Rooms) แยกตามสาขาของร้าน"
        },
        {
          decision: "Optimistic Order State Updates",
          rationaleEn: "Cashier UI updates immediately while emitting WebSocket payloads in background, keeping the register fast under heavy queue pressure.",
          rationaleTh: "หน้าจอแคชเชียร์แสดงผลทันทีแบบ Optimistic UI โดยไม่ต้องรอรอบ Request ช่วยให้กดคิดเงินได้ต่อเนื่องไม่มีสะดุด"
        }
      ]
    },

    chapter3: {
      titleEn: "Chapter 3: Deliverables, Impact & Takeaways",
      titleTh: "บทที่ 3: ผลลัพธ์และการส่งมอบงาน",
      metrics: [
        { labelEn: "Sync Latency", labelTh: "ความเร็วส่งเข้าครัว", val: "< 50ms" },
        { labelEn: "Tenant Isolation", labelTh: "การแยกข้อมูลร้าน", val: "100%" },
        { labelEn: "Order Status", labelTh: "สถานะออร์เดอร์", val: "Real-Time" }
      ],
      summaryEn: "OmniPOS solves the core bottleneck of restaurant operations by connecting cashiers, kitchen staff, and queueing into one cohesive, real-time nervous system.",
      summaryTh: "OmniPOS แก้ปัญหาคอขวดของการจัดการร้านอาหารได้อย่างตรงจุด ด้วยการผสานจุดรับเงิน จอในครัว และการจัดการคิวเข้าเป็นระบบเรียลไทม์ที่ทำงานร่วมกันได้อย่างสมบูรณ์แบบ"
    }
  },

  blackboard: {
    id: "blackboard",
    number: "03",
    tagFile: "kanban_engine.ts",
    title: "Blackboard",
    subtitleEn: "Collaborative Project Management System",
    subtitleTh: "ระบบบริหารโปรเจกต์และจัดการงานแบบ Kanban สำหรับทีม",
    category: "Full-Stack / Collaborative Workspaces",
    github: "https://github.com/Jakkapon-Dev/Blackboard",
    techStack: ["Next.js", "TypeScript", "Prisma", "Zustand", "Tailwind CSS"],
    
    chapter1: {
      titleEn: "Chapter 1: Team Fragmentation & Lost Sprint Focus",
      titleTh: "บทที่ 1: การกระจายงานที่สับสน & เป้าหมายทีมที่หลุดลอย",
      dropCap: "C",
      narrativeEn: "ross-functional teams frequently struggle with fragmented communication across chat apps, forgotten task deadlines, and clunky legacy project tools that slow down daily productivity. When developers cannot see board status updates smoothly, team alignment degrades and project deliveries miss target deadlines.",
      narrativeTh: "ทีมพัฒนาที่ทำงานร่วมกันหลายฝ่ายมักประสบปัญหาการสื่อสารที่กระจัดกระจายในแอปพลิเคชันแชต งานมอบหมายหลงลืม และเครื่องมือบริหารงานแบบเดิมที่เทอะทะ โหลดช้า เมื่อสมาชิกในทีมไม่สามารถเห็นสถานะงานและกระดาน Kanban ได้อย่างลื่นไหล ประสิทธิภาพของทีมจะลดลงและส่งมอบงานไม่ทันกำหนด",
      contextBoxTitleEn: "Sprint Lifecycle & Kanban Flow",
      contextBoxTitleTh: "กระบวนการลากวางงานในกระดาน Kanban",
      principles: [
        {
          num: "1",
          titleEn: "Target 60fps Drag & Drop",
          titleTh: "1. เป้าหมายความลื่นไหล 60fps",
          descEn: "Designed an optimistic local state model with Zustand ensuring card drag transitions render at a smooth 60fps with zero network wait.",
          descTh: "ออกแบบ State Management ด้วย Zustand ให้การ์ดขยับตามเมาส์ได้ทันทีแบบ 60fps โดยไม่ต้องรอเซิร์ฟเวอร์ตอบกลับ"
        },
        {
          num: "2",
          titleEn: "Eliminate Array Re-Indexing",
          titleTh: "2. ลดภาระการคำนวณลำดับการ์ด",
          descEn: "Adopted Fractional Indexing (Lexorank style) so moving a single card only updates one database row instead of rewriting thousands of column indexes.",
          descTh: "ใช้เทคนิค Fractional Indexing ทำให้การย้ายการ์ด 1 ใบ บันทึก Database เพียงแถวเดียว ไม่ต้องอัปเดตเลขลำดับของการ์ดทั้งคอลัมน์"
        },
        {
          num: "3",
          titleEn: "Atomic Rollback Resilience",
          titleTh: "3. ระบบกู้คืนสถานะเมื่อเกิด Error",
          descEn: "Engineered an automatic rollback snapshot pipeline that cleanly restores card positions if an API batch request fails over weak networks.",
          descTh: "สร้างระบบ Snapshot State อัตโนมัติ หากสัญญาณเน็ตหลุด การ์ดจะดีดกลับตำแหน่งเดิมอย่างนุ่มนวลพร้อมแจ้งเตือนผู้ใช้"
        }
      ]
    },

    methodology: {
      titleEn: "Engineering Thought Process & Optimistic UI",
      titleTh: "กระบวนการคิดเชิงวิศวกรรม & สถาปัตยกรรม Optimistic UI",
      steps: [
        {
          phase: "Step 1: Fractional Indexing Math",
          titleEn: "O(1) Task Reordering with Midpoint Calculation",
          titleTh: "การจัดลำดับการ์ดแบบ O(1) ด้วยการคำนวณจุดกึ่งกลาง (Fractional Indexing)",
          detailEn: "Traditional Kanban systems use integers (0, 1, 2, 3...). Inserting a card between index 1 and 2 requires updating every subsequent card (O(N) DB writes). Blackboard assigns floating-point indexes. Inserting between 1.0 and 2.0 simply assigns 1.5, making every re-order an O(1) single-row update.",
          detailTh: "กระดานทั่วไปใช้เลขจำนวนเต็ม (0, 1, 2) ซึ่งเมื่อแทรกการ์ดตรงกลาง จะต้องไล่อัปเดตเลขการ์ดที่เหลือทั้งคอลัมน์ (O(N)) แต่ Blackboard ใช้ตัวเลขทศนิยม เช่น แทรกระหว่าง 1.0 กับ 2.0 จะได้ 1.5 ทันที ทำให้การบันทึกลง Database เป็น O(1) ประหยัดทรัพยากรเซิร์ฟเวอร์มหาศาล"
        },
        {
          phase: "Step 2: Zustand Optimistic Pipeline",
          titleEn: "Zero-Latency Local Mutator with Snapshot Rollback",
          titleTh: "การจัดการ State แบบ Snapshot ก่อนยิง Request",
          detailEn: "When a user drops a card, Zustand immediately clones the current column array into a previousState snapshot, renders the new UI layout in 0ms, and dispatches a debounced PATCH request. If the server responds with 4xx/5xx, previousState is applied instantly with a toast alert.",
          detailTh: "เมื่อผู้ใช้วางการ์ด Zustand จะเก็บ Snapshot ไว้ก่อน แล้วปรับหน้าจอเป็นตำแหน่งใหม่ทันทีใน 0ms จากนั้นค่อยส่งคำขอ PATCH ไปยัง Server หากเซิร์ฟเวอร์ตอบกลับ Error ระบบจะนำ Snapshot เดิมมาคืนค่าพร้อมแสดงข้อความแจ้งเตือน"
        },
        {
          phase: "Step 3: Debounced Batch Synchronization",
          titleEn: "Debouncing Rapid Drag Events",
          titleTh: "การรวบรวม Event ด้วย Debounce ป้องกันการยิง API ถี่เกินไป",
          detailEn: "Users often reposition cards multiple times in seconds. A 300ms debounce buffer absorbs rapid drag-and-drop actions, sending only the final resting position to the API instead of hammering the database with intermediate movements.",
          detailTh: "เมื่อผู้ใช้ลากการ์ดไปมาหลายครั้งในเวลาสั้นๆ ระบบจะใช้ Debounce Buffer 300ms เพื่อส่งเฉพาะตำแหน่งสุดท้ายไปยังเซิร์ฟเวอร์ ช่วยลดการยิง API ที่ไม่จำเป็นลงได้มากกว่า 80%"
        }
      ]
    },

    warStory: {
      titleEn: "The War Story: Floating-Point Precision Collision",
      titleTh: "กรณีศึกษาบั๊กจริง: ค่าทศนิยมชนกันเมื่อย้ายการ์ดซ้ำที่เดิม",
      problemEn: "After repeatedly dropping tasks into the exact same gap 50+ times during stress testing, floating-point precision decayed (1.0000000000000002), causing index collisions where two cards had identical positions.",
      problemTh: "ช่วงทดสอบ Stress Test เมื่อมีการลากการ์ดเข้าช่องว่างเดิมซ้ำๆ กว่า 50 ครั้ง เลขทศนิยมเริ่มละเอียดจนชนขีดจำกัดของ JavaScript Float ทำให้การ์ด 2 ใบได้ Index เดียวกัน",
      solutionEn: "Implemented an automatic column rebalancer trigger. When Math.abs(indexA - indexB) < 0.00001, the server automatically recalibrates the entire column back to clean integer increments (1000, 2000, 3000), completely resolving index collisions.",
      solutionTh: "แก้ไขโดยการเขียนเงื่อนไข Rebalancer เมื่อช่องว่างระหว่าง 2 Index แคบกว่า 0.00001 ระบบจะรันคำสั่งเกลี่ยลำดับในคอลัมน์นั้นใหม่ให้เป็นเลขจำนวนเต็ม (1000, 2000, 3000) อัตโนมัติ"
    },

    chapter2: {
      titleEn: "Chapter 2: State Management & Database Transactions",
      titleTh: "บทที่ 2: การจัดการ State & ธุรกรรมฐานข้อมูล",
      leadEn: "Blackboard leverages Zustand for client-side optimistic drag-and-drop states combined with Next.js route handlers and Prisma batch queries.",
      leadTh: "Blackboard ใช้ Zustand เพื่อจัดการ State การลากวางแบบ Optimistic ร่วมกับ Route Handlers และ Prisma Batch Transactions",
      flowSteps: [
        { step: "Interactive UI", tech: "Next.js + Zustand State", role: "Optimistic Task Drag & Drop UI" },
        { step: "Server API", tech: "Next.js Route Handlers", role: "Workspace Access Validation & CRUD" },
        { step: "Data Layer", tech: "Prisma ORM", role: "Nested Workspace/Board/Card Transactions" },
        { step: "Database", tech: "PostgreSQL Database", role: "Workspaces, Projects & Task Audit Logs" }
      ],
      diagram: `[ Drag Card on Kanban Board ] ──(Zustand Optimistic Update)──> [ Client UI Updates ]
                                                                   │
                                                                   ▼ (Batch PATCH Request)
                                                    [ Next.js API Handlers ]
                                                                   │
                                                                   ▼ (Prisma Transaction)
                                                    [ Relational Task Schema ]`,
      tradeoffs: [
        {
          decision: "Zustand vs Redux Toolkit",
          rationaleEn: "Zustand provided a lightweight, zero-boilerplate state store with instant re-renders for card drag re-ordering.",
          rationaleTh: "Zustand มีขนาดเล็ก ไม่มีโค้ดส่วนเกิน และตอบสนองการสลับตำแหน่งการ์ดได้อย่างรวดเร็วไม่กระตุก"
        },
        {
          decision: "Prisma Batch Ordering",
          rationaleEn: "Batched updates ensured that re-arranging 10 task cards only requires a single atomic transaction.",
          rationaleTh: "การจัดลำดับการ์ดใหม่หลายใบทำผ่าน Atomic Batch Transaction ครั้งเดียว ทำให้ฐานข้อมูลไม่ทำงานหนักเกินไป"
        }
      ]
    },

    chapter3: {
      titleEn: "Chapter 3: Deliverables, Impact & Takeaways",
      titleTh: "บทที่ 3: ผลลัพธ์และการส่งมอบงาน",
      metrics: [
        { labelEn: "UI Response", labelTh: "การตอบสนองหน้าจอ", val: "Instant" },
        { labelEn: "Architecture", labelTh: "รูปแบบระบบ", val: "Optimistic" },
        { labelEn: "Code Quality", labelTh: "ความสะอาดของโค้ด", val: "TypeScript" }
      ],
      summaryEn: "Blackboard proves that high-performance developer productivity tools require clean state architecture, fast optimistic UI, and disciplined data modeling.",
      summaryTh: "Blackboard แสดงให้เห็นว่าเครื่องมือบริหารงานที่ดีต้องเกิดจากการออกแบบ State ที่เบาและเร็ว การอัปเดตหน้าจอแบบ Optimistic และโครงสร้างฐานข้อมูลที่มีระเบียบ"
    }
  },

  matcha: {
    id: "matcha",
    number: "04",
    tagFile: "matcha_capstone.ts",
    title: "MATCHA",
    subtitleEn: "Generation Thailand (JSD13) Final Capstone",
    subtitleTh: "โปรเจกต์จบหลักสูตร JSD13 (Final Capstone) · กำลังพัฒนา",
    category: "Full-Stack / Team Capstone",
    github: "https://github.com/Jakkapon-Dev/MATCHA",
    techStack: ["React", "Node.js", "Express", "REST APIs", "Git Flow Collaboration"],
    
    chapter1: {
      titleEn: "Chapter 1: Multi-Role Job Platform & Team Coordination",
      titleTh: "บทที่ 1: แพลตฟอร์มรับสมัครงาน & การทำงานร่วมกันในทีม",
      dropCap: "E",
      narrativeEn: "ntering the recruitment market requires an interconnected portal that bridges candidates searching for tech opportunities, recruiters screening applicant submissions, and administrators auditing platform security. Building this as the final capstone for Generation Thailand (JSD13) demanded rigorous Agile sprints, Git branch reviews, and full-stack alignment.",
      narrativeTh: "การสร้างแพลตฟอร์มตลาดแรงงานและรับสมัครงานต้องอาศัยระบบที่เชื่อมต่อระหว่างผู้สมัครงานที่ค้นหาโอกาส ฝ่ายบุคคลที่คัดกรองใบสมัคร และผู้ดูแลระบบที่ตรวจสอบความปลอดภัย โปรเจกต์นี้เป็น Final Capstone ของหลักสูตร Generation Thailand (JSD13) ที่ต้องใช้กระบวนการ Agile, การจัดการ Git Flow และการประสานงาน Full-Stack อย่างเข้มข้น",
      contextBoxTitleEn: "Collaborative Agile Sprint Architecture",
      contextBoxTitleTh: "การทำงานร่วมกันในทีมด้วยระบบ Agile & Git",
      principles: [
        {
          num: "1",
          titleEn: "Agile Sprints & Git Flow",
          titleTh: "1. การทำงานแบบ Agile & Git Flow",
          descEn: "Practiced disciplined pull requests, code reviews, and pair programming to maintain clean modular codebase across teammates.",
          descTh: "ใช้กระบวนการ Pull Request Reviews และ Pair Programming เพื่อรักษาคุณภาพโค้ดและทำงานร่วมกันได้อย่างราบรื่น"
        },
        {
          num: "2",
          titleEn: "Clear API Contracts",
          titleTh: "2. กำหนด API Contracts ที่ชัดเจน",
          descEn: "Designed RESTful endpoint schemas early in Postman, allowing frontend and backend development tracks to progress in parallel.",
          descTh: "กำหนดสเปกและ Schema ของ RESTful APIs ผ่าน Postman ตั้งแต่วันแรก ทำให้ทีมหน้าบ้านและหลังบ้านพัฒนาคู่ขนานกันได้ทันที"
        },
        {
          num: "3",
          titleEn: "Role-Based Data Separation",
          titleTh: "3. แยกหน้าจอและการเข้าถึงตามบทบาท",
          descEn: "Architected separate application workflows for Candidates (browse/apply), Recruiters (post/evaluate), and Platform Admins.",
          descTh: "ออกแบบ Flow การใช้งานแยกชัดเจนระหว่าง ผู้สมัครงาน (ค้นหา/ส่งใบสมัคร), ฝ่ายบุคคล (ลงประกาศ/ประเมินผล), และแอดมิน"
        }
      ]
    },

    methodology: {
      titleEn: "Engineering Thought Process & Team Collaboration",
      titleTh: "กระบวนการคิดเชิงวิศวกรรม & สถาปัตยกรรมการทำงานร่วมกับทีม",
      steps: [
        {
          phase: "Step 1: Layered Architecture (Separation of Concerns)",
          titleEn: "Controller vs Service Layer Segregation",
          titleTh: "การแยก Controller ออกจาก Service Layer เพื่อ Clean Architecture",
          detailEn: "Controllers strictly handle HTTP request validation and status codes (200, 400, 500). All resume parsing, scoring algorithms, and database queries live in pure Service classes, allowing unit testing without spinning up mock HTTP servers.",
          detailTh: "กำหนดให้ Controller มีหน้าที่เพียงตรวจสอบ HTTP Request และส่ง Status Code กลับ ส่วน Business Logic ทั้งหมด เช่น การคำนวณคะแนนผู้สมัคร อยู่ใน Service Layer ทำให้สามารถเขียน Unit Test ได้ง่ายและเป็นระเบียบ"
        },
        {
          phase: "Step 2: Stream-Based Cloud Storage",
          titleEn: "Memory-Efficient PDF Streaming to AWS S3",
          titleTh: "การ Stream ไฟล์ PDF เข้าสู่ AWS S3 โดยไม่เปลือง RAM",
          detailEn: "Rather than buffering large 10MB PDF resumes into server RAM, Multer creates a direct readable stream to AWS S3 with SHA-256 integrity checksums. This allows the API to handle multiple concurrent uploads without crashing Node.js heap memory limits.",
          detailTh: "แทนที่จะโหลดไฟล์ PDF ขนาดใหญ่เข้า RAM ของเซิร์ฟเวอร์ ระบบใช้ Multer สร้าง Stream ส่งตรงเข้า AWS S3 พร้อมตรวจเช็กค่า SHA-256 Checksum ทำให้เซิร์ฟเวอร์รองรับการอัปโหลดพร้อมกันหลายคนได้โดยที่ RAM ไม่ล้น"
        },
        {
          phase: "Step 3: Multi-Role Authorization Middleware",
          titleEn: "Role-Based Access Control (RBAC)",
          titleTh: "ระบบ Middleware ตรวจสอบสิทธิ์ผู้สมัครและ HR",
          detailEn: "Engineered JWT authentication middleware verifying user claims (CANDIDATE vs RECRUITER). Endpoints like candidate shortlisting and job posting are protected at the router level, preventing unauthorized access.",
          detailTh: "สร้าง Middleware ตรวจสอบ Token JWT เพื่อแยกสิทธิ์ระหว่างผู้สมัครงานและ HR อย่างเด็ดขาด ป้องกันไม่ให้ผู้สมัครเข้าถึงหน้าจัดการของผู้ว่าจ้าง"
        }
      ]
    },

    warStory: {
      titleEn: "The War Story: Git Merge Conflict & Schema Drift",
      titleTh: "กรณีศึกษาบั๊กจริง: ข้อพิพาทโค้ดและ Schema ชนกันในทีม",
      problemEn: "During sprint week 3, two developers modified the user model migration simultaneously on separate feature branches, causing database migration failures on the staging server.",
      problemTh: "ช่วงสัปดาห์ที่ 3 ของการพัฒนา มีสมาชิกในทีม 2 คนแก้ไข Schema ของตาราง User พร้อมกันในคนละ Branch ทำให้ Migration บน Staging Server เกิดข้อผิดพลาด",
      solutionEn: "Established a strict Git Flow policy: enforced atomic migration scripts with sequential timestamps, automated PR migration checks, and instituted mandatory schema sync meetings before merging feature branches.",
      solutionTh: "แก้ไขด้วยการวางระเบียบ Git Flow ใหม่: บังคับให้เขียน Migration แบบแยกไฟล์ตาม Timestamp, เพิ่มการตรวจสอบ Migration ใน Pull Request และนัดประชุมซิงก์ Schema ร่วมกันก่อน Merge ทุกครั้ง"
    },

    chapter2: {
      titleEn: "Chapter 2: Modular Controller-Service Backend Architecture",
      titleTh: "บทที่ 2: สถาปัตยกรรม Backend แบบ Controller-Service",
      leadEn: "To support scalable feature additions, we implemented a layered architecture separating routing, controller validation, and business service logic.",
      leadTh: "เพื่อให้ระบบขยายได้ง่าย เราออกแบบ Backend แบบแยก Layer ระหว่าง Routing, Controller Validation, และ Business Service Logic",
      flowSteps: [
        { step: "Frontend SPA", tech: "React Client", role: "Multi-Role Responsive Views & State" },
        { step: "API Gate", tech: "Express.js REST APIs", role: "Authentication, Middleware & Controllers" },
        { step: "Service Layer", tech: "Node.js Services", role: "Business Logic & Integration" },
        { step: "Database", tech: "Relational Database", role: "User Profiles, Job Postings & Applications" }
      ],
      diagram: `[ React Frontend SPA ] ──(RESTful Endpoints)──> [ Express Gateway & Middleware ]
                                                              │
                                                              ▼
                                                   [ Business Service Layer ]
                                                              │
                                                              ▼
                                                  [ Database Store & Models ]`,
      tradeoffs: [
        {
          decision: "Layered Controller-Service Pattern",
          rationaleEn: "Decoupling HTTP handling from business rules allowed teammates to write isolated unit tests without mocking express request objects.",
          rationaleTh: "การแยก Controller ออกจาก Service ช่วยให้เขียน Unit Tests ได้ง่าย และแบ่งงานในทีมได้อย่างชัดเจน"
        },
        {
          decision: "Centralized Error Handling Middleware",
          rationaleEn: "Unified error interceptors return consistent JSON error envelopes, preventing unhandled promise crashes across endpoints.",
          rationaleTh: "Middleware จัดการ Error ส่วนกลางช่วยให้ Response ของระบบเป็นระเบียบและป้องกันเซิร์ฟเวอร์หยุดทำงาน"
        }
      ]
    },

    chapter3: {
      titleEn: "Chapter 3: Deliverables, Impact & Takeaways",
      titleTh: "บทที่ 3: ผลลัพธ์และการส่งมอบงาน",
      metrics: [
        { labelEn: "Cohort", labelTh: "รุ่นหลักสูตร", val: "JSD13" },
        { labelEn: "Methodology", labelTh: "วิธีทำงาน", val: "Agile/Scrum" },
        { labelEn: "Status", labelTh: "สถานะ", val: "กำลังพัฒนา (WIP)" }
      ],
      summaryEn: "MATCHA serves as the ultimate test of full-stack engineering, team communication, and professional delivery in the Generation Thailand bootcamp.",
      summaryTh: "MATCHA เป็นบทพิสูจน์ความสามารถทั้งด้านวิศวกรรมซอฟต์แวร์ การสื่อสารในทีม และความมุ่งมั่นในการส่งมอบงานระดับมืออาชีพในหลักสูตร Generation Thailand"
    }
  }
};
