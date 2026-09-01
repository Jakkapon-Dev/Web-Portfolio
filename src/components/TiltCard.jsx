import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// The cursor-tilt depth effect from the Hero portrait, extracted so it can
// wrap any card. No new library — same framer-motion primitives already in
// the bundle. Disabled on touch (no onMouseMove there, so it's inert).
export default function TiltCard({ children, className = '', maxTilt = 6, ...rest }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTilt = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [maxTilt, -maxTilt]), springTilt);
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-maxTilt, maxTilt]), springTilt);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
