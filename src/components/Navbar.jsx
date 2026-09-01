import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Command,
  FileText,
  Sparkles,
  Zap,
  ZapOff
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useMotionPreference } from '../context/MotionContext';
import CommandPalette from './CommandPalette';
import ThemeSwitchGagModal from './ThemeSwitchGagModal';

// Blueprint nav: a flush title-block bar (not a floating pill), scored off
// with a drafting double-rule instead of a soft drop shadow. Wordmark +
// section links left; language, theme, the ⌘K affordance, and one solid
// draft-orange button (Resume) right. First section moved from the old
// Cobalt system — see index.css header comment for what changed and why.
export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setThemeMode } = useTheme();
  const { motionEnabled, toggleMotion } = useMotionPreference();
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

  // The ⌘K affordance actually opens a working command palette from
  // anywhere on the page, not just from the nav button.
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
      <header className="fixed top-0 inset-x-0 z-50 w-full bg-[#F4F6F5]/97 dark:bg-[#10263D]/97 blueprint-grid border-b-[6px] border-blueprint-300 dark:border-blueprint-700 [border-bottom-style:double] px-4 sm:px-8 py-3 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">

          {/* Wordmark */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-[3px] bg-draft-500 text-white flex items-center justify-center font-mono-code font-bold text-sm shadow-sm shadow-draft-500/30 group-hover:scale-105 transition-transform">
              JW
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-blueprint-900 dark:text-blueprint-50 tracking-tight">
                  {t(personal.name.split(' ')[0], 'จักรภพ')}
                </span>
                <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-500" title={t("Available for work", "พร้อมเริ่มงานทันที")} />
              </div>
              <span className="text-[10px] font-mono-code uppercase tracking-wide text-blueprint-600 dark:text-blueprint-300">
                {t('Full-Stack Developer', 'นักพัฒนาเว็บ Full-Stack')} <span className="text-draft-600 dark:text-draft-400">· rev.c</span>
              </span>
            </div>
          </a>

          {/* Section links — title-block cells, divided by hairline rules, not pills */}
          <nav className="hidden md:flex items-center divide-x divide-blueprint-200 dark:divide-blueprint-700/50">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="pencil-underline px-3 first:pl-0 py-1 text-[11px] font-mono-code font-semibold uppercase tracking-wide text-blueprint-700 dark:text-blueprint-200 hover:text-draft-600 dark:hover:text-draft-400 transition-colors"
              >
                {t(link.labelEn, link.labelTh)}
              </a>
            ))}
          </nav>

          {/* Right cluster: language, theme, ⌘K, one solid CTA */}
          <div className="flex items-center gap-2">

            <div className="hidden sm:flex items-center rounded-[3px] border border-blueprint-200 dark:border-blueprint-700/50 text-[11px] font-mono-code font-semibold overflow-hidden">
              <button
                onClick={() => setLang('th')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'th' ? 'bg-draft-500 text-white' : 'text-blueprint-500 dark:text-blueprint-300 hover:text-draft-500'
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'en' ? 'bg-draft-500 text-white' : 'text-blueprint-500 dark:text-blueprint-300 hover:text-draft-500'
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
              className="p-2 rounded-[3px] text-blueprint-600 dark:text-blueprint-200 hover:bg-blueprint-50 dark:hover:bg-white/5 transition-colors border border-blueprint-200 dark:border-blueprint-700/50"
              title={theme === 'dark' ? t("Switch to Paper mode", "สลับเป็นโหมดกระดาษ") : t("Switch to Blueprint mode", "สลับเป็นโหมดพิมพ์เขียว")}
              aria-label={theme === 'dark' ? t("Switch to Paper mode", "สลับเป็นโหมดกระดาษ") : t("Switch to Blueprint mode", "สลับเป็นโหมดพิมพ์เขียว")}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" /> : <Moon className="w-4 h-4 text-blueprint-400" aria-hidden="true" />}
            </button>

            <button
              onClick={toggleMotion}
              aria-pressed={!motionEnabled}
              className="p-2 rounded-[3px] text-blueprint-600 dark:text-blueprint-200 hover:bg-blueprint-50 dark:hover:bg-white/5 transition-colors border border-blueprint-200 dark:border-blueprint-700/50"
              title={motionEnabled ? t("Reduce motion", "ลดการเคลื่อนไหว") : t("Enable motion", "เปิดการเคลื่อนไหว")}
              aria-label={motionEnabled ? t("Reduce motion", "ลดการเคลื่อนไหว") : t("Enable motion", "เปิดการเคลื่อนไหว")}
            >
              {motionEnabled ? <Zap className="w-4 h-4 text-draft-500" aria-hidden="true" /> : <ZapOff className="w-4 h-4 text-blueprint-400" aria-hidden="true" />}
            </button>

            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-[3px] text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300 border border-blueprint-200 dark:border-blueprint-700/50 hover:border-draft-400 hover:text-draft-600 dark:hover:text-draft-400 transition-colors"
              aria-label={t('Open command palette', 'เปิดพาเลตคำสั่ง')}
            >
              <Command className="w-3.5 h-3.5" aria-hidden="true" />
              <span>K</span>
            </button>

            <a
              href={personal.resumeUrl || "/cv.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[3px] bg-draft-500 hover:bg-draft-600 text-white text-xs font-semibold transition-colors shadow-sm shadow-draft-500/20"
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
