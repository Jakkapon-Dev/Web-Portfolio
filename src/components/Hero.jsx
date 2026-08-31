import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Check, 
  Download, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero() {
  const { lang, t } = useLanguage();
  const { personal, about } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F59E0B', '#3B82F6', '#10B981']
      });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Column: Bio & Core Info */}
        <div className="w-full lg:w-3/5 flex flex-col items-start text-left space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{t(personal.statusEn, personal.statusTh)}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            {t('Turning Vision Into Reality With Code.', 'เปลี่ยนทุกความคิดให้เป็นระบบจริงด้วยโค้ด.')}
          </h1>

          {/* Sub-headline / Role */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-mono-code font-semibold">
            <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm text-slate-800 dark:text-slate-200">
              {t(personal.roleEn, personal.roleTh)}
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-amber-500" />
              {t(personal.locationEn, personal.locationTh)}
            </span>
          </div>

          {/* Introduction Paragraph */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
            {t(about.en, about.th)}
          </p>

          {/* Call-to-Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            
            {/* Resume / CV Button */}
            <a
              href={personal.resumeUrl || "/cv.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono-code font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>{t('Resume / CV', 'เรซูเม่ / CV')}</span>
              <Download className="w-4 h-4" />
            </a>

            {/* Email Copy Button */}
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-sm font-mono-code font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-slate-400" />}
              <span>{copied ? t('Email Copied!', 'คัดลอกอีเมลแล้ว!') : personal.email}</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={personal.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:text-amber-500 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:text-blue-500 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Right Column: User Portrait */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
              <img
                src="/image/ShaRK.jfif"
                alt="Jakkapon Wapakpet"
                className="w-full h-full object-cover"
                style={{ objectPosition: '40% 15%' }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                <div className="font-bold text-sm text-white">{personal.name}</div>
                <div className="text-xs text-amber-400 font-mono-code">Full-Stack Dev • Bangkok</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
