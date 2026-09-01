import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MapPin, Check, Copy, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';

export default function Contact() {
  const { t } = useLanguage();
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 }, colors: ['#FF9E68', '#E8611C'] });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-20 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-50 transition-colors duration-200 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: 6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="hidden lg:block absolute top-6 right-8 text-[10px] font-mono-code uppercase tracking-widest text-blueprint-400/60 dark:text-blueprint-500/50"
      >
        {t('Sheet 06 / 06', 'แผ่นที่ 06 / 06')}
      </motion.div>
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Heading */}
        <ScrollReveal direction="up">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-blueprint-900 dark:text-white">
              <SplitText
                text={t('Get In Touch', 'ติดต่อพูดคุยร่วมงาน')}
                tag="span"
                splitType="words"
                textAlign="center"
                delay={45}
                duration={0.7}
                from={{ opacity: 0, y: 24 }}
                to={{ opacity: 1, y: 0 }}
              />
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-mono-code text-blueprint-500 dark:text-blueprint-300 max-w-xl mx-auto">
              {t(
                'Reach out directly — email is the fastest way to get a reply.',
                'ติดต่อโดยตรงได้เลยครับ — ทางอีเมลจะได้รับการตอบกลับเร็วที่สุด'
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Direct Info — email leads, phone + location ride along as one compact secondary card */}
        <ScrollReveal delay={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-3xl mx-auto items-stretch">

            {/* Email — primary action, spans the wider column */}
            <div className="md:col-span-3 p-7 rounded-[10px] bg-draft-600 dark:bg-draft-600/90 shadow-lg shadow-draft-600/20 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-[4px] bg-white/15 text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono-code text-draft-100">Direct Email</span>
                  <div className="font-mono-code font-bold text-sm text-white truncate">{personal.email}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${personal.email}`}
                  className="py-2.5 px-4 rounded-[4px] bg-white text-draft-700 text-xs font-mono-code font-bold shadow-sm hover:bg-draft-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('Send an Email', 'ส่งอีเมลหาผม')}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="py-2.5 px-4 rounded-[4px] bg-white/10 hover:bg-white/20 text-white text-xs font-mono-code font-bold transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t('Copied!', 'คัดลอกแล้ว!') : t('Copy Address', 'คัดลอกอีเมล')}</span>
                </button>
              </div>
            </div>

            {/* Phone + Location — secondary details, one card, divided rows */}
            <div className="md:col-span-2 p-6 rounded-[10px] bg-white dark:bg-blueprint-800/80 border border-blueprint-200 dark:border-blueprint-700/60 shadow-md divide-y divide-blueprint-100 dark:divide-blueprint-700/50">
              <div className="pb-4 flex items-center gap-3">
                <Phone className="w-4 h-4 text-draft-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300">Direct Phone</span>
                  <div className="font-mono-code font-bold text-sm text-blueprint-900 dark:text-white">{personal.phone}</div>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-draft-500 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-mono-code text-blueprint-500 dark:text-blueprint-300">Location</span>
                  <div className="font-mono-code font-bold text-sm text-blueprint-900 dark:text-white">{t(personal.locationEn, personal.locationTh)}</div>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
