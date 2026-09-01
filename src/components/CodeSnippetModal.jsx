import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { codeSnippetsData } from "../data/codeSnippetsData";
import { portfolioData } from "../data/portfolioData";
import { X, Copy, Check, Code2, FileCode, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeSnippetModal({ initialProjectId = "omnipos", isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeProjectId, setActiveProjectId] = useState(initialProjectId);
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (initialProjectId) setActiveProjectId(initialProjectId);
  }, [initialProjectId]);

  useEffect(() => {
    if (!isOpen) return undefined;
    triggerRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSnippet = codeSnippetsData[activeProjectId] || codeSnippetsData.omnipos;
  const projectConfig = portfolioData.featuredProjects.find((p) => p.id === activeProjectId);
  const theme = projectConfig?.theme || { accent: "#E8611C" };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentSnippet.code.split("\n");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-blueprint-950/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Clean Architecture Code Drawer"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#10263D] text-blueprint-100 rounded-[10px] border border-blueprint-800 shadow-2xl z-10 overflow-hidden text-left"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-blueprint-800/80 bg-[#161D28]/80">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono-code font-bold flex items-center gap-1.5 border"
                  style={{
                    backgroundColor: `${theme.accent}15`,
                    color: theme.accent,
                    borderColor: `${theme.accent}40`,
                  }}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Production Code Blueprint</span>
                </span>
                <span className="text-xs font-mono-code text-blueprint-400">
                  {currentSnippet.tag}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2 font-mono-code">
                <FileCode className="w-4 h-4 text-blueprint-400" />
                <span>{currentSnippet.filename}</span>
              </h3>
            </div>

            {/* Project Switcher Tabs */}
            <div className="flex items-center gap-2">
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-blueprint-900 border border-blueprint-800">
                {portfolioData.featuredProjects.map((p) => {
                  const isActive = activeProjectId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveProjectId(p.id)}
                      className={`px-3 py-1.5 rounded-[4px] text-xs font-mono-code font-bold transition-all flex items-center gap-1 ${
                        isActive
                          ? "bg-draft-500 text-white shadow-md shadow-draft-500/20"
                          : "text-blueprint-400 hover:text-white hover:bg-blueprint-800"
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
                aria-label={t("Close", "ปิด")}
                className="p-2 rounded-xl bg-blueprint-900 hover:bg-blueprint-800 text-blueprint-400 hover:text-white transition-colors border border-blueprint-800"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Description & Callout */}
          <div className="px-6 py-3 bg-[#111722] border-b border-blueprint-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2 text-blueprint-300">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
              <span>{t(currentSnippet.descriptionEn, currentSnippet.descriptionTh)}</span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-blueprint-800 hover:bg-blueprint-700 text-blueprint-200 text-xs font-mono-code font-semibold transition-all shrink-0 self-start sm:self-auto border border-blueprint-700/60"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t("Copied!", "คัดลอกแล้ว!")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t("Copy Code", "คัดลอกโค้ด")}</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0B0F17] font-mono-code text-xs leading-relaxed">
            <pre className="text-blueprint-300 overflow-x-auto">
              <code>
                {lines.map((line, idx) => (
                  <div key={idx} className="table-row hover:bg-white/5 transition-colors">
                    <span className="table-cell select-none pr-4 text-right text-blueprint-600 w-10">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Footer Info */}
          <div className="p-4 bg-[#111722] border-t border-blueprint-800 flex items-center justify-between text-[11px] font-mono-code text-blueprint-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>TypeScript Strict Mode • Zero Any Types • ACID Compliant</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-[4px] bg-draft-500 hover:bg-draft-600 text-white font-semibold transition-colors"
            >
              {t("Close Drawer", "ปิดหน้าต่าง")}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
