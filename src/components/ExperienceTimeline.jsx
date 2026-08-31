import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export default function ExperienceTimeline() {
  const { lang, t } = useLanguage();
  const experience = portfolioData.experience || [];
  const education = portfolioData.education || [];
  const certifications = portfolioData.certifications || [
    {
      name: "Junior Software Developer (JSD13)",
      issuer: "Generation Thailand",
      date: "2026 (Certified)",
      desc: "Full-stack web development, React, Node.js, Express, databases, and Agile teamwork."
    }
  ];

  return (
    <section id="experience" className="w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200 text-left">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="text-center">
            <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 mb-2">
              CAREER ROADMAP & EDUCATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t('Experience & Education', 'ประสบการณ์และการศึกษา')}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Experience Column */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {t('Experience (6 Cumulative Years)', 'ประสบการณ์ทำงานจริง (รวม 6 ปี)')}
                </h3>
                <span className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Operations & Legal Precision</span>
              </div>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {t(exp.roleEn, exp.roleTh)}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-mono-code font-semibold self-start sm:self-auto border border-amber-500/20">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {t(exp.summaryEn, exp.summaryTh)}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {(exp.skills || []).map((s) => (
                      <span key={s} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certification Column */}
          <div className="space-y-8">
            
            {/* Education Box */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {t('Education', 'ประวัติการศึกษา')}
                  </h3>
                  <span className="text-xs font-mono-code text-slate-500 dark:text-slate-400">Academic Background</span>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t(edu.schoolEn, edu.schoolTh)}</h4>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono-code font-bold border border-amber-500/20">
                        {t(edu.statusEn, edu.statusTh)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono-code">{t(edu.degreeEn, edu.degreeTh)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Box */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {t('Bootcamp & Certifications', 'ประกาศนียบัตร')}
                </h4>
              </div>

              {certifications.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono-code">{c.issuer}</div>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                    {c.date}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
