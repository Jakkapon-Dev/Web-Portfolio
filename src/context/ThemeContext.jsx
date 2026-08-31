import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ACCENT_THEMES = {
  cobalt: {
    id: 'cobalt',
    nameTh: 'น้ำเงิน Cobalt',
    nameEn: 'Cobalt Tech',
    hex: '#2A63F0',
    glow: 'rgba(42, 99, 240, 0.25)',
    borderClass: 'border-cobalt-500',
    textClass: 'text-cobalt-500',
    bgClass: 'bg-cobalt-500'
  },
  violet: {
    id: 'violet',
    nameTh: 'ม่วง Electric Violet',
    nameEn: 'Electric Violet',
    hex: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.25)',
    borderClass: 'border-purple-500',
    textClass: 'text-purple-500',
    bgClass: 'bg-purple-500'
  },
  emerald: {
    id: 'emerald',
    nameTh: 'เขียว Cyber Emerald',
    nameEn: 'Cyber Emerald',
    hex: '#10B981',
    glow: 'rgba(16, 185, 129, 0.25)',
    borderClass: 'border-emerald-500',
    textClass: 'text-emerald-500',
    bgClass: 'bg-emerald-500'
  },
  amber: {
    id: 'amber',
    nameTh: 'ส้ม Sunset Amber',
    nameEn: 'Sunset Amber',
    hex: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.25)',
    borderClass: 'border-amber-500',
    textClass: 'text-amber-500',
    bgClass: 'bg-amber-500'
  }
};

export function ThemeProvider({ children }) {
  // 1. Initial State: Check localStorage first; if not set, detect client OS / System Preference
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      // Auto-detect OS / System Preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [accentColor, setAccentColorState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_accent_color');
      if (saved && ACCENT_THEMES[saved]) return saved;
      return 'cobalt';
    } catch {
      return 'cobalt';
    }
  });

  const setAccentColor = (colorKey) => {
    if (ACCENT_THEMES[colorKey]) {
      setAccentColorState(colorKey);
      try {
        localStorage.setItem('portfolio_accent_color', colorKey);
      } catch {}
    }
  };

  const setThemeMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setTheme(mode);
      try {
        localStorage.setItem('portfolio_theme', mode);
      } catch {}
    }
  };

  // 2. Listen to Client OS / System Theme Changes in real-time (if user hasn't explicitly chosen)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const saved = localStorage.getItem('portfolio_theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // 3. Apply theme and accent classes to HTML and Body whenever they change
  useEffect(() => {
    try {
      const root = document.documentElement;
      const body = document.body;

      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        if (body) {
          body.classList.add('dark');
          body.classList.remove('light');
        }
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        if (body) {
          body.classList.remove('dark');
          body.classList.add('light');
        }
      }

      // Apply data-accent attribute
      root.setAttribute('data-accent', accentColor);
      if (body) {
        body.setAttribute('data-accent', accentColor);
      }
    } catch (e) {
      console.error("Theme toggle error:", e);
    }
  }, [theme, accentColor]);

  // 4. Manual Toggle: Saves user choice to localStorage
  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('portfolio_theme', newTheme);
      } catch {}
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode, accentColor, setAccentColor, currentAccent: ACCENT_THEMES[accentColor] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
