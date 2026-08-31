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
      {/* Top Reading Progress Bar with Vibrant Gradient */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cobalt-500 via-sky-400 to-purple-500 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(42,99,240,0.6)]"
      />

      {/* Subtle Ambient Mesh Glow Background Layers */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Top-Right Soft Cyan Aura */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-[130px]" />
        
        {/* Middle-Left Soft Violet Aura */}
        <div className="absolute top-[40%] -left-40 w-[550px] h-[550px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[140px]" />
        
        {/* Bottom-Right Soft Emerald Aura */}
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px]" />
      </div>
    </>
  );
}
