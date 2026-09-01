import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolioData';
import {
  Search,
  FolderGit2,
  Zap,
  User,
  GraduationCap,
  Mail,
  FileText,
  SunMoon,
  Languages,
  Copy,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

// A real command palette, not a decorative ⌘K badge. Opens on click or
// Cmd/Ctrl+K, filters by typing, Arrow↑/↓ to select, Enter to run, Esc or
// backdrop to close.
export default function CommandPalette({ isOpen, onClose, onReopenOnboarding }) {
  const { t, setLang, lang } = useLanguage();
  const { toggleTheme } = useTheme();
  const { personal } = portfolioData;
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const runAndClose = (fn) => {
    fn();
    onClose();
  };

  const commands = useMemo(() => [
    ...(onReopenOnboarding ? [{ id: 'open-interview', label: t('Take ATM Interview Quiz', 'ทำแบบสอบถามสัมภาษณ์ (ATM เออรัก เออเร่อ)'), icon: Sparkles, run: onReopenOnboarding }] : []),
    { id: 'go-projects', label: t('Go to Projects', 'ไปที่ผลงาน'), icon: FolderGit2, run: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-skills', label: t('Go to Skills', 'ไปที่ทักษะ'), icon: Zap, run: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-about', label: t('Go to About', 'ไปที่ประวัติ'), icon: User, run: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-experience', label: t('Go to Experience', 'ไปที่ประสบการณ์'), icon: GraduationCap, run: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'go-contact', label: t('Go to Contact', 'ไปที่ติดต่อ'), icon: Mail, run: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'open-github', label: t('Open GitHub profile', 'เปิด GitHub'), icon: GithubIcon, run: () => window.open(personal.githubMain, '_blank', 'noopener,noreferrer') },
    { id: 'open-linkedin', label: t('Open LinkedIn profile', 'เปิด LinkedIn'), icon: LinkedinIcon, run: () => window.open(personal.linkedin, '_blank', 'noopener,noreferrer') },
    { id: 'open-resume', label: t('View Resume / CV', 'ดูเรซูเม่ / CV'), icon: FileText, run: () => window.open(personal.resumeUrl || '/cv.html', '_blank', 'noopener,noreferrer') },
    { id: 'copy-email', label: t('Copy email address', 'คัดลอกอีเมล'), icon: Copy, run: () => navigator.clipboard.writeText(personal.email) },
    { id: 'toggle-theme', label: t('Toggle light / dark theme', 'สลับโหมดสว่าง / มืด'), icon: SunMoon, run: toggleTheme },
    { id: 'toggle-lang', label: t('Switch to Thai', 'Switch to English'), icon: Languages, run: () => setLang(lang === 'en' ? 'th' : 'en') },
  ], [t, lang, personal, setLang, toggleTheme, onReopenOnboarding]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Reset + focus management: input focuses on open, focus restores to the
  // trigger on close (WAI-ARIA dialog pattern) — matches the other modals.
  useEffect(() => {
    if (!isOpen) return undefined;
    triggerRef.current = document.activeElement;
    const focusTimer = requestAnimationFrame(() => {
      setQuery('');
      setActiveIndex(0);
      inputRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(focusTimer);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) runAndClose(cmd.run);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('Command palette', 'พาเลตคำสั่ง')}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-lg rounded-[8px] border border-blueprint-200 dark:border-blueprint-700/50 bg-white dark:bg-blueprint-800 shadow-2xl overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-blueprint-100 dark:border-blueprint-700/50">
              <Search className="w-4 h-4 text-blueprint-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder={t('Type a command…', 'พิมพ์คำสั่ง…')}
                className="w-full bg-transparent text-sm font-mono-code text-blueprint-900 dark:text-white placeholder:text-blueprint-400 focus:outline-none"
              />
              <kbd className="hidden sm:inline text-[10px] font-mono-code px-1.5 py-0.5 rounded-[3px] border border-blueprint-200 dark:border-blueprint-700/50 text-blueprint-400">esc</kbd>
            </div>

            <ul ref={listRef} className="max-h-80 overflow-y-auto py-1.5" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-xs font-mono-code text-blueprint-400">
                  {t('No matching commands', 'ไม่พบคำสั่งที่ตรงกัน')}
                </li>
              )}
              {filtered.map((cmd, idx) => {
                const Icon = cmd.icon;
                const isActive = idx === activeIndex;
                return (
                  <li key={cmd.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      onClick={() => runAndClose(cmd.run)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left text-xs font-mono-code transition-colors ${
                        isActive
                          ? 'bg-draft-500/10 text-draft-700 dark:text-draft-300'
                          : 'text-blueprint-700 dark:text-blueprint-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{cmd.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
