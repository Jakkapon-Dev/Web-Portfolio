import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ArchitecturePipelineModal from './ArchitecturePipelineModal';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, FolderGit2, BookOpen, Zap } from 'lucide-react';

function FeaturedProjectCard({ project, onOpenCaseStudy, onOpenFlow }) {
  const { lang, t } = useLanguage();
  const [showInlineArch, setShowInlineArch] = useState(false);

  return (
    <article className="w-full flex flex-col lg:flex-row items-center justify-between relative rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 p-6 sm:p-8 lg:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/30 transition-all hover:border-amber-500/50">
      
      {/* Left Mockup Frame */}
      <div className="w-full lg:w-1/2 rounded-2xl bg-slate-900 text-white p-5 flex flex-col justify-between border border-slate-800 shadow-inner overflow-hidden relative min-h-[280px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono-code font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {project.statusBadge || 'Featured'}
          </span>
        </div>

        {/* Dynamic Toggle between Overview and Quick Flow */}
        {!showInlineArch ? (
          <div className="my-auto text-left py-4">
            <div className="font-mono-code text-xs text-slate-400 mb-1">// Case Study #{project.number}</div>
            <div className="text-xl sm:text-2xl font-black tracking-tight font-mono-code text-white">
              {project.title}
            </div>
            <div className="text-xs font-mono-code mt-1 text-amber-400 font-semibold">
              {project.category}
            </div>
            <p className="text-xs mt-3 text-slate-300 leading-relaxed font-normal">
              {t(project.subtitleEn, project.subtitleTh)}
            </p>
          </div>
        ) : (
          <div className="my-auto text-left py-2 space-y-2">
            <span className="text-[11px] font-mono-code font-bold underline block text-amber-400">
              ⚡ System Flow Pipeline
            </span>
            <div className="space-y-1.5">
              {project.architecture?.flow?.slice(0, 3).map((f, idx) => (
                <div key={idx} className="text-[11px] font-mono-code flex items-start gap-1 text-slate-200">
                  <span className="font-bold text-amber-400">0{idx+1}.</span>
                  <span><strong>{f.step}:</strong> {f.tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowInlineArch(!showInlineArch)}
            className="text-[10px] font-mono-code font-bold text-amber-400 underline hover:opacity-80"
          >
            {showInlineArch ? '← Overview' : '⚡ Quick Preview'}
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between lg:pl-10 mt-6 lg:mt-0 text-left">
        <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          {project.category}
        </span>

        <h3 className="my-2 w-full text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {project.title}
        </h3>

        <p className="my-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t(project.overviewEn, project.overviewTh)}
        </p>

        {/* Tech Stack Matrix Pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons: View Flow & Case Study */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          
          {/* View Architecture Flow */}
          <button
            onClick={() => onOpenFlow(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all group"
          >
            <Zap className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>{t('View Architecture Flow', 'ดู Architecture Flow')}</span>
          </button>

          {/* Read Case Study */}
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono-code font-semibold text-xs bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all group"
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
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-amber-500 transition-colors"
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
    <section id="projects" className="w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 mb-2">
            FEATURED FULL-STACK WORK
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('Featured Projects', 'ผลงานโปรเจกต์เด่น')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono-code uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {t('Interactive Architecture Pipelines & Case Studies', 'สถาปัตยกรรมระบบและบทความเจาะลึก Case Study')}
          </p>
        </div>

        {/* 4 Flagship Projects */}
        <div className="space-y-16 mb-20">
          {featuredProjects.map((project, pIdx) => (
            <ScrollReveal key={project.id} delay={pIdx * 0.08} distance={40}>
              <FeaturedProjectCard
                project={project}
                onOpenCaseStudy={onOpenCaseStudy}
                onOpenFlow={setSelectedFlowProject}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Architecture Flow & Pipeline Modal */}
        <ArchitecturePipelineModal
          project={selectedFlowProject}
          isOpen={!!selectedFlowProject}
          onClose={() => setSelectedFlowProject(null)}
          onSelectProject={setSelectedFlowProject}
        />

        {/* Other Projects */}
        <div className="text-left mb-8">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('Other Projects & Team Repositories', 'โปรเจกต์เสริม & การทำงานร่วมกับทีม')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((proj, idx) => (
            <article key={idx} className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-left shadow-md hover:border-amber-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400">{t(proj.categoryEn, proj.categoryTh)}</span>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-1 text-slate-400 hover:text-amber-500">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{proj.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{t(proj.descEn, proj.descTh)}</p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline text-amber-600 dark:text-amber-400 flex items-center gap-1">
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
