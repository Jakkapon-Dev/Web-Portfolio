import React from 'react';

// Each mood gets its own pastel hue (not all purple) — kept to the same soft,
// light-saturation "300" tier across the board so they read as one cohesive
// pastel family even while varying in color.
const EXPRESSIONS = {
  intro:        { face: 'UwU', color: '#7DD3FC', label: 'excited'   }, // pastel sky blue
  origin:       { face: '>_<', color: '#A5B4FC', label: 'thinking'  }, // pastel periwinkle
  architecture: { face: '^_^', color: '#86EFAC', label: 'energized' }, // pastel mint green
  decision:     { face: '-_-', color: '#8FB4FF', label: 'focused'   }, // pastel lavender
  result:       { face: ':D',  color: '#F9A8D4', label: 'proud'     }, // pastel pink
};

const mascotLines = {
  mystudentroom: {
    intro:        { en: 'Let me walk you through how I built this!', th: 'มาดูกันว่าผมสร้างระบบนี้ขึ้นมาอย่างไรครับ!' },
    origin:       { en: 'Schools were drowning in paper... so I fixed it.', th: 'โรงเรียนจมอยู่กับงานเอกสาร... ผมจึงแก้ปัญหาด้วยโค้ด' },
    architecture: { en: 'Here is the system I designed end-to-end:', th: 'นี่คือสถาปัตยกรรมระบบที่ผมออกแบบตั้งแต่ต้นจนจบ:' },
    decision:     { en: 'Every tech choice has a reason. Let me explain.', th: 'ทุกการเลือกใช้ Tech Stack มีเหตุผล ผมจะอธิบายให้ฟังครับ' },
    result:       { en: 'Real impact. Real numbers. This is what it achieved.', th: 'ผลลัพธ์จริง ตัวเลขจริง นี่คือสิ่งที่ระบบทำได้ครับ' },
  },
  omnipos: {
    intro:        { en: 'Restaurant chaos to clean real-time system!', th: 'เปลี่ยนความวุ่นวายในร้านอาหาร สู่ระบบ Real-time ที่ลื่นไหล!' },
    origin:       { en: 'Friday peak hour was the real enemy.', th: 'ช่วงเวลาเร่งด่วนในร้านอาหารคือปัญหาที่ต้องแก้ไข' },
    architecture: { en: 'Socket.io + Prisma = sub-100ms order sync!', th: 'Socket.io + Prisma = อัปเดตออร์เดอร์ไวกว่า 50ms!' },
    decision:     { en: 'WebSocket over polling? I will show you why.', th: 'ทำไมถึงเลือก WebSocket แทน Polling? นี่คือเหตุผลครับ' },
    result:       { en: 'No more lost orders. No more kitchen chaos.', th: 'ออร์เดอร์ไม่ตกหล่น และลดความสับสนในครัว' },
  },
  blackboard: {
    intro:        { en: 'A Kanban that feels instant. 0ms UI latency.', th: 'กระดาน Kanban ที่ตอบสนองทันที UI ลื่นไหล 0ms!' },
    origin:       { en: 'Team boards were slow and frustrating.', th: 'กระดานงานเดิมโหลดช้าและซับซ้อน ผมจึงออกแบบใหม่' },
    architecture: { en: 'Zustand + Optimistic UI = feels like magic.', th: 'Zustand + Optimistic UI = อัปเดตหน้าจอได้เร็วทันใจ' },
    decision:     { en: 'Zustand vs Redux? Let me break it down.', th: 'ทำไมเลือก Zustand แทน Redux? มาดูกันครับ' },
    result:       { en: '60fps drag. Instant rollback. Clean codebase.', th: 'ลากวางลื่นไหล 60fps มี Rollback ทันที และโค้ดอ่านง่าย' },
  },
  matcha: {
    intro:        { en: 'Built a full recruitment platform for 200+ applicants!', th: 'สร้างแพลตฟอร์มสมัครงานรองรับผู้สมัครกว่า 200+ คน!' },
    origin:       { en: 'Hiring was a mess of emails and spreadsheets.', th: 'กระบวนการรับสมัครเดิมเต็มไปด้วยอีเมลและไฟล์เอกสารที่กระจัดกระจาย' },
    architecture: { en: 'Multer + S3 + Match Engine. Every resume handled.', th: 'Multer + S3 + Match Engine จัดการทุกเรซูเม่อย่างเป็นระบบ' },
    decision:     { en: 'Why multi-role RBAC? Why S3 over disk storage?', th: 'ทำไมต้องแยกสิทธิ์ RBAC และใช้ AWS S3? มาดูแนวคิดกันครับ' },
    result:       { en: '85ms pipeline. Clean UX. Real-world hiring solved.', th: 'Pipeline ตอบสนองเร็ว 85ms ใช้งานง่าย และแก้ปัญหาการรับสมัครงานจริง' },
  },
};

