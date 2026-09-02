// Complete Portfolio Data for Jakkapon Wapakpet

export const portfolioData = {
  personal: {
    name: "Jakkapon Wapakpet",
    nameTh: "จักรภพ วาภักดิ์เพชร",
    roleEn: "Full-Stack Developer / Software Developer",
    roleTh: "นักพัฒนา Full-Stack / นักพัฒนาซอฟต์แวร์ (Software Developer)",
    statusEn: "Open to Full-Stack & Software Roles",
    statusTh: "พร้อมเริ่มงาน Full-Stack & Software Developer",
    locationEn: "Bangkok, Thailand",
    locationTh: "กรุงเทพมหานคร, ประเทศไทย",
    email: "jakkapon.dev@gmail.com",
    phone: "093-365-6714",
    linkedin: "https://www.linkedin.com/in/jakkapon-wapakpet-986108330/",
    githubMain: "https://github.com/Jakkapon-Dev",
    githubSecondary: "https://github.com/Jakkapon-Wapakpet",
    resumeUrl: "/cv.html",
  },
  
  about: {
    titleEn: "Engineering Mindset & Background",
    titleTh: "แนวคิดและพื้นฐานทางวิศวกรรม",
    badgeEn: "About Me",
    badgeTh: "เกี่ยวกับฉัน",
    en: "Full-Stack Developer and technology student passionate about building practical web applications, automation systems, and scalable software solutions. Experienced across frontend and backend development, with hands-on projects involving APIs, databases, automation, real-time systems, and system integration.",
    th: "นักศึกษาปริญญาตรีสาขาเทคโนโลยี มีความมุ่งมั่นและหลงใหลในการพัฒนาเว็บแอปพลิเคชัน Full-Stack และระบบอัตโนมัติ มีพื้นฐานทั้ง Frontend และ Backend รวมถึงมีประสบการณ์สร้างระบบที่ใช้งานได้จริง เช่น Real-time POS, ระบบบริหารจัดการโรงเรียน, กระดานงาน Kanban และ Workflow Automation",
  },

  aboutStats: [
    { value: "4+", labelEn: "Flagship Deployments", labelTh: "โปรเจกต์สถาปัตยกรรมหลัก" },
    { value: "6", labelEn: "Years Operations Precision", labelTh: "ปีประสบการณ์ทำงานรวม" },
    { value: "100%", labelEn: "Type-Safe & Relational", labelTh: "ความแม่นยำด้าน Type Safety" }
  ],

  featuredProjects: [
    {
      id: "mystudentroom",
      number: "01",
      title: "MyStudentRoom",
      category: "Full-Stack / School OS",
      statusBadge: "Featured",
      theme: {
        accent: "#0EA5E9",
        accentGlow: "rgba(14, 165, 233, 0.18)",
        badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
        tagClass: "text-sky-600 dark:text-sky-400",
        btnPrimary: "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20",
        borderHover: "hover:border-sky-500/60",
        cardGlow: "group-hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]",
        statusBadge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      },
      subtitleEn: "Smart Attendance & Parent Tracking Platform",
      subtitleTh: "ระบบบริหารจัดการนักเรียน เช็กชื่อ และติดตามข้อมูลสำหรับผู้ปกครอง",
      overviewEn: "A comprehensive school operations platform engineered with Next.js 14 App Router, TypeScript, and Prisma ORM. Eliminates paper attendance bottlenecks with real-time roll-call logging and parent notification synchronization.",
      overviewTh: "ระบบจัดการนักเรียนแบบครบวงจร พัฒนาด้วย Next.js 14, TypeScript และ Prisma ORM เพื่อเพิ่มประสิทธิภาพการเช็กชื่อ ลดงานเอกสารซ้ำซ้อน และแจ้งเตือนผู้ปกครองแบบเรียลไทม์",
      techStack: ["Next.js 14", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS"],
      github: "https://github.com/Jakkapon-Dev/MyStudentRoom",
      liveDemo: "https://mystudentroom.vercel.app",
      architecture: {
        flow: [
          { step: "Client Layer", tech: "Next.js 14 SSR Portal", role: "Role-Based Ingestion (Teacher & Parent Portal)" },
          { step: "Edge Security", tech: "Route Handlers & Zod", role: "Session Auth & Strict Payload Validation" },
          { step: "Business Core", tech: "Next.js Server Actions", role: "Attendance Computation & Audit Dispatcher" },
          { step: "Relational DB", tech: "Prisma ORM + PostgreSQL", role: "ACID Transaction & pgBouncer Pooling" }
        ],
        diagramAscii: `[ Student Gate RFID / Teacher WebApp ] ──(Type-Safe Payloads)──> [ Next.js Edge Auth & Zod Guard ]
                                                                                │
                                                                                ▼
[ Parent LINE Push Alert ] <──(Async Webhook)── [ Server Actions Core ] ──(Prisma Transaction)──> [ PostgreSQL Relational DB ]`
      },
      keyHighlightsEn: [
        "Type-Safe Relational Schema: 100% type-checked CRUD queries using Prisma ORM.",
        "Role-Based Access Control (RBAC): Strict isolation between Teacher, Parent, and Admin views.",
        "Instant Parent Synchronization: Sub-100ms notification dispatch pipeline."
      ],
      keyHighlightsTh: [
        "โครงสร้างฐานข้อมูลแบบ Type-Safe: ควบคุมความสัมพันธ์ของข้อมูลด้วย Prisma ORM",
        "ระบบสิทธิ์ผู้ใช้ RBAC: แยกหน้าจอการทำงานชัดเจนระหว่าง ครู ผู้ปกครอง และแอดมิน",
        "การส่งข้อมูลแจ้งเตือนทันที: อัปเดตสถานะเช็กชื่อถึงผู้ปกครองอย่างรวดเร็ว"
      ]
    },
    {
      id: "omnipos",
      number: "02",
      title: "OmniPOS",
      category: "Full-Stack / Real-Time Systems",
      statusBadge: "Real-Time KDS",
      theme: {
        accent: "#F59E0B",
        accentGlow: "rgba(245, 158, 11, 0.18)",
        badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        tagClass: "text-amber-600 dark:text-amber-400",
        btnPrimary: "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20",
        borderHover: "hover:border-amber-500/60",
        cardGlow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
        statusBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      },
      subtitleEn: "Multi-Tenant Restaurant POS & Queue Management",
      subtitleTh: "ระบบ POS ร้านอาหาร Multi-Tenant และจัดการคิวแบบเรียลไทม์",
      overviewEn: "An omnichannel restaurant management ecosystem built with React, Node.js, Express, Socket.io, and Prisma. Features instant table ordering, sub-50ms Kitchen Display synchronization, and branch-isolated multi-tenant data architecture.",
      overviewTh: "ระบบบริหารจัดการร้านอาหารแบบ Multi-Tenant พร้อมระบบจัดการคิวและหน้าจอในครัวแบบเรียลไทม์ ส่งผ่านออร์เดอร์ด้วย Socket.io ในเวลาต่ำกว่า 50ms และแยกฐานข้อมูลแต่ละสาขาอย่างปลอดภัย",
      techStack: ["React", "Node.js", "Express", "Socket.io", "Prisma ORM", "PostgreSQL"],
      github: "https://github.com/Jakkapon-Dev/Multi-Tenant-POS-Queue-Management",
      liveDemo: "https://omnipos-demo.vercel.app",
      architecture: {
        flow: [
          { step: "POS / Table QR", tech: "React SPA Terminals", role: "Touch-Optimized Register & Table QR Ordering" },
          { step: "WebSocket Bus", tech: "Socket.io Gateway Server", role: "Sub-50ms Multi-Tenant Event Broadcast" },
          { step: "Express Logic", tech: "Node.js Express Engine", role: "Tenant Resolver & Inventory Depletion" },
          { step: "Multi-Tenant DB", tech: "Prisma + PostgreSQL", role: "Isolated Branch Schemas & Redis Queue" }
        ],
        diagramAscii: `[ React Touch POS / Table QR ] <════(Socket.io WebSocket)════> [ Kitchen Display System (KDS) ]
              │                                                      │
              └───────────────(RESTful Order Payloads)───────────────┘
                                         │
                                         ▼
                       [ Express.js + Prisma ORM Gateway ]
                                         │
                                         ▼
                      [ PostgreSQL Multi-Tenant Database ]`
      },
      keyHighlightsEn: [
        "Sub-50ms Event Delivery: Bi-directional WebSocket pipeline directly to kitchen displays.",
        "Multi-Tenant Isolation: Branch-scoped database schemas preventing cross-store data leakage.",
        "Optimistic State UI: Cashier register updates instantaneously under heavy queue pressure."
      ],
      keyHighlightsTh: [
        "ส่งข้อมูลเข้าครัวต่ำกว่า 50ms: ส่งออร์เดอร์ตรงเข้าจอในครัว (KDS) ทันที",
        "สถาปัตยกรรม Multi-Tenant: แยกข้อมูลยอดขายและเมนูของแต่ละสาขาอย่างเด็ดขาด",
        "Optimistic State UI: หน้าจอแคชเชียร์คิดเงินได้ต่อเนื่องไม่มีสะดุด"
      ]
    },
    {
      id: "blackboard",
      number: "03",
      title: "Blackboard",
      category: "Full-Stack / Collaborative Workspaces",
      statusBadge: "Optimistic UI",
      theme: {
        accent: "#8B5CF6",
        accentGlow: "rgba(139, 92, 246, 0.18)",
        badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
        tagClass: "text-purple-600 dark:text-purple-400",
        btnPrimary: "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20",
        borderHover: "hover:border-purple-500/60",
        cardGlow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
        statusBadge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      },
      subtitleEn: "Collaborative Project Management & Sprint Tracker",
      subtitleTh: "ระบบบริหารโปรเจกต์และจัดการงานแบบ Kanban สำหรับทีม",
      overviewEn: "A team productivity platform featuring optimistic drag-and-drop Kanban boards, Zustand local state stores, and atomic Prisma batch transactions for seamless sprint deliveries.",
      overviewTh: "ระบบจัดการงานและโปรเจกต์ของทีม ออกแบบด้วย Next.js และ Zustand ให้ลากวางการ์ดได้อย่างลื่นไหลแบบ Optimistic UI พร้อมระบบจัดเก็บประวัติกิจกรรมของทีม",
      techStack: ["Next.js", "TypeScript", "Prisma", "Zustand", "Tailwind CSS"],
      github: "https://github.com/Jakkapon-Dev/Blackboard",
      liveDemo: "https://blackboard-tasks.vercel.app",
      architecture: {
        flow: [
          { step: "Kanban Client", tech: "Next.js + Zustand State", role: "60fps Optimistic Task Drag & Drop UI" },
          { step: "Debouncer API", tech: "Next.js Route Handlers", role: "Fractional Indexing & RBAC Validation" },
          { step: "Batch Engine", tech: "Prisma ORM Client", role: "Atomic Multi-Card Transaction Block" },
          { step: "Relational Store", tech: "PostgreSQL Database", role: "Workspaces, Sprints & Audit Trail" }
        ],
        diagramAscii: `[ Drag Card on Kanban Board ] ──(Zustand Optimistic Update)──> [ Client UI Updates (0ms) ]
                                                                     │
                                                                     ▼ (Debounced Batch PATCH)
                                                      [ Next.js API Handlers ]
                                                                     │
                                                                     ▼ (Atomic Prisma Batch)
                                                      [ PostgreSQL Relational Schema ]`
      },
      keyHighlightsEn: [
        "Zero-Lag Drag & Drop: Zustand optimistic updates render transitions at 60fps.",
        "Fractional Indexing: Re-ordering tasks without costly full-column database rewrites.",
        "Atomic Sprint Transactions: Guarantees consistency across multiple simultaneous editors."
      ],
      keyHighlightsTh: [
        "ลากวางงานลื่นไหล 60fps: ใช้ Zustand จัดการ State หน้าจอแบบ Optimistic 0ms",
        "Fractional Indexing: ปรับตำแหน่งการ์ดโดยไม่ต้องบันทึกข้อมูลซ้ำทั้งคอลัมน์",
        "Atomic Transactions: ป้องกันข้อมูลการ์ดสูญหายหรือซ้ำซ้อนเมื่อทำงานพร้อมกันหลายคน"
      ]
    },
    {
      id: "matcha",
      number: "04",
      title: "MATCHA",
      category: "Full-Stack / Team Capstone",
      statusBadge: "JSD13 Final",
      theme: {
        accent: "#10B981",
        accentGlow: "rgba(16, 185, 129, 0.18)",
        badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        tagClass: "text-emerald-600 dark:text-emerald-400",
        btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20",
        borderHover: "hover:border-emerald-500/60",
        cardGlow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
        statusBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      },
      subtitleEn: "Generation Thailand (JSD13) Final Capstone",
      subtitleTh: "โปรเจกต์จบหลักสูตร JSD13 (Final Capstone) · กำลังพัฒนา",
      overviewEn: "Multi-role recruitment portal created as the final capstone for Generation Thailand Bootcamp. Demonstrates Agile teamwork, Git flow pull request reviews, layered Node.js architecture, and resume processing.",
      overviewTh: "แพลตฟอร์มตลาดแรงงานและรับสมัครงานแบบ Multi-Role ที่พัฒนาเป็น Final Capstone ในแคมป์ Generation Thailand (JSD13) ร่วมกับทีม ผ่านกระบวนการ Agile และ Git Flow",
      techStack: ["React", "Node.js", "Express", "REST APIs", "Git Flow Collaboration"],
      github: "https://github.com/Jakkapon-Dev/MATCHA",
      liveDemo: "https://matcha-jsd13.vercel.app",
      architecture: {
        flow: [
          { step: "Multi-Role Portal", tech: "React SPA Frontend", role: "Candidate & Recruiter Workflow Views" },
          { step: "Gateway & Auth", tech: "Express.js REST Gateway", role: "JWT Verification & Multer PDF Scanner" },
          { step: "Service Layer", tech: "Node.js Service Layer", role: "Job Match Engine & Email Interceptor" },
          { step: "Database Store", tech: "Relational Database", role: "User Profiles, Applications & AWS S3" }
        ],
        diagramAscii: `[ Candidate / Recruiter React SPA ] ──(RESTful Endpoints)──> [ Express Gateway & Multer Parser ]
                                                                    │
                                                                    ▼
                                                         [ Service Business Layer ]
                                                                    │
                                                                    ▼
                                                        [ Database & S3 Storage ]`
      },
      keyHighlightsEn: [
        "Layered Controller-Service Architecture: Decoupled business logic for modular testing.",
        "Role-Based Access Control: Distinct candidate, recruiter, and administrator flows.",
        "Team Git Discipline: Structured pull request reviews and sprint backlog management."
      ],
      keyHighlightsTh: [
        "โครงสร้าง Controller-Service: แยก Business Logic ออกจาก Controller เพื่อง่ายต่อการทดสอบ",
        "ระบบสิทธิ์ตามบทบาท: แยก Flow การใช้งานของผู้สมัครและฝ่ายบุคคลชัดเจน",
        "วินัยการทำงานทีมด้วย Git: จัดการ Branch, Pull Request และการทำ Code Review อย่างเป็นระบบ"
      ]
    }
  ],

  otherProjects: [
    {
      title: "Automated Workflow Engine",
      categoryEn: "Automation / Integration",
      categoryTh: "ระบบอัตโนมัติ (Automation)",
      descEn: "Designed automated webhook data pipelines using n8n and REST integrations to streamline lead notifications and operational task dispatches.",
      descTh: "ออกแบบ Workflow อัตโนมัติด้วย n8n และ Webhook เพื่อส่งข้อมูลแจ้งเตือนและกระจายงานในระบบแบบอัตโนมัติ",
      tags: ["n8n", "Webhooks", "LINE Notify", "Automation"],
      github: "https://github.com/Jakkapon-Dev"
    },
    {
      title: "Team Collaborative Repositories",
      categoryEn: "Collaborative / Team Project",
      categoryTh: "การทำงานร่วมกันเป็นทีม (Team Collaboration)",
      descEn: "Collaborative repositories showcasing team programming practices, code reviews, Agile sprints, and joint technical problem solving.",
      descTh: "โปรเจกต์การทำงานร่วมกับเพื่อนร่วมทีมในแคมป์ JSD13 ฝึกฝนการทำ Pair Programming, Code Review และการใช้ Git ในระดับทีม",
      tags: ["Team Project", "Git Workflow", "Scrum", "Collaboration"],
      github: "https://github.com/Jakkapon-Dev"
    }
  ],

  experience: [
    {
      roleEn: "Freelance Photographer & Content Operations",
      roleTh: "ช่างภาพอิสระ & บริหารจัดการคอนเทนต์",
      periodEn: "3 Years",
      periodTh: "3 ปี",
      type: "Transferable Professional Experience",
      summaryEn: "Managed client requirements, production schedules, digital asset delivery pipelines, and end-to-end communication across creative projects.",
      summaryTh: "บริหารจัดการงานถ่ายภาพ รับ Requirement วาง Workflow การทำงาน จัดการขั้นตอนการส่งมอบไฟล์ และแก้ปัญหาเฉพาะหน้าตามกำหนดเวลา",
      skills: ["Requirement Gathering", "Client Communication", "Asset Pipelines", "Time Management"]
    },
    {
      roleEn: "Lawyer's Clerk / Legal Operations",
      roleTh: "เสมียนทนายความ / ดำเนินการเอกสารกฎหมาย",
      periodEn: "3 Years",
      periodTh: "3 ปี",
      type: "Transferable Professional Experience",
      summaryEn: "Handled contracts and legal documentation with strong attention to accuracy, structured processes, and cross-party coordination.",
      summaryTh: "จัดการเอกสารทางกฎหมายและสัญญา ตรวจสอบความถูกต้องของข้อมูล ประสานงานขั้นตอนทางกฎหมายอย่างเป็นระบบและละเอียดรอบคอบ",
      skills: ["Zero-Error Precision", "Systematic Workflow", "Legal Documentation", "Stakeholder Sync"]
    }
  ],

  education: [
    {
      schoolEn: "Krirk University",
      schoolTh: "มหาวิทยาลัยเกริก",
      degreeEn: "Bachelor's Degree in Technology (4th Year Undergrad)",
      degreeTh: "ปริญญาตรี สาขาเทคโนโลยี (กำลังศึกษาอยู่ชั้นปีที่ 4)",
      statusEn: "Currently in 4th Year",
      statusTh: "กำลังศึกษาอยู่ชั้นปีที่ 4"
    },
    {
      schoolEn: "Sakolrajwittayanukul School",
      schoolTh: "โรงเรียนสกลราชวิทยานุกูล",
      degreeEn: "High School Diploma",
      degreeTh: "มัธยมศึกษาตอนปลาย",
      statusEn: "Completed",
      statusTh: "จบการศึกษา"
    }
  ],

  certifications: [
    {
      name: "Junior Software Developer (JSD13)",
      issuer: "Generation Thailand",
      date: "2026 (Certified)",
      desc: "Full-stack web development, React, Node.js, Express, databases, and Agile teamwork."
    }
  ]
};
