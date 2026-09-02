import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { EXPRESSIONS, JakkBotSvg } from "./JakkBotMascot";
import { X, FileText, Mail, ChevronRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const SECTION_ORDER = ["hero", "projects", "skills", "about", "experience", "contact"];
const BOT_SIZE_CLASS = "w-24 h-[114px] sm:w-28 sm:h-[133px] lg:w-32 lg:h-[152px] shrink-0";

function GuideBubble({ text, color }) {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="px-4 py-2.5 rounded-2xl text-[11px] sm:text-xs font-mono-code font-bold leading-snug shadow-xl w-[180px] sm:w-[200px] text-center"
        style={{ background: color, color: "#1C1917" }}
      >
        {text}
      </div>
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `8px solid ${color}`,
        }}
      />
    </motion.div>
  );
}

const SECTION_GUIDE = {
  hero: {
    expression: "intro",
    en: "Hey, I'm JakkBot — click me for quick answers or scroll to explore!",
    th: "สวัสดีครับ ผมแจ๊คบอท คลิกคุยกับผม หรือเลื่อนดูเว็บต่อได้เลยนะ",
  },
  projects: {
    expression: "architecture",
    en: 'These are the flagship builds — tap "Architecture Flow" to see the system design.',
    th: 'นี่คือผลงานเรือธงครับ ลองกด "Architecture Flow" เพื่อดูสถาปัตยกรรมระบบได้เลย',
  },
  skills: {
    expression: "decision",
    en: "Full-stack coverage, front to back — every skill here came from a real project.",
    th: "ทักษะครบทุกชั้น ตั้งแต่ frontend ถึง backend และใช้จริงในทุกโปรเจกต์ครับ",
  },
  about: {
    expression: "origin",
    en: "Curious who's behind the code? Here's the story.",
    th: "อยากรู้จักคนที่อยู่เบื้องหลังโค้ดพวกนี้ไหมครับ อ่านต่อได้เลย",
  },
  experience: {
    expression: "result",
    en: "6 years of real, hands-on work — not just classroom theory.",
    th: "ประสบการณ์ทำงานจริง 6 ปีครับ ไม่ใช่แค่ทฤษฎีในห้องเรียน",
  },
  contact: {
    expression: "intro",
    en: "Like what you see? Let's talk — I'll pass the message along.",
    th: "สนใจร่วมงาน หรือพูดคุยแลกเปลี่ยน ติดต่อผมได้เลยครับ",
  },
};

const FAQ_ITEMS = [
  {
    id: "available",
    qEn: "When are you available to start?",
    qTh: "พร้อมเริ่มงานเมื่อไหร่?",
    aEn: "Available immediately for Full-Stack & Software Developer roles!",
    aTh: "พร้อมเริ่มงานได้ทันที (Immediately Available) ในบทบาท Full-Stack หรือ Software Developer ครับ!",
  },
  {
    id: "top-project",
    qEn: "Which project is the flagship?",
    qTh: "โปรเจกต์ไหนเด่นที่สุด?",
    aEn: "OmniPOS (Real-Time KDS via WebSockets) and MyStudentRoom (Next.js + Prisma) demonstrate deep system architecture!",
    aTh: "แนะนำ OmniPOS (Real-Time WebSocket) และ MyStudentRoom (Next.js 14 + Prisma) ครับ!",
  },
  {
    id: "tech-stack",
    qEn: "What are your core tech stacks?",
    qTh: "ถนัด Tech Stack ไหนมากที่สุด?",
    aEn: "Next.js 14, React 18, TypeScript, Node.js, Express, PostgreSQL, Prisma, Socket.io, and Tailwind CSS.",
    aTh: "Next.js 14, React 18, TypeScript, Node.js, Express, PostgreSQL, Prisma ORM, Socket.io และ Tailwind CSS ครับ",
  },
];

