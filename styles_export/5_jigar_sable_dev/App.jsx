import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ArchitecturePipelineModal from '../components/ArchitecturePipelineModal';
import { 
  Mail, 
  ArrowUpRight, 
  User, 
  Briefcase, 
  GraduationCap, 
  Check,
  BookOpen,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function JigarSableVariant({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { personal, about, featuredProjects, experience, education } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.85 }, colors: ['#2563EB', '#3B82F6', '#60A5FA'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#0F172A] text-slate-100 min-h-screen py-12 px-6 sm:px-12 md:px-20 lg:px-32 animate-fadeIn font-sans selection:bg-blue-600 selection:text-white text-left">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Jigar Sable Style Hero */}
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-8">
          <div className="w-full lg:w-3/5 space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-400 font-mono-code">
              {t("Hi There, I'm", "สวัสดีครับ ผมชื่อ")}
            </h3>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              {personal.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium font-mono-code flex items-center gap-2">
              <span className="text-slate-400">{t("I am into", "ตำแหน่ง:")}</span>
              <span className="text-amber-400 font-bold underline underline-offset-4">
                {t(personal.roleEn, personal.roleTh)}
              </span>
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
              {t(about.en, about.th)}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <span>{t("About Me", "ดูข้อมูลประวัติ")}</span>
                <User className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-mono-code transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-blue-400" />}
                <span>{copied ? "Copied!" : personal.email}</span>
              </button>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={personal.githubMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all shadow"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all shadow"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-blue-600 via-cyan-400 to-amber-400 shadow-2xl shadow-blue-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-[#0F172A]">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Jigar Sable Style Projects Card Grid with Dual Buttons */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              <span className="text-amber-500 font-mono-code">#</span> {t('Projects & Case Studies', 'ผลงานโปรเจกต์และ Case Study')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-slate-800/70 border border-slate-700 overflow-hidden shadow-xl hover:border-blue-500/80 transition-all flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-code text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">#{proj.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-2">{proj.title}</h3>
                  <p className="text-xs text-amber-400 font-mono-code">{t(proj.subtitleEn, proj.subtitleTh)}</p>
                  
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {t(proj.overviewEn, proj.overviewTh)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Flow */}
                    <button
                      onClick={() => setSelectedFlowProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold bg-blue-600 hover:bg-blue-500 text-white shadow transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('View Flow', 'ดู Flow ระบบ')}</span>
                    </button>

                    {/* Case Study */}
                    <button
                      onClick={() => onOpenCaseStudy(proj.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('Case Study', 'อ่าน Case Study')}</span>
                    </button>
                  </div>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>Experience</span>
            </h3>
            {experience.map((exp, idx) => (
              <div key={idx} className="pb-3 border-b border-slate-700/60 last:border-0 last:pb-0">
                <div className="flex justify-between text-sm font-bold text-white">
                  <span>{t(exp.roleEn, exp.roleTh)}</span>
                  <span className="text-xs text-blue-400 font-mono-code">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{t(exp.summaryEn, exp.summaryTh)}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Education</span>
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="pb-3 border-b border-slate-700/60 last:border-0 last:pb-0">
                <div className="flex justify-between text-sm font-bold text-white">
                  <span>{t(edu.schoolEn, edu.schoolTh)}</span>
                  <span className="text-xs text-amber-400 font-mono-code">{t(edu.statusEn, edu.statusTh)}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{t(edu.degreeEn, edu.degreeTh)}</p>
              </div>
            ))}
          </div>
        </section>

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
