import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxBackground() {
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth spring for reading progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Multi-layer parallax scroll transforms
  const orbY1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const orbY2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const gridY = useTransform(scrollY, [0, 2000], [0, 150]);

  return (
    <>
      {/* 1. Top Reading Scroll Progress Bar (Apple-style sleek gradient) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-400 to-sky-400 origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(245,158,11,0.6)]"
      />

      {/* 2. Floating Multi-Depth Ambient Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        
        {/* Ambient Orb 1: Warm Amber Glow (Top Right) */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -top-32 -right-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-amber-500/10 to-amber-500/0 blur-[100px] dark:from-amber-500/15 dark:to-transparent opacity-80"
        />

        {/* Ambient Orb 2: Deep Sky Cyan Glow (Middle Left) */}
        <motion.div
          style={{ y: orbY2 }}
          className="absolute top-1/2 -left-48 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-tr from-sky-500/10 to-sky-500/0 blur-[120px] dark:from-sky-500/15 dark:to-transparent opacity-70"
        />

        {/* Ambient Orb 3: Purple / Rose Tech Accent (Bottom Right) */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute bottom-20 -right-40 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tl from-purple-500/10 to-purple-500/0 blur-[110px] dark:from-purple-500/12 dark:to-transparent opacity-60"
        />

        {/* Parallax Blueprint Dot Matrix Grid */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

      </div>
    </>
  );
}
