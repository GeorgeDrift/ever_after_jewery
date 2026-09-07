'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '@/context/ThemeContext';
import { Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'pill' | 'dropdown' | 'toggle';
  className?: string;
}

export function ThemeToggle({ variant = 'dropdown', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, cycleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { mode: 'light', label: 'Daylight Ivory', icon: Sun },
    { mode: 'dark', label: 'Obsidian Velvet', icon: Moon },
    { mode: 'system', label: 'System Automatic', icon: Monitor },
  ];

  // Single Click Direct Light/Dark Toggle Button
  if (variant === 'toggle') {
    const isDark = resolvedTheme === 'dark';
    return (
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-xs active:scale-95 ${
          isDark
            ? 'bg-[#1F1B18] border-[#B28359]/60 text-[#D4AF37] hover:border-[#D4AF37]'
            : 'bg-[#FAF6F0] border-[#E5D5C3] text-[#1C1917] hover:border-[#B28359]'
        } ${className}`}
        title={`Switch to ${isDark ? 'Light (Daylight Ivory)' : 'Dark (Obsidian Velvet)'} Theme`}
        aria-label="Toggle light and dark theme"
      >
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-[#B28359] to-[#D4AF37] p-[1.5px] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
          <div className="w-full h-full rounded-full bg-white dark:bg-[#1C1917] flex items-center justify-center">
            {isDark ? (
              <Moon className="w-3 h-3 text-[#D4AF37]" />
            ) : (
              <Sun className="w-3 h-3 text-[#B28359]" />
            )}
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-full bg-[#FAF6F0] dark:bg-[#1E1B18] border border-[#E5D5C3] dark:border-[#574628] shadow-xs ${className}`}>
        {options.map(({ mode, label, icon: Icon }) => {
          const isActive = theme === mode;
          return (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              title={label}
              className={`relative px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#1C1917] to-[#2A2318] text-[#D4AF37] shadow-sm border border-[#B28359]/50'
                  : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#B28359] dark:hover:text-[#D4AF37]'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isActive ? 'text-[#D4AF37] scale-110' : 'text-[#B28359]'
                }`}
              />
              <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">{mode}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown Mode
  const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      
      {/* Trigger Button with Gold Icon Styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] dark:bg-[#24201D] border border-[#E5D5C3] dark:border-[#574628] hover:border-[#B28359] dark:hover:border-[#D4AF37] text-[#1C1917] dark:text-[#F5F2EB] text-xs font-semibold transition-all duration-200 shadow-xs active:scale-95"
        aria-label="Toggle theme mode"
      >
        {/* Gold Glow Icon Wrapper */}
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-[#B28359] to-[#D4AF37] p-[1px] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-[#FAF9F5] dark:bg-[#1C1917] flex items-center justify-center">
            <ActiveIcon className="w-3 h-3 text-[#B28359] dark:text-[#D4AF37] transition-colors" />
          </div>
        </div>

        <span className="capitalize font-bold text-[11px] hidden sm:inline text-[#57534E] dark:text-[#D6CEC4]">
          {theme === 'system' ? `Auto (${resolvedTheme})` : theme === 'dark' ? 'Dark' : 'Light'}
        </span>

        <ChevronDown className={`w-3 h-3 text-[#B28359] dark:text-[#D4AF37] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Gold Accented Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E5D5C3] dark:border-[#3D352E] shadow-2xl z-50 p-1.5 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C5B32] dark:text-[#D4AF37] border-b border-[#F0ECE4] dark:border-[#2D2620]">
            Appearance Theme
          </div>

          {options.map(({ mode, label, icon: Icon }) => {
            const isSelected = theme === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#FAF5EF] dark:bg-[#2A2318] text-[#8C5B32] dark:text-[#D4AF37] font-semibold'
                    : 'text-[#57534E] dark:text-[#D6CEC3] hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] hover:text-[#1C1917] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-[#B28359]'}`} />
                  <span>{label}</span>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                )}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
