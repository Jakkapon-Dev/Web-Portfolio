import React, { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Zap } from 'lucide-react';
import Magnet from './Magnet';

// The actual Three.js/R3F scene is heavy — lazy-loaded so it never touches
// the initial bundle, and only fetched once this card is actually mounted.
const SkillConstellationScene = lazy(() => import('./SkillConstellationScene'));

// ── Skill Data ──────────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    id: 'frontend', label: 'Frontend', labelTh: 'Frontend',
    color: '#38BDF8', glow: 'rgba(56,189,248,0.4)',
    skills: [
      { id: 'react',   name: 'React.js 18',   level: 92, project: 'OmniPOS, MATCHA', detail: 'Concurrent Mode, Hooks, Context, Custom Performance Tuning' },
      { id: 'nextjs',  name: 'Next.js 14',    level: 90, project: 'MyStudentRoom, Blackboard', detail: 'App Router, SSR, ISR, Server Actions, Edge Runtime' },
      { id: 'ts',      name: 'TypeScript',    level: 88, project: 'All Projects', detail: 'Generics, Utility Types, Strict Type Safety, AST' },
      { id: 'tw',      name: 'Tailwind CSS',  level: 95, project: 'Design Systems', detail: 'Custom Design Tokens, Responsive Layouts, Fluid Typography' },
      { id: 'framer',  name: 'Framer Motion', level: 82, project: 'Web Portfolio', detail: 'Spring Physics, Gestures, Keyframe Sequences, Layout Animations' },
    ]
  },
  {
    id: 'backend', label: 'Backend', labelTh: 'Backend',
    color: '#10B981', glow: 'rgba(16,185,129,0.4)',
    skills: [
      { id: 'nodejs',   name: 'Node.js',    level: 90, project: 'Microservices', detail: 'Event Loop Architecture, Streams, Cluster Workers, Async I/O' },
      { id: 'express',  name: 'Express.js', level: 88, project: 'OmniPOS, MATCHA', detail: 'Modular Routing, Middleware Pipelines, Rate Limiting, CORS' },
      { id: 'socket',   name: 'Socket.io',  level: 86, project: 'OmniPOS Live KDS', detail: 'WebSocket Rooms, Heartbeats, Sub-50ms Event Streaming' },
      { id: 'prisma',   name: 'Prisma ORM', level: 88, project: 'OmniPOS, MyStudentRoom', detail: 'Relational Schemas, Migrations, Connection Pooling, Type Safety' },
      { id: 'restapi',  name: 'REST / Auth', level: 92, project: 'Multi-Role Security', detail: 'JWT Tokens, Refresh Rotation, Role-Based Access Control (RBAC)' },
    ]
  },
  {
    id: 'database', label: 'Database', labelTh: 'Database',
    color: '#818CF8', glow: 'rgba(129,140,248,0.4)',
    skills: [
      { id: 'postgres', name: 'PostgreSQL', level: 88, project: 'Core Relational Store', detail: 'ACID Transactions, Indexes, Complex JOINs, JSONB Columns' },
      { id: 'redis',    name: 'Redis',      level: 80, project: 'Queue & Cache', detail: 'In-Memory FIFO Queue, Session Store, Distributed Locking' },
      { id: 'mongodb',  name: 'MongoDB',    level: 76, project: 'Document Stores', detail: 'Document Modeling, Aggregation Pipelines, Atlas Cloud' },
    ]
  },
  {
    id: 'devops', label: 'DevOps & Cloud', labelTh: 'DevOps & Cloud',
    color: '#C084FC', glow: 'rgba(192,132,252,0.4)',
    skills: [
      { id: 'docker',  name: 'Docker',     level: 84, project: 'Containerization', detail: 'Multi-stage Dockerfiles, Docker Compose, Volume Isolation' },
      { id: 'git',     name: 'Git & CI',   level: 94, project: 'Branching Strategy', detail: 'Git Flow, Rebase, Pull Request Reviews, Automation' },
      { id: 'linux',   name: 'Linux VPS',  level: 80, project: 'Server Deployments', detail: 'Ubuntu Server, Bash Scripting, Systemd Services, SSH' },
      { id: 'n8n',     name: 'n8n / CI',   level: 82, project: 'Automation Hub', detail: 'Event Webhook Pipelines, Line & Email Dispatch Triggers' },
    ]
  },
  {
    id: 'tools', label: 'Tools & Testing', labelTh: 'Tools & Testing',
    color: '#E8611C', glow: 'rgba(232,97,28,0.4)',
    skills: [
      { id: 'vscode',  name: 'VS Code',    level: 96, project: 'Dev Environment', detail: 'Advanced Extensions, Debugging, Custom Keybindings' },
      { id: 'postman', name: 'Postman',    level: 88, project: 'API Contracts', detail: 'Collection Runners, Automated Test Scripts, Mock Servers' },
      { id: 'jest',    name: 'Jest / Tests', level: 78, project: 'Unit Verification', detail: 'Component Unit Tests, Snapshot Testing, Mock Handlers' },
      { id: 'figma',   name: 'Figma',      level: 80, project: 'UI/UX Design', detail: 'Design System Tokens, Auto Layout, High-Fidelity Mockups' },
    ]
  }
];

