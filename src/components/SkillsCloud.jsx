import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import SkillConstellation from './SkillConstellation';
import ScrollReveal from './ScrollReveal';
import {
  Globe,
  Server,
  Database,
  Cpu,
  Terminal
} from 'lucide-react';

export default function SkillsCloud() {
  const { t } = useLanguage();

  const bentoCategories = [
    {
      id: "frontend",
      title: "Frontend Engineering",
      titleTh: "Frontend Engineering (สถาปัตยกรรมหน้าบ้าน)",
      icon: Globe,
      color: "bg-white dark:bg-slate-800/80",
      badgeColor: "bg-draft-500/10 text-draft-400 border border-draft-500/20",
      colSpan: "lg:col-span-6",
      descTh: "เชี่ยวชาญการสร้าง Web Application ที่ตอบสนองลื่นไหล โครงสร้าง Component ยืดหยุ่น และ Type-Safe",
      descEn: "Building high-performance, accessible, and reactive user interfaces with modern frameworks",
      skills: [
        { name: "Next.js 14", level: "App Router / SSR", project: "MyStudentRoom, Blackboard" },
        { name: "React.js 18", level: "Hooks / Context", project: "OmniPOS, MATCHA" },
        { name: "TypeScript", level: "Strict Type Safety", project: "All Projects" },
        { name: "Tailwind CSS", level: "Utility-First", project: "Design Systems" },
        { name: "JavaScript ES6+", level: "Async / Modules", project: "Core Logic" },
        { name: "HTML5 / CSS3", level: "Semantic Markup", project: "Accessibility" }
      ]
    },
    {
      id: "backend",
      title: "Backend & API Systems",
      titleTh: "Backend Engineering & สถาปัตยกรรม API",
      icon: Server,
      color: "bg-white dark:bg-slate-800/80",
      badgeColor: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
      colSpan: "lg:col-span-6",
      descTh: "ออกแบบ API Gateway, ระบบยืนยันตัวตน, WebSockets แบบเรียลไทม์ และสถาปัตยกรรมแบบแยก Layer",
      descEn: "Architecting resilient RESTful APIs, real-time WebSockets, and modular service layers",
      skills: [
        { name: "Node.js", level: "Runtime Engine", project: "Microservices" },
        { name: "Express.js", level: "REST API & Routes", project: "OmniPOS, MATCHA" },
        { name: "Socket.io", level: "Real-time Event Bus", project: "OmniPOS Live KDS" },
        { name: "JWT & RBAC", level: "Auth Middleware", project: "Multi-Role Security" },
        { name: "Zod Schema", level: "Data Validation", project: "API Guard" },
        { name: "Postman", level: "API Testing & Docs", project: "API Contracts" }
      ]
    },
    {
      id: "database",
      title: "Database & ORM Management",
      titleTh: "Database & การจัดการ ORM",
      icon: Database,
      color: "bg-white dark:bg-slate-800/80",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      colSpan: "lg:col-span-4",
      descTh: "วางโครงสร้าง Relational Schema, Multi-Tenant Isolation และการทำ Transaction ปลอดภัย",
      descEn: "Relational data modeling, ACID transactions, and tenant isolation",
      skills: [
        { name: "PostgreSQL", level: "Relational RDBMS", project: "Production DB" },
        { name: "Prisma ORM", level: "Type-Safe Migrations", project: "All Flagships" },
        { name: "Multi-Tenant Schema", level: "Tenant Scoping", project: "OmniPOS" },
        { name: "pgBouncer", level: "Connection Pooling", project: "High Traffic" }
      ]
    },
    {
      id: "automation",
      title: "Cloud DevOps & Automation",
      titleTh: "Cloud DevOps & ระบบอัตโนมัติ (Automation)",
      icon: Cpu,
      color: "bg-white dark:bg-slate-800/80",
      badgeColor: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      colSpan: "lg:col-span-4",
      descTh: "เชื่อมต่อ Workflow อัตโนมัติด้วย n8n, จัดการ RESTful Webhooks และระบบแจ้งเตือน LINE Notify",
      descEn: "Building automated data pipelines with n8n, webhooks, and asynchronous push services",
      skills: [
        { name: "n8n Automation", level: "Workflow Engine", project: "Pipelines" },
        { name: "Docker & Containers", level: "Containerization", project: "Deployment" },
        { name: "REST Webhooks", level: "Event Dispatch", project: "MyStudentRoom" },
        { name: "LINE Messaging API", level: "Instant Push Alerts", project: "Parent Alerts" }
      ]
    },
    {
      id: "workflow",
      title: "Tools & Team Collaboration",
      titleTh: "Tools & การทำงานร่วมกันเป็นทีม",
      icon: Terminal,
      color: "bg-white dark:bg-slate-800/80",
      badgeColor: "bg-draft-500/10 text-draft-400 border border-draft-500/20",
      colSpan: "lg:col-span-4",
      descTh: "มีระเบียบวินัยในการใช้ Git Flow, Agile Sprints, การทำ Code Reviews และ CLI Scripting",
      descEn: "Version control discipline, sprint cycles, and command-line efficiency",
      skills: [
        { name: "Git & GitHub", level: "Branching & PRs", project: "Team Workflow" },
        { name: "Agile / Scrum", level: "Sprint Delivery", project: "JSD13 Bootcamp" },
        { name: "Linux / PowerShell", level: "CLI Scripting", project: "Dev Environment" },
        { name: "Figma to Code", level: "UI Implementation", project: "Pixel Perfection" }
      ]
    }
  ];

  return (
    // The one deliberate dark band on the page — fixed regardless of the
    // site's light/dark toggle, so the light -> dark -> light rhythm holds
    // either way. Blueprint pass: this band is now literally the cyanotype
    // itself (blueprint-950 ink), rather than a neutral graphite — the one
    // section that always reads as "the blueprint," toggle or not.
    <section id="skills" className="relative w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 bg-blueprint-950 text-blueprint-100 transition-colors duration-200 text-left">
      <div className="hidden lg:block absolute top-6 right-8 text-[10px] font-mono-code uppercase tracking-widest text-blueprint-500/60">
        {t('Sheet 03 / 06', 'แผ่นที่ 03 / 06')}
      </div>
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Heading — no eyebrow pill; the pill is reserved for Projects only */}
        <ScrollReveal direction="up">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-blueprint-50">
              {t('Skills & Engineering Arsenal', 'ทักษะและความเชี่ยวชาญทางวิศวกรรม')}
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-blueprint-400 max-w-2xl mx-auto">
              {t(
                'Structured tech stack matrix categorized by engineering domains and real project usage.',
                'จัดหมวดหมู่ทักษะอย่างเป็นระบบ พร้อมบทบาทและตัวอย่างโปรเจกต์ที่นำไปใช้งานจริง'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* REFINED BENTO GRID (CLEAN & SUBTLE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.id} delay={catIdx * 0.06} distance={20} className={cat.colSpan}>
              <div
                className="bg-blueprint-900 p-6 sm:p-8 rounded-[10px] border border-blueprint-500/15 flex flex-col justify-between space-y-6 hover:border-draft-500/40 transition-all"
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-blueprint-500/15">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-[4px] ${cat.badgeColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-blueprint-50">
                          {t(cat.title, cat.titleTh)}
                        </h3>
                        <span className="text-[11px] font-mono-code text-blueprint-400">
                          {cat.skills.length} Core Technologies
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-blueprint-200 mt-4 leading-relaxed font-normal">
                    {t(cat.descEn, cat.descTh)}
                  </p>
                </div>

                {/* Skills List — flat rows separated by a divider, not nested boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 pt-2 divide-y divide-blueprint-500/15 sm:divide-y-0">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="py-2.5 sm:border-b sm:border-blueprint-500/15 flex flex-col justify-between group cursor-default"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-code font-bold text-xs text-blueprint-100 group-hover:text-draft-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono-code text-blueprint-400">
                          {skill.level}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono-code text-blueprint-500 mt-1 truncate">
                        Used in: {skill.project}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* INTERACTIVE SKILL CONSTELLATION MAP */}
        <ScrollReveal delay={0.1}>
          <SkillConstellation />
        </ScrollReveal>

      </div>
    </section>
  );
}
