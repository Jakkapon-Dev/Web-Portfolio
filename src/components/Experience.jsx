import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ShieldCheck,
  Camera,
  Scale
} from 'lucide-react';

export default function Experience() {
  const { lang, t } = useLanguage();
  const { experience, education, certification } = portfolioData;

  return (
    <section id="experience" className="py-20 md:py-24 border-t border-slate-850 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono-code mb-2.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('Career Track & Foundations', 'เส้นทางอาชีพ & ประวัติการศึกษา')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('Transferable Experience & Education', 'ประสบการณ์การทำงานจริง & การศึกษา')}
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            {t(
              'How 6 cumulative years in high-precision legal compliance and production operations translate directly into structured, reliable software engineering.',
              'การนำประสบการณ์การทำงานจริงกว่า 6 ปี ทั้งด้านความละเอียดรอบคอบในงานกฎหมายและการบริหารโปรเจกต์ มาผสานกับการพัฒนาซอฟต์แวร์'
            )}
          </p>
        </div>

        {/* Dual Track Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Transferable Work Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-slate-300">
                {t('Work Experience (Transferable Superpowers)', 'ประสบการณ์การทำงานจริง (ทักษะประยุกต์)')}
              </h3>
            </div>

            <div className="space-y-5">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover border border-slate-800/90 relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                        {idx === 0 ? <Camera className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {t(item.roleEn, item.roleTh)}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/60">
                    {t(item.summaryEn, item.summaryTh)}
                  </p>

                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block">
                      {t('Engineering Translation & Key Value:', 'ทักษะที่นำมาใช้กับการพัฒนาซอฟต์แวร์:')}
                    </span>
                    {(lang === 'th' ? item.highlightsTh : item.highlightsEn).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certification (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Track */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-slate-300">
                  {t('Education', 'ประวัติการศึกษา')}
                </h3>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-panel border border-slate-800/90"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white">
                        {t(edu.schoolEn, edu.schoolTh)}
                      </h4>
                      <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                        {t(edu.statusEn, edu.statusTh)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {t(edu.degreeEn, edu.degreeTh)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification (Generation Thailand) */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-slate-300">
                  {t('Professional Certification', 'ประกาศนียบัตรวิชาชีพ')}
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-code text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                    Generation Thailand
                  </span>
                  <span className="text-[11px] font-mono-code text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded">
                    {t(certification.statusEn, certification.statusTh)}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mt-2">
                  {t(certification.titleEn, certification.titleTh)}
                </h4>

                <p className="text-xs font-mono-code text-emerald-400 mt-0.5">
                  {t(certification.programEn, certification.programTh)}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mt-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {t(certification.noteEn, certification.noteTh)}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
