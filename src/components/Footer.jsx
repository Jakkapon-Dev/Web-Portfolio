import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

// Ft2 — Inline rule single line. One hairline-topped row, no link columns.
export default function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-6 px-6 sm:px-12 md:px-20 lg:px-32 border-t-[3px] border-blueprint-300 dark:border-blueprint-700 [border-top-style:double] bg-[#F4F6F5] dark:bg-[#10263D] transition-colors duration-200">
      <ScrollReveal className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" distance={12}>

        <p className="text-[11px] font-mono-code text-blueprint-500 dark:text-blueprint-300">
          {personal.name} · © {new Date().getFullYear()} · built with React + Vite + Tailwind
        </p>

        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-[3px] text-blueprint-400 hover:text-draft-500 hover:bg-blueprint-50 dark:hover:bg-white/5 transition-colors"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </motion.button>

      </ScrollReveal>
    </footer>
  );
}
