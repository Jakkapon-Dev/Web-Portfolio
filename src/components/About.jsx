import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import TiltCard from './TiltCard';

export default function About() {
  const { t } = useLanguage();
  const stats = portfolioData.aboutStats || [
    { value: "4+", labelEn: "Flagship Deployments", labelTh: "โปรเจกต์สถาปัตยกรรมหลัก" },
    { value: "6", labelEn: "Years Operations Precision", labelTh: "ปีประสบการณ์ทำงานรวม" },
    { value: "100%", labelEn: "Type-Safe & Relational", labelTh: "ความแม่นยำด้าน Type Safety" }
  ];

  return (
    <section id="about" className="relative w-full py-16 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-50 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="hidden lg:block absolute top-6 right-8 text-[10px] font-mono-code uppercase tracking-widest text-blueprint-400/60 dark:text-blueprint-500/50"
      >
        {t('Sheet 04 / 06', 'แผ่นที่ 04 / 06')}
      </motion.div>
      <div className="max-w-6xl mx-auto">

        {/* Section Heading — left-biased, no eyebrow pill (About already carries its own "ABOUT ME" kicker below) */}
        <ScrollReveal direction="up">
          <div className="text-left mb-16 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-blueprint-900 dark:text-white">
              {t('Passion Fuels Purpose!', 'ความมุ่งมั่นขับเคลื่อนเป้าหมาย!')}
            </h2>
          </div>
        </ScrollReveal>

        {/* 3-Column Layout */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Biography Narrative */}
          <div className="md:col-span-5 flex flex-col items-start justify-start text-left space-y-4">
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-widest text-draft-600 dark:text-draft-400">
              {t('ABOUT ME', 'เกี่ยวกับฉัน')}
            </h3>

            <p className="text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-200 leading-relaxed font-normal">
              {t(
                "Hi, I'm Jakkapon Wapakpet, a 4th-year student at Krirk University and an aspiring Full-Stack Developer with a background in Content Operations, Web Development, and Legal Clerking.",
                "สวัสดีครับ ผมจักรภพ วาภักดิ์เพชร นักศึกษาชั้นปีที่ 4 มหาวิทยาลัยเกริก มีเป้าหมายสู่การเป็น Full-Stack Developer โดยมีพื้นฐานจากการทำงาน Content Operations, การพัฒนาเว็บ และประสบการณ์เสมียนทนายความ"
              )}
            </p>

            <p className="text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-200 leading-relaxed font-normal">
              {t(
                "I believe that programming is not just about writing lines of code, it's about solving real-world problems and creating intuitive, high-performance digital experiences for users.",
                "ผมเชื่อว่าการเขียนโปรแกรมไม่ใช่แค่การพิมพ์โค้ด แต่คือการแก้ปัญหาหน้างานจริง และการสร้างประสบการณ์ดิจิทัลที่ใช้งานง่าย มีประสิทธิภาพสูง และเชื่อถือได้"
              )}
            </p>

            <p className="text-xs sm:text-sm text-blueprint-700 dark:text-blueprint-200 leading-relaxed font-normal">
              {t(
                "Whether working on Next.js web applications, building multi-tenant POS systems, or designing automated data pipelines, I bring dedication and user-centric problem solving to every project.",
                "ไม่ว่าจะเป็นการสร้างเว็บแอปด้วย Next.js, การวางระบบ Multi-Tenant POS, หรือการเชื่อมต่อระบบอัตโนมัติ (Automation Pipelines) ผมทุ่มเทและใส่ใจในทุกรายละเอียดเพื่อส่งมอบผลงานที่ดีที่สุด"
              )}
            </p>
          </div>

          {/* Middle Column: Framed Image — same cursor-tilt as the Hero portrait */}
          <div className="md:col-span-4 flex justify-center">
            <TiltCard className="relative w-64 h-80 rounded-[10px] bg-white dark:bg-blueprint-800 border border-blueprint-200 dark:border-blueprint-700/60 shadow-xl p-2.5">
              <div className="w-full h-full rounded-[7px] overflow-hidden bg-blueprint-50 dark:bg-blueprint-900">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '40% 15%' }}
                />
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Key Stats Cards */}
          <div className="md:col-span-3 flex flex-col justify-between gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[8px] bg-white dark:bg-blueprint-800 border border-blueprint-200 dark:border-blueprint-700/60 shadow-sm text-center hover:border-draft-500/50 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-code text-draft-500">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-xs font-mono-code font-semibold mt-1 text-blueprint-600 dark:text-blueprint-300">
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
