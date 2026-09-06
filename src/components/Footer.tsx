'use client';

import React from 'react';
import { 
  Instagram, 
  Phone, 
  Mail, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  DownloadCloud, 
  PlusCircle,
  Gem
} from 'lucide-react';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenShopifyExport: () => void;
  onOpenAddProduct: () => void;
  onOpenConsultation: () => void;
  onOpenDiamondGuide: () => void;
  onGoHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenShopifyExport,
  onOpenAddProduct,
  onOpenConsultation,
  onOpenDiamondGuide,
  onGoHome
}) => {
  return (
    <footer className="bg-[#F6F3ED] border-t border-[#EAE4DA] text-[#57534E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5DFD5]">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              type="button" 
              onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
              className="flex items-center gap-3 text-left group cursor-pointer"
              title="Return to Home Page"
            >
              <div className="w-12 h-12 rounded-full p-[1.5px] bg-[#B28359] shadow-xs group-hover:scale-105 transition-transform">
                <img 
                  src={profileBadgeImgSrc} 
                  alt="Ever After Diamonds Emblem" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif-luxury text-lg font-semibold tracking-[0.16em] text-[#1C1917] uppercase group-hover:text-[#B28359] transition-colors">
                  EVER AFTER
                </span>
                <span className="text-[10px] tracking-[0.28em] text-[#8C5B32] uppercase font-medium">
                  DIAMONDS • LONDON
                </span>
              </div>
            </button>

            <p className="text-xs text-[#78716C] leading-relaxed max-w-sm">
              Crafting timeless bespoke diamond engagement rings, eternity wedding bands, and high jewelry in London and Birmingham. Hand-selected GIA & IGI certified diamonds.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <a 
                href="https://everafterdiamonds.co.uk" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
                <span className="font-medium text-[#1C1917]">everafterdiamonds.co.uk</span>
              </a>

              <a 
                href="https://www.instagram.com/ever.after.diamonds" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#B28359] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#B28359]" />
                <span>@ever.after.diamonds</span>
              </a>

              <a 
                href="mailto:info@everafterdiamonds.co.uk" 
                className="flex items-center gap-2 hover:text-[#B28359] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#B28359]" />
                <span>info@everafterdiamonds.co.uk</span>
              </a>
            </div>
          </div>

          {/* Quick Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1C1917]">
              Fine Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('engagement-rings')} className="hover:text-[#B28359] transition-colors">
                  Engagement Rings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('wedding-bands')} className="hover:text-[#B28359] transition-colors">
                  Wedding Bands
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fine-jewelry')} className="hover:text-[#B28359] transition-colors">
                  Diamond Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bespoke-creations')} className="hover:text-[#B28359] transition-colors">
                  Bespoke Commissions
                </button>
              </li>
              <li>
                <button onClick={onOpenDiamondGuide} className="hover:text-[#0284C7] transition-colors">
                  The 4Cs Diamond Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Bespoke (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1C1917]">
              Bespoke & Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B28359]" />
                <span>Main Office: <a href="tel:02081666365" className="text-[#1C1917] hover:text-[#B28359]">020 8166 6365</a></span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: <a href="https://wa.me/447737806748" target="_blank" rel="noreferrer" className="text-[#1C1917] hover:text-emerald-700">07737 806748</a></span>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="text-[#B28359] hover:underline font-medium">
                  Book London Showroom Viewing →
                </button>
              </li>
              <li className="text-[11px] text-[#78716C] pt-1">
                Complimentary 60-Day Resizing & Annual Cleanings
              </li>
            </ul>
          </div>

          {/* Merchant & Shopify Portal (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1C1917]">
              Merchant & Shopify Hub
            </h4>
            <p className="text-xs text-[#78716C]">
              Manage storefront products and transfer inventory into Shopify whenever required.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenShopifyExport}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#F9F7F4] border border-[#BAE6FD] text-[#0284C7] text-xs font-medium flex items-center justify-between transition-colors shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <DownloadCloud className="w-3.5 h-3.5" />
                  <span>Transfer to Shopify (CSV)</span>
                </span>
                <span className="text-[10px] bg-[#E0F2FE] px-2 py-0.5 rounded font-semibold text-[#0284C7]">Ready</span>
              </button>

              <button
                onClick={onOpenAddProduct}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#F9F7F4] border border-[#E0D9CE] hover:border-[#B28359] text-[#8C5B32] text-xs font-medium flex items-center justify-between transition-colors shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5 text-[#B28359]" />
                  <span>Add Product to Store</span>
                </span>
                <span className="text-[10px] bg-[#F5EDE1] text-[#8C5B32] px-2 py-0.5 rounded font-semibold">+ New</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Hallmarking & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-[#78716C]">
          <div>
            <p>© {new Date().getFullYear()} Ever After Diamonds Ltd. Registered in England & Wales.</p>
            <p className="mt-0.5">Compliant with UK Hallmarking Act 1973. All precious metals independently assayed and certified.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-[#B28359] cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#B28359] cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#B28359] cursor-pointer">UK Delivery & Returns</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
