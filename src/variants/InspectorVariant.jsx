import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ProjectInspector from '../components/ProjectInspector';
import OtherProjects from '../components/OtherProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import TerminalModal from '../components/TerminalModal';
import { 
  ArrowDown, 
  MapPin, 
  Terminal as TerminalIcon,
  Check, 
  Copy,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InspectorVariant({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { personal, about } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 70, origin: { y: 0.85 }, colors: ['#10B981', '#34D399', '#6EE7B7'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#0B0F17] text-slate-100 min-h-screen animate-fadeIn selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 sm:px-12 md:px-20 lg:px-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono-code mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t(personal.statusEn, personal.statusTh)}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {t('Crafting Practical', 'มุ่งมั่นพัฒนา')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {t('Full-Stack Web Apps', 'เว็บแอปพลิเคชัน Full-Stack')}
              </span> <br />
              {t('& Automation Systems', '& ระบบงานอัตโนมัติ')}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono-code text-slate-400">
              <span className="text-slate-200 font-semibold">{personal.name}</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {t(personal.locationEn, personal.locationTh)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400/90 font-medium">Krirk Univ. (4th Year)</span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t(about.en, about.th)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenCaseStudy('omnipos')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 font-bold"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('Case Study Deep-Dive', 'อ่าน Case Study เจาะลึก')}</span>
              </button>

              <button
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code text-xs font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/50 transition-all"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>CLI Peek Terminal</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code text-xs text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? "Copied!" : personal.email}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl p-1 bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group">
              <img
                src="/image/ShaRK.jfif"
                alt="Jakkapon Wapakpet"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 rounded-xl"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-left">
                <span className="font-mono-code text-xs font-bold text-emerald-400 block">{personal.name}</span>
                <span className="text-[11px] text-slate-300 font-mono-code">Full-Stack Engineer</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Flagship Case Deck Inspector */}
      <ProjectInspector />
      <OtherProjects />
      <Skills />
      <Experience />

      {/* Terminal Drawer Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

    </div>
  );
}
