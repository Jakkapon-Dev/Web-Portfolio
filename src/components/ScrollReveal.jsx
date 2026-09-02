import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  distance = 30
}) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  };

  const initialOffset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...initialOffset 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.45,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Apple / Awwwards smooth cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
