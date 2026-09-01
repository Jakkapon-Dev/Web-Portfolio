import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

// Counts up to the leading number in `value` (e.g. "4+" -> 0..4, "100%" ->
// 0..100) once the element scrolls into view; any trailing suffix (+, %,
// text) stays static. Falls back to rendering the raw value unchanged if it
// doesn't start with a number.
export default function CountUp({ value, duration = 1.4, className = '' }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === null || !isInView) return undefined;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  if (target === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
