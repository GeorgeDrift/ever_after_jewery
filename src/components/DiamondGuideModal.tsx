'use client';

import React, { useState } from 'react';
import { X, Sparkles, Gem, ShieldCheck, Award, Eye } from 'lucide-react';

interface DiamondGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiamondGuideModal: React.FC<DiamondGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'4cs' | 'lab-vs-natural'>('4cs');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] rounded-2xl shadow-2xl overflow-hidden my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDF7F0] dark:bg-[#261E17] border border-[#B28359]/40 dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37]">
              <Gem className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                The Ever After Diamond Guide
              </h2>
              <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                Expert guidance on the 4Cs, certification, and diamond selection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#E5DFD5] dark:border-[#332E2A] px-6 bg-[#FAF9F5] dark:bg-[#211E1A] text-xs">
          <button
            onClick={() => setActiveTab('4cs')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === '4cs'
                ? 'border-[#B28359] dark:border-[#D4AF37] text-[#8C5B32] dark:text-[#D4AF37]'
                : 'border-transparent text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
            }`}
          >
            The 4Cs (Cut, Clarity, Color, Carat)
          </button>
          <button
            onClick={() => setActiveTab('lab-vs-natural')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'lab-vs-natural'
                ? 'border-[#B28359] dark:border-[#D4AF37] text-[#8C5B32] dark:text-[#D4AF37]'
                : 'border-transparent text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
            }`}
          >
            Lab-Grown vs Natural Diamonds
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {activeTab === '4cs' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. CUT */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32] dark:text-[#D4AF37]">
                      1. Diamond Cut
                    </h3>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase font-mono">The Most Critical 'C'</span>
                  </div>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                    Cut determines how light enters the diamond and refracts back to your eye as sparkle, fire, and scintillation. We exclusively select diamonds with <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Ideal</strong> or <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Excellent</strong> cut grades.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] text-[11px] text-[#8C5B32] dark:text-[#D4AF37]">
                    Tip: An Excellent cut makes a diamond appear larger and brighter than lower cut grades.
                  </div>
                </div>

                {/* 2. COLOR */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32] dark:text-[#D4AF37]">
                      2. Diamond Color
                    </h3>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase font-mono">D to Z Scale</span>
                  </div>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                    Grades range from D (completely colorless and icy white) to Z. Ever After Diamonds selects stones strictly within the coveted <strong className="text-[#1C1917] dark:text-[#F5F2EB]">D – F (Colorless)</strong> spectrum for maximum brilliance in yellow gold and platinum.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] text-[11px] text-[#8C5B32] dark:text-[#D4AF37]">
                    Ever After Standard: D, E, and F grades only.
                  </div>
                </div>

                {/* 3. CLARITY */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32] dark:text-[#D4AF37]">
                      3. Diamond Clarity
                    </h3>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase font-mono">Microscopic Purity</span>
                  </div>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                    Clarity assesses internal characteristics (inclusions) and external blemishes under 10x magnification. We guarantee every stone is <strong className="text-[#1C1917] dark:text-[#F5F2EB]">100% eye-clean</strong> (FL, VVS1, VVS2, and VS1).
                  </p>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] text-[11px] text-[#8C5B32] dark:text-[#D4AF37]">
                    Guaranteed eye-clean with zero dark inclusions visible to the unaided eye.
                  </div>
                </div>

                {/* 4. CARAT */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32] dark:text-[#D4AF37]">
                      4. Carat Weight
                    </h3>
                    <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase font-mono">1 Carat = 0.20 Grams</span>
                  </div>
                  <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                    Carat measures physical weight. Because diamond cut depth varies, shape matters: elongated shapes like <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Oval</strong> and <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Emerald</strong> cut offer a larger visual surface area per carat on the finger.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] text-[11px] text-[#8C5B32] dark:text-[#D4AF37]">
                    Our signature creations range from 1.00ct to 5.00ct+ showstoppers.
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                <strong className="text-[#1C1917] dark:text-[#F5F2EB] block text-sm mb-1">Are Lab-Grown Diamonds Real Diamonds?</strong>
                Yes, 100%. Chemically, physically, and optically, lab-grown diamonds are identical to mined diamonds. They are pure carbon with a cubic crystal structure, graded under the exact same GIA and IGI standards.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-3 shadow-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#FDF7F0] dark:bg-[#261E17] border border-[#B28359]/30 dark:border-[#574628] text-[#8C5B32] dark:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                    Lab-Grown Diamonds
                  </span>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Modern Ethical Luxury</h4>
                  <ul className="text-xs text-[#78716C] dark:text-[#A3998E] space-y-2 list-disc list-inside">
                    <li>Identical brilliance, hardness (10 on Mohs scale), and chemical structure</li>
                    <li>Guaranteed zero ethical compromise & lower carbon footprint</li>
                    <li>Approximately 60-70% more accessible in price, enabling 2x larger carats</li>
                    <li>Certified by IGI and GIA laboratories</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] space-y-3 shadow-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white dark:bg-[#181614] text-[#1C1917] dark:text-[#F5F2EB] text-[10px] font-bold uppercase tracking-wider border border-[#E5DFD5] dark:border-[#3A332B]">
                    Natural Mined Diamonds
                  </span>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Earth's Ancient Miracle</h4>
                  <ul className="text-xs text-[#78716C] dark:text-[#A3998E] space-y-2 list-disc list-inside">
                    <li>Formed 1 to 3 billion years ago deep inside Earth's mantle</li>
                    <li>Extreme rarity and traditional heirloom heritage</li>
                    <li>Higher baseline market valuation</li>
                    <li>Certified with full GIA grading dossier</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <span className="text-xs text-[#78716C] dark:text-[#A3998E]">
            Official Consultation Available • 020 8166 6365
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white dark:bg-[#181614] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] border border-[#E5DFD5] dark:border-[#3A332B] text-[#1C1917] dark:text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