// Flatten all skills with group metadata
const ALL_SKILLS = SKILL_GROUPS.flatMap(g =>
  g.skills.map(s => ({ ...s, group: g.id, groupLabel: g.label, groupLabelTh: g.labelTh, color: g.color, glow: g.glow }))
);

// Cluster layout (x/y: 0..1) — the 3D scene remaps this into real 3D space
// and adds a per-group Z depth on top of it.
const STAR_POSITIONS = [
  // Frontend Cluster (Top-Left)
  { id: 'react',    x: 0.16, y: 0.22 },
  { id: 'nextjs',   x: 0.28, y: 0.12 },
  { id: 'ts',       x: 0.32, y: 0.32 },
  { id: 'tw',       x: 0.11, y: 0.40 },
  { id: 'framer',   x: 0.24, y: 0.48 },
  // Backend Cluster (Top-Right)
  { id: 'nodejs',   x: 0.68, y: 0.14 },
  { id: 'express',  x: 0.82, y: 0.24 },
  { id: 'socket',   x: 0.89, y: 0.40 },
  { id: 'prisma',   x: 0.74, y: 0.44 },
  { id: 'restapi',  x: 0.62, y: 0.30 },
  // Database Cluster (Bottom-Left)
  { id: 'postgres', x: 0.18, y: 0.72 },
  { id: 'redis',    x: 0.10, y: 0.85 },
  { id: 'mongodb',  x: 0.30, y: 0.82 },
  // DevOps Cluster (Bottom-Right)
  { id: 'docker',   x: 0.72, y: 0.70 },
  { id: 'git',      x: 0.86, y: 0.78 },
  { id: 'linux',    x: 0.66, y: 0.86 },
  { id: 'n8n',      x: 0.90, y: 0.62 },
  // Tools & Testing Cluster (Center-Bottom)
  { id: 'vscode',   x: 0.48, y: 0.70 },
  { id: 'postman',  x: 0.58, y: 0.84 },
  { id: 'jest',     x: 0.50, y: 0.54 },
  { id: 'figma',    x: 0.38, y: 0.86 },
];

// Constellation connections (intra-group and cross-domain bridges)
const CONNECTIONS = [
  // Frontend
  ['react','nextjs'],['react','ts'],['nextjs','ts'],['ts','tw'],['react','framer'],['tw','framer'],
  // Backend
  ['nodejs','express'],['express','socket'],['express','restapi'],['nodejs','prisma'],['prisma','restapi'],['nodejs','restapi'],
  // Database
  ['postgres','redis'],['postgres','mongodb'],['redis','mongodb'],
  // DevOps
  ['docker','git'],['docker','linux'],['linux','n8n'],['git','n8n'],
  // Tools
  ['vscode','figma'],['vscode','postman'],['postman','jest'],['vscode','jest'],
  // Cross-Domain Bridges
  ['react','nodejs'],['nextjs','prisma'],['prisma','postgres'],['socket','redis'],['docker','nodejs'],['git','express'],['jest','react']
];

