import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { caseStudiesData } from '../data/caseStudiesData';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import VisualArchitectureDiagram from './VisualArchitectureDiagram';
import JakkBotMascot from './JakkBotMascot';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Sparkles,
  Workflow,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Bug,
  ShieldCheck,
  Layers,
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaseStudyView({ projectId, onClose, onSelectProject }) {
  const { t, lang } = useLanguage();
  const backBtnRef = useRef(null);
  const triggerRef = useRef(null);

  const study = caseStudiesData[projectId] || caseStudiesData.omnipos;
  const projectConfig = portfolioData.featuredProjects.find(p => p.id === study.id);
  const theme = projectConfig?.theme || {
    accent: '#E8611C',
    btnPrimary: 'bg-draft-500 hover:bg-draft-400 text-white',
    badgeClass: 'bg-draft-500/10 text-draft-600 dark:text-draft-400 border-draft-500/30'
  };
  const projectKeys = Object.keys(caseStudiesData);
  const currentIndex = projectKeys.indexOf(projectId);
  const nextKey = projectKeys[(currentIndex + 1) % projectKeys.length];
  const prevKey = projectKeys[(currentIndex - 1 + projectKeys.length) % projectKeys.length];

  // Scroll to top on mount or project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  // This view replaces the whole page — Escape returns to the portfolio,
  // and focus lands on "Back to Portfolio" then restores to whatever
  // triggered it (the project card's "Project Story" button) on unmount.
  useEffect(() => {
    triggerRef.current = document.activeElement;
    backBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2 }}
      className="w-full min-h-screen bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-100 py-6 px-4 sm:px-8 lg:px-12 xl:px-16 font-sans selection:bg-draft-500 selection:text-white text-left"
    >
      <div className="w-full max-w-[1560px] mx-auto space-y-8">
        
        {/* ======================================================== */}
        {/* TOP STICKY BAR WITH DIRECT PROJECT SWITCHER BUTTONS      */}
        {/* ======================================================== */}
        <header className="sticky top-4 z-40 w-full flex flex-wrap items-center justify-between gap-3 py-3 px-5 sm:px-6 rounded-[8px] bg-white/95 dark:bg-blueprint-900/95 backdrop-blur-xl border border-blueprint-200 dark:border-blueprint-800 shadow-lg">
          
          {/* Left Return Button */}
          <div className="flex items-center gap-3">
            <button
              ref={backBtnRef}
              onClick={onClose}
              className="p-2 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-draft-500 hover:text-white text-blueprint-700 dark:text-blueprint-300 transition-all flex items-center gap-1.5 text-xs font-mono-code font-bold shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{t('Back to Portfolio', 'กลับหน้าหลัก')}</span>
            </button>

            <span className="text-xs font-mono-code font-bold text-blueprint-400 hidden xl:inline">
              SELECT PROJECT:
            </span>
          </div>

          {/* Center Direct Project Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700">
            {projectKeys.map((pKey) => {
              const pData = caseStudiesData[pKey];
              const isActive = study.id === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => onSelectProject(pKey)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-draft-500 text-white shadow-md shadow-draft-500/20'
                      : 'text-blueprint-600 dark:text-blueprint-300 hover:bg-white dark:hover:bg-blueprint-700'
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
              className="p-2 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-blueprint-200 dark:hover:bg-blueprint-700 text-blueprint-600 dark:text-blueprint-300 text-xs font-mono-code transition-colors"
              title="Previous Project"
              aria-label={t('Previous project', 'โปรเจกต์ก่อนหน้า')}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => onSelectProject(nextKey)}
              className="p-2 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-blueprint-200 dark:hover:bg-blueprint-700 text-blueprint-600 dark:text-blueprint-300 text-xs font-mono-code transition-colors"
              title="Next Project"
              aria-label={t('Next project', 'โปรเจกต์ถัดไป')}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-draft-500/10 hover:text-draft-500 text-blueprint-700 dark:text-blueprint-300 border border-blueprint-200 dark:border-blueprint-700 text-xs font-mono-code font-bold transition-all ml-1"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

        </header>

        {/* ======================================================== */}
        {/* EDITORIAL ARTICLE HERO HEADER                            */}
        {/* ======================================================== */}
        <section className="p-8 sm:p-12 lg:p-14 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-6">
          {/* JAKK-BOT Intro Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 pb-4 border-b border-blueprint-100 dark:border-blueprint-800">
            <div className="shrink-0">
              <JakkBotMascot projectId={study.id} expression="intro" lang={lang} />
            </div>
            <div className="space-y-1 pb-0 sm:pb-2">
              <p className="text-[11px] font-mono-code text-blueprint-500 dark:text-blueprint-400 uppercase tracking-widest">JAKK-BOT is narrating this story</p>
              <p className="text-xs font-mono-code text-blueprint-400 dark:text-blueprint-500">Follow along through each part below</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3.5 py-1 rounded-full text-xs font-mono-code font-bold ${theme.badgeClass || 'bg-draft-500/10 border border-draft-500/30 text-draft-600 dark:text-draft-400'}`}>
              PROJECT STORY #{study.number}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-blueprint-100 dark:bg-blueprint-800 text-xs font-mono-code text-blueprint-600 dark:text-blueprint-300 border border-blueprint-200 dark:border-blueprint-700">
              {study.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-blueprint-900 dark:text-white tracking-tight leading-[1.15]">
            {study.title}: <span className="text-blueprint-500 dark:text-blueprint-400 font-normal">{t(study.subtitleEn, study.subtitleTh)}</span>
          </h1>

          {/* Author & Read Meta */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-blueprint-100 dark:border-blueprint-800 text-xs font-mono-code text-blueprint-500 dark:text-blueprint-400">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-draft-500 text-white font-bold flex items-center justify-center text-[10px]">
                JW
              </span>
              <span className="font-bold text-blueprint-800 dark:text-blueprint-200">Jakkapon Wapakpet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>4 Min Read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-emerald-500" />
              <span>{t('Project Story · Full-Stack Engineering', 'เรื่องราวโปรเจกต์ · วิศวกรรมระบบ')}</span>
            </div>

            {study.github && (
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-draft-500 hover:text-white text-blueprint-700 dark:text-blueprint-300 transition-all font-bold"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

        </section>

        {/* ======================================================== */}
        {/* FULL-WIDTH ARTICLE SECTIONS (EDGE-TO-EDGE EXPANDED)      */}
        {/* ======================================================== */}
        <div className="w-full space-y-12">
          
          {/* ---------------------------------------------------- */}
          {/* SECTION 1: THE PROBLEM & CONTEXT                     */}
          {/* ---------------------------------------------------- */}
          <section id="sec-problem" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-8">
            {/* Mascot row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5 pb-2">
              <div className="shrink-0">
                <JakkBotMascot projectId={study.id} expression="origin" lang={lang} />
              </div>
              <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                <span className="text-xs font-mono-code font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                  🧩 Part 01 · Origin Story — Why This Was Built
                </span>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                  {t(study.chapter1.titleEn, study.chapter1.titleTh)}
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-blueprint-600 dark:text-blueprint-300 leading-relaxed font-normal">
              <span className="float-left text-5xl sm:text-6xl font-black font-mono-code mr-4 leading-none mt-1" style={{ color: theme.accent }}>
                {study.chapter1.dropCap}
              </span>
              {t(study.chapter1.narrativeEn, study.chapter1.narrativeTh)}
            </p>

            {/* 3 Problem Points as wide styled cards */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-code font-bold text-blueprint-700 dark:text-blueprint-300 block">
                {t('Key Friction Points & Design Requirements:', 'จุดติดขัดหน้างานและความต้องการในการออกแบบ:')}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {study.chapter1.principles.map((p) => (
                  <div
                    key={p.num}
                    className="p-6 rounded-[8px] bg-blueprint-50 dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/80 space-y-3 flex flex-col justify-between"
                  >
                    <div className="font-bold text-sm sm:text-base text-blueprint-900 dark:text-white font-mono-code flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-[4px] bg-draft-500/20 text-draft-500 flex items-center justify-center text-xs font-bold shrink-0">
                        {p.num}
                      </span>
                      <span>{t(p.titleEn, p.titleTh)}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-blueprint-600 dark:text-blueprint-300 leading-relaxed font-normal">
                      {t(p.descEn, p.descTh)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 2: FULL-WIDTH SYSTEM ARCHITECTURE CANVAS     */}
          {/* ---------------------------------------------------- */}
          <section id="sec-architecture" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
              <div className="shrink-0">
                <JakkBotMascot projectId={study.id} expression="architecture" lang={lang} />
              </div>
              <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                <span className="text-xs font-mono-code font-bold text-sky-500 uppercase tracking-widest">
                  ⚡ Part 02 · How It Works — System Architecture & Data Flow
                </span>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                  {t(study.chapter2.titleEn, study.chapter2.titleTh)}
                </h2>
                <p className="text-xs sm:text-sm text-blueprint-500 dark:text-blueprint-400 font-mono-code">
                  {t(study.chapter2.leadEn, study.chapter2.leadTh)}
                </p>
              </div>
            </div>

            {/* Spacious Full-Width Interactive Architecture Canvas */}
            <VisualArchitectureDiagram projectId={study.id} />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 3: STEP-BY-STEP ENGINEERING METHODOLOGY      */}
          {/* ---------------------------------------------------- */}
          {study.methodology && (
            <section id="sec-methodology" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
                <div className="shrink-0">
                  <JakkBotMascot projectId={study.id} expression="architecture" lang={lang} />
                </div>
                <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                  <span className="text-xs font-mono-code font-bold text-sky-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Part 03 · Deep Implementation & Engineering Process
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                    {t(study.methodology.titleEn, study.methodology.titleTh)}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {study.methodology.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-[8px] bg-blueprint-50 dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/80 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className="px-2.5 py-0.5 rounded-[3px] text-[10px] font-mono-code font-bold inline-block mb-2 border"
                        style={{
                          backgroundColor: `${theme.accent}15`,
                          color: theme.accent,
                          borderColor: `${theme.accent}40`,
                        }}
                      >
                        {step.phase}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-blueprint-900 dark:text-white font-mono-code mb-2">
                        {t(step.titleEn, step.titleTh)}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-blueprint-600 dark:text-blueprint-300 leading-relaxed font-normal">
                      {t(step.detailEn, step.detailTh)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- */}
          {/* SECTION 4: THE WAR STORY (HARDEST BUG SOLVED)        */}
          {/* ---------------------------------------------------- */}
          {study.warStory && (
            <section id="sec-warstory" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
                <div className="shrink-0">
                  <JakkBotMascot projectId={study.id} expression="decision" lang={lang} />
                </div>
                <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                  <span className="text-xs font-mono-code font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Bug className="w-4 h-4" /> Part 04 · The War Story — Hardest Bug & Edge Case Solved
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                    {t(study.warStory.titleEn, study.warStory.titleTh)}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem Box */}
                <div className="p-6 rounded-[8px] bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold font-mono-code text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t("The Friction & Critical Bug Encountered", "ปัญหาและคอขวดวิกฤตที่เจอหน้างาน")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-300 leading-relaxed font-normal">
                    {t(study.warStory.problemEn, study.warStory.problemTh)}
                  </p>
                </div>

                {/* Solution Box */}
                <div className="p-6 rounded-[8px] bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold font-mono-code text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t("How It Was Architected & Resolved", "วิธีออกแบบแก้ปัญหาและการรับประกันผล")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-300 leading-relaxed font-normal">
                    {t(study.warStory.solutionEn, study.warStory.solutionTh)}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- */}
          {/* SECTION 5: ENGINEERING DECISIONS & TRADE-OFFS       */}
          {/* ---------------------------------------------------- */}
          <section id="sec-decisions" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
              <div className="shrink-0">
                <JakkBotMascot projectId={study.id} expression="decision" lang={lang} />
              </div>
              <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                <span className="text-xs font-mono-code font-bold text-purple-500 uppercase tracking-widest">
                  🤔 Part 05 · Why I Built It This Way — Engineering Decisions
                </span>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                  {t('Trade-offs & Engineering Decisions', 'ทำไมถึงเลือกแบบนี้ — การตัดสินใจเชิงวิศวกรรม')}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {study.chapter2.tradeoffs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[8px] bg-blueprint-50 dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/80 space-y-3 hover:border-draft-500/50 transition-colors"
                >
                  <div className="text-xs sm:text-sm font-mono-code font-bold text-draft-600 dark:text-draft-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-draft-500" />
                    <span>Decision #{idx + 1}: {item.decision}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blueprint-600 dark:text-blueprint-300 leading-relaxed font-normal">
                    {t(item.whyEn || item.rationaleEn, item.whyTh || item.rationaleTh)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 6: IMPACT METRICS & DELIVERABLES            */}
          {/* ---------------------------------------------------- */}
          <section id="sec-results" className="p-8 sm:p-12 rounded-[10px] bg-white dark:bg-blueprint-900 border border-blueprint-200 dark:border-blueprint-800 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-5">
              <div className="shrink-0">
                <JakkBotMascot projectId={study.id} expression="result" lang={lang} />
              </div>
              <div className="space-y-1 pb-4 border-b border-blueprint-100 dark:border-blueprint-800 flex-1 w-full">
                <span className="text-xs font-mono-code font-bold text-emerald-500 uppercase tracking-widest">
                  📊 Part 06 · What Changed — Outcomes & Real Impact
                </span>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-blueprint-900 dark:text-white">
                  {t(study.chapter3.titleEn, study.chapter3.titleTh)}
                </h2>
              </div>
            </div>

            {/* 3 Hero Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {study.chapter3.metrics.map((m, idx) => (
                <div key={idx} className="p-8 rounded-[10px] bg-blueprint-50 dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/80 text-center space-y-2">
                  <div className="text-3xl sm:text-5xl font-extrabold font-mono-code" style={{ color: theme.accent }}>
                    {m.val}
                  </div>
                  <div className="text-xs sm:text-sm font-mono-code text-blueprint-500 dark:text-blueprint-400 font-semibold">
                    {t(m.labelEn, m.labelTh)}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm sm:text-base text-blueprint-600 dark:text-blueprint-300 leading-relaxed font-normal">
              {t(study.chapter3.summaryEn, study.chapter3.summaryTh)}
            </p>

            {/* Bottom Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-blueprint-100 dark:border-blueprint-800">
              {study.github && (
                <a
                  href={study.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] font-bold text-xs sm:text-sm shadow-md transition-all font-mono-code ${theme.btnPrimary || 'bg-draft-500 hover:bg-draft-400 text-white shadow-draft-500/20'}`}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{t('View Source Code on GitHub', 'ดูโค้ดบน GitHub')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-[4px] bg-blueprint-100 dark:bg-blueprint-800 hover:bg-blueprint-200 dark:hover:bg-blueprint-700 text-blueprint-800 dark:text-blueprint-200 font-semibold text-xs sm:text-sm transition-all border border-blueprint-200 dark:border-blueprint-700 font-mono-code"
              >
                ← {t('Back to Portfolio', 'กลับหน้าหลัก')}
              </button>
            </div>
          </section>

        </div>

      </div>
    </motion.div>
  );
}
