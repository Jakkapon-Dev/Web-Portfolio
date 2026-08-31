import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Command,
  FileText,
  Sparkles
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import CommandPalette from './CommandPalette';
import ThemeSwitchGagModal from './ThemeSwitchGagModal';

// Cobalt nav: a flush, bordered bar (not a floating pill — that's Coral's
// vocabulary). Wordmark + section links left; language, theme, the ⌘K
// affordance, and one solid cobalt button (Resume) right.
export default function Navbar({ onReopenOnboarding }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, setThemeMode } = useTheme();
  const { personal } = portfolioData;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [isThemeGagOpen, setIsThemeGagOpen] = useState(false);
  const [targetThemeMode, setTargetThemeMode] = useState('light');

  const navLinks = [
    { href: '#projects', labelEn: 'Projects', labelTh: 'ผลงาน' },
    { href: '#skills', labelEn: 'Skills', labelTh: 'ทักษะ' },
    { href: '#about', labelEn: 'About', labelTh: 'ประวัติ' },
    { href: '#experience', labelEn: 'Experience', labelTh: 'ประสบการณ์' },
    { href: '#contact', labelEn: 'Contact', labelTh: 'ติดต่อ' }
  ];

  // Cobalt's signature move: the ⌘K affordance actually opens a working
  // command palette from anywhere on the page, not just from the nav button.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full bg-[#F7F9FC]/90 dark:bg-[#0F141C]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-3 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Wordmark */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-cobalt-500 text-white flex items-center justify-center font-mono-code font-bold text-sm shadow-sm shadow-cobalt-500/30 group-hover:scale-105 transition-transform">
              JW
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                  {t(personal.name.split(' ')[0], 'จักรภพ')}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title={t("Available for work", "พร้อมเริ่มงานทันที")} />
              </div>
              <span className="text-[10px] font-mono-code text-slate-500 dark:text-slate-400">
                {t('Full-Stack Developer', 'นักพัฒนาเว็บ Full-Stack')}
              </span>
            </div>
          </a>

          {/* Section links — text, not pills */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cobalt-600 dark:hover:text-cobalt-400 transition-colors"
              >
                {t(link.labelEn, link.labelTh)}
              </a>
            ))}
          </nav>

          {/* Right cluster: language, theme, ⌘K, one solid CTA */}
          <div className="flex items-center gap-2">

            <div className="hidden sm:flex items-center rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-mono-code font-semibold overflow-hidden">
              <button
                onClick={() => setLang('th')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'th' ? 'bg-cobalt-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-cobalt-500'
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'en' ? 'bg-cobalt-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-cobalt-500'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => {
                setTargetThemeMode(theme === 'dark' ? 'light' : 'dark');
                setIsThemeGagOpen(true);
              }}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/10"
              title={t("Toggle Light / Dark Theme", "สลับโหมดสว่าง / มืด")}
              aria-label={t("Toggle light / dark theme", "สลับโหมดสว่าง / มืด")}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-400" aria-hidden="true" />}
            </button>

            {onReopenOnboarding && (
              <button
                onClick={onReopenOnboarding}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/10"
                title={t("Re-take ATM Interview & Customizer", "ทำแบบสอบถามสัมภาษณ์ (ATM เออรัก เออเร่อ)")}
                aria-label="ATM Interview"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
              </button>
            )}

            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-mono-code text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-cobalt-400 hover:text-cobalt-600 dark:hover:text-cobalt-400 transition-colors"
              aria-label={t('Open command palette', 'เปิดพาเลตคำสั่ง')}
            >
              <Command className="w-3.5 h-3.5" aria-hidden="true" />
              <span>K</span>
            </button>

            <a
              href={personal.resumeUrl || "/cv.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cobalt-500 hover:bg-cobalt-600 text-white text-xs font-semibold transition-colors shadow-sm shadow-cobalt-500/20"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('Resume', 'เรซูเม่')}</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>

          </div>

        </div>
      </header>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onReopenOnboarding={onReopenOnboarding}
      />

      <ThemeSwitchGagModal
        isOpen={isThemeGagOpen}
        targetMode={targetThemeMode}
        onClose={() => setIsThemeGagOpen(false)}
        onConfirm={(mode) => {
          setThemeMode(mode);
          setIsThemeGagOpen(false);
        }}
      />
    </>
  );
}
