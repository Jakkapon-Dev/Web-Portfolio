// Comprehensive Project Pitch & Explanation Data (Elevator Pitch, STAR Method, Key Talking Points)

export const projectPitchData = {
  mystudentroom: {
    title: "MyStudentRoom",
    subtitle: "Smart Attendance & Parent Tracking Platform",
    category: "Full-Stack / School OS",
    
    // 1. Project Overview & Story
    pitchScriptTh: "MyStudentRoom คือระบบบริหารจัดการโรงเรียนและบันทึกเวลาเข้าเรียนแบบครบวงจรที่ผมพัฒนาขึ้นด้วย Next.js 14, TypeScript และ Prisma ORM ครับ โดยมีจุดเด่นคือการเชื่อมต่อ Web Gate Scanner Portal หน้าประตูโรงเรียน เข้ากับระบบแจ้งเตือนผู้ปกครองผ่าน LINE Notify ทันทีในเวลาเพียง 68ms ช่วยลดงานเอกสารซ้ำซ้อนของคุณครู และทำให้ผู้ปกครองมั่นใจในความปลอดภัยของบุตรหลานแบบเรียลไทม์ครับ",
    pitchScriptEn: "MyStudentRoom is a comprehensive school operations and attendance tracking platform built with Next.js 14, TypeScript, and Prisma ORM. It connects the Web Gate Scanner Portal directly to parent smartphones via LINE Notify in under 68ms—eliminating paper attendance bottlenecks and giving guardians real-time peace of mind.",

    // 2. STAR Method Breakdown
    star: {
      situation: {
        titleTh: "Situation (ปัญหาเดิมหน้างาน):",
        titleEn: "Situation (Context & Problem):",
        descTh: "โรงเรียนยังใช้การเช็กชื่อด้วยกระดาษและสมุดประจำห้อง ทำให้คุณครูเสียเวลาสรุปข้อมูลตอนเช้า และผู้ปกครองไม่สามารถทราบได้ทันทีว่าบุตรหลานเดินทางถึงโรงเรียนอย่างปลอดภัยหรือไม่",
        descEn: "Traditional paper roll-call created morning administrative bottlenecks for teachers, while parents had zero visibility into whether their children arrived safely at school."
      },
      task: {
        titleTh: "Task (โจทย์และเป้าหมาย):",
        titleEn: "Task (Objective):",
        descTh: "พัฒนาระบบเช็กชื่ออัตโนมัติที่รองรับทั้งเครื่องสแกนหน้าประตู และฟอร์มเช็กชื่อของคุณครูบนเว็บ โดยต้องมีระบบสิทธิ์ (RBAC) แยกชัดเจน และส่งข้อมูลเตือนผู้ปกครองได้แบบเรียลไทม์",
        descEn: "Engineer an automated attendance platform supporting Gate Ingestion portals and teacher web apps, with strict RBAC access and sub-100ms parent notification pipelines."
      },
      action: {
        titleTh: "Action (สิ่งที่เราลงมือทำ):",
        titleEn: "Action (Execution & Tech):",
        descTh: "ใช้ Next.js 14 App Router วางโครงสร้างระบบ, ใช้ Next.js Server Actions เชื่อมต่อกับ Prisma ORM และ PostgreSQL เพื่อเปิด ACID Transaction บันทึกข้อมูลอย่างแม่นยำ พร้อมต่อ LINE Messaging API ยิงแจ้งเตือนแบบ Asynchronous Background Dispatch",
        descEn: "Architected with Next.js 14 App Router, implemented Type-Safe Server Actions with Prisma ORM on PostgreSQL, and integrated asynchronous LINE Messaging API webhooks."
      },
      result: {
        titleTh: "Result (ผลลัพธ์ที่ได้):",
        titleEn: "Result (Measurable Impact):",
        descTh: "ส่งข้อมูลแจ้งเตือนถึงผู้ปกครองได้เร็วใน 68ms, ลดภาระงานสรุปเอกสารเช็กชื่อของครูลง 80%, และป้องกันปัญหาข้อมูลสูญหายด้วยระบบ Type-Safe Schema 100%",
        descEn: "Achieved 68ms end-to-end notification delivery, reduced teacher morning paperwork by 80%, and ensured 100% type-safe relational data consistency."
      }
    },

    // 3. Key Technical Talking Points
    talkingPoints: [
      {
        topic: "1. Type-Safe End-to-End Architecture",
        descTh: "ใช้ TypeScript ร่วมกับ Prisma ORM และ Zod ทำให้ทั้งระบบไม่มีปัญหา Type Mismatch ตั้งแต่หน้าเว็บไปจนถึงตารางใน PostgreSQL",
        descEn: "Unified TypeScript with Prisma ORM and Zod schemas guarantees zero type mismatch from frontend forms to database tables."
      },
      {
        topic: "2. Role-Based Access Control (RBAC)",
        descTh: "ออกแบบ Middleware แยกสิทธิ์ชัดเจนระหว่าง คุณครู (บันทึกข้อมูล), ผู้ปกครอง (ดูเฉพาะประวัติบุตรหลานตัวเอง), และแอดมิน (จัดการระบบ)",
        descEn: "Strict edge middleware security enforcing distinct view scopes for Teachers, Parents, and Administrators."
      },
      {
        topic: "3. Asynchronous Non-Blocking Notifications",
        descTh: "การยิงแจ้งเตือน LINE ทำงานแบบ Non-blocking ใน Background ทำให้การบันทึกฐานข้อมูลรวดเร็ว ไม่ค้างหน่วงแม้ผู้ให้บริการภายนอกจะตอบสนองช้า",
        descEn: "Asynchronous webhook dispatcher prevents third-party API latency from blocking core database transaction commits."
      }
    ]
  },

  omnipos: {
    title: "OmniPOS",
    subtitle: "Multi-Tenant Restaurant POS & Real-Time Kitchen Sync",
    category: "Full-Stack / Real-Time Systems",
    
    pitchScriptTh: "OmniPOS คือแพลตฟอร์มบริหารจัดการร้านอาหารแบบ Multi-Tenant ที่ผมพัฒนาขึ้นด้วย React, Node.js, Express, Socket.io และ Prisma ครับ โดยเน้นแก้ปัญหาความล่าช้าระหว่างหน้าร้านกับห้องครัว ด้วยการส่งผ่านออร์เดอร์จากโต๊ะอาหารหรือหน้าจอแคชเชียร์ ตรงเข้าจอครัว KDS ภายในเวลาต่ำกว่า 38ms พร้อมสถาปัตยกรรมแยกฐานข้อมูลแต่ละสาขาอย่างปลอดภัยครับ",
    pitchScriptEn: "OmniPOS is a multi-tenant restaurant POS and kitchen management system built with React, Node.js, Express, Socket.io, and Prisma. It bridges cashiers and kitchen staff by streaming orders directly to Kitchen Display screens in under 38ms, backed by branch-isolated database schemas.",

    star: {
      situation: {
        titleTh: "Situation (ปัญหาเดิมหน้างาน):",
        titleEn: "Situation (Context & Problem):",
        descTh: "ร้านอาหารและสาขาแฟรนไชส์ประสบปัญหาใบสั่งอาหารในครัวหล่นหาย สื่อสารล่าช้า และข้อมูลยอดขายของแต่ละสาขาเสี่ยงต่อการรั่วไหลหากจัดการฐานข้อมูลไม่ดี",
        descEn: "Multi-branch restaurant franchises suffered from lost paper kitchen slips, delayed order prep communication, and security risks of cross-tenant data leakage."
      },
      task: {
        titleTh: "Task (โจทย์และเป้าหมาย):",
        titleEn: "Task (Objective):",
        descTh: "สร้างระบบ POS หน้าร้านและจอในครัว (KDS) ที่สื่อสารกันแบบ Real-time ความเร็วระดับต่ำกว่า 50ms และวางสถาปัตยกรรม Multi-Tenant ที่แยกข้อมูลสาขาออกจากกันอย่างเด็ดขาด",
        descEn: "Build a sub-50ms real-time POS and Kitchen Display System with strict multi-tenant schema isolation preventing cross-store data bleed."
      },
      action: {
        titleTh: "Action (สิ่งที่เราลงมือทำ):",
        titleEn: "Action (Execution & Tech):",
        descTh: "ใช้ Socket.io วางระบบ Room-based Scoping แยกห้องตามสาขา, ใช้ Node.js Express ทำ Controller-Service Layer ตรวจสอบสต็อกวัตถุดิบ และใช้ Prisma บันทึกออร์เดอร์ลง Schema ของแต่ละร้านค้า",
        descEn: "Implemented Socket.io branch-isolated rooms, structured a decoupled Node.js service layer with inventory checks, and mapped Prisma multi-tenant database schemas."
      },
      result: {
        titleTh: "Result (ผลลัพธ์ที่ได้):",
        titleEn: "Result (Measurable Impact):",
        descTh: "ออร์เดอร์วิ่งเข้าจอครัวในเวลา 38ms, ลดปัญหาการสั่งอาหารผิดพลาดได้ 100%, และรองรับการคิดเงินได้อย่างลื่นไหลแม้ในช่วงเวลาคนแน่นร้าน (Peak Hours)",
        descEn: "Delivered sub-38ms live kitchen updates, achieved 100% order accuracy, and maintained zero-lag cashier checkout under heavy lunch rush traffic."
      }
    },

    talkingPoints: [
      {
        topic: "1. Sub-50ms WebSocket Event Pipeline",
        descTh: "ใช้ Socket.io สตรีมข้อมูลเข้าจอครัวแบบ Bi-directional ลด Overhead จากการทำ HTTP Polling ลง 80% และตอบสนองเร็วกว่าเดิมมาก",
        descEn: "Bi-directional WebSocket streaming reduces server load by 80% compared to traditional HTTP polling."
      },
      {
        topic: "2. Multi-Tenant Branch Data Isolation",
        descTh: "แยกข้อมูลเมนู ยอดขาย และพนักงานตาม Schema ของสาขาอย่างปลอดภัย ป้องกันปัญหาข้อมูลข้ามร้านปะปนกัน",
        descEn: "Branch-scoped database schemas enforce strict data privacy and isolation across franchise locations."
      },
      {
        topic: "3. Optimistic UI & Local State",
        descTh: "หน้าจอแคชเชียร์และจอในครัวอัปเดตสถานะการทำงานทันที (0ms) โดยเก็บ Snapshot สำรองไว้กรณีเกิดข้อผิดพลาดในการเชื่อมต่อ",
        descEn: "Optimistic local UI state delivers snappy 0ms interactions with automatic rollback snapshots on network faults."
      }
    ]
  },

  blackboard: {
    title: "Blackboard",
    subtitle: "Collaborative Project Management & Sprint Tracker",
    category: "Full-Stack / Collaborative Workspaces",
    
    pitchScriptTh: "Blackboard คือระบบบริหารจัดการโปรเจกต์และติดตามงานแบบ Kanban สำหรับทีม พัฒนาด้วย Next.js, Zustand และ Prisma ครับ มีจุดเด่นคือการลากวางการ์ดงานที่ตอบสนองทันที 0ms แบบ Optimistic UI ลื่นไหล 60fps และใช้อัลกอริทึม Fractional Indexing ช่วยให้อัปเดตตำแหน่งการ์ดได้โดยไม่ต้องล็อกฐานข้อมูลทั้งคอลัมน์ครับ",
    pitchScriptEn: "Blackboard is a collaborative team project management and Kanban platform built with Next.js, Zustand, and Prisma. It delivers 60fps drag-and-drop interactions with 0ms optimistic UI rendering and leverages fractional indexing to reorder tasks without locking entire database columns.",

    star: {
      situation: {
        titleTh: "Situation (ปัญหาเดิมหน้างาน):",
        titleEn: "Situation (Context & Problem):",
        descTh: "เครื่องมือจัดการงานทั่วไปมักเจอปัญหาหน้าจอค้างกระตุกเวลาลากการ์ดงานเร็วๆ และมีความเสี่ยงที่ข้อมูลลำดับการ์ดจะชนกันเมื่อทีมงานแก้ไขพร้อมกันหลายคน",
        descEn: "Standard task management tools suffered from UI lag during rapid card dragging and risked race condition conflicts during concurrent multi-user sprint edits."
      },
      task: {
        titleTh: "Task (โจทย์และเป้าหมาย):",
        titleEn: "Task (Objective):",
        descTh: "พัฒนาระบบกระดาน Kanban ที่ลากวางงานได้ลื่นไหลระดับ 60fps พร้อมระบบจัดการความสอดคล้องของข้อมูลแบบ Atomic และมีประวัติบันทึกการทำงานของทีม (Activity Log)",
        descEn: "Develop a 60fps smooth drag-and-drop Kanban board with atomic transaction consistency and a detailed sprint activity audit trail."
      },
      action: {
        titleTh: "Action (สิ่งที่เราลงมือทำ):",
        titleEn: "Action (Execution & Tech):",
        descTh: "ใช้ Zustand จัดการ Local State แบบ Optimistic 0ms, นำอัลกอริทึม Fractional Indexing มาคำนวณลำดับการ์ด, และใช้ Prisma Batch Transaction บันทึกข้อมูลการย้ายการ์ดพร้อมสร้าง Audit Log ในคราวเดียว",
        descEn: "Engineered Zustand optimistic state mutators for 0ms visual transitions, utilized fractional indexing for single-row updates, and executed Prisma atomic batch transactions."
      },
      result: {
        titleTh: "Result (ผลลัพธ์ที่ได้):",
        titleEn: "Result (Measurable Impact):",
        descTh: "การ์ดตอบสนองทันที 0ms ไร้รอยต่อ, ลดการเขียนฐานข้อมูลจาก 50 แถวเหลือเพียง 1 แถวต่อการย้ายการ์ด, และบันทึกประวัติการทำงานของทีมได้ครบถ้วน 100%",
        descEn: "Zero-lag 60fps drag experience, reduced database writes per move from 50 rows to just 1 single row, and maintained a 100% complete team audit history."
      }
    },

    talkingPoints: [
      {
        topic: "1. 0ms Optimistic UI Rendering",
        descTh: "หน้าจอตอบสนองการลากวางทันทีโดยไม่ต้องรอ Roundtrip ของเซิร์ฟเวอร์ พร้อมระบบกู้คืนตำแหน่งเดิมอัตโนมัติหากการเชื่อมต่อมีปัญหา",
        descEn: "Instant UI feedback without awaiting network roundtrips, backed by in-memory rollback snapshots on failure."
      },
      {
        topic: "2. Fractional Indexing Optimization",
        descTh: "ใช้วิธีคำนวณค่าเฉลี่ยตำแหน่ง (Rank = (A+B)/2) ทำให้การสลับตำแหน่งการ์ดอัปเดตเพียงแถวเดียว ประหยัดการทำงานของฐานข้อมูลมหาศาล",
        descEn: "Fractional indexing calculates midpoint ranks, converting costly column rewrites into single-row updates."
      },
      {
        topic: "3. Atomic Multi-Table Audit Logs",
        descTh: "ใช้ Prisma Transaction บันทึกการย้ายการ์ดและการบันทึกประวัติทีมไปพร้อมกัน ป้องกันปัญหาข้อมูลการ์ดย้ายแต่ประวัติไม่บันทึก",
        descEn: "Atomic batch queries ensure task state transitions and activity feed entries are committed simultaneously."
      }
    ]
  },

  matcha: {
    title: "MATCHA",
    subtitle: "Generation Thailand (JSD13) Multi-Role Recruitment Portal",
    category: "Full-Stack / Team Capstone",
    
    pitchScriptTh: "MATCHA คือเว็บแอปพลิเคชันตลาดแรงงานและรับสมัครงานแบบ Multi-Role ที่พัฒนาเป็นโปรเจกต์จบ (Final Capstone) ในแคมป์ Generation Thailand (JSD13) ครับ พัฒนาด้วย React, Node.js, Express และ PostgreSQL มีจุดเด่นคือการแยก Role การทำงานระหว่างผู้สมัครและฝ่ายบุคคลชัดเจน พร้อมระบบสแกนตรวจสอบความปลอดภัยของไฟล์เรซูเม่ด้วย Multer ครับ",
    pitchScriptEn: "MATCHA is a multi-role recruitment and job application platform developed as the final capstone project at Generation Thailand (JSD13 Bootcamp) using React, Node.js, Express, and PostgreSQL. It features strict role-based workflows for candidates and HR recruiters alongside secure PDF resume processing.",

    star: {
      situation: {
        titleTh: "Situation (ปัญหาเดิมหน้างาน):",
        titleEn: "Situation (Context & Problem):",
        descTh: "การสมัครงานและการคัดกรองผู้สมัครมักเจอปัญหาไฟล์เรซูเม่ขนาดใหญ่ การจัดการสถานะผู้สมัครที่ไม่เป็นระบบ และความเสี่ยงด้านความปลอดภัยของไฟล์ที่อัปโหลดเข้าสู่เซิร์ฟเวอร์",
        descEn: "Recruitment processes suffered from unorganized candidate tracking, oversized resume files, and server vulnerabilities from untrusted user file uploads."
      },
      task: {
        titleTh: "Task (โจทย์และเป้าหมาย):",
        titleEn: "Task (Objective):",
        descTh: "พัฒนาแพลตฟอร์มจัดหางานที่แยกหน้าจอตามสิทธิ์ (Candidate vs Recruiter) มีระบบคำนวณ Match Score ตามทักษะ และมีระบบตรวจสอบความปลอดภัยของไฟล์เรซูเม่ก่อนจัดเก็บ",
        descEn: "Develop a job board featuring multi-role portals, skill-matching algorithms, and rigorous file sanitization pipelines before cloud storage."
      },
      action: {
        titleTh: "Action (สิ่งที่เราลงมือทำ):",
        titleEn: "Action (Execution & Tech):",
        descTh: "ร่วมกับทีมในแคมป์ JSD13 ใช้กระบวนการ Agile และ Git Flow, ออกแบบสถาปัตยกรรม Controller-Service Layer บน Express.js, ใช้ Multer ตรวจสอบ MIME type และจัดเก็บไฟล์เรซูเม่บน Cloud Storage",
        descEn: "Collaborated using Agile/Scrum and Git flow, architected layered Express.js services, configured Multer memory buffers with PDF validation, and stored files in cloud buckets."
      },
      result: {
        titleTh: "Result (ผลลัพธ์ที่ได้):",
        titleEn: "Result (Measurable Impact):",
        descTh: "สกัดกั้นไฟล์แปลกปลอมได้ 100%, แยกขั้นตอนการทำงานของผู้สมัครและ HR ได้อย่างเป็นระบบ, และผ่านการทดสอบส่งมอบโปรเจกต์จบหลักสูตร JSD13 สำเร็จตามกำหนด",
        descEn: "100% quarantine of invalid files, streamlined candidate review pipelines for HR, and successful on-time delivery of the JSD13 Final Capstone."
      }
    },

    talkingPoints: [
      {
        topic: "1. Controller-Service Architecture",
        descTh: "แยก Business Logic ออกจาก Controller อย่างชัดเจน ทำให้ง่ายต่อการเขียน Unit Test และสามารถพัฒนาต่อยอดฟังก์ชันใหม่ๆ ได้อย่างรวดเร็ว",
        descEn: "Decoupled service layers keep business logic isolated and easily testable with high code coverage."
      },
      {
        topic: "2. Secure Multipart File Upload Pipeline",
        descTh: "ตรวจสอบไฟล์ด้วย Multer Memory Stream จำกัดขนาดไม่เกิน 5MB และตรวจสอบ Magic Bytes เพื่อให้มั่นใจว่าเป็นไฟล์ PDF ที่ปลอดภัย",
        descEn: "Multer stream validation inspects file MIME types and size limits before streaming to cloud storage buckets."
      },
      {
        topic: "3. Team Git Discipline & Code Reviews",
        descTh: "ฝึกฝนการทำงานร่วมกับทีมด้วย Branching Strategy, Pull Request Reviews และการทำ Daily Standup ตามแนวทาง Agile Software Engineering",
        descEn: "Practiced disciplined Git Flow pull request reviews, pair programming, and Agile sprint planning."
      }
    ]
  }
};
