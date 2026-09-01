import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

export default function ExperienceTimeline() {
  const { t } = useLanguage();
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
    <section id="experience" className="relative w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-50 transition-colors duration-200 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="hidden lg:block absolute top-6 right-8 text-[10px] font-mono-code uppercase tracking-widest text-blueprint-400/60 dark:text-blueprint-500/50"
      >
        {t('Sheet 05 / 06', 'แผ่นที่ 05 / 06')}
      </motion.div>
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Section Heading — left-biased, no eyebrow pill */}
        <ScrollReveal direction="up">
          <div className="text-left max-w-xl">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-blueprint-900 dark:text-white">
              {t('Experience & Education', 'ประสบการณ์และการศึกษา')}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Experience Column */}
          <div className="p-8 rounded-[10px] bg-white dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/60 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-blueprint-100 dark:border-blueprint-700/50">
              <div className="p-2.5 rounded-[4px] bg-draft-500/10 text-draft-600 dark:text-draft-400 border border-draft-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-blueprint-900 dark:text-white">
                  {t('Experience (6 Cumulative Years)', 'ประสบการณ์ทำงานจริง (รวม 6 ปี)')}
                </h3>
                <span className="text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300">Operations & Legal Precision</span>
              </div>
            </div>

            <div className="divide-y divide-blueprint-100 dark:divide-blueprint-700/50">
              {experience.map((exp, idx) => (
                <div key={idx} className="py-5 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-blueprint-900 dark:text-blueprint-100">
                      {t(exp.roleEn, exp.roleTh)}
                    </h4>
                    <span className="text-[11px] font-mono-code font-semibold text-draft-600 dark:text-draft-400 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-blueprint-700 dark:text-blueprint-200 leading-relaxed font-normal">
                    {t(exp.summaryEn, exp.summaryTh)}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {(exp.skills || []).map((s) => (
                      <span key={s} className="text-[10px] font-mono-code px-2 py-0.5 rounded-[2px] bg-blueprint-50 dark:bg-blueprint-900/60 text-blueprint-600 dark:text-blueprint-300">
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
            <div className="p-8 rounded-[10px] bg-white dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/60 shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-blueprint-100 dark:border-blueprint-700/50">
                <div className="p-2.5 rounded-[4px] bg-draft-500/10 text-draft-600 dark:text-draft-400 border border-draft-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blueprint-900 dark:text-white">
                    {t('Education', 'ประวัติการศึกษา')}
                  </h3>
                  <span className="text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300">Academic Background</span>
                </div>
              </div>

              <div className="divide-y divide-blueprint-100 dark:divide-blueprint-700/50">
                {education.map((edu, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-blueprint-900 dark:text-white">{t(edu.schoolEn, edu.schoolTh)}</h4>
                      <span className="text-[10px] font-mono-code font-bold text-draft-600 dark:text-draft-400">
                        {t(edu.statusEn, edu.statusTh)}
                      </span>
                    </div>
                    <p className="text-xs text-blueprint-500 dark:text-blueprint-300 font-mono-code">{t(edu.degreeEn, edu.degreeTh)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Box */}
            <div className="p-8 rounded-[10px] bg-white dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/60 shadow-md space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-blueprint-100 dark:border-blueprint-700/50">
                <div className="p-2 rounded-[4px] bg-draft-500/10 text-draft-600 dark:text-draft-400 border border-draft-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-base text-blueprint-900 dark:text-white">
                  {t('Bootcamp & Certifications', 'ประกาศนียบัตร')}
                </h4>
              </div>

              <div className="divide-y divide-blueprint-100 dark:divide-blueprint-700/50">
                {certifications.map((c, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-blueprint-900 dark:text-white">{c.name}</div>
                      <div className="text-[11px] text-blueprint-500 dark:text-blueprint-300 font-mono-code">{c.issuer}</div>
                    </div>
                    <span className="text-[10px] font-mono-code text-draft-600 dark:text-draft-400 font-semibold">
                      {c.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
