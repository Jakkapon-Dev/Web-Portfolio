import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ArchitecturePipelineModal from '../components/ArchitecturePipelineModal';
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  Zap, 
  Check, 
  Mail,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ModernDarkVariant({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { personal, about, featuredProjects, experience, education } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 }, colors: ['#6366F1', '#A855F7', '#EC4899'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#05070E] text-slate-100 min-h-screen py-16 px-6 sm:px-12 md:px-20 lg:px-32 relative overflow-hidden animate-fadeIn selection:bg-indigo-500 selection:text-white text-left">
      
      {/* Ambient Gradient Mesh */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Modern SaaS Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-mono-code">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack & Systems Developer</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Building modern, scalable software with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                precision & passion.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {t(about.en, about.th)}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copied ? "Copied to clipboard!" : personal.email}</span>
              </button>

              <a
                href={personal.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  <div className="font-bold text-sm text-white">{personal.name}</div>
                  <div className="text-xs text-indigo-400 font-mono-code">Full-Stack Dev • Bangkok</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Featured Projects Glowing Grid with Dual Buttons */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('Flagship Projects & Case Studies', 'ผลงานโปรเจกต์และ Case Study')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono-code">
              Inspect interactive Architecture Pipeline or Read Full Case Study
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-code text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded-full">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono-code text-slate-500">#{proj.number}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {t(proj.subtitleEn, proj.subtitleTh)}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed line-clamp-3">
                    {t(proj.overviewEn, proj.overviewTh)}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Flow */}
                    <button
                      onClick={() => setSelectedFlowProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('View Flow', 'ดู Flow ระบบ')}</span>
                    </button>

                    {/* Case Study */}
                    <button
                      onClick={() => onOpenCaseStudy(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('Case Study', 'อ่าน Case Study')}</span>
                    </button>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white"
                  >
                    <span>GitHub Repo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience & Education Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>{t('Experience & Operations', 'ประสบการณ์และการทำงาน')}</span>
            </h3>

            {experience.map((item, idx) => (
              <div key={idx} className="pb-4 border-b border-slate-800/80 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-sm font-bold text-white">
                  <h4>{t(item.roleEn, item.roleTh)}</h4>
                  <span className="text-xs font-mono-code text-indigo-400">{item.period}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {t(item.summaryEn, item.summaryTh)}
                </p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>{t('Education & Certification', 'การศึกษาและประกาศนียบัตร')}</span>
            </h3>

            {education.map((edu, idx) => (
              <div key={idx} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-sm font-bold text-white">
                  <h4>{t(edu.schoolEn, edu.schoolTh)}</h4>
                  <span className="text-xs font-mono-code text-purple-400">{t(edu.statusEn, edu.statusTh)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{t(edu.degreeEn, edu.degreeTh)}</p>
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
