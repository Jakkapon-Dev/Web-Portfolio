import React, { createContext, useContext, useState, useEffect } from 'react';

const MotionContext = createContext();

// Mirrors ThemeContext's shape: an explicit user choice ('on' | 'off') wins
// and is persisted; with no choice made yet, we follow the OS-level
// `prefers-reduced-motion` setting live.
export function MotionProvider({ children }) {
  const [explicitPreference, setExplicitPreference] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_motion');
      return saved === 'on' || saved === 'off' ? saved : null;
    } catch {
      return null;
    }
  });

  const [osReducedMotion, setOsReducedMotion] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    } catch {
      return false;
    }
  });

  // Track OS preference live so anyone who hasn't made an explicit choice
  // still gets it applied without a refresh.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setOsReducedMotion(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Whether motion is *actually* on right now, folding the explicit choice
  // (if any) over the live OS signal.
  const motionEnabled = explicitPreference
    ? explicitPreference === 'on'
    : !osReducedMotion;

  // What to feed framer-motion's <MotionConfig reducedMotion={...}>: force it
  // one way or the other once the user has picked, otherwise let framer-motion
  // keep following the OS setting itself.
  const reducedMotionMode = explicitPreference
    ? (explicitPreference === 'off' ? 'always' : 'never')
    : 'user';

  const toggleMotion = () => {
    const next = motionEnabled ? 'off' : 'on';
    setExplicitPreference(next);
    try {
      localStorage.setItem('portfolio_motion', next);
    } catch {}
  };

  return (
    <MotionContext.Provider value={{ motionEnabled, reducedMotionMode, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotionPreference must be used within a MotionProvider');
  }
  return context;
}
