import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthCard } from '@/components/AuthCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Sparkles, ArrowLeft, ShieldCheck, Phone, Mail } from 'lucide-react';
import profileBadgeImg from '@/assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

export const metadata: Metadata = {
  title: 'Sign In | Ever After Diamonds Private Client Portal',
  description: 'Access your private client portal, GIA diamond vault, saved bespoke jewelry designs, and priority Hatton Garden appointments.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#0E0D0C] text-[#1C1917] dark:text-[#F5F2EB] flex flex-col relative overflow-hidden transition-colors">
      
      {/* Luminous Ambient Diamond Sunlight Bloom background effects */}
      <div className="absolute inset-0 pointer-events-none light-bloom-ambient opacity-60 dark:opacity-20" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[radial-gradient(circle,rgba(224,242,254,0.5)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#141210]/90 backdrop-blur-md border-b border-[#EAE4DA] dark:border-[#332E2A] px-4 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo Link */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] to-[#0284C7]/40">
              <img 
                src={profileBadgeImgSrc} 
                alt="Ever After Emblem" 
                className="w-full h-full object-cover rounded-full bg-white dark:bg-[#1C1917]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-[0.16em] text-[#1C1917] dark:text-[#F5F2EB] group-hover:text-[#B28359] dark:group-hover:text-[#D4AF37] transition-colors uppercase leading-tight">
                EVER AFTER
              </span>
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C5B32] dark:text-[#D4AF37]">
                DIAMONDS • LONDON
              </span>
            </div>
          </Link>

          {/* Navigation & Theme Action */}
          <div className="flex items-center gap-3">
            <ThemeToggle variant="toggle" />
            <Link 
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#57534E] dark:text-[#D4CEC4] hover:text-[#1C1917] dark:hover:text-white hover:bg-[#F5F2EB] dark:hover:bg-[#24201D] border border-[#E5DFD5] dark:border-[#3D352E] transition-all bg-white dark:bg-[#181614]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Atelier</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-12 lg:py-16 flex items-center justify-center relative z-10">
        <AuthCard initialMode="login" />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAE4DA] dark:border-[#332E2A] bg-white dark:bg-[#141210] py-6 px-4 text-xs text-[#78716C] dark:text-[#A3998E] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
            <span>Encrypted Private Client Vault & SSL 256-Bit Protection</span>
          </div>

          <div className="flex items-center gap-4 text-[#57534E] dark:text-[#D4CEC4]">
            <a href="tel:02081666365" className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#B28359] dark:text-[#D4AF37]" />
              <span>020 8166 6365</span>
            </a>
            <span>•</span>
            <a href="mailto:info@everafterdiamonds.co.uk" className="hover:text-[#B28359] dark:hover:text-[#D4AF37] transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#B28359] dark:text-[#D4AF37]" />
              <span>Concierge Desk</span>
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} Ever After Diamonds UK. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
