import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { 
  ExternalLink, 
  Layers, 
  Network, 
  Code2, 
  CheckCircle2, 
  Terminal, 
  ArrowRight,
  Database,
  Server,
  Monitor,
  GitBranch,
  Flame,
  Clock
} from 'lucide-react';

export default function ProjectInspector() {
  const { lang, t } = useLanguage();
  const { featuredProjects } = portfolioData;
  const [selectedId, setSelectedId] = useState(featuredProjects[0].id);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'architecture' | 'stack'

  const currentProject = featuredProjects.find((p) => p.id === selectedId) || featuredProjects[0];

  const getStatusBadgeStyle = (statusBadge) => {
    switch (statusBadge) {
      case 'Real-Time System':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60';
      case 'Work in Progress':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'Productivity':
        return 'bg-indigo-950/80 text-indigo-400 border-indigo-800/60';
      default:
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
    }
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-850">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono-code mb-2.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t('Case Deck & Architecture', 'ผลงานเด่น & สถาปัตยกรรมระบบ')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {t('Interactive Project Inspector', 'เจาะลึกระบบโปรเจกต์ (Project Inspector)')}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              {t(
                'Explore the real-world engineering, full-stack architectures, and data flows behind my flagship projects.',
                'เลือกดูรายละเอียด เชิงลึก สถาปัตยกรรมระบบ และ Flow การทำงานจริงของแต่ละโปรเจกต์'
              )}
            </p>
          </div>

          <div className="text-xs font-mono-code text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>4 Flagship Deployments</span>
          </div>
        </div>

        {/* The Interactive Case Deck Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Project Selector List (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider px-1">
              {t('Select Case Study', 'เลือกโปรเจกต์ที่ต้องการเจาะลึก')}
            </div>

            {featuredProjects.map((project) => {
              const isSelected = project.id === selectedId;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    setSelectedId(project.id);
                  }}
                  className={`group relative text-left p-4 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-slate-900/90 border-emerald-500/60 shadow-xl shadow-black/50 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-l-xl" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-mono-code font-semibold ${
                      isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      CASE #{project.number}
                    </span>
                    
                    <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${getStatusBadgeStyle(project.statusBadge)}`}>
                      {project.statusBadge}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {t(project.subtitleEn, project.subtitleTh)}
                  </p>

                  {/* Micro Stack Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-750"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-500">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Inspector Deck (8 cols on lg) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl glass-panel border border-slate-800/90 shadow-2xl overflow-hidden">
              
              {/* Window Frame Header */}
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                
                {/* Traffic Lights + File Path */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-600 font-mono-code text-xs ml-2">/inspector/</span>
                  <span className="text-xs font-mono-code text-slate-300 font-semibold">
                    {currentProject.title.toLowerCase()}.spec.ts
                  </span>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2">
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono-code text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-all group"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Source Code</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Inspector Content Area */}
              <div className="p-6">
                
                {/* Title & Metadata Banner */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono-code text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      {currentProject.category}
                    </span>
                    {currentProject.id === 'matcha' && (
                      <span className="text-xs font-mono-code text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Generation JSD13 Capstone
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-sm font-medium text-emerald-400/90 mt-1">
                    {t(currentProject.subtitleEn, currentProject.subtitleTh)}
                  </p>
                </div>

                {/* Interactive View Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'overview'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t('Overview & Features', 'ภาพรวม & ฟีเจอร์')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'architecture'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5" />
                    <span>{t('System Architecture Flow', 'สถาปัตยกรรม Flow ระบบ')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTab === 'stack'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t('Tech Matrix & Tools', 'เครื่องมือ & เทคโนโลยี')}</span>
                  </button>
                </div>

                {/* TAB 1: OVERVIEW & FEATURES */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-2">
                        {t('Problem Solved & Platform Scope', 'โจทย์และขอบเขตของระบบ')}
                      </h4>
                      <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                        {t(currentProject.overviewEn, currentProject.overviewTh)}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-3">
                        {t('Key Technical Highlights', 'จุดเด่นทางเทคนิค')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(lang === 'th' ? currentProject.keyHighlightsTh : currentProject.keyHighlightsEn).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: SYSTEM ARCHITECTURE FLOW */}
                {activeTab === 'architecture' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-3">
                        {t('End-to-End Data Pipeline', 'ขั้นตอนการไหลของข้อมูลในระบบ')}
                      </h4>

                      {/* Architecture Step Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentProject.architecture.flow.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 relative"
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-mono-code text-emerald-400 font-semibold">
                                STEP {idx + 1}: {step.step}
                              </span>
                            </div>
                            <div className="font-mono-code text-xs text-white font-medium mb-1">
                              {step.tech}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">
                              {step.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ASCII Flow Chart Terminal Preview */}
                    <div>
                      <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t('Architecture Diagram Trace', 'แผนภาพ Flow การเชื่อมต่อ')}</span>
                      </h4>
                      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono-code text-emerald-300/90 overflow-x-auto leading-snug">
                        {currentProject.architecture.diagramAscii}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 3: TECH STACK MATRIX */}
                {activeTab === 'stack' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-3">
                        {t('Component Technologies', 'เทคโนโลยีที่เลือกใช้')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.techStack.map((tech) => (
                          <div
                            key={tech}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono-code text-slate-200 flex items-center gap-2 shadow-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 space-y-2">
                      <div className="font-semibold text-white">
                        {t('Why this stack?', 'ทำไมจึงเลือกใช้ Stack ชุดนี้?')}
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        {currentProject.id === 'omnipos' &&
                          t(
                            'Socket.io provides bidirectional sub-millisecond event broadcasting essential for live kitchen ordering, while Prisma with PostgreSQL handles relational order transactions with high schema confidence.',
                            'Socket.io ให้ความเร็วระดับเสี้ยววินาทีในการส่งข้อมูลออร์เดอร์ระหว่างแคชเชียร์และครัว ส่วน Prisma และ PostgreSQL ดูแลความถูกต้องของธุรกรรมการขายแบบ Multi-tenant ได้อย่างแม่นยำ'
                          )}
                        {currentProject.id === 'mystudentroom' &&
                          t(
                            'Next.js 14 App Router gives server-rendered performance for school portals, combined with TypeScript and Prisma to prevent data mutations across multi-role accounts.',
                            'Next.js 14 มอบความเร็วในการเรนเดอร์หน้าเว็บสำหรับครูและผู้ปกครอง ผสาน TypeScript และ Prisma เพื่อการจัดการสิทธิ์และข้อมูลที่ปลอดภัย'
                          )}
                        {currentProject.id === 'blackboard' &&
                          t(
                            'Zustand enables lightweight, frictionless optimistic updates during drag-and-drop actions on the Kanban board without heavyweight boilerplate overhead.',
                            'Zustand ช่วยจัดการ Global State สำหรับการลากวาง Task แบบทันที (Optimistic Updates) โดยไม่ทำให้ระบบหนักและซับซ้อนเกินจำเป็น'
                          )}
                        {currentProject.id === 'matcha' &&
                          t(
                            'Built with modern React and Node.js REST API standard patterns within an Agile team structure, prioritizing clean code reviews and modular service architectures.',
                            'พัฒนาด้วย React และ Node.js REST API ตามมาตรฐานสากล ภายใต้กระบวนการทำงานแบบ Agile และการทำ Code Review ภายในทีม'
                          )}
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
