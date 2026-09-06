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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-[#E5DFD5] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDF7F0] border border-[#B28359]/40 flex items-center justify-center text-[#8C5B32]">
              <Gem className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-semibold text-[#1C1917]">
                The Ever After Diamond Guide
              </h2>
              <p className="text-xs text-[#78716C]">
                Expert guidance on the 4Cs, certification, and diamond selection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2ECE1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#E5DFD5] px-6 bg-[#FAF9F5] text-xs">
          <button
            onClick={() => setActiveTab('4cs')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === '4cs' ? 'border-[#B28359] text-[#8C5B32]' : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            The 4Cs (Cut, Clarity, Color, Carat)
          </button>
          <button
            onClick={() => setActiveTab('lab-vs-natural')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'lab-vs-natural' ? 'border-[#B28359] text-[#8C5B32]' : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
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
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32]">
                      1. Diamond Cut
                    </h3>
                    <span className="text-[10px] text-[#78716C] uppercase font-mono">The Most Critical 'C'</span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Cut determines how light enters the diamond and refracts back to your eye as sparkle, fire, and scintillation. We exclusively select diamonds with <strong>Ideal</strong> or <strong>Excellent</strong> cut grades.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-[11px] text-[#8C5B32]">
                    Tip: An Excellent cut makes a diamond appear larger and brighter than lower cut grades.
                  </div>
                </div>

                {/* 2. COLOR */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32]">
                      2. Diamond Color
                    </h3>
                    <span className="text-[10px] text-[#78716C] uppercase font-mono">D to Z Scale</span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Grades range from D (completely colorless and icy white) to Z. Ever After Diamonds selects stones strictly within the coveted <strong>D – F (Colorless)</strong> spectrum for maximum brilliance in yellow gold and platinum.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-[11px] text-[#8C5B32]">
                    Ever After Standard: D, E, and F grades only.
                  </div>
                </div>

                {/* 3. CLARITY */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32]">
                      3. Diamond Clarity
                    </h3>
                    <span className="text-[10px] text-[#78716C] uppercase font-mono">Microscopic Purity</span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Clarity assesses internal characteristics (inclusions) and external blemishes under 10x magnification. We guarantee every stone is <strong>100% eye-clean</strong> (FL, VVS1, VVS2, and VS1).
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-[11px] text-[#8C5B32]">
                    Guaranteed eye-clean with zero dark inclusions visible to the unaided eye.
                  </div>
                </div>

                {/* 4. CARAT */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-base font-semibold text-[#8C5B32]">
                      4. Carat Weight
                    </h3>
                    <span className="text-[10px] text-[#78716C] uppercase font-mono">1 Carat = 0.20 Grams</span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Carat measures physical weight. Because diamond cut depth varies, shape matters: elongated shapes like <strong>Oval</strong> and <strong>Emerald</strong> cut offer a larger visual surface area per carat on the finger.
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E5DFD5] text-[11px] text-[#8C5B32]">
                    Our signature creations range from 1.00ct to 5.00ct+ showstoppers.
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5DFD5] text-xs text-[#78716C] leading-relaxed">
                <strong className="text-[#1C1917] block text-sm mb-1">Are Lab-Grown Diamonds Real Diamonds?</strong>
                Yes, 100%. Chemically, physically, and optically, lab-grown diamonds are identical to mined diamonds. They are pure carbon with a cubic crystal structure, graded under the exact same GIA and IGI standards.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-3 shadow-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#FDF7F0] border border-[#B28359]/30 text-[#8C5B32] text-[10px] font-bold uppercase tracking-wider">
                    Lab-Grown Diamonds
                  </span>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#1C1917]">Modern Ethical Luxury</h4>
                  <ul className="text-xs text-[#78716C] space-y-2 list-disc list-inside">
                    <li>Identical brilliance, hardness (10 on Mohs scale), and chemical structure</li>
                    <li>Guaranteed zero ethical compromise & lower carbon footprint</li>
                    <li>Approximately 60-70% more accessible in price, enabling 2x larger carats</li>
                    <li>Certified by IGI and GIA laboratories</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD5] space-y-3 shadow-xs">
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#1C1917] text-[10px] font-bold uppercase tracking-wider border border-[#E5DFD5]">
                    Natural Mined Diamonds
                  </span>
                  <h4 className="font-serif-luxury text-base font-semibold text-[#1C1917]">Earth's Ancient Miracle</h4>
                  <ul className="text-xs text-[#78716C] space-y-2 list-disc list-inside">
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
        <div className="p-4 sm:p-6 border-t border-[#E5DFD5] flex items-center justify-between bg-[#FAF9F5]">
          <span className="text-xs text-[#78716C]">
            Official Consultation Available • 020 8166 6365
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white hover:bg-[#F2ECE1] border border-[#E5DFD5] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
