import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { caseStudiesData } from '../data/caseStudiesData';
import { projectPitchData } from '../data/projectPitchData';
import { GithubIcon } from './Icons';
import VisualArchitectureDiagram from './VisualArchitectureDiagram';
import { 
  ArrowLeft, 
  X, 
  FileCode2, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Workflow,
  Cpu,
  Database,
  Code2,
  Table,
  Gauge,
  Box,
  Lightbulb,
  Trophy,
  Copy,
  Check,
  Zap,
  Activity,
  Bookmark,
  Calendar,
  User,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CaseStudyView({ projectId, onClose, onSelectProject }) {
  const { lang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');

  const study = caseStudiesData[projectId] || caseStudiesData.mystudentroom;
  const pitchInfo = projectPitchData[projectId] || projectPitchData.mystudentroom;
  
  const projectKeys = Object.keys(caseStudiesData);
  const currentIndex = projectKeys.indexOf(study.id);
  const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];
  const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];

  // Scroll to top on mount or project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2 }}
      className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 py-6 px-4 sm:px-8 md:px-12 lg:px-20 font-sans selection:bg-amber-500 selection:text-slate-950 text-left"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ======================================================== */}
        {/* TOP STICKY BAR WITH DIRECT PROJECT SWITCHER BUTTONS      */}
        {/* ======================================================== */}
        <header className="sticky top-4 z-40 w-full flex flex-wrap items-center justify-between gap-3 py-3 px-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-md">
          
          {/* Left Return Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-mono-code font-bold shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Back', 'กลับ')}</span>
            </button>

            <span className="text-xs font-mono-code font-bold text-slate-400 hidden xl:inline">
              CASE STUDIES:
            </span>
          </div>

          {/* Center Direct Project Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            {projectKeys.map((pKey, idx) => {
              const pData = caseStudiesData[pKey];
              const isActive = study.id === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => onSelectProject(pKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="text-[10px] opacity-75">#{pData.number}</span>
                  <span>{pData.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProject(prevKey)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono-code transition-colors"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectProject(nextKey)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono-code transition-colors"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500/10 hover:text-rose-500 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-mono-code font-bold transition-all ml-1"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </header>

        {/* ======================================================== */}
        {/* EDITORIAL ARTICLE HERO HEADER                            */}
        {/* ======================================================== */}
        <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400">
              CASE STUDY #{study.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono-code text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {study.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {study.title}: <span className="text-slate-500 dark:text-slate-400 font-normal">{t(study.subtitleEn, study.subtitleTh)}</span>
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono-code text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-500" />
              <span>Jakkapon Wapakpet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>4 Min Read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-emerald-500" />
              <span>Full-Stack System Design</span>
            </div>

            {study.github && (
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-all font-bold"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

        </section>

        {/* ======================================================== */}
        {/* MAIN BODY WITH STICKY TABLE OF CONTENTS SIDEBAR          */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT STICKY TABLE OF CONTENTS (25%) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400 block">
                Table of Contents
              </span>

              <nav className="space-y-1 text-xs font-mono-code">
                <button
                  onClick={() => scrollToSection('sec-problem')}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    activeSection === 'sec-problem'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>01. The Problem</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => scrollToSection('sec-architecture')}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    activeSection === 'sec-architecture'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>02. Architecture & Flow</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => scrollToSection('sec-decisions')}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    activeSection === 'sec-decisions'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>03. Trade-offs</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => scrollToSection('sec-results')}
                  className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    activeSection === 'sec-results'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>04. Impact Metrics</span>
                  <span>→</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* RIGHT SPACIOUS ARTICLE (75%) */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* ---------------------------------------------------- */}
            {/* SECTION 1: THE PROBLEM & CONTEXT                     */}
            {/* ---------------------------------------------------- */}
            <section id="sec-problem" className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono-code font-bold text-amber-500 uppercase">
                  Chapter 01 // The Problem & Background
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {t(study.chapter1.titleEn, study.chapter1.titleTh)}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <span className="float-left text-4xl sm:text-5xl font-black font-mono-code text-amber-500 mr-3 leading-none mt-1">
                  {study.chapter1.dropCap}
                </span>
                {t(study.chapter1.narrativeEn, study.chapter1.narrativeTh)}
              </p>

              {/* 3 Problem Points as styled cards */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono-code font-bold text-slate-700 dark:text-slate-300 block">
                  {t('Key Friction Points & Design Requirements:', 'จุดติดขัดหน้างานและความต้องการในการออกแบบ:')}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {study.chapter1.principles.map((p) => (
                    <div
                      key={p.num}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 flex flex-col justify-between"
                    >
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-mono-code flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold shrink-0">
                          {p.num}
                        </span>
                        <span>{t(p.titleEn, p.titleTh)}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {t(p.descEn, p.descTh)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ---------------------------------------------------- */}
            {/* SECTION 2: SYSTEM ARCHITECTURE & INTERACTIVE FLOW   */}
            {/* ---------------------------------------------------- */}
            <section id="sec-architecture" className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono-code font-bold text-sky-500 uppercase">
                  Chapter 02 // Full-Scale Architecture Canvas
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {t(study.chapter2.titleEn, study.chapter2.titleTh)}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code">
                  {t(study.chapter2.leadEn, study.chapter2.leadTh)}
                </p>
              </div>

              {/* Spacious Full-Width Interactive Architecture Canvas */}
              <VisualArchitectureDiagram projectId={study.id} />
            </section>

            {/* ---------------------------------------------------- */}
            {/* SECTION 3: ENGINEERING DECISIONS & TRADE-OFFS       */}
            {/* ---------------------------------------------------- */}
            <section id="sec-decisions" className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono-code font-bold text-purple-500 uppercase">
                  Chapter 03 // Technical Decisions & Trade-Offs
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {t('Architectural Trade-offs & Decisions', 'เหตุผลทางวิศวกรรมและการตัดสินใจเชิงสถาปัตยกรรม')}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.chapter2.tradeoffs.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Decision #{idx + 1}: {item.decision}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {t(item.rationaleEn, item.rationaleTh)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------------------------------------------------- */}
            {/* SECTION 4: IMPACT METRICS & DELIVERABLES            */}
            {/* ---------------------------------------------------- */}
            <section id="sec-results" className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono-code font-bold text-emerald-500 uppercase">
                  Chapter 04 // Measurable Results & Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {t(study.chapter3.titleEn, study.chapter3.titleTh)}
                </h2>
              </div>

              {/* 3 Hero Metrics Cards */}
              <div className="grid grid-cols-3 gap-4">
                {study.chapter3.metrics.map((m, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center">
                    <div className="text-2xl sm:text-4xl font-extrabold font-mono-code text-amber-500">
                      {m.val}
                    </div>
                    <div className="text-xs font-mono-code text-slate-500 dark:text-slate-400 mt-2 font-semibold">
                      {t(m.labelEn, m.labelTh)}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {t(study.chapter3.summaryEn, study.chapter3.summaryTh)}
              </p>

              {/* Bottom Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                {study.github && (
                  <a
                    href={study.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all font-mono-code"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Inspect Source Code on GitHub</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all border border-slate-200 dark:border-slate-700 font-mono-code"
                >
                  ← Return to Overview
                </button>
              </div>
            </section>

          </main>

        </div>

      </div>
    </motion.div>
  );
}
