import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ArchitecturePipelineModal from './ArchitecturePipelineModal';
import { ArrowUpRight, FolderGit2, BookOpen, Zap, Layers } from 'lucide-react';

function FeaturedProjectCard({ project, onOpenCaseStudy, onOpenFlow }) {
  const { lang, t } = useLanguage();
  const [showInlineArch, setShowInlineArch] = useState(false);

  return (
    <article className="w-full flex flex-col lg:flex-row items-center justify-between relative rounded-3xl border-2 border-solid border-[#000000] dark:border-[#FCF6F4] bg-[#FCF6F4] dark:bg-[#000000] p-6 sm:p-8 lg:p-12 shadow-2xl transition-all">
      
      {/* 3D Offset Box Shadow */}
      <div className="absolute inset-0 rounded-3xl bg-[#000000] dark:bg-[#FCF6F4] translate-x-3.5 translate-y-3.5 -z-10 border-2 border-solid border-[#000000] dark:border-[#FCF6F4]" />

      {/* Left Mockup / Architecture Frame */}
      <div className="w-full lg:w-1/2 rounded-2xl bg-[#000000] text-[#FCF6F4] dark:bg-[#FCF6F4] dark:text-[#000000] p-5 flex flex-col justify-between border-2 border-solid border-[#000000] dark:border-[#FCF6F4] shadow-inner overflow-hidden relative min-h-[280px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono-code font-bold px-2 py-0.5 rounded border border-current">
            {project.statusBadge || 'Featured'}
          </span>
        </div>

        {/* Dynamic Toggle between Overview and Quick Flow */}
        {!showInlineArch ? (
          <div className="my-auto text-left py-4">
            <div className="font-mono-code text-xs opacity-60 mb-1">// Case Study #{project.number}</div>
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight font-mono-code">
              {project.title}
            </div>
            <div className="text-xs font-mono-code mt-1 opacity-80">
              {project.category}
            </div>
            <p className="text-xs mt-3 opacity-90 leading-relaxed font-normal">
              {t(project.subtitleEn, project.subtitleTh)}
            </p>
          </div>
        ) : (
          <div className="my-auto text-left py-2 space-y-2">
            <span className="text-[11px] font-mono-code font-bold underline block">
              ⚡ System Flow Pipeline
            </span>
            <div className="space-y-1.5">
              {project.architecture?.flow?.slice(0, 3).map((f, idx) => (
                <div key={idx} className="text-[11px] font-mono-code flex items-start gap-1">
                  <span className="font-bold">0{idx+1}.</span>
                  <span><strong>{f.step}:</strong> {f.tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-current/20">
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/20 dark:bg-black/10">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowInlineArch(!showInlineArch)}
            className="text-[10px] font-mono-code font-bold underline hover:opacity-80"
          >
            {showInlineArch ? '← Overview' : '⚡ Quick Preview'}
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between lg:pl-10 mt-6 lg:mt-0 text-left">
        <span className="text-xs font-mono-code font-bold uppercase tracking-wider opacity-70">
          {project.category}
        </span>

        <h3 className="my-2 w-full text-2xl sm:text-3xl font-bold text-[#000000] dark:text-[#FCF6F4]">
          {project.title}
        </h3>

        <p className="my-2 text-xs sm:text-sm text-[#000000]/80 dark:text-[#FCF6F4]/80 leading-relaxed">
          {t(project.overviewEn, project.overviewTh)}
        </p>

        {/* Tech Stack Matrix Pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-lg bg-transparent text-[#000000] dark:text-[#FCF6F4] border border-solid border-[#000000]/40 dark:border-[#FCF6F4]/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 2 DISTINCT PROMINENT BUTTONS: VIEW FLOW & READ CASE STUDY */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          
          {/* Button 1: View Architecture Flow & Pipeline */}
          <button
            onClick={() => onOpenFlow(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md group"
          >
            <Zap className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>{t('View Architecture Flow', 'ดู Architecture Flow')}</span>
          </button>

          {/* Button 2: Read Full Deep-Dive Case Study */}
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code font-semibold text-xs bg-[#000000] text-[#FCF6F4] dark:bg-[#FCF6F4] dark:text-[#000000] hover:bg-transparent hover:text-[#000000] dark:hover:bg-transparent dark:hover:text-[#FCF6F4] border-2 border-solid border-[#000000] dark:border-[#FCF6F4] transition-all shadow-md group"
          >
            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t('Read Case Study', 'อ่าน Case Study เจาะลึก')}</span>
          </button>

          {/* GitHub Icon Link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#000000] text-[#FCF6F4] dark:bg-[#FCF6F4] dark:text-[#000000] hover:opacity-80 transition-opacity border-2 border-solid border-transparent"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>

    </article>
  );
}

export default function Projects({ onOpenCaseStudy }) {
  const { lang, t } = useLanguage();
  const { featuredProjects, otherProjects } = portfolioData;
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);

  return (
    <section id="projects" className="w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 border-t-2 border-solid border-[#000000] dark:border-[#FCF6F4] bg-[#FCF6F4] text-[#000000] dark:bg-[#000000] dark:text-[#FCF6F4] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#000000] dark:text-[#FCF6F4] tracking-tight">
            {t('Featured Projects', 'ผลงานโปรเจกต์เด่น')}
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-mono-code uppercase tracking-widest opacity-60">
            {t('Interactive Architecture Pipelines & Case Studies', 'สถาปัตยกรรมระบบและบทความเจาะลึก Case Study')}
          </p>
        </div>

        {/* 4 Flagship Projects */}
        <div className="space-y-16 mb-20">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={onOpenCaseStudy}
              onOpenFlow={setSelectedFlowProject}
            />
          ))}
        </div>

        {/* Interactive Architecture Flow & Pipeline Modal */}
        <ArchitecturePipelineModal
          project={selectedFlowProject}
          isOpen={!!selectedFlowProject}
          onClose={() => setSelectedFlowProject(null)}
        />

        {/* Other Projects */}
        <div className="text-left mb-8">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5" />
            <h3 className="text-xl font-bold text-[#000000] dark:text-[#FCF6F4]">
              {t('Other Projects & Team Repositories', 'โปรเจกต์เสริม & การทำงานร่วมกับทีม')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((proj, idx) => (
            <article key={idx} className="p-6 rounded-2xl border-2 border-solid border-[#000000] dark:border-[#FCF6F4] bg-[#FCF6F4] dark:bg-[#000000] text-left relative shadow-xl">
              <div className="absolute inset-0 rounded-2xl bg-[#000000] dark:bg-[#FCF6F4] translate-x-2.5 translate-y-2.5 -z-10 border-2 border-solid border-[#000000] dark:border-[#FCF6F4]" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-code font-bold opacity-60">{t(proj.categoryEn, proj.categoryTh)}</span>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-1 text-inherit hover:opacity-75">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <h4 className="text-lg font-bold text-[#000000] dark:text-[#FCF6F4] mb-2">{proj.title}</h4>
              <p className="text-xs text-[#000000]/80 dark:text-[#FCF6F4]/80 leading-relaxed mb-4">{t(proj.descEn, proj.descTh)}</p>

              <div className="pt-3 border-t border-solid border-[#000000]/20 dark:border-[#FCF6F4]/20 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-[#000000]/30 dark:border-[#FCF6F4]/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs font-bold underline flex items-center gap-1">
                  <span>Repo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
