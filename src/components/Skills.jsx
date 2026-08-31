import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { 
  Layout, 
  Server, 
  Cpu, 
  Radio, 
  Users, 
  Sparkles, 
  Check, 
  Layers,
  Flame,
  Zap
} from 'lucide-react';

export default function Skills() {
  const { lang, t } = useLanguage();
  const { skills } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-4 h-4 text-emerald-400" />;
      case 'Server':
        return <Server className="w-4 h-4 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-teal-400" />;
      case 'Radio':
        return <Radio className="w-4 h-4 text-indigo-400" />;
      case 'Users':
        return <Users className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono-code mb-2.5">
            <Zap className="w-3.5 h-3.5" />
            <span>{t(skills.badgeEn, skills.badgeTh)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t(skills.titleEn, skills.titleTh)}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            {t(
              'A structured overview of core technologies, architectural tools, and professional delivery competencies.',
              'ภาพรวมเทคโนโลยี เครื่องมือสถาปัตยกรรมระบบ และทักษะการทำงานจริง'
            )}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between ${
                category.id === 'soft' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-4">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {getIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {t(category.nameEn, category.nameTh)}
                    </h3>
                    <span className="text-[11px] font-mono-code text-slate-500">
                      {category.skills.length} competencies
                    </span>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-2 transition-all ${
                        skill.highlight
                          ? 'bg-slate-900/90 text-slate-200 border border-emerald-500/30 hover:border-emerald-400/60 shadow-sm'
                          : 'bg-slate-900/50 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {skill.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                      <span>{t(skill.name, skill.nameTh || skill.name)}</span>
                      {skill.level && (
                        <span className="text-[10px] text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer Note */}
              <div className="mt-5 pt-3 border-t border-slate-850/60 text-[11px] font-mono-code text-slate-500 flex items-center justify-between">
                <span>Production Tested</span>
                <span className="text-emerald-400/80">Active</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
