import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useMotionPreference } from '../context/MotionContext';

export default function HireMe() {
  const { personal } = portfolioData;
  const { motionEnabled } = useMotionPreference();

  return (
    <motion.aside
      aria-label="Hire me"
      className="fixed right-4 bottom-4 z-30 hidden md:flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">

        {/* Rotating Circular Text SVG — driven by framer-motion instead of a
            CSS keyframe so it honors the explicit motion toggle, not just the
            OS-level prefers-reduced-motion safety net. */}
        <motion.svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          animate={motionEnabled ? { rotate: 360 } : { rotate: 0 }}
          transition={motionEnabled ? { duration: 12, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 150, 150 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
            />
          </defs>
          <text className="font-mono-code font-bold text-[18px] uppercase fill-blueprint-600 dark:fill-blueprint-300 tracking-[4px]">
            <textPath href="#circlePath" startOffset="0%">
              FULL-STACK DEVELOPER • SOFTWARE ENGINEER •
            </textPath>
          </text>
        </motion.svg>

        {/* Center Circular Button — round on purpose, playing the same
            "stamped seal" role as the Hero StarBorder CTA */}
        <motion.a
          href={`mailto:${personal.email}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-draft-600 hover:bg-draft-700 text-white shadow-md font-mono-code font-bold text-[11px] transition-colors text-center leading-tight"
        >
          HIRE<br />ME
        </motion.a>

      </div>
    </motion.aside>
  );
}
