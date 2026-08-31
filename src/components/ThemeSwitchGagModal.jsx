import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Sparkles, Zap, Flame, ShieldAlert, ArrowRight } from 'lucide-react';

export default function ThemeSwitchGagModal({ isOpen, targetMode, onClose, onConfirm }) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [stage, setStage] = useState(1); // 1, 2, 3 (final transformation)

  if (!isOpen) return null;

  const isGoingDark = targetMode === 'dark';

  const handleNextStage = () => {
    if (stage === 1) {
      setStage(2);
    } else if (stage === 2) {
      setStage(3);
      setTimeout(() => {
        onConfirm(targetMode);
        setStage(1);
      }, 1800);
    }
  };

  const handleCancel = () => {
    setStage(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center font-sans border-2 shadow-2xl overflow-hidden ${
            isGoingDark
              ? 'bg-[#0F141C] text-slate-100 border-amber-500/40 shadow-amber-500/10'
              : 'bg-[#151B26] text-slate-100 border-sky-400/40 shadow-sky-400/10'
          }`}
        >
          {/* ======================================================== */}
          {/* GOING TO DARK MODE (FROM LIGHT -> DARK)                  */}
          {/* ======================================================== */}
          {isGoingDark && (
            <AnimatePresence mode="wait">
              {/* STAGE 1: พระเตือนสติ */}
              {stage === 1 && (
                <motion.div
                  key="dark-stage-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🕊️
                  </motion.div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                      🕊️ พระท่านเตือนสติ (Stay in the Light · รอบ 1/2)
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight pt-1">
                      "เจ้าเป็นคนดีอยู่แล้ว... อย่าเลย อานนท์!" 🙏
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      ชีวิตกำลังสว่างสดใส จิบน้ำส้ม ทำงานกลางวัน มีสุขภาพดี... จะถลำลึกเข้าสู่วงการนอนเช้าตื่นบ่ายทำไมโยม?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={handleCancel}
                      className="p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-bold font-mono-code text-xs transition-all border border-slate-700"
                    >
                      ☀️ สำนึกผิด... ขอเป็นคนดีอยู่ในแสงสว่าง
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold font-mono-code text-xs transition-all shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>สลัดความดีทิ้ง! ข้าจะไปดาร์กโหมด 😈</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: บาปหนานะโยม */}
              {stage === 2 && (
                <motion.div
                  key="dark-stage-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🧘‍♂️
                  </motion.div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-code font-bold text-red-400 uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 inline-block">
                      ⚠️ โอกาสกลับใจครั้งสุดท้าย (Final Repent · รอบ 2/2)
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight pt-1 text-red-400">
                      "บาปหนานะโยม... คิดดีแล้วแน่นะว่าจะทิ้งแสงสว่าง?" 🔥
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      เข้าดาร์กโหมดแล้ว กาแฟดำจะกลายเป็นน้ำเปล่า บั๊กจะโผล่มาหาตอนตีสอง... เจ้าแน่ใจนะว่าจะเปลี่ยน?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={handleCancel}
                      className="p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-bold font-mono-code text-xs transition-all border border-slate-700"
                    >
                      ☀️ ถอยดีกว่า... แสงสว่างยังอบอุ่นอยู่
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-700 hover:scale-[1.02] text-white font-black font-mono-code text-xs transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-1.5"
                    >
                      <span>🔥 มั่นใจเต็มร้อย! ส่งข้าเข้าสู่ด้านมืด!</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: WELCOME TO THE DARK SIDE */}
              {stage === 3 && (
                <motion.div
                  key="dark-stage-3"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: [0.7, 1.2, 1] }}
                  className="py-8 space-y-4"
                >
                  <span className="text-6xl animate-bounce inline-block">😈</span>
                  <h3 className="text-3xl sm:text-4xl font-black font-display text-amber-400 tracking-tight">
                    "Welcome to the Dark Side..."
                  </h3>
                  <p className="text-sm font-mono-code text-slate-300">
                    ยินดีต้อนรับสู่ด้านมืดอย่างเป็นทางการ! ราตรีนี้อีกยาวไกล... 🌙
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ======================================================== */}
          {/* GOING TO LIGHT MODE (FROM DARK -> LIGHT)                  */}
          {/* ======================================================== */}
          {!isGoingDark && (
            <AnimatePresence mode="wait">
              {/* STAGE 1: ด้านมืดทวงวิญญาณ */}
              {stage === 1 && (
                <motion.div
                  key="light-stage-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    ⚡
                  </motion.div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-code font-bold text-sky-400 uppercase tracking-widest px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 inline-block">
                      ⚡ คำเตือนจากจิตใต้สำนึก (The Dark Side Alert · รอบ 1/2)
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight pt-1">
                      "เมื่อเจ้าเข้าสู่ด้านมืดแล้ว... จะกลับไปด้านสว่างไม่ได้อีกต่อไป!" 😈
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      คิดจะหนีออกจากคอมฟอร์ตโซนของโปรแกรมเมอร์เหรอ? แสงแดดแสบตานะ ดาร์กโหมดคือสรวงสวรรค์ที่แท้จริง!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={handleCancel}
                      className="p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-sky-300 font-bold font-mono-code text-xs transition-all border border-slate-700"
                    >
                      🌙 ยอมจำนน... ขอซุกตัวในความมืดต่อ
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold font-mono-code text-xs transition-all shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <span>ข้าไม่กลัวแดด! จะไปหาแสงสว่าง ☀️</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: จอขาวแสบตา */}
              {stage === 2 && (
                <motion.div
                  key="light-stage-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl shadow-inner"
                  >
                    🕶️
                  </motion.div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                      🔥 คำเตือนระดับวิกฤต (Retina Hazard · รอบ 2/2)
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight pt-1 text-amber-400">
                      "จอขาวจ้าแสบถึงขั้วหัวใจ... เจ้าแน่ใจนะว่าจะเปิดไฟ?" ☀️
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      แสงสีขาวกว่า 500 nits กำลังจะพุ่งตรงเข้าสู่รูม่านตาของคุณ... เตรียมแว่นตากันแดดไว้หรือยัง?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={handleCancel}
                      className="p-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-bold font-mono-code text-xs transition-all border border-slate-700"
                    >
                      🌙 แสบตาจริงด้วย... กลับไปความมืดดีกว่า
                    </button>
                    <button
                      onClick={handleNextStage}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 hover:scale-[1.02] text-slate-950 font-black font-mono-code text-xs transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-1.5"
                    >
                      <span>☀️ ยิงแสงมาเลย! ตาบอดก็ยอม!</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: THE LIGHT EMBRACED */}
              {stage === 3 && (
                <motion.div
                  key="light-stage-3"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: [0.7, 1.2, 1] }}
                  className="py-8 space-y-4"
                >
                  <span className="text-6xl animate-bounce inline-block">✨</span>
                  <h3 className="text-3xl sm:text-4xl font-black font-display text-amber-300 tracking-tight">
                    "ยินดีด้วย... เจ้าได้หลุดพ้นจากด้านมืดแล้ว!"
                  </h3>
                  <p className="text-sm font-mono-code text-slate-300">
                    สว่างจ้าสดใส ตาสว่างโร่ พร้อมสู้งานยามเช้า! ☀️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
