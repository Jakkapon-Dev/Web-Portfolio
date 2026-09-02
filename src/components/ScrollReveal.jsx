import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  distance = 30
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [forceVisible, setForceVisible] = useState(false);

  // Safety net: if this section is already at rest in the viewport the moment
  // it mounts — landing on a deep link, pressing End, or any jump straight to
  // the bottom of the page — the IntersectionObserver behind useInView can
  // miss its first callback and never flip. Since `once: true` never retries,
  // that left content (this footer, "Get In Touch") stuck invisible forever.
  // Force it visible shortly after mount as a fallback so nothing can get
  // permanently stranded at opacity: 0.
  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  };

  const initialOffset = directions[direction] || directions.up;
  const visible = isInView || forceVisible;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...initialOffset
      }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialOffset }}
      transition={{
        duration: 0.45,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1] // Apple / Awwwards smooth cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
