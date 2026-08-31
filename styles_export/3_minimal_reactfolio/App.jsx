import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ArchitecturePipelineModal from '../components/ArchitecturePipelineModal';
import { 
  Mail, 
  MapPin, 
  ArrowUpRight, 
  Check, 
  Briefcase, 
  GraduationCap, 
  Code2,
  BookOpen,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReactfolioVariant({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { personal, about, featuredProjects, experience, education } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 } });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAFAFA] dark:bg-[#12161A] text-slate-800 dark:text-slate-200 min-h-screen py-12 sm:py-20 px-4 sm:px-8 transition-colors duration-300 animate-fadeIn text-left">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header / Profile Hero Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1A2026] border border-slate-200 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-black/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {personal.name}
                </h1>
                <p className="text-sm font-mono-code text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                  {t(personal.roleEn, personal.roleTh)}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {t(personal.locationEn, personal.locationTh)} • Krirk University
                </p>
              </div>
            </div>

            {/* Social Icons & Status */}
            <div className="flex items-center gap-3">
              <a
                href={personal.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-emerald-500 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-blue-500 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Get in Touch"}</span>
              </button>
            </div>
          </div>

          <div className="pt-8">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              {t('About Me', 'เกี่ยวกับฉัน')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t(about.en, about.th)}
            </p>
          </div>
        </div>

        {/* Featured Projects Grid with Dual Buttons */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-500" />
              <span>{t('Selected Full-Stack Work & Case Studies', 'ผลงานโปรเจกต์และ Case Study')}</span>
            </h2>
            <span className="text-xs font-mono-code text-slate-400">4 Architecture Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#1A2026] border border-slate-200 dark:border-slate-800/80 shadow-lg flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">#{proj.number}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {t(proj.subtitleEn, proj.subtitleTh)}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                    {t(proj.overviewEn, proj.overviewTh)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Flow */}
                    <button
                      onClick={() => setSelectedFlowProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('View Flow', 'ดู Flow ระบบ')}</span>
                    </button>

                    {/* Case Study */}
                    <button
                      onClick={() => onOpenCaseStudy(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('Case Study', 'อ่าน Case Study')}</span>
                    </button>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                  >
                    <span>Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1A2026] border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-500" />
              <span>{t('Experience (6 Cumulative Years)', 'ประสบการณ์ทำงานจริง')}</span>
            </h3>

            {experience.map((exp, idx) => (
              <div key={idx} className="pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t(exp.roleEn, exp.roleTh)}</h4>
                  <span className="text-xs font-mono-code text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {t(exp.summaryEn, exp.summaryTh)}
                </p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1A2026] border border-slate-200 dark:border-slate-800/80 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>{t('Education & Bootcamp', 'ประวัติการศึกษา & แคมป์')}</span>
            </h3>

            {education.map((edu, idx) => (
              <div key={idx} className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t(edu.schoolEn, edu.schoolTh)}</h4>
                  <span className="text-xs font-mono-code text-emerald-500">{t(edu.statusEn, edu.statusTh)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{t(edu.degreeEn, edu.degreeTh)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Architecture Flow & Pipeline Modal */}
      <ArchitecturePipelineModal
        project={selectedFlowProject}
        isOpen={!!selectedFlowProject}
        onClose={() => setSelectedFlowProject(null)}
      />

    </div>
  );
}
