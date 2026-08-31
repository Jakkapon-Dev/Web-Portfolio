import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme, ACCENT_THEMES } from "../context/ThemeContext";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  Coffee,
  Code2,
  Bot,
  Sun,
  Moon,
  Compass,
  Briefcase,
  Layers,
  FolderGit2,
  User,
  Zap
} from "lucide-react";

export default function OnboardingQuizModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const { theme, setThemeMode, setAccentColor } = useTheme();

  const [step, setStep] = useState(1); // 1 to 5, and 6 for "รอแป๊บ..."
  const [step2SubStage, setStep2SubStage] = useState("choice"); // "choice" | "dark_side_warning"
  const [step5SubStage, setStep5SubStage] = useState("matte_glossy"); // "matte_glossy" | "punchline" | "real_question"
  const [selectedInStep, setSelectedInStep] = useState(null);
  const [answers, setAnswers] = useState({
    color: "cobalt",
    mode: "dark",
    roleFocus: "fullstack",
    landing: "projects",
    coffeeOrBug: "coffee",
  });
  const [isSkipHovered, setIsSkipHovered] = useState(false);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleModeClick = (modeChoice) => {
    if (modeChoice === "light") {
      setStep2SubStage("dark_side_warning");
    } else {
      handleSelectOption("mode", "dark");
    }
  };

  const triggerStep5Punchline = (choice) => {
    if (choice) setSelectedInStep(choice);
    setTimeout(() => {
      setStep5SubStage("punchline");
      setSelectedInStep(null);
      // Give 3.5 seconds for punchline animation so user can read and laugh comfortably
      setTimeout(() => {
        setStep5SubStage("real_question");
      }, 3500);
    }, choice ? 300 : 0);
  };

  // Step 5 Auto-Interrupt: Show "ดำด้าน หรือ ดำเงา" for 2.3s then auto-interrupt with "เฮ้ย ไม่ใช่!"
  useEffect(() => {
    if (step === 5 && step5SubStage === "matte_glossy") {
      const gagTimer = setTimeout(() => {
        triggerStep5Punchline();
      }, 2300);
      return () => clearTimeout(gagTimer);
    }
  }, [step, step5SubStage]);

  // Reset state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setStep2SubStage("choice");
      setStep5SubStage("matte_glossy");
      setSelectedInStep(null);
      setLoadingProgress(0);
      setLoadingTextIdx(0);
    }
  }, [isOpen]);

  const loadingMessages = [
    t("กำลังผสมเฉดสีที่คุณเลือก...", "กำลังผสมเฉดสีที่คุณเลือก..."),
    t("กำลังตรวจสอบว่าคุณเป็น HR ปลอมตัวมาหรือเปล่า...", "กำลังตรวจสอบว่าคุณเป็น HR ปลอมตัวมาหรือเปล่า..."),
    t("กำลังชงกาแฟให้ระบบ...", "กำลังชงกาแฟให้ระบบ..."),
    t("จัดเตรียมพอร์ตตามใจคุณ 100% เรียบร้อย!", "จัดเตรียมพอร์ตตามใจคุณ 100% เรียบร้อย!"),
  ];

  // Loading sequence in Step 6 (Paced nicely at 7.5s: +3s added)
  useEffect(() => {
    if (step === 6) {
      // Message rotation every 1800ms
      const msgInterval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 1800);

      // Smooth progress bar update over 7.5s
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + 1;
        });
      }, 74);

      // Apply settings immediately
      setAccentColor(answers.color);
      setThemeMode(answers.mode);

      const timeout = setTimeout(() => {
        try {
          localStorage.setItem("portfolio_onboarding_completed", "true");
        } catch {}

        onClose();

        // Smooth scroll to selected landing
        setTimeout(() => {
          const targetId = answers.landing;
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 350);
      }, 7500);

      return () => {
        clearInterval(msgInterval);
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [step, answers, setAccentColor, setThemeMode, onClose, loadingMessages.length]);

  if (!isOpen) return null;

  const handleSelectOption = (key, value) => {
    setSelectedInStep(value);
    setAnswers((prev) => ({ ...prev, [key]: value }));

    // Apply color and mode live so user sees immediate feedback
    if (key === "color") {
      setAccentColor(value);
    }
    if (key === "mode") {
      setThemeMode(value);
    }

    // Paced transition delay (450ms) so the click feels satisfying and not rushed
    setTimeout(() => {
      setSelectedInStep(null);
      if (step < 5) {
        setStep((prev) => prev + 1);
      } else {
        setStep(6); // Go to "รอแป๊บ..."
      }
    }, 450);
  };

  const handleSkip = () => {
    try {
      localStorage.setItem("portfolio_onboarding_completed", "true");
    } catch {}
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome Interview"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#0F141C] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10 text-left font-sans"
        >
          {/* Top Skip Button with Option 2 Witty Tooltip */}
          {step <= 5 && (
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <div className="relative">
                {isSkipHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 bottom-full mb-2 w-56 p-2.5 rounded-xl bg-amber-500 text-slate-950 font-mono-code text-[11px] font-bold shadow-xl text-center leading-snug"
                  >
                    <span>แน่ใจเหรอ? อาตี้อุตส่าห์เตรียมคำถามมา... ข้ามแล้วจะเสียดายนะ 555 😂</span>
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-amber-500 rotate-45" />
                  </motion.div>
                )}
                <button
                  onClick={handleSkip}
                  onMouseEnter={() => setIsSkipHovered(true)}
                  onMouseLeave={() => setIsSkipHovered(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs font-mono-code font-bold border border-slate-800"
                >
                  {t("Skip", "ข้าม")} ⏭️
                </button>
              </div>
            </div>
          )}

          {/* Step Progress Bar */}
          {step <= 5 && (
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span className="text-cobalt-400 font-bold">ATM INTERVIEW · ข้อที่ {step} / 5</span>
                <span>{step * 20}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cobalt-500 via-sky-400 to-purple-500"
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 1: COLOR PREFERENCE                                 */}
          {/* ======================================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono-code font-bold text-cobalt-400 uppercase tracking-wider">
                  คำถามระดับตำนาน (อาตี้ & เต๋อ)
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  1. "คุณชอบสีอะไร?" 🎨
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  (เลือกแล้วโทนสี Accent & Glow ทั้งเว็บจะปรับตามใจคุณทันที)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={() => handleSelectOption("color", "cobalt")}
                  className={`p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group ${
                    selectedInStep === "cobalt"
                      ? "border-cobalt-500 bg-cobalt-500/20 ring-2 ring-cobalt-500/40"
                      : "border-slate-800 hover:border-cobalt-500 hover:bg-cobalt-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm text-white font-mono-code">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-cobalt-500 shadow-[0_0_10px_rgba(42,99,240,0.8)]" />
                      <span>สีน้ำเงิน Cobalt</span>
                    </div>
                    {selectedInStep === "cobalt" && <CheckCircle2 className="w-4 h-4 text-cobalt-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    สไตล์ Enterprise คลีนๆ สุขุม นิ่ง ไม่พูดเยอะ น่าเชื่อถือ
                  </p>
                </button>

                <button
                  onClick={() => handleSelectOption("color", "violet")}
                  className={`p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group ${
                    selectedInStep === "violet"
                      ? "border-purple-500 bg-purple-500/20 ring-2 ring-purple-500/40"
                      : "border-slate-800 hover:border-purple-500 hover:bg-purple-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm text-white font-mono-code">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      <span>สีม่วง Electric Violet</span>
                    </div>
                    {selectedInStep === "violet" && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    ฟีลสตาร์ทอัพ AI ยุคใหม่ ล้ำสมัย หล่อเท่ มีสไตล์
                  </p>
                </button>

                <button
                  onClick={() => handleSelectOption("color", "emerald")}
                  className={`p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group ${
                    selectedInStep === "emerald"
                      ? "border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/40"
                      : "border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm text-white font-mono-code">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      <span>สีเขียว Cyber Emerald</span>
                    </div>
                    {selectedInStep === "emerald" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    ฟีลแฮกเกอร์ เทอร์มินัล สายกรีน ดื่มมัทฉะ ระบบเสถียร
                  </p>
                </button>

                <button
                  onClick={() => handleSelectOption("color", "amber")}
                  className={`p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group ${
                    selectedInStep === "amber"
                      ? "border-amber-500 bg-amber-500/20 ring-2 ring-amber-500/40"
                      : "border-slate-800 hover:border-amber-500 hover:bg-amber-500/10"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm text-white font-mono-code">
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                      <span>สีส้ม Sunset Amber</span>
                    </div>
                    {selectedInStep === "amber" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    ฟีลมีพลัง กระตือรือร้น พร้อมบวก สู้งานทุกสปรินต์
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: DARK / LIGHT MODE (3-STAGE DRAMA GAG)            */}
          {/* ======================================================== */}
          {step === 2 && (
            <AnimatePresence mode="wait">
              {/* STAGE 0: INITIAL CHOICE */}
              {step2SubStage === "choice" && (
                <motion.div
                  key="step-2-choice"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono-code font-bold text-sky-400 uppercase tracking-wider">
                      คำถามวัดไลฟ์สไตล์
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      2. "โลกของคุณ... สว่างไสว หรือ มืดมิด?" 🌓
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      (เลือกโหมดการแสดงผลที่สบายตาที่สุดสำหรับคุณ)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => setStep2SubStage("dark_warn_1")}
                      className={`p-6 rounded-2xl bg-slate-900/90 border text-left transition-all group space-y-2 ${
                        selectedInStep === "dark"
                          ? "border-cobalt-500 bg-cobalt-500/20 ring-2 ring-cobalt-500/40"
                          : "border-slate-800 hover:border-cobalt-500 hover:bg-cobalt-500/10"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-base text-white font-mono-code">
                        <div className="flex items-center gap-2">
                          <Moon className="w-5 h-5 text-indigo-400" />
                          <span>Dark Mode (โหมดมืด)</span>
                        </div>
                        {selectedInStep === "dark" && <CheckCircle2 className="w-4 h-4 text-cobalt-400" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        สาย Dev ตัวจริง แสงแดดคือศัตรู แสบตากลางวัน นอนเช้าตื่นบ่าย
                      </p>
                    </button>

                    <button
                      onClick={() => setStep2SubStage("light_warn_1")}
                      className={`p-6 rounded-2xl bg-slate-900/90 border text-left transition-all group space-y-2 ${
                        selectedInStep === "light"
                          ? "border-amber-400 bg-amber-400/20 ring-2 ring-amber-400/40"
                          : "border-slate-800 hover:border-amber-400 hover:bg-amber-400/10"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-base text-white font-mono-code">
                        <div className="flex items-center gap-2">
                          <Sun className="w-5 h-5 text-amber-400" />
                          <span>Light Mode (โหมดสว่าง)</span>
                        </div>
                        {selectedInStep === "light" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        รักความสดใส ใช้ชีวิตกลางวัน นั่งเขียนโค้ดจิบกาแฟริมหน้าต่าง
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GOING TO LIGHT: STAGE 1 (ด้านมืดทวงวิญญาณ)           */}
              {/* ---------------------------------------------------- */}
              {step2SubStage === "light_warn_1" && (
                <motion.div
                  key="light-warn-1"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-sky-500/50 shadow-2xl space-y-6 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    ⚡
                  </motion.div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <span className="text-xs font-mono-code font-extrabold text-sky-400 uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 inline-block">
                      ⚡ คำเตือนจากจิตใต้สำนึก (The Dark Side Alert · รอบ 1/2)
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-display leading-snug pt-1">
                      "เมื่อเจ้าเข้าสู่ด้านมืดแล้ว... จะกลับไปด้านสว่างไม่ได้อีกต่อไป!" 😈
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      คิดจะหนีออกจากคอมฟอร์ตโซนของโปรแกรมเมอร์เหรอ? แสงแดดแสบตานะ ดาร์กโหมดคือสรวงสวรรค์ที่แท้จริง!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "dark");
                      }}
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-sky-300 font-bold font-mono-code text-xs sm:text-sm border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>🌙 ยอมจำนน... ขอซุกตัวในความมืดต่อ</span>
                    </button>

                    <button
                      onClick={() => setStep2SubStage("light_warn_2")}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black font-mono-code text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>ข้าไม่กลัวแดด! จะไปหาแสงสว่าง ☀️ (รอบ 2)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GOING TO LIGHT: STAGE 2 (จอขาวแสบตา)                */}
              {/* ---------------------------------------------------- */}
              {step2SubStage === "light_warn_2" && (
                <motion.div
                  key="light-warn-2"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-amber-500/50 shadow-2xl space-y-6 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🕶️
                  </motion.div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <span className="text-xs font-mono-code font-extrabold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                      🔥 คำเตือนระดับวิกฤต (Retina Hazard · รอบ 2/2)
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 font-display leading-snug pt-1">
                      "จอขาวจ้าแสบถึงขั้วหัวใจ... เจ้าแน่ใจนะว่าจะเปิดไฟ?" ☀️
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      แสงสีขาวกว่า 500 nits กำลังจะพุ่งตรงเข้าสู่รูม่านตาของคุณ... เตรียมแว่นตากันแดดไว้หรือยัง?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "dark");
                      }}
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold font-mono-code text-xs sm:text-sm border border-slate-700 transition-all text-center"
                    >
                      <span>🌙 แสบตาจริงด้วย... กลับไปความมืดดีกว่า</span>
                    </button>

                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "light");
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:scale-[1.02] text-slate-950 font-black font-mono-code text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/30 text-center"
                    >
                      <span>☀️ ยิงแสงมาเลย! ตาบอดก็ยอม! (ยืนยัน)</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GOING TO DARK: STAGE 1 (พระเตือนสติ: เจ้าเป็นคนดี)   */}
              {/* ---------------------------------------------------- */}
              {step2SubStage === "dark_warn_1" && (
                <motion.div
                  key="dark-warn-1"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-amber-500/50 shadow-2xl space-y-6 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🕊️
                  </motion.div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <span className="text-xs font-mono-code font-extrabold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                      🕊️ พระท่านเตือนสติ (Stay in the Light · รอบ 1/2)
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-display leading-snug pt-1">
                      "เจ้าเป็นคนดีอยู่แล้ว... อย่าเลย อานนท์!" 🙏
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      ชีวิตกำลังสว่างสดใส จิบน้ำส้ม ทำงานกลางวัน มีสุขภาพดี... จะถลำลึกเข้าสู่วงการนอนเช้าตื่นบ่ายทำไมโยม?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "light");
                      }}
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-bold font-mono-code text-xs sm:text-sm border border-slate-700 transition-all"
                    >
                      <span>☀️ สำนึกผิด... ขอเป็นคนดีอยู่ในแสงสว่าง</span>
                    </button>

                    <button
                      onClick={() => setStep2SubStage("dark_warn_2")}
                      className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black font-mono-code text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>สลัดความดีทิ้ง! ข้าจะไปดาร์กโหมด 😈 (รอบ 2)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------------------------------------------- */}
              {/* GOING TO DARK: STAGE 2 (บาปหนานะโยม: Welcome Dark)  */}
              {/* ---------------------------------------------------- */}
              {step2SubStage === "dark_warn_2" && (
                <motion.div
                  key="dark-warn-2"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-900/95 border-2 border-red-500/50 shadow-2xl space-y-6 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🧘‍♂️
                  </motion.div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <span className="text-xs font-mono-code font-extrabold text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 inline-block">
                      ⚠️ โอกาสกลับใจครั้งสุดท้าย (Final Repent · รอบ 2/2)
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-red-400 font-display leading-snug pt-1">
                      "บาปหนานะโยม... คิดดีแล้วแน่นะว่าจะทิ้งแสงสว่าง?" 🔥
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      เข้าดาร์กโหมดแล้ว กาแฟดำจะกลายเป็นน้ำเปล่า บั๊กจะโผล่มาหาตอนตีสอง... เจ้าแน่ใจนะว่าจะเปลี่ยน?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "light");
                      }}
                      className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold font-mono-code text-xs sm:text-sm border border-slate-700 transition-all"
                    >
                      <span>☀️ ถอยดีกว่า... แสงสว่างยังอบอุ่นอยู่</span>
                    </button>

                    <button
                      onClick={() => {
                        setStep2SubStage("choice");
                        handleSelectOption("mode", "dark");
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-700 hover:scale-[1.02] text-white font-black font-mono-code text-xs sm:text-sm transition-all shadow-xl shadow-red-500/20 text-center"
                    >
                      <span>🔥 มั่นใจเต็มร้อย! ส่งข้าเข้าสู่ด้านมืด! (ยืนยัน)</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ======================================================== */}
          {/* STEP 3: ROLE & FOCUS                                     */}
          {/* ======================================================== */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono-code font-bold text-purple-400 uppercase tracking-wider">
                  เป้าหมายการมาเยือน
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  3. "วันนี้คุณแวะมามองหาอะไรครับเนี่ย?" 💼
                </h3>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => handleSelectOption("roleFocus", "fullstack")}
                  className={`w-full p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group flex items-center justify-between ${
                    selectedInStep === "fullstack"
                      ? "border-cobalt-500 bg-cobalt-500/20 ring-2 ring-cobalt-500/40"
                      : "border-slate-800 hover:border-cobalt-500 hover:bg-cobalt-500/10"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cobalt-400" />
                      <span>Full-Stack Developer ตัวตึง</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      อยากดูความสามารถรอบด้าน ทำได้ครบวงจรตั้งแต่หน้าบ้านยันหลังบ้าน
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cobalt-400 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => handleSelectOption("roleFocus", "backend")}
                  className={`w-full p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group flex items-center justify-between ${
                    selectedInStep === "backend"
                      ? "border-sky-500 bg-sky-500/20 ring-2 ring-sky-500/40"
                      : "border-slate-800 hover:border-sky-500 hover:bg-sky-500/10"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                      <Zap className="w-4 h-4 text-sky-400" />
                      <span>Backend & System Architecture</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      อยากดูสถาปัตยกรรม WebSocket, Real-time KDS, Prisma DB และ Concurrency
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => handleSelectOption("roleFocus", "frontend")}
                  className={`w-full p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group flex items-center justify-between ${
                    selectedInStep === "frontend"
                      ? "border-emerald-500 bg-emerald-500/20 ring-2 ring-emerald-500/40"
                      : "border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/10"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>Frontend & UI/UX Experience</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      อยากดูความลื่นไหล 60fps, Optimistic UI, Animation และความสวยงาม
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => handleSelectOption("roleFocus", "tourist")}
                  className={`w-full p-4 rounded-2xl bg-slate-900/90 border text-left transition-all group flex items-center justify-between ${
                    selectedInStep === "tourist"
                      ? "border-amber-500 bg-amber-500/20 ring-2 ring-amber-500/40"
                      : "border-slate-800 hover:border-amber-500 hover:bg-amber-500/10"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>แวะมาส่องเฉยๆ (HR / เพื่อน / บังเอิญกดโดน)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      ขอทัวร์แบบรวมไฮไลต์เด็ดๆ ให้ดูเร็วๆ สบายๆ
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: FIRST SECTION TO VIEW                            */}
          {/* ======================================================== */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono-code font-bold text-emerald-400 uppercase tracking-wider">
                  จุดหมายแรก
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  4. "อยากดูอะไรก่อนเป็นอย่างแรก?" 🧭
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <button
                  onClick={() => handleSelectOption("landing", "projects")}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cobalt-500 text-left transition-all group hover:bg-cobalt-500/10 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <FolderGit2 className="w-6 h-6 text-cobalt-400 mb-2" />
                    <div className="font-bold text-sm text-white font-mono-code">ดูผลงานจริงก่อน</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    วาร์ปไปดู 4 โปรเจกต์เรือธง และ Architecture ทันที
                  </p>
                </button>

                <button
                  onClick={() => handleSelectOption("landing", "about")}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-left transition-all group hover:bg-sky-500/10 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <User className="w-6 h-6 text-sky-400 mb-2" />
                    <div className="font-bold text-sm text-white font-mono-code">รู้จักเจ้าของพอร์ต</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    ดูประวัติการทำงาน 6 ปี และความเป็นมา
                  </p>
                </button>

                <button
                  onClick={() => handleSelectOption("landing", "skills")}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500 text-left transition-all group hover:bg-purple-500/10 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="font-bold text-sm text-white font-mono-code">ดูแผนที่กลุ่มดาว</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    วาร์ปไปหมุนเล่น Skill Constellation Galaxy
                  </p>
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* STEP 5: THE ATM GAG: "ดำด้าน หรือ ดำเงา? ... เฮ้ยไม่ใช่!" */}
          {/* ======================================================== */}
          {step === 5 && (
            <AnimatePresence mode="wait">
              {/* SUB-STAGE 1: "ดำด้าน หรือ ดำเงา?" */}
              {step5SubStage === "matte_glossy" && (
                <motion.div
                  key="step-5-gag"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-wider">
                      🎬 คำถามสัมภาษณ์ระดับตำนาน (อาตี้ & เต๋อ)
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      5. "ดำด้าน หรือ ดำเงา?" 🕶️
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      (คิดให้ดี... ข้อนี้ไม่มีถูกผิด แต่อาตี้จะตัดสินคุณ)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={triggerStep5Punchline}
                      className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-500 text-left transition-all group hover:bg-slate-800/80 space-y-2"
                    >
                      <div className="flex items-center gap-2.5 font-bold text-base text-white font-mono-code">
                        <span className="w-5 h-5 rounded-md bg-neutral-800 border border-neutral-600 shadow-inner" />
                        <span>⚫ ดำด้าน (Matte Black)</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        เนียนตา ดุดัน ไม่สะท้อนแสง สไตล์มินิมอล
                      </p>
                    </button>

                    <button
                      onClick={triggerStep5Punchline}
                      className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400 text-left transition-all group hover:bg-amber-400/10 space-y-2"
                    >
                      <div className="flex items-center gap-2.5 font-bold text-base text-white font-mono-code">
                        <span className="w-5 h-5 rounded-md bg-black border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                        <span>✨ ดำเงา (Glossy Black)</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        เงาวับ สะท้อนแสงแยงตา หรูหราลักชูรี
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SUB-STAGE 2: "เฮ้ย ไม่ใช่!" PUNCHLINE (Pulsing Expand & Shrink Animation) */}
              {step5SubStage === "punchline" && (
                <motion.div
                  key="step-5-punchline"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: [0.7, 1.22, 0.92, 1.15, 0.97, 1],
                    rotate: [0, -3, 3, -2, 2, 0]
                  }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-14 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <motion.span
                    animate={{ scale: [1, 1.35, 1, 1.25, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl"
                  >
                    😱
                  </motion.span>
                  <motion.h3
                    animate={{ scale: [1, 1.08, 0.95, 1.06, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-amber-400 tracking-tight leading-tight"
                  >
                    "เฮ้ย ไม่ใช่! คำถามผิดสคริปต์ 555555"
                  </motion.h3>
                  <p className="text-sm sm:text-base font-mono-code text-slate-300">
                    (ขออภัยครับ หยิบโพยผิด... รอแป๊บ คำถามจริงมาละ!)
                  </p>
                </motion.div>
              )}

              {/* SUB-STAGE 3: THE ACTUAL REAL QUESTION */}
              {step5SubStage === "real_question" && (
                <motion.div
                  key="step-5-real"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono-code font-bold text-emerald-400 uppercase tracking-wider">
                      ☕ คำถามจริง (รอบนี้ไม่เล่นละ)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 leading-snug">
                      5. "ถ้าให้เลือกระหว่าง 'โค้ดไม่มีบั๊ก' กับ 'กาแฟฟรีตลอดชีพ' คุณจะเลือก...?" ☕
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => handleSelectOption("coffeeOrBug", "coffee")}
                      className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500 text-left transition-all group hover:bg-amber-500/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                          <Coffee className="w-4 h-4 text-amber-400" />
                          <span>กาแฟฟรีสิ! ☕</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          เพราะโค้ดที่ไม่มีบั๊ก มันไม่มีอยู่จริงในโลกนี้...
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                      onClick={() => handleSelectOption("coffeeOrBug", "bugfree")}
                      className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500 text-left transition-all group hover:bg-emerald-500/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-emerald-400" />
                          <span>โค้ดไม่มีบั๊ก! 🛡️</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          เพราะถ้าโค้ดไม่พังตอนตี 2 ชีวิตก็มีความสุขแล้ว!
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </button>

                    <button
                      onClick={() => handleSelectOption("coffeeOrBug", "bot")}
                      className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cobalt-500 text-left transition-all group hover:bg-cobalt-500/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-white font-mono-code flex items-center gap-2">
                          <Bot className="w-4 h-4 text-cobalt-400" />
                          <span>ให้ JakkBot ตอบแทนได้ไหม? 🤖</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          ขี้เกียจคิด ขอผ่านไปดูเว็บเลย!
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cobalt-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ======================================================== */}
          {/* STEP 6: "รอแป๊บ..." THE LEGENDARY ATM LOADING SCREEN     */}
          {/* ======================================================== */}
          {step === 6 && (
            <motion.div
              key="step-loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              {/* Giant "รอแป๊บ..." Title */}
              <motion.h2
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl font-black font-display tracking-tight text-white"
              >
                รอแป๊บ...
              </motion.h2>

              {/* Spinning ATM Radar / Spinner */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                <div className="absolute inset-0 rounded-full border-4 border-t-cobalt-500 border-r-sky-400 border-b-transparent border-l-transparent animate-spin" />
                <Clock className="w-6 h-6 text-cobalt-400 animate-pulse" />
              </div>

              {/* Dynamic Witty Status Text */}
              <div className="h-6">
                <motion.p
                  key={loadingTextIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm font-mono-code font-bold text-slate-300"
                >
                  {loadingMessages[loadingTextIdx]}
                </motion.p>
              </div>

              {/* Animated Progress Bar + Percentage */}
              <div className="w-64 space-y-2 pt-2">
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cobalt-500 via-emerald-400 to-amber-400"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <div className="text-[11px] font-mono-code text-slate-500 text-right">
                  {loadingProgress}%
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