export default function SkillConstellation() {
  const { lang, t } = useLanguage();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [activeGroup, setActiveGroup] = useState('all');
  const [pulseSpeed, setPulseSpeed] = useState('normal'); // 'normal' | 'boost'

  const activeSkillObj = selected
    ? ALL_SKILLS.find(s => s.id === selected)
    : (hovered ? ALL_SKILLS.find(s => s.id === hovered) : null);

  return (
    <div className="w-full my-12 rounded-[10px] p-6 sm:p-8 bg-blueprint-900 border border-blueprint-500/15 shadow-2xl space-y-6 text-left relative overflow-hidden selection:bg-draft-500 selection:text-white">

      {/* Background Subtle Starfield Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px), radial-gradient(#E8611C 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-blueprint-500/15 relative z-10">

        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-[4px] bg-draft-500/10 text-draft-400 border border-draft-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <h3 className="font-extrabold text-lg sm:text-2xl text-blueprint-50 tracking-tight">
              {t('Skill Constellation Map', 'แผนที่กลุ่มดาวทักษะวิศวกรรม (Skill Constellation)')}
            </h3>
          </div>
          <p className="text-xs font-mono-code text-blueprint-400 mt-1">
            {t(
              'A real 3D graph — drag to orbit, hover a node to trace proficiencies and architecture stacks.',
              'แผนที่ 3 มิติจริง — ลากเพื่อหมุนกล้อง เอาเมาส์ชี้ที่ดาวเพื่อดูรายละเอียดและสายงาน'
            )}
          </p>
        </div>

        {/* Group Filter Pills & Animation Boost Switch */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Magnet padding={30} magnetStrength={5}>
            <button
              onClick={() => setActiveGroup('all')}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-mono-code font-bold transition-all ${
                activeGroup === 'all'
                  ? 'bg-draft-500 text-white shadow-md shadow-draft-500/20'
                  : 'bg-blueprint-950 text-blueprint-300 hover:text-draft-400'
              }`}
            >
              ✦ {t('All Domains', 'ทุกสายงาน')}
            </button>
          </Magnet>

          {SKILL_GROUPS.map(g => (
            <Magnet key={g.id} padding={30} magnetStrength={5}>
              <button
                onClick={() => setActiveGroup(g.id)}
                className="px-3 py-1.5 rounded-[4px] text-xs font-mono-code font-bold transition-all border"
                style={{
                  background: activeGroup === g.id ? `${g.color}22` : undefined,
                  borderColor: activeGroup === g.id ? g.color : 'transparent',
                  color: activeGroup === g.id ? g.color : undefined,
                }}
              >
                {lang === 'th' ? g.labelTh : g.label}
              </button>
            </Magnet>
          ))}

          {/* Rotation Speed Toggle */}
          <Magnet padding={30} magnetStrength={5} wrapperClassName="ml-2">
            <button
              onClick={() => setPulseSpeed(prev => prev === 'normal' ? 'boost' : 'normal')}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-mono-code font-bold transition-all border flex items-center gap-1 ${
                pulseSpeed === 'boost'
                  ? 'bg-draft-500 text-white border-draft-400 shadow-md shadow-draft-500/30'
                  : 'bg-blueprint-950 border-blueprint-700/50 text-blueprint-300'
              }`}
              title="Toggle Auto-Rotate Speed"
            >
              <Zap className={`w-3.5 h-3.5 ${pulseSpeed === 'boost' ? 'animate-bounce' : ''}`} />
              <span>{pulseSpeed === 'boost' ? '⚡ Boost 2x' : '1x Speed'}</span>
            </button>
          </Magnet>
        </div>

      </div>

      {/* Interactive 3D Constellation */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-[8px] overflow-hidden border border-blueprint-700/50 bg-[#050D1A] shadow-inner">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-blueprint-400 font-mono-code text-xs">
              {t('Loading 3D graph…', 'กำลังโหลดกราฟ 3 มิติ…')}
            </div>
          }
        >
          <SkillConstellationScene
            allSkills={ALL_SKILLS}
            connections={CONNECTIONS}
            positions2D={STAR_POSITIONS}
            activeGroup={activeGroup}
            hovered={hovered}
            selected={selected}
            setHovered={setHovered}
            setSelected={setSelected}
            pulseSpeed={pulseSpeed}
          />
        </Suspense>

        {/* Top Floating Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono-code font-bold uppercase tracking-wider text-blueprint-300 bg-blueprint-950/80 px-2.5 py-1 rounded-[3px] border border-blueprint-700/50 backdrop-blur-md">
            ✦ {ALL_SKILLS.length} Star Nodes Online
          </span>
        </div>

        {/* Floating Detailed Skill Inspector Card */}
        <AnimatePresence>
          {activeSkillObj && (
            <motion.div
              key={activeSkillObj.id}
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.16 }}
              className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 p-4 sm:p-5 rounded-[8px] border backdrop-blur-2xl space-y-3 w-[240px] sm:w-[280px] text-left shadow-2xl z-20 pointer-events-none"
              style={{
                background: 'rgba(10, 24, 48, 0.92)',
                borderColor: `${activeSkillObj.color}66`,
                boxShadow: `0 0 30px ${activeSkillObj.color}33`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-mono-code font-extrabold" style={{ color: activeSkillObj.color }}>
                  {activeSkillObj.name}
                </span>
                <span
                  className="text-xs font-mono-code px-2.5 py-0.5 rounded-full font-bold shadow-sm"
                  style={{ background: `${activeSkillObj.color}22`, color: activeSkillObj.color, border: `1px solid ${activeSkillObj.color}44` }}
                >
                  {activeSkillObj.level}%
                </span>
              </div>

              {/* Animated Progress Meter */}
              <div className="w-full h-1.5 rounded-full bg-blueprint-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${activeSkillObj.level}%`, background: activeSkillObj.color }}
                />
              </div>

              <p className="text-[11px] font-mono-code text-blueprint-100 leading-relaxed">
                {activeSkillObj.detail}
              </p>

              <div className="pt-2 border-t border-blueprint-700/40 flex items-center justify-between text-[10px] font-mono-code">
                <span className="text-blueprint-400 truncate max-w-[150px]">
                  📌 {activeSkillObj.project}
                </span>
                <span className="font-bold uppercase tracking-wider" style={{ color: activeSkillObj.color }}>
                  {lang === 'th' ? activeSkillObj.groupLabelTh : activeSkillObj.groupLabel}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 left-3 text-[10px] font-mono-code text-blueprint-500 hidden sm:block pointer-events-none">
          Drag to orbit • Click any star to pin inspector • Node size = proficiency
        </div>
      </div>

      {/* Footer Category Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono-code text-blueprint-400">
        <div className="flex flex-wrap items-center gap-4">
          {SKILL_GROUPS.map(g => (
            <div key={g.id} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: g.color }} />
              <span className="font-medium text-blueprint-200">{lang === 'th' ? g.labelTh : g.label}</span>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-blueprint-400">
          ✦ Interconnected Architecture Graph
        </div>
      </div>

    </div>
  );
}