function JakkBotSvg({ expression, className }) {
  const expr = EXPRESSIONS[expression] || EXPRESSIONS.intro;
  const c = expr.color;
  return (
    <svg
      width="84" height="100" viewBox="0 0 96 110" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || "w-16 h-[76px] sm:w-20 sm:h-[95px] md:w-[84px] md:h-[100px] shrink-0"}
      style={{ filter: `drop-shadow(0 0 12px ${c}70)` }}
    >
      {/* Antenna */}
      <rect x="44" y="2" width="8" height="10" rx="4" fill={c} opacity="0.9" />
      <circle cx="48" cy="2" r="4" fill={c} />

      {/* Head shell */}
      <rect x="16" y="10" width="64" height="58" rx="14" fill="#1C1917" stroke={c} strokeWidth="2" />

      {/* Screen */}
      <rect x="22" y="18" width="52" height="42" rx="8" fill="#0D1117" stroke="#1E3A5F" strokeWidth="1" />
      <rect x="22" y="18" width="52" height="4" fill={c} opacity="0.06" />

      {/* Face expression */}
      <text x="48" y="42" textAnchor="middle" dominantBaseline="middle"
        fontSize="14" fontFamily="monospace" fill={c} fontWeight="bold">{expr.face}</text>

      {/* Status bar */}
      <rect x="22" y="54" width="52" height="6" fill="#0D1117" />
      <text x="48" y="58" textAnchor="middle" dominantBaseline="middle"
        fontSize="4.2" fontFamily="monospace" fill={c} opacity="0.7">
        JAKK-BOT v2.0 • MODE: {expr.label.toUpperCase()}
      </text>

      {/* Ear bolts */}
      <circle cx="16" cy="36" r="4.5" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
      <circle cx="80" cy="36" r="4.5" fill="#292524" stroke="#44403c" strokeWidth="1.5" />

      {/* Neck */}
      <rect x="38" y="68" width="20" height="10" rx="3" fill="#292524" stroke="#44403c" strokeWidth="1.5" />

      {/* Body */}
      <rect x="18" y="78" width="60" height="28" rx="10" fill="#292524" stroke="#44403c" strokeWidth="1.5" />

      {/* Chest LED */}
      <circle cx="48" cy="92" r="7" fill={c} opacity="0.15" />
      <circle cx="48" cy="92" r="3.5" fill={c} />

      {/* Vent lines */}
      <rect x="22" y="88" width="7" height="2" rx="1" fill="#44403c" />
      <rect x="22" y="92" width="7" height="2" rx="1" fill="#44403c" />
      <rect x="67" y="88" width="7" height="2" rx="1" fill="#44403c" />
      <rect x="67" y="92" width="7" height="2" rx="1" fill="#44403c" />

      {/* Arms */}
      <rect x="5"  y="80" width="13" height="20" rx="6" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
      <rect x="78" y="80" width="13" height="20" rx="6" fill="#292524" stroke="#44403c" strokeWidth="1.5" />
    </svg>
  );
}

function SpeechBubble({ text, color }) {
  return (
    <div className="relative">
      <div
        className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-bl-sm text-[10px] sm:text-[11px] font-mono-code font-bold leading-snug shadow-xl w-[140px] sm:w-[180px] md:w-[200px]"
        style={{ background: color, color: '#1C1917' }}
      >
        {text}
      </div>
      <div className="absolute -bottom-2 left-4 w-0 h-0"
        style={{
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid ${color}`,
        }}
      />
    </div>
  );
}

export default function JakkBotMascot({ projectId, expression = 'intro', lang = 'th' }) {
  const expr = EXPRESSIONS[expression] || EXPRESSIONS.intro;
  const lines = mascotLines[projectId] || mascotLines.mystudentroom;
  const line  = lines[expression] || lines.intro;
  const text  = lang === 'th' ? line.th : line.en;
  return (
    <div className="flex flex-col items-start gap-2.5 select-none">
      <SpeechBubble text={text} color={expr.color} />
      <JakkBotSvg expression={expression} />
    </div>
  );
}

export { EXPRESSIONS, mascotLines, JakkBotSvg, SpeechBubble };
