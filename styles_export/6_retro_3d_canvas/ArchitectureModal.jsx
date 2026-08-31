import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Layers, Cpu, Database, Server, Terminal, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArchitectureModal({ project, isOpen, onClose }) {
  const { lang, t } = useLanguage();

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        
        {/* Modal Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0F172A] text-slate-100 rounded-3xl border-2 border-slate-700 shadow-2xl p-6 sm:p-8 z-10 text-left"
        >
          
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                  Architecture Blueprint
                </span>
                <span className="text-xs font-mono-code text-slate-400">#{project.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title} <span className="text-slate-400 text-lg font-normal font-mono-code">— System Architecture</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono-code mt-0.5">
                {t(project.subtitleEn, project.subtitleTh)}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flow Step-by-Step Cards */}
          <div className="my-6 space-y-4">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{t('Data Pipeline & Request Flow', 'ลำดับการประมวลผลข้อมูลในระบบ')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture?.flow?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 mb-1">
                      <span>Step 0{idx + 1}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                        {item.step}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-white font-mono-code">{item.tech}</div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ASCII / Visual Diagram Trace */}
          {project.architecture?.diagramAscii && (
            <div className="my-6 space-y-2">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>{t('Architecture Diagram Trace', 'แผนภาพเชื่อมโยงระบบ (ASCII Trace)')}</span>
              </h4>

              <pre className="p-4 sm:p-5 rounded-2xl bg-black border border-slate-800 text-emerald-400 font-mono-code text-[11px] sm:text-xs overflow-x-auto leading-relaxed">
                <code>{project.architecture.diagramAscii}</code>
              </pre>
            </div>
          )}

          {/* Key Highlights */}
          <div className="my-6 space-y-2">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('Core Engineering Highlights', 'จุดเด่นทางวิศวกรรม')}</span>
            </h4>

            <div className="space-y-1.5 pt-1">
              {(lang === 'th' ? project.keyHighlightsTh : project.keyHighlightsEn)?.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-500">
              Tech Stack: {project.techStack?.join(' • ')}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              {t('Close', 'ปิดหน้าต่าง')}
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
