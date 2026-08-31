import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ArchitecturePipelineModal from '../components/ArchitecturePipelineModal';
import { 
  ArrowUpRight, 
  Mail, 
  Check, 
  Monitor,
  BookOpen,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Retro3DCanvasVariant({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { personal, about, featuredProjects } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 }, colors: ['#915EFF', '#804dee', '#56ccf2'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#050816] text-white min-h-screen py-16 px-6 sm:px-12 md:px-20 lg:px-32 relative overflow-hidden animate-fadeIn selection:bg-[#915EFF] selection:text-white text-left">
      
      {/* 3D Nebula Starfield Effect */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[#915EFF]/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#56ccf2]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Retro 3D Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-6">
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-[#915EFF]/50" />
              <span className="font-mono-code text-xs text-[#dfd9ff] uppercase tracking-widest">
                Full-Stack & Interactive Developer
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-[#915EFF]">{personal.name.split(' ')[0]}</span>
            </h1>

            <p className="text-base sm:text-lg text-[#dfd9ff] max-w-xl leading-relaxed">
              I develop 3D visuals, reliable full-stack applications, scalable APIs, and system automation pipelines.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-xl bg-[#915EFF] hover:bg-[#804dee] text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#915EFF]/30 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                <span>{copied ? "Copied!" : personal.email}</span>
              </button>

              <a
                href={personal.githubMain}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#151030] border border-[#915EFF]/40 hover:border-[#915EFF] text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#151030] border border-[#915EFF]/40 hover:border-[#915EFF] text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-1 bg-gradient-to-b from-[#915EFF] to-[#151030] shadow-2xl shadow-[#915EFF]/20">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#100d25] relative group">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#151030]/90 border border-[#915EFF]/60 text-[10px] font-mono-code text-[#915EFF] flex items-center gap-1.5 backdrop-blur-md">
                  <Monitor className="w-3 h-3" />
                  <span>3D Workstation</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#100d25] via-[#100d25]/80 to-transparent p-4 text-left">
                  <span className="font-bold text-sm text-white block">{personal.name}</span>
                  <span className="text-xs text-[#915EFF] font-mono-code">Full-Stack Architect</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Projects Showcase Grid with Dual Buttons */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-mono-code text-[#dfd9ff] uppercase tracking-widest">My Work & System Designs</p>
            <h2 className="text-3xl sm:text-5xl font-black text-white">Projects & Architectures.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-[#151030] border border-[#915EFF]/30 hover:border-[#915EFF] transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="h-44 rounded-2xl bg-[#100d25] border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono-code text-[#915EFF] bg-[#915EFF]/10 px-2 py-0.5 rounded border border-[#915EFF]/30">
                        {proj.category}
                      </span>
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full bg-black/60 text-white hover:text-[#915EFF]">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-black text-white font-mono-code">{proj.title}</h4>
                      <p className="text-xs text-[#dfd9ff]">{t(proj.subtitleEn, proj.subtitleTh)}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#915EFF] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-[#dfd9ff] mt-2 leading-relaxed line-clamp-3">
                    {t(proj.overviewEn, proj.overviewTh)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Flow */}
                    <button
                      onClick={() => setSelectedFlowProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-[#915EFF] hover:bg-[#804dee] text-white shadow transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('View Flow', 'ดู Architecture Flow')}</span>
                    </button>

                    {/* Case Study */}
                    <button
                      onClick={() => onOpenCaseStudy(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('Case Study', 'อ่าน Case Study')}</span>
                    </button>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#915EFF]"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
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
