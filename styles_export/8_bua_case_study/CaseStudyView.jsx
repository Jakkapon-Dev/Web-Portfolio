import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { caseStudiesData } from '../data/caseStudiesData';
import { GithubIcon } from './Icons';
import { 
  ArrowLeft, 
  X, 
  FileCode2, 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Terminal, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CaseStudyView({ projectId, onClose, onSelectProject }) {
  const { lang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const study = caseStudiesData[projectId] || caseStudiesData.mystudentroom;
  const projectKeys = Object.keys(caseStudiesData);
  const currentIndex = projectKeys.indexOf(study.id);
  const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];
  const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];

  // Scroll to top on mount / change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-screen bg-[#0D1117] text-slate-100 py-6 px-4 sm:px-8 md:px-16 lg:px-28 font-sans selection:bg-emerald-500 selection:text-slate-950 text-left"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Sticky Header (Bua Style) */}
        <header className="sticky top-4 z-40 w-full flex items-center justify-between py-3 px-5 rounded-2xl bg-[#161B22]/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl">
          
          {/* Left Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono-code font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Index</span>
            </button>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono-code text-slate-400">
              <span>ROOT</span>
              <span className="text-slate-600">/</span>
              <span>JAKKAPON</span>
              <span className="text-slate-600">/</span>
              <span>PROJECTS</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-bold uppercase">{study.id}</span>
            </div>
          </div>

          {/* Right Action & Close */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-xs font-mono-code px-3 py-1 rounded-full bg-slate-800 text-emerald-300 border border-slate-700">
              {study.title}
            </span>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 hover:text-rose-200 text-xs font-mono-code font-bold transition-all"
            >
              <span>[ CLOSE FOLDER ]</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </header>

        {/* Main Folder Document Container (Bua Style Dark Card) */}
        <div className="rounded-3xl bg-[#161B22] border border-slate-700/80 p-6 sm:p-10 lg:p-14 shadow-2xl space-y-16">
          
          {/* File Tag Banner */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-semibold">{study.tagFile}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">{study.category}</span>
            </div>

            <div className="flex items-center gap-2">
              {study.github && (
                <a
                  href={study.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-code font-bold transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Project Title Header */}
          <div className="space-y-2">
            <div className="text-xs font-mono-code text-emerald-400 font-bold uppercase tracking-widest">
              Case Study #{study.number}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {study.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-mono-code mt-1">
              {t(study.subtitleEn, study.subtitleTh)}
            </p>
          </div>

          {/* CHAPTER 1: THE CHAOS & EMPATHY (Exact Bua Style) */}
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <span>{t(study.chapter1.titleEn, study.chapter1.titleTh)}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Narrative with Drop Cap + Context Simulation Box */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  <span className="float-left text-4xl sm:text-5xl font-black font-mono-code text-white mr-2.5 leading-none mt-1">
                    {study.chapter1.dropCap}
                  </span>
                  {t(study.chapter1.narrativeEn, study.chapter1.narrativeTh)}
                </p>

                {/* Context Diagram Simulation Box */}
                <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                    <span className="text-emerald-400 font-bold">
                      {t(study.chapter1.contextBoxTitleEn, study.chapter1.contextBoxTitleTh)}
                    </span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Live Simulation</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 font-mono-code text-xs">
                        UI
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-mono-code">Client Ingestion</div>
                        <div className="text-[11px] text-slate-400">Touch POS / Webhook / RFID</div>
                      </div>
                    </div>

                    <span className="text-emerald-400 font-mono-code text-xs">──▶</span>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 font-mono-code text-xs">
                        API
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-mono-code">Gateway & RBAC</div>
                        <div className="text-[11px] text-slate-400">Validation & Event Push</div>
                      </div>
                    </div>

                    <span className="text-cyan-400 font-mono-code text-xs">──▶</span>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 font-mono-code text-xs">
                        DB
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-mono-code">Prisma Store</div>
                        <div className="text-[11px] text-slate-400">Relational Consistency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Methodology Principle Cards (Exact Bua Ergonomics) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-code text-slate-400 mb-2">
                  {t(
                    'Rooted in cognitive ergonomics, we mapped specific role-based features to keep interfaces focused and error-free:',
                    'การวิเคราะห์กระบวนการทำงานเพื่อลดความผิดพลาดและเพิ่มความเร็วหน้างาน:'
                  )}
                </div>

                {study.chapter1.principles.map((p) => (
                  <div
                    key={p.num}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="font-bold text-sm text-white font-mono-code">
                      {t(p.titleEn, p.titleTh)}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {t(p.descEn, p.descTh)}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* CHAPTER 2: SYSTEM ARCHITECTURE & DATA FLOW */}
          <section className="space-y-8 pt-8 border-t border-slate-800">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t(study.chapter2.titleEn, study.chapter2.titleTh)}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono-code mt-1">
                {t(study.chapter2.leadEn, study.chapter2.leadTh)}
              </p>
            </div>

            {/* Step-by-Step Flow Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {study.chapter2.flowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 mb-2">
                      <span>Step 0{idx + 1}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                        {step.step}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-white font-mono-code">{step.tech}</div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {step.role}
                  </p>
                </div>
              ))}
            </div>

            {/* ASCII Architecture Diagram */}
            <div className="space-y-2">
              <span className="text-xs font-mono-code font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Architecture Diagram Trace</span>
              </span>
              <pre className="p-5 rounded-2xl bg-black border border-slate-800 text-emerald-400 font-mono-code text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{study.chapter2.diagram}</code>
              </pre>
            </div>

            {/* Technical Trade-Offs & Decisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {study.chapter2.tradeoffs.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono-code font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Decision: {item.decision}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t(item.rationaleEn, item.rationaleTh)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CHAPTER 3: DELIVERABLES & IMPACT */}
          <section className="space-y-6 pt-8 border-t border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t(study.chapter3.titleEn, study.chapter3.titleTh)}
            </h2>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {study.chapter3.metrics.map((m, idx) => (
                <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                  <div className="text-2xl sm:text-4xl font-black font-mono-code text-emerald-400">
                    {m.val}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono-code text-slate-400 mt-1">
                    {t(m.labelEn, m.labelTh)}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {t(study.chapter3.summaryEn, study.chapter3.summaryTh)}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {study.github && (
                <a
                  href={study.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source Code on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
              >
                ← Return to Overview
              </button>
            </div>
          </section>

          {/* Bottom Pagination Switcher */}
          <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onSelectProject(prevKey)}
              className="flex items-center gap-2 text-xs font-mono-code text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev: {caseStudiesData[prevKey].title}</span>
            </button>

            <button
              onClick={() => onSelectProject(nextKey)}
              className="flex items-center gap-2 text-xs font-mono-code text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>Next: {caseStudiesData[nextKey].title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
