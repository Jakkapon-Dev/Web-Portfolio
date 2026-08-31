import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

// Ft2 — Inline rule single line. One hairline-topped row, no link columns.
export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-6 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-white/10 bg-[#F7F9FC] dark:bg-[#0F141C] transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">

        <p className="text-[11px] font-mono-code text-slate-500 dark:text-slate-400">
          {personal.name} · © {new Date().getFullYear()} · built with React + Vite + Tailwind
        </p>

        <button
          onClick={scrollToTop}
          className="p-2 rounded-lg text-slate-400 hover:text-cobalt-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

      </div>
    </footer>
  );
}