export default function JakkBotGuide() {
  const { lang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatAnswer, setChatAnswer] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const targets = SECTION_ORDER.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;

    const activeIds = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeIds.add(entry.target.id);
          else activeIds.delete(entry.target.id);
        });
        const current = SECTION_ORDER.find((id) => activeIds.has(id));
        if (current) setActiveSection(current);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!activeSection) return null;

  const guide = SECTION_GUIDE[activeSection] || SECTION_GUIDE.hero;
  const text = lang === "th" ? guide.th : guide.en;
  const color = EXPRESSIONS[guide.expression]?.color || "#8FB4FF";

  const handleAsk = (item) => {
    setChatAnswer(lang === "th" ? item.aTh : item.aEn);
  };

  return (
    <div className="fixed left-6 xl:left-16 2xl:left-28 bottom-6 z-40 hidden lg:flex flex-col items-center select-none lg:scale-[0.8] xl:scale-100 origin-bottom-left">
      <AnimatePresence mode="wait">
        {/* Interactive Chat Dialog Mode */}
        {isChatOpen ? (
          <motion.div
            key="jakkbot-chat-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-80 rounded-[10px] bg-blueprint-950 border border-blueprint-700/60 shadow-2xl p-4 text-left font-mono-code text-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-blueprint-700/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white">JAKK-BOT Assistant</span>
              </div>
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setChatAnswer(null);
                }}
                className="p-1 rounded-[3px] text-blueprint-400 hover:text-white hover:bg-blueprint-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Answer Balloon */}
            <div className="p-3 rounded-[6px] bg-blueprint-900 border border-blueprint-700/50 text-blueprint-100 leading-relaxed text-[11px]">
              {chatAnswer || (lang === "th" ? "สวัสดีครับ! ถามคำถามด่วนเกี่ยวกับจักรภพได้เลยครับ 👇" : "Hi there! Pick a quick question below to learn more about Jakkapon 👇")}
            </div>

            {/* Quick FAQ Chips */}
            <div className="space-y-1.5 pt-1">
              {FAQ_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAsk(item)}
                  className="w-full flex items-center justify-between p-2 rounded-[4px] bg-blueprint-800/80 hover:bg-draft-500/20 text-blueprint-300 hover:text-draft-300 border border-blueprint-700/50 transition-all text-left text-[11px]"
                >
                  <span>{lang === "th" ? item.qTh : item.qEn}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </div>

            {/* Direct Shortcut Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-blueprint-700/50">
              <a
                href={portfolioData.personal.resumeUrl || "/cv.html"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 rounded-[4px] bg-draft-500 hover:bg-draft-600 text-white font-bold text-center text-[10px] transition-colors flex items-center justify-center gap-1"
              >
                <FileText className="w-3 h-3" />
                <span>{t("View Resume", "ดูเรซูเม่")}</span>
              </a>
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 py-1.5 rounded-[4px] bg-blueprint-800 hover:bg-blueprint-700 text-blueprint-100 font-bold text-center text-[10px] transition-colors flex items-center justify-center gap-1 border border-blueprint-700/50"
              >
                <Mail className="w-3 h-3" />
                <span>{t("Contact", "ติดต่อ")}</span>
              </button>
            </div>
          </motion.div>
        ) : null}

        {/* Regular Mascot Avatar Guide */}
        {!collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <motion.button
              key={`${activeSection}-open`}
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 text-center cursor-pointer group"
              title={lang === "th" ? "คลิกเพื่อคุยกับ JakkBot" : "Click to chat with JakkBot"}
            >
              <GuideBubble text={text} color={color} />
              <div className="relative">
                <JakkBotSvg expression={guide.expression} className={BOT_SIZE_CLASS} />
                <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-draft-500 text-white text-[9px] font-mono-code font-bold shadow-md animate-pulse">
                  Click
                </span>
              </div>
            </motion.button>

            <button
              onClick={() => setCollapsed(true)}
              className="text-[10px] font-mono-code text-blueprint-400 hover:text-blueprint-200 opacity-60 hover:opacity-100 transition-opacity"
            >
              {lang === "th" ? "ซ่อนบอท" : "minimize"}
            </button>
          </div>
        ) : (
          <motion.button
            key="closed"
            type="button"
            onClick={() => setCollapsed(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer p-2 rounded-[8px] bg-blueprint-950/80 border border-blueprint-700/50 shadow-lg flex items-center gap-2 font-mono-code text-xs text-blueprint-300"
            title={lang === "th" ? "เรียก JakkBot กลับมา" : "Bring JakkBot back"}
          >
            <JakkBotSvg expression={guide.expression} className="w-8 h-8" />
            <span className="pr-1 text-[11px]">JakkBot</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
