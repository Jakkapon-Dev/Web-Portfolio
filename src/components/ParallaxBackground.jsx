import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Kept deliberately minimal: just the top reading-progress bar.
// (The floating cursor-follow glow orbs were tried and cut — too "AI landing page".)
export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top Reading Progress Bar — a single pencil-orange stroke, not a rainbow */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-draft-600 via-draft-400 to-draft-300 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(232,97,28,0.6)]"
      />

      {/* Subtle Ambient Mesh Glow Background Layers — blueprint cyan + draft
          orange only, so the persistent ambient layer doesn't reintroduce
          the old cobalt/violet palette underneath the Blueprint sections */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Top-Right Soft Cyan Aura */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blueprint-400/5 dark:bg-blueprint-400/10 blur-[130px]" />

        {/* Middle-Left Soft Orange Aura */}
        <div className="absolute top-[40%] -left-40 w-[550px] h-[550px] rounded-full bg-draft-500/5 dark:bg-draft-500/10 blur-[140px]" />

        {/* Bottom-Right Soft Emerald Aura — kept as the one deliberate accent color
            outside the brand pair, echoing the "available for work" status dot */}
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px]" />
      </div>
    </>
  );
}
