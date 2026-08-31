import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const { lang, t } = useLanguage();
  const stats = portfolioData.aboutStats || [
    { value: "4+", labelEn: "Flagship Deployments", labelTh: "โปรเจกต์สถาปัตยกรรมหลัก" },
    { value: "6", labelEn: "Years Operations Precision", labelTh: "ปีประสบการณ์ทำงานรวม" },
    { value: "100%", labelEn: "Type-Safe & Relational", labelTh: "ความแม่นยำด้าน Type Safety" }
  ];

  return (
    <section id="about" className="w-full py-20 px-6 sm:px-12 md:px-20 lg:px-32 border-t border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono-code font-bold text-amber-600 dark:text-amber-400 mb-2">
              BIOGRAPHY & STATS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t('Passion Fuels Purpose!', 'ความมุ่งมั่นขับเคลื่อนเป้าหมาย!')}
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-Column Layout */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Biography Narrative */}
          <div className="md:col-span-5 flex flex-col items-start justify-start text-left space-y-4">
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t('ABOUT ME', 'เกี่ยวกับฉัน')}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t(
                "Hi, I'm Jakkapon Wapakpet, a 4th-year student at Krirk University and an aspiring Full-Stack Developer with a background in Content Operations, Web Development, and Legal Clerking.",
                "สวัสดีครับ ผมจักรภพ วาภักดิ์เพชร นักศึกษาชั้นปีที่ 4 มหาวิทยาลัยเกริก มีเป้าหมายสู่การเป็น Full-Stack Developer โดยมีพื้นฐานจากการทำงาน Content Operations, การพัฒนาเว็บ และประสบการณ์เสมียนทนายความ"
              )}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t(
                "I believe that programming is not just about writing lines of code, it's about solving real-world problems and creating intuitive, high-performance digital experiences for users.",
                "ผมเชื่อว่าการเขียนโปรแกรมไม่ใช่แค่การพิมพ์โค้ด แต่คือการแก้ปัญหาหน้างานจริง และการสร้างประสบการณ์ดิจิทัลที่ใช้งานง่าย มีประสิทธิภาพสูง และเชื่อถือได้"
              )}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {t(
                "Whether working on Next.js web applications, building multi-tenant POS systems, or designing automated data pipelines, I bring dedication and user-centric problem solving to every project.",
                "ไม่ว่าจะเป็นการสร้างเว็บแอปด้วย Next.js, การวางระบบ Multi-Tenant POS, หรือการเชื่อมต่อระบบอัตโนมัติ (Automation Pipelines) ผมทุ่มเทและใส่ใจในทุกรายละเอียดเพื่อส่งมอบผลงานที่ดีที่สุด"
              )}
            </p>
          </div>

          {/* Middle Column: Framed Image */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xl p-2.5">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '40% 15%' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Cards */}
          <div className="md:col-span-3 flex flex-col justify-between gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm text-center hover:border-amber-500/50 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-code text-amber-500">
                  {stat.value}
                </div>
                <div className="text-xs font-mono-code font-semibold mt-1 text-slate-600 dark:text-slate-300">
                  {t(stat.labelEn, stat.labelTh)}
                </div>
              </div>
            ))}
          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
