'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  Instagram, 
  PlusCircle, 
  DownloadCloud, 
  Sparkles, 
  Menu, 
  X,
  MessageCircle,
  Mail,
  Home,
  ChevronDown,
  SlidersHorizontal,
  User
} from 'lucide-react';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenDiamondGuide: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoHome?: () => void;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenConsultation,
  onOpenDiamondGuide,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onGoHome,
  onOpenAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'engagement-rings', label: 'Engagement Rings' },
    { id: 'wedding-bands', label: 'Wedding Bands' },
    { id: 'fine-jewelry', label: 'Fine Jewellery' },
    { id: 'bespoke-creations', label: 'Bespoke' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE4DA] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      {/* Specular Ambient Rim Light Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#B28359]/40 via-[#0284C7]/30 to-transparent" />

      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#F7F4EE] border-b border-[#ECE6DB] text-xs sm:text-sm uppercase tracking-[0.14em] py-2 px-4 text-[#57534E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="flex items-center gap-1.5 text-[#8C5B32] font-semibold shrink-0">
              <Sparkles className="w-4 h-4 text-[#B28359]" />
              <span>London Fine Jewellers</span>
            </span>
            <span className="hidden sm:inline text-[#D6CEBF]">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[#0284C7] font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span>GIA & IGI Certified</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm tracking-wider shrink-0 font-medium">
            <a 
              href="tel:02081666365" 
              className="hover:text-[#B28359] transition-colors flex items-center gap-1.5 text-[#57534E]"
              title="Call Office: 020 8166 6365"
            >
              <Phone className="w-3.5 h-3.5 text-[#B28359]" />
              <span>020 8166 6365</span>
            </a>
            <span className="text-[#D6CEBF]">/</span>
            <a 
              href="https://wa.me/447737806748" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 text-[#57534E]"
              title="WhatsApp: 07737 806748"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>07737 806748</span>
            </a>
            <span className="hidden lg:inline text-[#D6CEBF]">/</span>
            <a 
              href="mailto:info@everafterdiamonds.co.uk" 
              className="hidden lg:flex items-center gap-1.5 hover:text-[#B28359] transition-colors text-[#57534E]"
              title="Email: info@everafterdiamonds.co.uk"
            >
              <Mail className="w-3.5 h-3.5 text-[#B28359]" />
              <span>info@everafterdiamonds.co.uk</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Mobile menu trigger */}
        <button 
          id="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#1C1917] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F1E9]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Name (Always Navigates to Home View) */}
        <button 
          type="button" 
          onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
          title="Return to Home Page"
        >
          <div className="relative w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] via-[#0284C7]/40 to-[#B28359] shadow-xs group-hover:scale-105 transition-transform duration-300">
            <img 
              src={profileBadgeImgSrc} 
              alt="Ever After Diamonds Emblem" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-lg sm:text-xl md:text-2xl font-bold tracking-[0.16em] text-[#1C1917] group-hover:text-[#B28359] transition-colors uppercase leading-tight">
              EVER AFTER
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-xs tracking-[0.24em] uppercase font-semibold">
              <span className="text-[#8C5B32]">DIAMONDS</span>
              <span className="text-[#D3CBC0]">•</span>
              <span className="text-[#78716C]">LONDON</span>
            </div>
          </div>
        </button>

        {/* Desktop Category Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-3.5 py-2 rounded-full text-xs xl:text-sm tracking-[0.12em] uppercase font-semibold text-[#1C1917] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 border border-[#E5DFD5] bg-[#FAF9F5] shadow-xs"
              title="Return to Home Page"
            >
              <Home className="w-4 h-4 text-[#8C5B32]" />
              <span>Home</span>
            </button>
          )}

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs xl:text-sm tracking-[0.12em] uppercase font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FDF7F0] text-[#8C5B32] border border-[#E8D9C8] font-bold shadow-xs' 
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EB]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          
          {/* Diamond 4Cs Education Guide */}
          <button
            onClick={onOpenDiamondGuide}
            className="px-3.5 py-2 rounded-full text-xs xl:text-sm tracking-[0.12em] uppercase font-semibold text-[#57534E] hover:text-[#0284C7] hover:bg-[#F0F9FF] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#0284C7]" />
            <span>4Cs Guide</span>
          </button>
        </nav>

        {/* Right Utility Toolbar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Search Drawer Input Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#F7F4EE] border border-[#E5DFD5] rounded-full px-3 py-1 w-40 sm:w-56 shadow-inner animate-in fade-in duration-150">
                <Search className="w-3.5 h-3.5 text-[#0284C7] mr-1.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search rings..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-[#1C1917] focus:outline-none w-full placeholder-[#A8A29E]"
                />
                <button 
                  onClick={() => { setSearchOpen(false); onSearchChange(''); }}
                  className="text-[#78716C] hover:text-[#1C1917] ml-1 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="search-toggle-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#57534E] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#F5F2EB]"
                title="Search Storefront"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sign In / Private Client Portal Account Button */}
          {onOpenAuth ? (
            <button
              id="auth-modal-btn"
              onClick={onOpenAuth}
              className="p-2 text-[#57534E] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F2EB] flex items-center gap-1.5"
              title="Sign In / Private Client Account"
            >
              <User className="w-4 h-4 text-[#B28359]" />
              <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                Sign In
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="p-2 text-[#57534E] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F2EB] flex items-center gap-1.5"
              title="Sign In / Private Client Account"
            >
              <User className="w-4 h-4 text-[#B28359]" />
              <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                Sign In
              </span>
            </Link>
          )}

          {/* Book Consultation / Viewing Button */}
          <button
            id="book-consultation-btn"
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs active:scale-95"
          >
            <span>Book Viewing</span>
          </button>

          {/* Shopping Bag Drawer Button */}
          <button
            id="cart-drawer-btn"
            onClick={onOpenCart}
            className="relative p-2 text-[#1C1917] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F2EB]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#EAE4DA] px-4 py-4 space-y-3 shadow-lg">
          {onGoHome && (
            <button
              onClick={() => {
                onGoHome();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 text-xs uppercase tracking-wider rounded-lg bg-[#FAF7F2] text-[#8C5B32] font-semibold border border-[#E8D9C8] flex items-center justify-between shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-[#B28359]" />
                <span>Return to Home Page</span>
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#FDF7F0] text-[#8C5B32] font-semibold border border-[#E8D9C8]'
                    : 'text-[#57534E] hover:bg-[#F5F2EB] hover:text-[#1C1917]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#ECE6DB] space-y-2">
            {onOpenAuth ? (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#1C1917] font-semibold hover:text-[#B28359] flex items-center gap-2 border border-[#E5DFD5] rounded-xl bg-[#FAF9F5]"
              >
                <User className="w-4 h-4 text-[#B28359]" />
                <span>Sign In / Create Account</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#1C1917] font-semibold hover:text-[#B28359] flex items-center gap-2 border border-[#E5DFD5] rounded-xl bg-[#FAF9F5]"
              >
                <User className="w-4 h-4 text-[#B28359]" />
                <span>Sign In / Create Account</span>
              </Link>
            )}

            <button
              onClick={() => {
                onOpenDiamondGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#0284C7] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>The 4Cs Diamond Education</span>
            </button>

            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-full bg-[#B28359] text-white text-xs font-semibold uppercase tracking-wider shadow-xs mt-2"
            >
              Book Bespoke Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
