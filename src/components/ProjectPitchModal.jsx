import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectPitchData } from '../data/projectPitchData';
import { 
  X, 
  Mic, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Star, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Target,
  Wrench,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ProjectPitchModal({ projectId, isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' | 'star' | 'talking-points'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !projectId) return null;

  const data = projectPitchData[projectId] || projectPitchData.mystudentroom;

  const handleCopyPitch = () => {
    const textToCopy = lang === 'th' ? data.pitchScriptTh : data.pitchScriptEn;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#38BDF8']
      });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-2xl p-6 sm:p-8 z-10 text-left selection:bg-amber-500 selection:text-slate-950 space-y-6"
        >
          
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Mic className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interview Pitch & Explanation Guide</span>
                </span>
                <span className="text-xs font-mono-code text-slate-400">{data.category}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {data.title} <span className="text-slate-500 dark:text-slate-400 text-base font-normal font-mono-code">— {t('Project Presentation Cheat-Sheet', 'แนวทางการอธิบายโปรเจกต์')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code mt-0.5">
                {t('Ready-to-use elevator pitch and structured STAR method breakdown for technical interviews.', 'สคริปต์พูดแนะนำ 30 วิ และโครงสร้าง STAR สำหรับตอบสัมภาษณ์ได้อย่างมั่นใจ')}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            
            {/* Tab 1: 30s Pitch */}
            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all ${
                activeTab === 'pitch'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t('1. 30s Elevator Pitch Script', '1. สคริปต์พูดแนะนำ 30 วินาที')}</span>
            </button>

            {/* Tab 2: STAR Method */}
            <button
              onClick={() => setActiveTab('star')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all ${
                activeTab === 'star'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>{t('2. STAR Method Breakdown', '2. โครงสร้าง STAR Method')}</span>
            </button>

            {/* Tab 3: Key Talking Points */}
            <button
              onClick={() => setActiveTab('talking-points')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all ${
                activeTab === 'talking-points'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{t('3. Key Technical Talking Points', '3. หมัดเด็ดทางเทคนิคที่ควรเน้น')}</span>
            </button>

          </div>

          {/* TAB 1: 30-SECOND ELEVATOR PITCH SCRIPT */}
          {activeTab === 'pitch' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{t('30-Second Interview Elevator Pitch (Thai Version):', 'สคริปต์พูดแนะนำตัวโปรเจกต์ 30 วินาที (ฉบับภาษาไทย):')}</span>
                  </span>

                  <button
                    onClick={handleCopyPitch}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono-code font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('Copied Script!', 'คัดลอกสคริปต์แล้ว!') : t('Copy Script', 'คัดลอกสคริปต์')}</span>
                  </button>
                </div>

                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
                  "{data.pitchScriptTh}"
                </p>
              </div>

              {/* English Script Box */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <span className="text-xs font-mono-code font-bold text-sky-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>30-Second Interview Elevator Pitch (English Version):</span>
                </span>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  "{data.pitchScriptEn}"
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: STAR METHOD BREAKDOWN */}
          {activeTab === 'star' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Situation */}
                <div className="p-5 rounded-3xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs font-mono-code">
                      S
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                      {t(data.star.situation.titleEn, data.star.situation.titleTh)}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(data.star.situation.descEn, data.star.situation.descTh)}
                  </p>
                </div>

                {/* Task */}
                <div className="p-5 rounded-3xl bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs font-mono-code">
                      T
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                      {t(data.star.task.titleEn, data.star.task.titleTh)}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(data.star.task.descEn, data.star.task.descTh)}
                  </p>
                </div>

                {/* Action */}
                <div className="p-5 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs font-mono-code">
                      A
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                      {t(data.star.action.titleEn, data.star.action.titleTh)}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(data.star.action.descEn, data.star.action.descTh)}
                  </p>
                </div>

                {/* Result */}
                <div className="p-5 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs font-mono-code">
                      R
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                      {t(data.star.result.titleEn, data.star.result.titleTh)}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(data.star.result.descEn, data.star.result.descTh)}
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: KEY TECHNICAL TALKING POINTS */}
          {activeTab === 'talking-points' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {data.talkingPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white font-mono-code">
                      {point.topic}
                    </h5>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {t(point.descEn, point.descTh)}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400">
              Tip: Read the STAR summary to understand the project in 15 seconds.
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono-code shadow-md shadow-amber-500/20 transition-all"
            >
              {t('Close Guide', 'ปิดหน้าต่าง')}
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
