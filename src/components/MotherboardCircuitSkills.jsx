import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Cpu, 
  Zap, 
  Globe, 
  Server, 
  Database, 
  Cloud, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MotherboardCircuitSkills() {
  const { lang, t } = useLanguage();
  const { theme } = useTheme();
  
  const [activeBranch, setActiveBranch] = useState('all'); // 'all' | 'frontend' | 'backend' | 'database' | 'devops'
  const [isOverclocked, setIsOverclocked] = useState(false);

  // 4 Core Architecture Branches
  const branches = {
    frontend: {
      id: 'frontend',
      title: 'Frontend Architecture',
      titleTh: 'โครงสร้างฝั่งหน้าบ้าน (Frontend Core)',
      icon: Globe,
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.5)',
      voltage: '3.3V High-Speed',
      throughput: '60 FPS SSR Render',
      chips: [
        { name: 'Next.js 14', level: 'App Router / SSR', role: 'Server-Side Rendering & Hydration' },
        { name: 'React 18', level: 'Hooks / Concurrent', role: 'Reactive Component State' },
        { name: 'TypeScript', level: 'Strict Type-Safe', role: 'Compile-Time Zero Type Errors' },
        { name: 'Tailwind CSS', level: 'Utility-First', role: 'Modular Design Tokens' }
      ]
    },
    backend: {
      id: 'backend',
      title: 'Backend & API Engine',
      titleTh: 'เครื่องยนต์หลังบ้าน (Backend & APIs)',
      icon: Server,
      color: '#4ADE80',
      glow: 'rgba(74, 222, 128, 0.5)',
      voltage: '5.0V Low-Latency',
      throughput: '<40ms REST & Socket',
      chips: [
        { name: 'Node.js', level: 'Async Runtime', role: 'Non-Blocking Event Loop' },
        { name: 'Express.js', level: 'Modular Router', role: 'Middleware & Controller Pipeline' },
        { name: 'Socket.io', level: 'Bidirectional Bus', role: 'Real-time WebSocket Push' },
        { name: 'Zod Validator', level: 'Schema Guard', role: 'Payload Sanitization & RBAC' }
      ]
    },
    database: {
      id: 'database',
      title: 'Database & Caching Layer',
      titleTh: 'ฐานข้อมูล & แคช (Database & Cache)',
      icon: Database,
      color: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.5)',
      voltage: '12V High-Throughput',
      throughput: 'ACID Relational Lock',
      chips: [
        { name: 'PostgreSQL', level: 'Relational RDBMS', role: 'Transactional Multi-Tenant Store' },
        { name: 'Prisma ORM', level: 'Type-Safe Client', role: 'Automated Migration & Indexing' },
        { name: 'Redis', level: 'In-Memory Cache', role: 'FIFO Queue & Lock Manager' },
        { name: 'pgBouncer', level: 'Connection Pool', role: 'Overload Traffic Protection' }
      ]
    },
    devops: {
      id: 'devops',
      title: 'Cloud, DevOps & Automation',
      titleTh: 'คลาวด์ & ออโตเมชัน (DevOps & Tools)',
      icon: Cloud,
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.5)',
      voltage: '3.3V Logic Bus',
      throughput: 'Automated CI/CD',
      chips: [
        { name: 'Docker', level: 'Containerization', role: 'Isolated Microservices Packaging' },
        { name: 'Git & GitHub', level: 'Branching / PRs', role: 'Agile Code Review Workflows' },
        { name: 'n8n Workflow', level: 'Event Pipelines', role: 'LINE / Email Dispatch Triggers' },
        { name: 'Jest / Tests', level: 'Unit & Contract', role: 'Regression Protection' }
      ]
    }
  };

  const currentData = activeBranch === 'all' ? null : branches[activeBranch];

  return (
    <div className="w-full my-12 rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-left relative overflow-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* Circuit Board Substrate Ambient Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F59E0B 1px, transparent 1px), radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Header & Interactive Overclock Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 relative z-10">
        
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Cpu className="w-5 h-5 animate-pulse" />
            </span>
            <h3 className="font-extrabold text-lg sm:text-2xl text-slate-900 dark:text-white tracking-tight">
              {t('Motherboard Circuit Blueprint', 'แผงวงจรพิมพ์เขียววิศวกรรม (Motherboard Blueprint)')}
            </h3>
          </div>
          <p className="text-xs font-mono-code text-slate-500 dark:text-slate-400 mt-1">
            {t(
              'Interactive full-stack architecture circuit. Click branches to trace data current and voltage specs.',
              'คลิกเลือกแผงวงจรเพื่อติดตามกระแสสัญญาณและข้อมูลสเปกวิศวกรรมที่เชื่อมต่อกันแบบเรียลไทม์'
            )}
          </p>
        </div>

        {/* Branch Filters & Overclock Switch */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveBranch('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all ${
              activeBranch === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500'
            }`}
          >
            {t('⚡ All Circuits', '⚡ วงจรทั้งหมด')}
          </button>
          <button
            onClick={() => setActiveBranch('frontend')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all ${
              activeBranch === 'frontend'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-400'
            }`}
          >
            {t('🌐 Frontend', '🌐 หน้าบ้าน')}
          </button>
          <button
            onClick={() => setActiveBranch('backend')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all ${
              activeBranch === 'backend'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-400'
            }`}
          >
            {t('⚙️ Backend', '⚙️ หลังบ้าน')}
          </button>
          <button
            onClick={() => setActiveBranch('database')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all ${
              activeBranch === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-400'
            }`}
          >
            {t('🗄️ Database', '🗄️ ฐานข้อมูล')}
          </button>
          <button
            onClick={() => setActiveBranch('devops')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold transition-all ${
              activeBranch === 'devops'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-400'
            }`}
          >
            {t('☁️ Cloud & DevOps', '☁️ คลาวด์ & ออโตเมชัน')}
          </button>

          {/* Overclock Toggle */}
          <button
            onClick={() => setIsOverclocked(!isOverclocked)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code font-bold border transition-all flex items-center gap-1.5 ${
              isOverclocked
                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="Overclock Signal Frequency"
          >
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>{isOverclocked ? t('🔥 Overclocked 2.5x', '🔥 โอเวอร์คล็อก 2.5x') : t('⚡ Normal Clock', '⚡ ความเร็วปกติ')}</span>
          </button>
        </div>

      </div>

      {/* Main Interactive Circuit Board Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Left Column: Circuit Canvas / Interactive Visual Motherboard (7 Cols) */}
        <div className="lg:col-span-7 relative h-[440px] sm:h-[480px] rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-inner overflow-hidden flex items-center justify-center select-none">
          
          {/* Subtle PCB Grid Lines */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* SVG Animated Neon Circuit Traces */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              {/* Cyan Glow Filter */}
              <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Trace 1: Top-Left (Frontend) */}
            <path
              d="M 50% 50% L 35% 50% L 20% 25% L 15% 25%"
              fill="none"
              stroke={activeBranch === 'all' || activeBranch === 'frontend' ? '#38BDF8' : '#1E293B'}
              strokeWidth={activeBranch === 'frontend' ? '3' : '2'}
              strokeDasharray="6, 4"
            />
            {(activeBranch === 'all' || activeBranch === 'frontend') && (
              <circle r="4" fill="#38BDF8" filter="url(#circuitGlow)">
                <animateMotion
                  path="M 50% 50% L 35% 50% L 20% 25% L 15% 25%"
                  dur={isOverclocked ? "0.8s" : "2s"}
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Trace 2: Top-Right (Backend) */}
            <path
              d="M 50% 50% L 65% 50% L 80% 25% L 85% 25%"
              fill="none"
              stroke={activeBranch === 'all' || activeBranch === 'backend' ? '#4ADE80' : '#1E293B'}
              strokeWidth={activeBranch === 'backend' ? '3' : '2'}
              strokeDasharray="6, 4"
            />
            {(activeBranch === 'all' || activeBranch === 'backend') && (
              <circle r="4" fill="#4ADE80" filter="url(#circuitGlow)">
                <animateMotion
                  path="M 50% 50% L 65% 50% L 80% 25% L 85% 25%"
                  dur={isOverclocked ? "0.8s" : "2s"}
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Trace 3: Bottom-Left (Database) */}
            <path
              d="M 50% 50% L 35% 50% L 20% 75% L 15% 75%"
              fill="none"
              stroke={activeBranch === 'all' || activeBranch === 'database' ? '#F59E0B' : '#1E293B'}
              strokeWidth={activeBranch === 'database' ? '3' : '2'}
              strokeDasharray="6, 4"
            />
            {(activeBranch === 'all' || activeBranch === 'database') && (
              <circle r="4" fill="#F59E0B" filter="url(#circuitGlow)">
                <animateMotion
                  path="M 50% 50% L 35% 50% L 20% 75% L 15% 75%"
                  dur={isOverclocked ? "0.8s" : "2s"}
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Trace 4: Bottom-Right (DevOps) */}
            <path
              d="M 50% 50% L 65% 50% L 80% 75% L 85% 75%"
              fill="none"
              stroke={activeBranch === 'all' || activeBranch === 'devops' ? '#A855F7' : '#1E293B'}
              strokeWidth={activeBranch === 'devops' ? '3' : '2'}
              strokeDasharray="6, 4"
            />
            {(activeBranch === 'all' || activeBranch === 'devops') && (
              <circle r="4" fill="#A855F7" filter="url(#circuitGlow)">
                <animateMotion
                  path="M 50% 50% L 65% 50% L 80% 75% L 85% 75%"
                  dur={isOverclocked ? "0.8s" : "2s"}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>

          {/* Central Main CPU Chip */}
          <div 
            onClick={() => setActiveBranch('all')}
            className="relative z-20 w-36 h-36 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-400 flex flex-col items-center justify-center p-3 shadow-[0_0_30px_rgba(245,158,11,0.4)] cursor-pointer hover:scale-105 transition-all group"
          >
            {/* Corner Gold Solders */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />

            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1 border border-amber-500/40 group-hover:rotate-12 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>

            <span className="text-[11px] font-mono-code font-extrabold text-white tracking-wider text-center">
              JAKKAPON
            </span>
            <span className="text-[9px] font-mono-code text-amber-400 tracking-tight text-center">
              DEV CORE x64
            </span>
            
            <div className="mt-1 flex items-center gap-1 text-[8px] font-mono-code text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isOverclocked ? '4.8 GHz (BOOST)' : '3.6 GHz (OK)'}</span>
            </div>
          </div>

          {/* Module 1: Top-Left (Frontend) */}
          <div
            onClick={() => setActiveBranch('frontend')}
            className={`absolute top-6 left-6 z-20 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeBranch === 'frontend' || activeBranch === 'all'
                ? 'bg-slate-900/90 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code font-bold text-white">Frontend Core</div>
              <div className="text-[10px] font-mono-code text-sky-400">Next.js • React • TS</div>
            </div>
          </div>

          {/* Module 2: Top-Right (Backend) */}
          <div
            onClick={() => setActiveBranch('backend')}
            className={`absolute top-6 right-6 z-20 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeBranch === 'backend' || activeBranch === 'all'
                ? 'bg-slate-900/90 border-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.4)] scale-105'
                : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code font-bold text-white">Backend Engine</div>
              <div className="text-[10px] font-mono-code text-emerald-400">Node • Express • Sockets</div>
            </div>
          </div>

          {/* Module 3: Bottom-Left (Database) */}
          <div
            onClick={() => setActiveBranch('database')}
            className={`absolute bottom-6 left-6 z-20 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeBranch === 'database' || activeBranch === 'all'
                ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code font-bold text-white">Database Store</div>
              <div className="text-[10px] font-mono-code text-amber-400">PostgreSQL • Prisma • Redis</div>
            </div>
          </div>

          {/* Module 4: Bottom-Right (DevOps) */}
          <div
            onClick={() => setActiveBranch('devops')}
            className={`absolute bottom-6 right-6 z-20 px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
              activeBranch === 'devops' || activeBranch === 'all'
                ? 'bg-slate-900/90 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
                : 'bg-slate-900/60 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono-code font-bold text-white">Cloud & DevOps</div>
              <div className="text-[10px] font-mono-code text-purple-400">Docker • Git • n8n • CI</div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Microchip Inspector & Specs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Header of Inspector */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-3">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono-code font-bold text-slate-500 dark:text-slate-400">
                  {activeBranch === 'all' ? 'BUS STATUS: ALL CHANNELS ACTIVE' : `CHANNEL: ${branches[activeBranch].title.toUpperCase()}`}
                </span>
              </div>
              <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                {isOverclocked ? '⚡ 2.5x CLOCK' : '1.0x NORMAL'}
              </span>
            </div>

            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white font-mono-code">
              {activeBranch === 'all' 
                ? t('Full-Stack Unified Core Pipeline', 'สถาปัตยกรรมรวม Full-Stack ครบวงจร')
                : t(branches[activeBranch].title, branches[activeBranch].titleTh)
              }
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {activeBranch === 'all'
                ? t(
                    'All 4 engineering domains communicate via asynchronous non-blocking event loops, type-safe schema validation, and low-latency database queries.',
                    'ทั้ง 4 โดเมนทำงานสอดประสานกันแบบ Non-blocking ตรวจสอบ Type Safety 100% และรับส่งข้อมูลด้วยความเร็วระดับมิลลิวินาที'
                  )
                : t(
                    `Operating at ${branches[activeBranch].voltage} with ${branches[activeBranch].throughput} performance metrics.`,
                    `ทำงานที่ความถี่ ${branches[activeBranch].voltage} พร้อมระดับความเร็ว ${branches[activeBranch].throughput}`
                  )
              }
            </p>

          </div>

          {/* Microchip Specs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(activeBranch === 'all'
              ? [
                  ...branches.frontend.chips.slice(0, 1),
                  ...branches.backend.chips.slice(0, 1),
                  ...branches.database.chips.slice(0, 1),
                  ...branches.devops.chips.slice(0, 1)
                ]
              : branches[activeBranch].chips
            ).map((chip, cIdx) => (
              <div
                key={cIdx}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-1 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code font-bold text-xs text-slate-900 dark:text-white">
                    {chip.name}
                  </span>
                  <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-amber-600 dark:text-amber-400 font-semibold">
                    {chip.level}
                  </span>
                </div>
                <div className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 leading-tight">
                  {chip.role}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
