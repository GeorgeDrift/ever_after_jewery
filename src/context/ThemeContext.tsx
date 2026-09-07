'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Synchronously update DOM class and state
  const applyTheme = useCallback((targetTheme: ThemeMode) => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkSystem = mediaQuery.matches;
    const activeTheme = targetTheme === 'system' ? (isDarkSystem ? 'dark' : 'light') : targetTheme;
    
    setResolvedTheme(activeTheme);

    const root = document.documentElement;
    if (activeTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, []);

  // Read saved theme from localStorage on initial mount
  useEffect(() => {
    let initialTheme: ThemeMode = 'system';
    try {
      const savedTheme = localStorage.getItem('ead_theme_mode') as ThemeMode | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        initialTheme = savedTheme;
      } else {
        // Fallback: check DOM class set by anti-flicker script in head
        const isDomDark = document.documentElement.classList.contains('dark');
        initialTheme = isDomDark ? 'dark' : 'light';
      }
    } catch (e) {
      console.error('Error reading theme from localStorage:', e);
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [applyTheme]);

  // System theme change listener
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, [theme, mounted, applyTheme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
    try {
      localStorage.setItem('ead_theme_mode', mode);
    } catch (e) {
      console.error('Error saving theme to localStorage:', e);
    }
  };

  const cycleTheme = () => {
    const nextMode: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, cycleTheme }}>
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
