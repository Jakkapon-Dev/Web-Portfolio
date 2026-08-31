import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const { lang, t } = useLanguage();
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-10 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        <div className="space-y-1">
          <div className="font-bold text-sm font-mono-code flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>{personal.name}</span>
          </div>
          <p className="text-xs font-mono-code text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} • Built with Next.js, React & Tailwind CSS
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-all shadow-sm"
          title="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
