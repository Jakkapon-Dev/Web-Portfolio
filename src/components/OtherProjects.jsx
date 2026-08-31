import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { ExternalLink, FolderGit2, Sparkles, Users } from 'lucide-react';

export default function OtherProjects() {
  const { lang, t } = useLanguage();
  const { otherProjects } = portfolioData;

  return (
    <section className="py-12 border-t border-slate-850">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              {t('Other Projects & Team Collaboration', 'โปรเจกต์เสริม & การทำงานร่วมกับทีม')}
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-500">
            {otherProjects.length} Repositories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel glass-panel-hover border border-slate-800/80 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono-code text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {t(proj.categoryEn, proj.categoryTh)}
                  </span>
                  
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {proj.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {t(proj.descEn, proj.descTh)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-850 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono-code text-slate-400 group-hover:text-emerald-400 transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
