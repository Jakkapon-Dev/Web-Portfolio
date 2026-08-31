import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  ArrowUpRight, 
  User, 
  Zap, 
  FolderGit2, 
  GraduationCap, 
  Mail,
  FileText
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { personal } = portfolioData;

  const navButtons = [
    { href: '#projects', labelEn: 'Projects', labelTh: 'ผลงาน', icon: FolderGit2 },
    { href: '#skills', labelEn: 'Skills', labelTh: 'ทักษะ', icon: Zap },
    { href: '#about', labelEn: 'About', labelTh: 'ประวัติ', icon: User },
    { href: '#experience', labelEn: 'Experience', labelTh: 'ประสบการณ์', icon: GraduationCap },
    { href: '#contact', labelEn: 'Contact', labelTh: 'ติดต่อ', icon: Mail }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3 transition-colors duration-200 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Monogram Logo & Live Status */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-mono-code font-extrabold text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            JW
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                {t(personal.name.split(' ')[0], 'จักรภพ')}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title={t("Available for work", "พร้อมเริ่มงานทันที")} />
            </div>
            <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400 font-semibold">
              {t('Full-Stack Developer', 'นักพัฒนาเว็บ Full-Stack')}
            </span>
          </div>
        </a>

        {/* Navigation Button Pills */}
        <nav className="hidden md:flex items-center gap-2">
          {navButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <a
                key={btn.href}
                href={btn.href}
                className="px-3.5 py-2 rounded-xl text-xs font-mono-code font-bold bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-amber-500" />
                <span>{t(btn.labelEn, btn.labelTh)}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Dual Language Switcher, Theme Toggle, CV, GitHub */}
        <div className="flex items-center gap-2">
          
          {/* Clean Dual Language Switcher [ TH | EN ] */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-xs font-mono-code font-bold shadow-inner">
            <button
              onClick={() => setLang('th')}
              className={`px-3 py-1 rounded-lg transition-all ${
                lang === 'th'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
              }`}
              title="เปลี่ยนเป็นภาษาไทย (TH)"
            >
              TH
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
              }`}
              title="Switch to English (EN)"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700/80 shadow-sm"
            title={t("Toggle Light / Dark Theme", "สลับโหมดสว่าง / มืด")}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Direct Resume / CV Link */}
          <a
            href="/cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono-code font-bold hover:bg-amber-500/20 transition-colors border border-amber-500/30 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('Resume / CV', 'เรซูเม่ / CV')}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Direct GitHub Link */}
          <a
            href={personal.githubMain}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono-code font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

        </div>

      </div>
    </header>
  );
}
