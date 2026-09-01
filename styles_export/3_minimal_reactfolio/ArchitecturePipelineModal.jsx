import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2,
  Zap,
  Activity,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArchitecturePipelineModal({ project, isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!isOpen || !project) return null;

  const flow = project.architecture?.flow || [];
  const currentStep = flow[activeStepIndex] || flow[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0B0F17] text-slate-100 rounded-3xl border-2 border-slate-700 shadow-2xl p-6 sm:p-8 z-10 text-left selection:bg-emerald-500 selection:text-slate-950"
        >
          
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>Architecture & Data Flow Pipeline</span>
                </span>
                <span className="text-xs font-mono-code text-slate-400">#{project.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title} <span className="text-slate-400 text-base font-normal font-mono-code">— System Blueprint</span>
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

          {/* VISUAL INTERACTIVE PIPELINE FLOWCHART */}
          <div className="my-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span>{t('Interactive Pipeline Nodes (Click Node to Inspect)', 'แผนภาพ Pipeline สถาปัตยกรรม (คลิกเพื่อดูรายละเอียดแต่ละ Node)')}</span>
              </h4>
              <span className="text-[11px] font-mono-code text-emerald-400 font-semibold">
                Latency: &lt; 50ms Real-Time
              </span>
            </div>

            {/* Pipeline Stage Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {flow.map((item, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                      isActive
                        ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Active Glow Accent */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                    )}

                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                        <span className={isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          STAGE 0{idx + 1}
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono-code">
                          {idx === 0 ? 'Ingestion' : idx === 1 ? 'Gateway' : idx === 2 ? 'Logic' : 'Storage'}
                        </span>
                      </div>

                      <div className="font-bold text-sm text-white font-mono-code group-hover:text-emerald-300 transition-colors">
                        {item.step}
                      </div>

                      <div className="text-[11px] text-emerald-400 font-mono-code mt-0.5 truncate">
                        {item.tech}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                      {item.role}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Telemetry Inspector */}
            {currentStep && (
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-800/60 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Node Telemetry: {currentStep.step}</span>
                  </span>
                  <span className="text-slate-400">Tech: {currentStep.tech}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  <strong>Role & Responsibilities:</strong> {currentStep.role}
                </p>
              </motion.div>
            )}
          </div>

          {/* ASCII / Visual Flow Diagram Trace */}
          {project.architecture?.diagramAscii && (
            <div className="my-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture Topology & Gateway Routing</span>
                </span>
                <span className="text-[11px] font-mono-code text-slate-400">Type-Safe Relational Sync</span>
              </div>

              <pre className="p-5 rounded-2xl bg-black border border-slate-800 text-emerald-400 font-mono-code text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner">
                <code>{project.architecture.diagramAscii}</code>
              </pre>
            </div>
          )}

          {/* Engineering Highlights */}
          <div className="my-6 space-y-2">
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('Core Engineering Highlights', 'จุดเด่นทางวิศวกรรม')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {(lang === 'th' ? project.keyHighlightsTh : project.keyHighlightsEn)?.map((h, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-code text-slate-400">
              Stack: {project.techStack?.join(' • ')}
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              {t('Close Flow View', 'ปิดหน้าต่าง Flow')}
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
