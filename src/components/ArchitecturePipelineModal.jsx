import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import VisualArchitectureDiagram from './VisualArchitectureDiagram';
import { X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArchitecturePipelineModal({ project, isOpen, onClose, onSelectProject }) {
  const { t } = useLanguage();
  const { featuredProjects } = portfolioData;
  const titleId = 'architecture-pipeline-modal-title';
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);

  // Escape closes; focus moves into the dialog on open and back to the
  // trigger on close (WAI-ARIA dialog pattern).
  useEffect(() => {
    if (!isOpen) return undefined;
    triggerRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">

        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Box */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white dark:bg-blueprint-800 text-blueprint-900 dark:text-blueprint-50 rounded-[10px] border border-blueprint-200 dark:border-blueprint-700/60 shadow-2xl p-6 sm:p-8 z-10 text-left selection:bg-draft-500 selection:text-white space-y-6"
        >

          {/* Header with Direct Project Switcher Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blueprint-100 dark:border-blueprint-700/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold text-draft-600 dark:text-draft-400 bg-draft-500/10 border border-draft-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3.5 h-3.5 animate-pulse text-draft-500" />
                  <span>Enterprise System Topology</span>
                </span>
                <span className="text-xs font-mono-code text-blueprint-400">#{project.number}</span>
              </div>
              <h3 id={titleId} className="text-xl sm:text-2xl font-bold text-blueprint-900 dark:text-white mt-1">
                {project.title} <span className="text-blueprint-500 dark:text-blueprint-300 text-base font-normal font-mono-code">— Architecture Flow</span>
              </h3>
            </div>

            {/* Project Switcher Pills */}
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-[6px] bg-blueprint-50 dark:bg-blueprint-900/80 border border-blueprint-200 dark:border-blueprint-700/50">
                {featuredProjects.map((p) => {
                  const isActive = project.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectProject && onSelectProject(p)}
                      className={`px-3 py-1.5 rounded-[4px] text-xs font-mono-code font-bold transition-all flex items-center gap-1 ${
                        isActive
                          ? 'bg-draft-500 text-white shadow-md shadow-draft-500/20'
                          : 'text-blueprint-600 dark:text-blueprint-300 hover:bg-white dark:hover:bg-blueprint-700'
                      }`}
                    >
                      <span>#{p.number}</span>
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>

              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label={t('Close', 'ปิด')}
                className="p-2 rounded-[4px] bg-blueprint-50 dark:bg-blueprint-900 hover:bg-blueprint-100 dark:hover:bg-blueprint-700 text-blueprint-600 dark:text-blueprint-300 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Full Visual Multi-Tier Architecture Diagram */}
          <VisualArchitectureDiagram projectId={project.id} />

          {/* Footer Action */}
          <div className="pt-4 border-t border-blueprint-100 dark:border-blueprint-700/50 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300">
              Stack: {project.techStack?.join(' • ')}
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[4px] bg-draft-500 hover:bg-draft-400 text-white font-bold text-xs font-mono-code transition-colors shadow-md shadow-draft-500/20"
            >
              {t('Close Flow View', 'ปิดหน้าต่าง Flow')}
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
