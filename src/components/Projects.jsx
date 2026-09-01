import React, { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import SpotlightCard from './SpotlightCard';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import { ArrowUpRight, ArrowLeft, FolderGit2, BookOpen, Zap, Code2, Play } from 'lucide-react';

// Lazy load modals to keep initial bundle ultra-fast
const ArchitecturePipelineModal = lazy(() => import('./ArchitecturePipelineModal'));
const CodeSnippetModal = lazy(() => import('./CodeSnippetModal'));
const LiveSystemPlayground = lazy(() => import('./LiveSystemPlayground'));

function FeaturedProjectCard({ project, onOpenCaseStudy, onOpenFlow, onOpenSim, onOpenCode }) {
  const { t } = useLanguage();
  const [showInlineArch, setShowInlineArch] = useState(false);
  // Per-project accent (sky/amber/purple/emerald) is deliberate wayfinding —
  // each case study keeps its own color so cards read apart at a glance.
  // Left untouched by the Blueprint rebrand; only the site's own chrome
  // (badges, hover rules, the "Code" button below) moves to draft-orange.
  const theme = project.theme || {
    accent: '#E8611C',
    accentGlow: 'rgba(232, 97, 28, 0.18)',
    badgeClass: 'bg-draft-500/10 text-draft-600 dark:text-draft-400 border-draft-500/30',
    tagClass: 'text-draft-600 dark:text-draft-400',
    btnPrimary: 'bg-draft-500 hover:bg-draft-400 text-white shadow-draft-500/20',
    borderHover: 'hover:border-draft-500/50',
    statusBadge: 'bg-draft-500/20 text-draft-300 border-draft-500/40',
  };

  return (
    <article className={`group w-full flex flex-col lg:flex-row items-center justify-between relative rounded-[10px] border border-blueprint-200 dark:border-blueprint-700/60 bg-white dark:bg-blueprint-800/90 p-6 sm:p-8 lg:p-12 shadow-xl shadow-blueprint-300/20 dark:shadow-black/30 transition-all duration-300 ${theme.borderHover}`}>

      {/* Dynamic Ambient Glow Behind Card */}
      <div
        className="absolute -inset-0.5 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${theme.accentGlow}, transparent 70%)`
        }}
      />

      {/* Left Mockup Frame */}
      <div className="w-full lg:w-1/2 rounded-[8px] bg-blueprint-950 text-white p-5 flex flex-col justify-between border border-blueprint-800 shadow-inner overflow-hidden relative min-h-[280px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className={`text-[11px] font-mono-code font-bold px-2.5 py-0.5 rounded-[3px] ${theme.statusBadge || 'bg-draft-500/20 text-draft-300 border border-draft-500/40'}`}>
            {project.statusBadge || 'Featured'}
          </span>
        </div>

        {/* Dynamic Toggle between Overview and Quick Flow */}
        {!showInlineArch ? (
          <div className="my-auto text-left py-4">
            <div className="font-mono-code text-xs text-blueprint-400 mb-1">// Case Study #{project.number}</div>
            <div className="text-xl sm:text-2xl font-black tracking-tight font-mono-code text-white">
              {project.title}
            </div>
            <div className="text-xs font-mono-code mt-1 font-semibold" style={{ color: theme.accent }}>
              {project.category}
            </div>
            <p className="text-xs mt-3 text-blueprint-100 leading-relaxed font-normal">
              {t(project.subtitleEn, project.subtitleTh)}
            </p>
          </div>
        ) : (
          <div className="my-auto text-left py-2 space-y-2">
            <span className="text-[11px] font-mono-code font-bold underline flex items-center gap-1" style={{ color: theme.accent }}>
              <Zap className="w-3 h-3" /> System Flow Pipeline
            </span>
            <div className="space-y-1.5">
              {project.architecture?.flow?.slice(0, 3).map((f, idx) => (
                <div key={idx} className="text-[11px] font-mono-code flex items-start gap-1 text-blueprint-100">
                  <span className="font-bold" style={{ color: theme.accent }}>0{idx+1}.</span>
                  <span><strong>{f.step}:</strong> {f.tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-blueprint-800">
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-mono-code px-2 py-0.5 rounded-[2px] bg-blueprint-900 text-blueprint-200">
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowInlineArch(!showInlineArch)}
            className="text-[10px] font-mono-code font-bold underline hover:opacity-80 flex items-center gap-1 transition-colors"
            style={{ color: theme.accent }}
          >
            {showInlineArch ? (
              <><ArrowLeft className="w-3 h-3" /> Overview</>
            ) : (
              <><Zap className="w-3 h-3" /> Quick Preview</>
            )}
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-between lg:pl-10 mt-6 lg:mt-0 text-left">
        <span className={`text-xs font-mono-code font-bold uppercase tracking-wider ${theme.tagClass || 'text-draft-600 dark:text-draft-400'}`}>
          {project.category}
        </span>

        <h3 className="my-2 w-full text-2xl sm:text-3xl font-extrabold text-blueprint-900 dark:text-white">
          {project.title}
        </h3>

        <p className="my-2 text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-200 leading-relaxed">
          {t(project.overviewEn, project.overviewTh)}
        </p>

        {/* Tech Stack Matrix Pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-[3px] bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-700 dark:text-blueprint-200 border border-blueprint-200 dark:border-blueprint-700/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons: View Flow, Story, Simulator & Code */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          
          {/* View Architecture Flow */}
          <button
            onClick={() => onOpenFlow(project)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] font-mono-code font-bold text-xs shadow-md transition-all group ${theme.btnPrimary || 'bg-draft-500 hover:bg-draft-400 text-white'}`}
          >
            <Zap className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            <span>{t('Architecture Flow', 'ดูสถาปัตยกรรม Flow')}</span>
          </button>

          {/* Project Story */}
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] font-mono-code font-semibold text-xs bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-800 dark:text-blueprint-100 border border-blueprint-200 dark:border-blueprint-700/60 hover:bg-blueprint-100 dark:hover:bg-blueprint-800 transition-all group"
          >
            <BookOpen className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span>{t('Case Study', 'บทความเจาะลึก')}</span>
          </button>

          {/* Live System Simulator Trigger */}
          <button
            onClick={() => onOpenSim(project.id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] font-mono-code font-semibold text-xs bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-700 dark:text-blueprint-200 border border-blueprint-200 dark:border-blueprint-700/50 hover:border-emerald-500/50 hover:text-emerald-500 transition-all"
            title={t('Test Live Event Simulator', 'ทดสอบยิง Event จำลอง')}
          >
            <Play className="w-3 h-3 text-emerald-500" />
            <span>{t('Simulator', 'จำลองระบบ')}</span>
          </button>

          {/* Clean Code Snippet Trigger */}
          <button
            onClick={() => onOpenCode(project.id)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] font-mono-code font-semibold text-xs bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-700 dark:text-blueprint-200 border border-blueprint-200 dark:border-blueprint-700/50 hover:border-draft-500/50 hover:text-draft-500 transition-all"
            title={t('View Clean Code Snippet', 'ดูโค้ดจริง')}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t('Code', 'โค้ด')}</span>
          </button>

          {/* GitHub Icon Link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-[4px] bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-700 dark:text-blueprint-200 border border-blueprint-200 dark:border-blueprint-700/50 hover:text-blueprint-900 dark:hover:text-white transition-colors"
              title="GitHub Repository"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>

      </div>

    </article>
  );
}

export default function Projects({ onOpenCaseStudy }) {
  const { t } = useLanguage();
  const { featuredProjects, otherProjects } = portfolioData;
  const [selectedFlowProject, setSelectedFlowProject] = useState(null);
  const [selectedSimProject, setSelectedSimProject] = useState(null);
  const [selectedCodeProject, setSelectedCodeProject] = useState(null);

  return (
    <section id="projects" className="w-full py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-50 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 1.5, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-block px-3.5 py-1 rounded-[3px] bg-draft-500/10 border border-draft-500/30 text-xs font-mono-code font-bold text-draft-600 dark:text-draft-400 mb-2"
          >
            SHEET 02 / 06 · FEATURED FULL-STACK WORK
          </motion.div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-blueprint-900 dark:text-white">
            <SplitText
              text={t('Featured Projects', 'ผลงานโปรเจกต์เด่น')}
              tag="span"
              splitType="words"
              textAlign="center"
              delay={45}
              duration={0.7}
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
            />
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono-code uppercase tracking-widest text-blueprint-500 dark:text-blueprint-300">
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
                onOpenSim={setSelectedSimProject}
                onOpenCode={setSelectedCodeProject}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Interactive Architecture Flow Modal */}
        {selectedFlowProject && (
          <Suspense fallback={null}>
            <ArchitecturePipelineModal
              project={selectedFlowProject}
              isOpen={!!selectedFlowProject}
              onClose={() => setSelectedFlowProject(null)}
              onSelectProject={setSelectedFlowProject}
            />
          </Suspense>
        )}

        {/* Live Event Simulator Modal */}
        {selectedSimProject && (
          <Suspense fallback={null}>
            <LiveSystemPlayground
              initialProjectId={selectedSimProject}
              isOpen={!!selectedSimProject}
              onClose={() => setSelectedSimProject(null)}
            />
          </Suspense>
        )}

        {/* Clean Code Snippet Modal */}
        {selectedCodeProject && (
          <Suspense fallback={null}>
            <CodeSnippetModal
              initialProjectId={selectedCodeProject}
              isOpen={!!selectedCodeProject}
              onClose={() => setSelectedCodeProject(null)}
            />
          </Suspense>
        )}

        {/* Other Projects */}
        <div className="text-left mb-8">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-draft-500" />
            <h3 className="text-xl font-bold text-blueprint-900 dark:text-white">
              {t('Other Projects & Team Repositories', 'โปรเจกต์เสริม & การทำงานร่วมกับทีม')}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((proj, idx) => (
            <TiltCard key={idx} maxTilt={4} className="rounded-[10px]">
            <SpotlightCard
              as="article"
              spotlightColor="rgba(232, 97, 28, 0.25)"
              className="p-6 rounded-[10px] border border-blueprint-200 dark:border-blueprint-700/60 bg-white dark:bg-blueprint-800/80 text-left shadow-md hover:border-draft-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-code font-bold text-draft-600 dark:text-draft-400">{t(proj.categoryEn, proj.categoryTh)}</span>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-1 text-blueprint-400 hover:text-draft-500" aria-label="GitHub">
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <h4 className="text-lg font-bold text-blueprint-900 dark:text-white mb-2">{proj.title}</h4>
              <p className="text-xs text-blueprint-700 dark:text-blueprint-200 leading-relaxed mb-4">{t(proj.descEn, proj.descTh)}</p>

              <div className="pt-3 border-t border-blueprint-100 dark:border-blueprint-700/50 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono-code px-2 py-0.5 rounded-[2px] bg-blueprint-50 dark:bg-blueprint-900 text-blueprint-600 dark:text-blueprint-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline text-draft-600 dark:text-draft-400 flex items-center gap-1">
                  <span>Repo</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </SpotlightCard>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
