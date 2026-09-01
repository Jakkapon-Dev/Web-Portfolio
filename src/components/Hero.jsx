import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';
import DotGrid from './DotGrid';
import ClickSpark from './ClickSpark';
import StarBorder from './StarBorder';
import {
  Mail,
  MapPin,
  Check,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Marquee Hero: the fold is one confident statement — headline + portrait,
// nothing else competing for attention. A hard rule marks the end of the
// fold; role, bio, and the CTAs live in the block below it.
// Blueprint pass: paper/cyanotype background, draft-orange as the one
// accent, squared corners throughout except the Resume CTA — that one stays
// a pill, playing the part of a stamped seal on the drawing.
export default function Hero() {
  const { t } = useLanguage();
  const { personal, about } = portfolioData;
  const [copied, setCopied] = useState(false);

  // Subtle cursor-tilt depth on the portrait card (disabled on touch — no onMouseMove there)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTilt = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [6, -6]), springTilt);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-6, 6]), springTilt);

  const handlePortraitMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handlePortraitLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FF9E68', '#E8611C', '#10B981']
      });
    } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative overflow-hidden w-full bg-[#F4F6F5] dark:bg-[#10263D] text-blueprint-900 dark:text-blueprint-50 transition-colors duration-200">

      {/* Sheet index tab — corner stamp, first of the 6 sections a visitor scrolls through */}
      <div className="hidden lg:block absolute top-6 right-8 z-10 text-[10px] font-mono-code uppercase tracking-widest text-blueprint-400/60 dark:text-blueprint-500/50">
        {t('Sheet 01 / 06', 'แผ่นที่ 01 / 06')}
      </div>

      {/* ============================================================ */}
      {/* THE FOLD — statement + portrait, nothing else                */}
      {/* ============================================================ */}
      <div className="relative w-full pt-14 pb-12 sm:pt-20 sm:pb-16 px-6 sm:px-12 md:px-20 lg:px-32">

        {/* Ambient Dot Grid — faint, reacts to cursor, fades out toward the edges.
            Doubles as the drafting grid: dots are graph-paper intersections,
            the draft-orange flare on proximity is the pencil catching light. */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]">
          <DotGrid dotSize={3} gap={22} baseColor="#AFD3ED" activeColor="#E8611C" proximity={110} shockRadius={160} shockStrength={3} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">

          {/* Left: the statement */}
          <div className="w-full lg:w-3/5 flex flex-col items-start text-left space-y-5">
            <ScrollReveal direction="up" distance={16}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] bg-draft-500/10 border border-draft-500/30 text-[11px] font-mono-code font-semibold text-draft-700 dark:text-draft-400">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-draft-500 animate-pulse" />
                <span>{t(personal.statusEn, personal.statusTh)}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08}>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-8xl font-bold tracking-tight text-blueprint-900 dark:text-white leading-[1.02]">
                <SplitText
                  text={t('Turning Vision Into ', 'เปลี่ยนทุกความคิดให้เป็น')}
                  tag="span"
                  splitType="words"
                  textAlign="left"
                  delay={40}
                  duration={0.7}
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text={t('Reality', 'ระบบจริง')}
                  tag="span"
                  className="text-draft-600 dark:text-draft-400"
                  splitType="chars"
                  textAlign="left"
                  delay={35}
                  duration={0.8}
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text={t(' With Code.', ' ด้วยโค้ด')}
                  tag="span"
                  splitType="words"
                  textAlign="left"
                  delay={40}
                  duration={0.7}
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h1>
            </ScrollReveal>
          </div>

          {/* Right: the portrait — the fold's other half, large and asymmetric */}
          <ScrollReveal direction="left" delay={0.1} className="w-full lg:w-2/5 flex justify-center">
            <motion.div
              onMouseMove={handlePortraitMove}
              onMouseLeave={handlePortraitLeave}
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              className="relative w-full max-w-sm aspect-[4/5] rounded-[8px] p-1.5 bg-white dark:bg-blueprint-800 border border-blueprint-200 dark:border-blueprint-700/50 shadow-xl shadow-blueprint-300/20 dark:shadow-black/40"
            >
              <div className="w-full h-full rounded-[5px] overflow-hidden bg-blueprint-50 dark:bg-blueprint-900 relative">
                <img
                  src="/image/ShaRK.jfif"
                  alt="Jakkapon Wapakpet"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '40% 15%' }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
                  <div className="font-bold text-sm text-white">{personal.name}</div>
                  <div className="text-xs text-draft-300 font-mono-code">Full-Stack Dev · Bangkok</div>
                </div>
              </div>

              {/* Small terminal chip — the one nod to Cobalt's "code is the
                  hero" signature, without displacing the portrait itself */}
              <div className="absolute -bottom-4 -left-4 hidden sm:block px-3 py-2 rounded-[3px] bg-blueprint-900 border border-blueprint-300/20 shadow-lg font-mono-code text-[10px] leading-relaxed">
                <span className="text-draft-400">$</span>{' '}
                <span className="text-blueprint-100">whoami</span>
                <div className="text-blueprint-400">→ {t(personal.roleEn, personal.roleTh)}</div>
              </div>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>

      {/* Hard rule — marks the end of the fold */}
      <div className="border-t border-blueprint-200 dark:border-blueprint-700/50" />

      {/* ============================================================ */}
      {/* BELOW THE FOLD — role, bio, the first CTAs                    */}
      {/* ============================================================ */}
      <div className="w-full py-10 sm:py-12 px-6 sm:px-12 md:px-20 lg:px-32">
        <div className="max-w-6xl mx-auto flex flex-col items-start text-left space-y-5">

          <ScrollReveal direction="up">
            <div className="flex flex-wrap items-center gap-2 text-sm font-mono-code font-medium">
              <span className="px-3 py-1 rounded-[3px] bg-white dark:bg-blueprint-800 border border-blueprint-200 dark:border-blueprint-700/50 text-blueprint-800 dark:text-blueprint-100">
                {t(personal.roleEn, personal.roleTh)}
              </span>
              <span className="flex items-center gap-1 text-xs sm:text-sm text-blueprint-500 dark:text-blueprint-300">
                <MapPin className="w-4 h-4 text-draft-500" aria-hidden="true" />
                {t(personal.locationEn, personal.locationTh)}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.06}>
            <p className="text-sm sm:text-base text-blueprint-700 dark:text-blueprint-200 max-w-2xl leading-relaxed">
              {t(about.en, about.th)}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12}>
            <ClickSpark sparkColor="#E8611C" sparkCount={10} sparkRadius={18} sparkSize={8} duration={450}>
            <div className="flex flex-wrap items-center gap-3 pt-1">

              <StarBorder
                as="a"
                href={personal.resumeUrl || "/cv.html"}
                target="_blank"
                rel="noopener noreferrer"
                color="#FFC29E"
                speed="4s"
                backgroundColor="#E8611C"
                textColor="#FFFFFF"
                borderColor="transparent"
                className="shadow-md shadow-draft-600/20 hover:shadow-lg transition-shadow"
                innerClassName="px-5 py-2.5 font-mono-code font-semibold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{t('Resume / CV', 'เรซูเม่ / CV')}</span>
                <Download className="w-4 h-4" aria-hidden="true" />
              </StarBorder>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-[3px] bg-white dark:bg-blueprint-800 text-blueprint-800 dark:text-blueprint-100 border border-blueprint-200 dark:border-blueprint-700/50 font-mono-code font-medium text-xs sm:text-sm hover:border-draft-400 transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Mail className="w-4 h-4 text-blueprint-400" aria-hidden="true" />}
                <span>{copied ? t('Email Copied!', 'คัดลอกอีเมลแล้ว!') : personal.email}</span>
              </button>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={personal.githubMain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-[3px] bg-white dark:bg-blueprint-800 text-blueprint-600 dark:text-blueprint-300 border border-blueprint-200 dark:border-blueprint-700/50 hover:text-draft-500 hover:border-draft-400 transition-colors"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-[3px] bg-white dark:bg-blueprint-800 text-blueprint-600 dark:text-blueprint-300 border border-blueprint-200 dark:border-blueprint-700/50 hover:text-draft-500 hover:border-draft-400 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

            </div>
            </ClickSpark>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
