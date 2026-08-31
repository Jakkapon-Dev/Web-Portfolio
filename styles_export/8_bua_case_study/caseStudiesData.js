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
      narrativeTh: "ทีมพัฒนาที่ทำงานร่วมกันหลายฝ่ายมักประสบปัญหาการสื่อสารที่กระจัดกระจายในแอปแช็ต งานมอบหมายหลงลืม และเครื่องมือบริหารงานแบบเดิมที่เทอะทะ โหลดช้า เมื่อสมาชิกในทีมไม่สามารถเห็นสถานะงานและกระดาน Kanban ได้อย่างลื่นไหล ประสิทธิภาพของทีมจะลดลงและส่งมอบงานไม่ทันกำหนด",
      contextBoxTitleEn: "Sprint Lifecycle & Kanban Flow",
      contextBoxTitleTh: "กระบวนการลากวางงานในกระดาน Kanban",
      principles: [
        {
          num: "1",
          titleEn: "Frictionless Drag-and-Drop",
          titleTh: "1. ลากวางงานได้อย่างลื่นไหลไร้รอยต่อ",
          descEn: "Designed an optimistic drag-and-drop board state that updates instantly on the client while persisting changes safely in the background.",
          descTh: "ออกแบบกระดานลากวางที่ตอบสนองทันทีบนหน้าจอ (Optimistic UI) ก่อนบันทึกสถานะลงฐานข้อมูลในเบื้องหลัง"
        },
        {
          num: "2",
          titleEn: "Nested Workspaces & Sprints",
          titleTh: "2. โครงสร้าง Workspaces และ Sprints เป็นหมวดหมู่",
          descEn: "Created clean relational models for Organization ➔ Workspace ➔ Project ➔ Sprint ➔ Task hierarchy.",
          descTh: "จัดโครงสร้างความสัมพันธ์ของข้อมูลแบบลำดับขั้น: องค์กร ➔ พื้นที่ทำงาน ➔ โปรเจกต์ ➔ สปรินต์ ➔ การ์ดงาน"
        },
        {
          num: "3",
          titleEn: "Minimalist High-Focus UI",
          titleTh: "3. ดีไซน์มินิมอล ลดสิ่งรบกวนสายตา",
          descEn: "Dark-mode first interface with high-contrast priority tags and clean typography to keep developers focused on delivery.",
          descTh: "หน้าจอ Dark Mode ที่เน้นความชัดเจนของป้ายลำดับความสำคัญ (Priority Tags) ช่วยให้ทีมโฟกัสกับงานตรงหน้าได้อย่างเต็มที่"
        }
      ]
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
        { labelEn: "Status", labelTh: "สถานะ", val: "Capstones WIP" }
      ],
      summaryEn: "MATCHA serves as the ultimate test of full-stack engineering, team communication, and professional delivery in the Generation Thailand bootcamp.",
      summaryTh: "MATCHA เป็นบทพิสูจน์ความสามารถทั้งด้านวิศวกรรมซอฟต์แวร์ การสื่อสารในทีม และความมุ่งมั่นในการส่งมอบงานระดับมืออาชีพในหลักสูตร Generation Thailand"
    }
  }
};
