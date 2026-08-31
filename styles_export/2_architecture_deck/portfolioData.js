export const portfolioData = {
  personal: {
    name: "Jakkapon Wapakpet",
    nameTh: "จักรภพ วาภักดิ์เพชร",
    roleEn: "Full-Stack Developer / Software Developer",
    roleTh: "นักพัฒนาเว็บฟูลสแตก / ซอฟต์แวร์เดเวลลอปเปอร์",
    statusEn: "Open to Full-Stack & Software Roles",
    statusTh: "พร้อมเริ่มงาน Full-Stack & Software Developer",
    locationEn: "Bangkok, Thailand",
    locationTh: "กรุงเทพมหานคร, ประเทศไทย",
    email: "jakkapon.dev@gmail.com",
    phone: "093-365-6714",
    linkedin: "https://www.linkedin.com/in/jakkapon-wapakpet-986108330/",
    githubMain: "https://github.com/Jakkapon-Dev",
    githubSecondary: "https://github.com/Jakkapon-Wapakpet",
  },
  
  about: {
    titleEn: "Engineering Mindset & Background",
    titleTh: "แนวคิดและพื้นฐานทางวิศวกรรม",
    badgeEn: "About Me",
    badgeTh: "เกี่ยวกับฉัน",
    en: "Full-Stack Developer and technology student passionate about building practical web applications, automation systems, and scalable software solutions. Experienced across frontend and backend development, with hands-on projects involving APIs, databases, automation, real-time systems, and system integration. I enjoy transforming complex problems into reliable, user-focused software.",
    th: "นักศึกษาสาขาเทคโนโลยีที่มีความสนใจด้านการพัฒนาเว็บแอปพลิเคชันแบบ Full-Stack และการสร้างระบบอัตโนมัติ มีพื้นฐานทั้ง Frontend และ Backend รวมถึงมีประสบการณ์ในการพัฒนาโซลูชันจริง เช่น Chatbot, Workflow Automation และการเขียนโปรแกรมควบคุมระบบ สามารถเชื่อมโยงการคิดเชิงตรรกะ การแก้ปัญหา ประสบการณ์ด้านการประสานงาน และความคิดสร้างสรรค์เข้าด้วยกัน เพื่อสร้างซอฟต์แวร์ที่ใช้งานได้จริงและมีประสิทธิภาพ",
    superpowers: [
      {
        titleEn: "Full-Stack System Design",
        titleTh: "การออกแบบระบบ Full-Stack",
        descEn: "Building robust architectures with Next.js, React, Node.js, Express, Socket.io, and Prisma.",
        descTh: "เชื่อมต่อหน้าบ้านและหลังบ้านอย่างลื่นไหลด้วย Next.js, React, Node.js, Socket.io และ Prisma"
      },
      {
        titleEn: "Automation & Integration",
        titleTh: "ระบบอัตโนมัติและเชื่อมต่อ API",
        descEn: "Automating workflows with n8n, custom scripting (Python/MQL5), and RESTful API integrations.",
        descTh: "สร้าง Workflow อัตโนมัติด้วย n8n, เขียนสคริปต์ด้วย Python/MQL5 และเชื่อมต่อ API"
      },
      {
        titleEn: "High Attention to Accuracy",
        titleTh: "ความแม่นยำและเป็นระบบ",
        descEn: "3 years of legal clerk precision applied directly to clean code, data consistency, and error tolerance.",
        descTh: "นำทักษะความละเอียดระดับเอกสารกฎหมายมาใช้ในการเขียนโค้ดและจัดการข้อมูลอย่างแม่นยำ"
      }
    ]
  },

  skills: {
    badgeEn: "Core Capabilities",
    badgeTh: "ทักษะและความสามารถ",
    titleEn: "Technical & Professional Matrix",
    titleTh: "ทักษะทางเทคนิคและความเชี่ยวชาญ",
    categories: [
      {
        id: "frontend",
        nameEn: "Frontend Engineering",
        nameTh: "การพัฒนาฝั่งหน้าบ้าน (Frontend)",
        icon: "Layout",
        skills: [
          { name: "React", level: "Primary", highlight: true },
          { name: "Next.js", level: "Primary", highlight: true },
          { name: "JavaScript (ES6+)", level: "Core", highlight: true },
          { name: "TypeScript", level: "Core", highlight: true },
          { name: "Tailwind CSS", level: "Primary", highlight: true },
          { name: "HTML5 & CSS3", level: "Core", highlight: false },
          { name: "Zustand / State", level: "Core", highlight: false },
          { name: "Responsive UI", level: "Core", highlight: false }
        ]
      },
      {
        id: "backend",
        nameEn: "Backend & Databases",
        nameTh: "การพัฒนาฝั่งหลังบ้าน (Backend)",
        icon: "Server",
        skills: [
          { name: "Node.js", level: "Primary", highlight: true },
          { name: "Express.js", level: "Primary", highlight: true },
          { name: "Prisma ORM", level: "Primary", highlight: true },
          { name: "RESTful APIs", level: "Core", highlight: true },
          { name: "Socket.io (Realtime)", level: "Advanced", highlight: true },
          { name: "Python", level: "Scripting", highlight: false },
          { name: "MQL5", level: "Scripting", highlight: false },
          { name: "PostgreSQL / SQL", level: "Core", highlight: false }
        ]
      },
      {
        id: "automation",
        nameEn: "Automation & DevOps Tools",
        nameTh: "ระบบอัตโนมัติและเครื่องมือ (DevOps)",
        icon: "Cpu",
        skills: [
          { name: "n8n Automation", level: "Specialist", highlight: true },
          { name: "Docker", level: "DevOps", highlight: true },
          { name: "Git & GitHub", level: "Core", highlight: true },
          { name: "Postman / API Test", level: "Tool", highlight: false },
          { name: "CI/CD Concepts", level: "Tool", highlight: false },
          { name: "Workflow Pipelines", level: "Specialist", highlight: false }
        ]
      },
      {
        id: "hardware",
        nameEn: "Hardware & IoT",
        nameTh: "ฮาร์ดแวร์และ IoT",
        icon: "Radio",
        skills: [
          { name: "ESP32", level: "Microcontroller", highlight: true },
          { name: "Arduino", level: "Hardware", highlight: true },
          { name: "Sensor Integration", level: "IoT", highlight: false },
          { name: "Embedded Systems", level: "IoT", highlight: false }
        ]
      },
      {
        id: "soft",
        nameEn: "Soft Skills & Team Delivery",
        nameTh: "ทักษะการทำงานและประสานงาน (Soft Skills)",
        icon: "Users",
        skills: [
          { name: "Analytical & Problem Solving", nameTh: "การคิดวิเคราะห์เชิงตรรกะ", highlight: true },
          { name: "Time Management & Strict Deadlines", nameTh: "การบริหารเวลาและส่งมอบตามกำหนด", highlight: true },
          { name: "Cross-functional Team Communication", nameTh: "การสื่อสารและประสานงานทีม", highlight: true },
          { name: "Fast Learner & High Adaptability", nameTh: "การเรียนรู้ไวและปรับตัวสูง", highlight: true }
        ]
      }
    ]
  },

  featuredProjects: [
    {
      id: "mystudentroom",
      number: "01",
      title: "MyStudentRoom",
      subtitleEn: "Smart Attendance & Parent Tracking Platform",
      subtitleTh: "ระบบบริหารจัดการนักเรียน เช็กชื่อ และติดตามข้อมูลสำหรับผู้ปกครอง",
      category: "Full-Stack / School Management",
      github: "https://github.com/Jakkapon-Dev/MyStudentRoom",
      liveDemo: null,
      statusBadge: "Featured",
      statusColor: "emerald",
      techStack: ["Next.js", "React", "TypeScript", "Prisma", "Tailwind CSS", "PostgreSQL"],
      overviewEn: "A comprehensive school platform designed to modernize attendance tracking, student management, and academic communication between teachers, students, parents, and administrative staff.",
      overviewTh: "ระบบสำหรับการจัดการนักเรียน การเข้าเรียน และการติดตามข้อมูลระหว่างนักเรียน ครู ผู้ปกครอง และฝ่ายโรงเรียน เพื่อเพิ่มประสิทธิภาพการทำงานและลดความผิดพลาด",
      keyHighlightsEn: [
        "Automated attendance tracking dashboard with real-time status updates",
        "Role-based access control for Teachers, Parents, and Administrative staff",
        "Type-safe database layer with Prisma ORM ensuring data integrity",
        "Optimized Next.js server-side rendering for lightning-fast page transitions"
      ],
      keyHighlightsTh: [
        "แดชบอร์ดเช็กชื่อและติดตามสถานะนักเรียนแบบอัตโนมัติ",
        "ระบบสิทธิ์ผู้ใช้งานแยกตามบทบาท (ครู, ผู้ปกครอง, ฝ่ายวิชาการ)",
        "จัดการฐานข้อมูลอย่างปลอดภัยด้วย Prisma ORM และ TypeScript",
        "ใช้ Next.js เพื่อความรวดเร็วในการประมวลผลและการโหลดข้อมูล"
      ],
      architecture: {
        flow: [
          { step: "Client Layer", tech: "Next.js 14 App Router + Tailwind UI", role: "SSR & Interactive Multi-Role Dashboards" },
          { step: "API Handlers", tech: "TypeScript Route Handlers & Server Actions", role: "Validation & Business Logic" },
          { step: "Data Access", tech: "Prisma ORM", role: "Type-Safe Relational Queries & Transactions" },
          { step: "Persistence", tech: "PostgreSQL Database", role: "Student Records, Logs & Attendance Data" }
        ],
        diagramAscii: `[ Next.js SSR Client ] ──(Type-Safe Actions)──> [ API Route Handlers ]
                                                      │
                                                      ▼
[ PostgreSQL DB ] <──(Prisma Type-Safe ORM)───────────┘`
      }
    },
    {
      id: "omnipos",
      number: "02",
      title: "OmniPOS",
      subtitleEn: "Multi-Tenant Restaurant POS & Queue Management",
      subtitleTh: "ระบบ POS ร้านอาหาร Multi-Tenant และจัดการคิวแบบเรียลไทม์",
      category: "Full-Stack / Real-Time POS",
      github: "https://github.com/Jakkapon-Dev/Multi-Tenant-POS-Queue-Management",
      liveDemo: null,
      statusBadge: "Real-Time System",
      statusColor: "cyan",
      techStack: ["React", "Node.js", "Express", "Prisma", "Socket.io", "PostgreSQL"],
      overviewEn: "A high-concurrency restaurant POS and queue management platform architected for real-time kitchen-cashier synchronization, multi-tenant business isolation, and dynamic table ordering workflows.",
      overviewTh: "ระบบ POS ร้านอาหาร รองรับหลายร้านหรือหลาย Tenant รวมถึง Queue และการจัดการกระบวนการทำงานของร้านแบบ Real-time เชื่อมต่อระหว่างแคชเชียร์และห้องครัวอย่างลื่นไหล",
      keyHighlightsEn: [
        "Bi-directional real-time order state synchronization via Socket.io",
        "Multi-tenant database schema isolation supporting multiple branch accounts",
        "High-performance Express.js REST API with Prisma ORM middleware",
        "Intuitive touch-friendly cashier interface with quick order modifiers"
      ],
      keyHighlightsTh: [
        "อัปเดตสถานะออร์เดอร์และคิวแบบ Real-time ด้วย Socket.io ระหว่างแคชเชียร์กับห้องครัว",
        "รองรับโครงสร้าง Multi-Tenant แยกข้อมูลแต่ละร้านค้าอย่างปลอดภัย",
        "Backend ทำงานด้วย Node.js / Express ร่วมกับ Prisma ORM",
        "หน้าจอแคชเชียร์ออกแบบให้ใช้งานง่ายและรวดเร็วบนหน้าจอสัมผัส"
      ],
      architecture: {
        flow: [
          { step: "Cashier / Kiosk Client", tech: "React SPA + Real-time Listeners", role: "Touch-Optimized Ordering & Queue UI" },
          { step: "Event Bus", tech: "Socket.io Gateway Server", role: "Sub-millisecond Bi-directional Broadcast" },
          { step: "Backend Core", tech: "Node.js & Express API", role: "Tenant Resolution, Auth & Order Logic" },
          { step: "Multi-Tenant Store", tech: "Prisma ORM + PostgreSQL", role: "Isolated Tenant Schemas & Sales Records" }
        ],
        diagramAscii: `[ React Cashier / Kiosk ] <══(Socket.io WebSocket)══> [ Socket Gateway ]
           │                                                 │
           └───(REST APIs)──> [ Express + Prisma ] <─────────┘
                                     │
                                     ▼
                        [ PostgreSQL Multi-Tenant DB ]`
      }
    },
    {
      id: "blackboard",
      number: "03",
      title: "Blackboard",
      subtitleEn: "Collaborative Project Management System",
      subtitleTh: "ระบบบริหารโปรเจกต์และจัดการงานแบบ Kanban สำหรับทีม",
      category: "Full-Stack / Project Management",
      github: "https://github.com/Jakkapon-Dev/Blackboard",
      liveDemo: null,
      statusBadge: "Productivity",
      statusColor: "indigo",
      techStack: ["Next.js", "TypeScript", "Prisma", "Zustand", "Tailwind CSS"],
      overviewEn: "A collaborative project-management application inspired by modern Kanban workflows (Jira / Trello), featuring structured workspaces, drag-and-drop task lifecycles, and team collaboration.",
      overviewTh: "ระบบบริหาร Project และ Task สไตล์ Kanban ยุคใหม่ มีระบบ Workspaces, Task Management และรองรับการทำงานร่วมกันในทีมอย่างเป็นระเบียบ",
      keyHighlightsEn: [
        "Interactive drag-and-drop Kanban board with optimistic UI state via Zustand",
        "Structured multi-workspace and project sprint breakdown",
        "Prisma database modeling for nested task assignments, tags, and deadlines",
        "Fluid dark-mode responsive interface crafted with Tailwind CSS"
      ],
      keyHighlightsTh: [
        "กระดาน Kanban ลากวางงานได้อย่างลื่นไหล จัดการ State ด้วย Zustand",
        "แบ่งพื้นที่การทำงานเป็น Workspaces และ Project แยกย่อยได้อิสระ",
        "จัดเก็บข้อมูล Task, สมาชิกผู้รับผิดชอบ, และกำหนดส่งด้วย Prisma ORM",
        "ดีไซน์ Dark Mode สวยงาม สบายตา ตอบสนองทุกหน้าจอ"
      ],
      architecture: {
        flow: [
          { step: "Interactive UI", tech: "Next.js + Zustand State", role: "Optimistic Task Drag & Drop UI" },
          { step: "Server API", tech: "Next.js Route Handlers", role: "Workspace Access Validation & CRUD" },
          { step: "Data Layer", tech: "Prisma ORM", role: "Nested Workspace/Board/Card Transactions" },
          { step: "Database", tech: "Relational DB", role: "Workspaces, Projects & Task Audit Logs" }
        ],
        diagramAscii: `[ Next.js + Zustand Board ] ──(Optimistic Drag/Drop)──> [ Next.js Handlers ]
                                                              │
                                                              ▼
[ Relational Database ] <──(Prisma Transaction Batch)─────────┘`
      }
    },
    {
      id: "matcha",
      number: "04",
      title: "MATCHA",
      subtitleEn: "JSD13 Final Capstone Project · Work in Progress",
      subtitleTh: "โปรเจกต์จบหลักสูตร JSD13 (Final Capstone) · กำลังพัฒนา",
      category: "Full-Stack / Team Collaboration",
      github: "https://github.com/Jakkapon-Dev/MATCHA",
      liveDemo: null,
      statusBadge: "Work in Progress",
      statusColor: "amber",
      techStack: ["React", "Node.js", "Express", "RESTful APIs", "Git Collaboration"],
      overviewEn: "The flagship final capstone project of the Generation Thailand (JSD13) cohort. Built as a collaborative full-stack application featuring cross-functional teamwork, modern API architectures, and end-to-end user workflows.",
      overviewTh: "Final Project ของหลักสูตร Junior Software Developer (JSD13) โดย Generation Thailand เป็นการทำงานร่วมกันเป็นทีมแบบ Full-Stack ที่ครอบคลุมทั้งส่วน Frontend และ Backend เพื่อส่งมอบโซลูชันที่ใช้งานได้จริง",
      keyHighlightsEn: [
        "Active team collaboration utilizing Git flow branching, pull request reviews, and agile sprints",
        "Full-stack architecture integrating responsive React UI with robust Node/Express backend",
        "RESTful API design adhering to clean controller-service architectural patterns",
        "Comprehensive case study detailing personal contributions and architectural decisions coming soon"
      ],
      keyHighlightsTh: [
        "ทำงานร่วมกันในทีมด้วย Git Flow, Pull Request Reviews และกระบวนการ Agile",
        "สถาปัตยกรรม Full-Stack เชื่อมต่อ React กับ Node.js / Express API",
        "ออกแบบ RESTful APIs ตามหลักสถาปัตยกรรมที่สะอาดและขยายได้ง่าย",
        "เตรียมเจาะลึก Case Study และการส่งมอบ Feature หลักในเร็วๆ นี้"
      ],
      architecture: {
        flow: [
          { step: "Frontend", tech: "React SPA Client", role: "Modern User Flow & State Management" },
          { step: "API Gate", tech: "Express.js REST APIs", role: "Authentication, Middleware & Controllers" },
          { step: "Service Layer", tech: "Node.js Services", role: "Business Logic & Integration" },
          { step: "Database", tech: "Database Store", role: "Application Data Models & Entities" }
        ],
        diagramAscii: `[ React Frontend Team ] ──(RESTful Endpoints)──> [ Express Gateway ]
                                                          │
                                                          ▼
[ Database Store ] <──────(Service & Controller Logic)────┘`
      }
    }
  ],

  otherProjects: [
    {
      title: "Portfolio Makeup",
      github: "https://github.com/Jakkapon-Wapakpet/Portfolio-makeup",
      categoryEn: "Frontend / UI Showcase",
      categoryTh: "การพัฒนาฝั่งหน้าบ้าน & Interactive UI",
      descEn: "Interactive UI showcase highlighting React proficiency, portfolio filtering, Lightbox viewer, Before/After image comparison, and responsive layouts.",
      descTh: "โชว์ทักษะ Frontend ด้วย React มีระบบกรองผลงาน, Lightbox ดูรูปภาพ, ลูกเล่น Before/After และดีไซน์ที่รองรับมือถืออย่างสมบูรณ์",
      tags: ["React", "CSS3", "UI/UX", "Interactive", "Lightbox"]
    },
    {
      title: "Group Projects JSD13",
      github: "https://github.com/Jakkapon-Wapakpet/group-projects-jsd13",
      categoryEn: "Collaborative / Team Project",
      categoryTh: "การทำงานร่วมกันเป็นทีม (Team Collaboration)",
      descEn: "Collaborative repositories showcasing team programming practices, code reviews, Agile sprints, and joint technical problem solving.",
      descTh: "โปรเจกต์การทำงานร่วมกับเพื่อนร่วมทีมในแคมป์ JSD13 ฝึกฝนการทำ Pair Programming, Code Review และการใช้ Git ในระดับทีม",
      tags: ["Team Project", "Git Workflow", "Scrum", "Collaboration"]
    }
  ],

  experience: [
    {
      roleEn: "Freelance Photographer & Content Operations",
      roleTh: "ช่างภาพอิสระ & บริหารจัดการคอนเทนต์",
      period: "3 Years (3 ปี)",
      type: "Transferable Professional Experience",
      summaryEn: "Managed client requirements, production schedules, digital asset delivery pipelines, and end-to-end communication across creative projects.",
      summaryTh: "บริหารจัดการงานถ่ายภาพ รับ Requirement วาง Workflow การทำงาน จัดการขั้นตอนการส่งมอบไฟล์ และแก้ปัญหาเฉพาะหน้าตามกำหนดเวลา",
      highlightsEn: [
        "Requirement Engineering: Clarifying exact client briefs and translating them into clear execution plans.",
        "Workflow Automation: Designing standardized digital asset delivery pipelines.",
        "Deadline Delivery: Managing strict timeframes and high-pressure production schedules with 100% on-time record."
      ],
      highlightsTh: [
        "การเก็บ Requirement จากลูกค้าและแปลงเป็นแผนการดำเนินงานที่ชัดเจน",
        "การวาง Workflow ส่งมอบไฟล์งานอย่างเป็นระบบและปลอดภัย",
        "การบริหารเวลาและส่งมอบงานตรงตามกำหนด 100%"
      ]
    },
    {
      roleEn: "Lawyer's Clerk / Legal Operations",
      roleTh: "เสมียนทนายความ / ดำเนินการเอกสารกฎหมาย",
      period: "3 Years (3 ปี)",
      type: "Transferable Professional Experience",
      summaryEn: "Handled contracts and legal documentation with strong attention to accuracy, structured processes, and cross-party coordination.",
      summaryTh: "จัดการเอกสารทางกฎหมายและสัญญา ตรวจสอบความถูกต้องของข้อมูล ประสานงานขั้นตอนทางกฎหมายอย่างเป็นระบบและละเอียดรอบคอบ",
      highlightsEn: [
        "Zero-Error Precision: Rigorous verification of contracts and sensitive data.",
        "Systematic Process: Operating under strict regulatory procedures and structured frameworks.",
        "Cross-Party Coordination: Clear, professional communication with stakeholders and legal entities."
      ],
      highlightsTh: [
        "ความละเอียดรอบคอบระดับเอกสารสัญญาที่มีผลทางกฎหมาย ไร้ข้อผิดพลาด",
        "การทำงานอย่างเป็นขั้นตอนและมีกระบวนการตรวจสอบที่รัดกุม",
        "การประสานงานและสื่อสารอย่างมืออาชีพกับหลายฝ่าย"
      ]
    }
  ],

  education: [
    {
      schoolEn: "Krirk University",
      schoolTh: "มหาวิทยาลัยเกริก",
      degreeEn: "Bachelor's Degree in Technology (4th Year Undergrad)",
      degreeTh: "ปริญญาตรี (กำลังศึกษาอยู่ชั้นปีที่ 4)",
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

  certification: {
    titleEn: "Generation Thailand Certification",
    titleTh: "ประกาศนียบัตร Generation Thailand",
    programEn: "Junior Software Developer (JSD13)",
    programTh: "หลักสูตร Junior Software Developer (JSD13)",
    statusEn: "Certified · Details coming soon",
    statusTh: "ผ่านการรับรองแล้ว · เตรียมอัปเดตรายละเอียดเร็วๆ นี้",
    noteEn: "Comprehensive software engineering bootcamp covering full-stack web development, Agile practices, and real-world project delivery.",
    noteTh: "หลักสูตรเข้มข้นด้านการพัฒนาเว็บแบบ Full-Stack, การทำงานแบบ Agile และการพัฒนาโปรเจกต์จริง"
  }
};
