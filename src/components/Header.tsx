'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  Instagram, 
  Globe, 
  PlusCircle, 
  DownloadCloud, 
  Sparkles, 
  Menu, 
  X,
  MessageCircle,
  Home,
  ArrowLeft
} from 'lucide-react';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAddProduct: () => void;
  onOpenShopifyExport: () => void;
  onOpenConsultation: () => void;
  onOpenDiamondGuide: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenAddProduct,
  onOpenShopifyExport,
  onOpenConsultation,
  onOpenDiamondGuide,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onGoHome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'engagement-rings', label: 'Engagement Rings' },
    { id: 'wedding-bands', label: 'Wedding Bands' },
    { id: 'fine-jewelry', label: 'Fine Jewellery' },
    { id: 'bespoke-creations', label: 'Bespoke Creations' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE4DA] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      {/* Specular Ambient Rim Light Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B28359]/30 via-[#0284C7]/25 to-transparent" />

      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#F7F4EE] border-b border-[#ECE6DB] text-[11px] uppercase tracking-[0.16em] py-2 px-4 text-[#57534E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#8C5B32] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#B28359]" />
              <span>Bespoke Fine Jewellers UK</span>
            </span>
            <span className="hidden md:inline text-[#D6CEBF]">•</span>
            {/* Sky Blue Optical Certification Chip */}
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-[10px] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>GIA & IGI Verified</span>
            </span>
            <span className="hidden lg:inline text-[#D6CEBF]">•</span>
            <span className="hidden lg:inline text-[#57534E]">18k Gold, White Gold & Platinum</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-wider">
            <a 
              href="tel:02081666365" 
              className="hover:text-[#B28359] transition-colors flex items-center gap-1 text-[#57534E]"
            >
              <Phone className="w-3 h-3 text-[#B28359]" />
              <span>020 8166 6365</span>
            </a>
            <span className="text-[#D6CEBF]">/</span>
            <a 
              href="https://wa.me/447737806748" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-700 transition-colors flex items-center gap-1 text-[#57534E]"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>07737 806748</span>
            </a>
            <span className="text-[#D6CEBF]">/</span>
            <a 
              href="https://everafterdiamonds.co.uk" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#0284C7] transition-colors flex items-center gap-1 text-[#57534E]"
            >
              <Globe className="w-3 h-3 text-[#0284C7]" />
              <span className="text-[#57534E] hover:text-[#0284C7]">everafterdiamonds.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Identity & Navigation Bar */}
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

        {/* Brand Profile Picture & Domain Logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
            className="flex items-center gap-3 group text-left cursor-pointer"
            title="Return to Home Page"
          >
            <div className="relative w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#B28359] via-[#0284C7]/40 to-[#B28359] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img 
                src={profileBadgeImgSrc} 
                alt="Ever After Diamonds Logo Profile" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full bg-white"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif-luxury text-lg sm:text-xl font-semibold tracking-[0.16em] text-[#1C1917] group-hover:text-[#B28359] transition-colors uppercase leading-tight">
                EVER AFTER
              </span>
              <div className="flex items-center gap-1.5 text-[10px] tracking-[0.24em] uppercase font-medium">
                <span className="text-[#8C5B32]">DIAMONDS</span>
                <span className="text-[#D3CBC0]">•</span>
                <span className="text-[#78716C]">LONDON</span>
              </div>
            </div>
          </button>

          {/* Direct Link to Instagram Profile */}
          <a
            href="https://www.instagram.com/ever.after.diamonds"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4EE] border border-[#E5DFD5] text-[11px] text-[#57534E] hover:text-[#1C1917] hover:border-[#B28359]/40 transition-all ml-2"
            title="Follow @ever.after.diamonds on Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-[#B28359]" />
            <span>@ever.after.diamonds</span>
          </a>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="px-3 py-1.5 rounded-full text-xs tracking-[0.12em] uppercase font-semibold text-[#1C1917] hover:bg-[#F5F2EB] transition-all flex items-center gap-1 mr-1"
              title="Return to Home Image"
            >
              <Home className="w-3 h-3 text-[#8C5B32]" />
              <span>Home</span>
            </button>
          )}

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-[0.12em] uppercase font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FDF7F0] text-[#8C5B32] border border-[#E8D9C8] shadow-sm font-semibold' 
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EB]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
          
          {/* Diamond Guide Link */}
          <button
            onClick={onOpenDiamondGuide}
            className="px-3 py-1.5 rounded-full text-xs tracking-[0.12em] uppercase font-medium text-[#57534E] hover:text-[#0284C7] hover:bg-[#F0F9FF] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>4Cs Guide</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Toggle */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-[#F7F4EE] border border-[#E5DFD5] rounded-full px-3 py-1.5 w-44 sm:w-60 shadow-inner">
                <Search className="w-3.5 h-3.5 text-[#0284C7] mr-2" />
                <input
                  type="text"
                  placeholder="Search rings, carats..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-[#1C1917] focus:outline-none w-full placeholder-[#A8A29E]"
                />
                <button 
                  onClick={() => { setSearchOpen(false); onSearchChange(''); }}
                  className="text-[#78716C] hover:text-[#1C1917] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="search-toggle-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#57534E] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#F5F2EB]"
                title="Search Jewelry"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Shopify Transfer Ready Button */}
          <button
            id="shopify-transfer-btn"
            onClick={onOpenShopifyExport}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F9F7F4] border border-[#E0D9CE] hover:border-[#0284C7] text-[#292524] hover:text-[#1C1917] text-xs font-medium tracking-wide transition-all shadow-sm"
            title="Transfer products to Shopify (CSV / JSON Ready)"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="hidden md:inline">Shopify Transfer</span>
          </button>

          {/* Storefront Add Product */}
          <button
            id="add-product-btn"
            onClick={onOpenAddProduct}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F9F7F4] border border-[#E0D9CE] hover:border-[#B28359] text-[#292524] hover:text-[#1C1917] text-xs font-medium tracking-wide transition-all shadow-sm"
            title="Add new diamond jewelry product to storefront"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#B28359]" />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          {/* Bespoke Consultation Trigger */}
          <button
            id="book-consultation-btn"
            onClick={onOpenConsultation}
            className="hidden xl:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-sm shadow-[#B28359]/20 active:scale-95"
          >
            <span>Book Consultation</span>
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            id="cart-drawer-btn"
            onClick={onOpenCart}
            className="relative p-2 text-[#1C1917] hover:text-[#B28359] transition-colors rounded-full hover:bg-[#F5F2EB]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
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
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider rounded-lg bg-[#FAF7F2] text-[#8C5B32] font-semibold border border-[#E8D9C8] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home Page</span>
              </span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
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

          <div className="pt-3 border-t border-[#ECE6DB] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDiamondGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#0284C7]"
            >
              The 4Cs Diamond Education
            </button>
            <button
              onClick={() => {
                onOpenConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-full bg-[#B28359] text-white text-xs font-semibold uppercase tracking-wider shadow-sm"
            >
              Book Bespoke Consultation
            </button>
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  onOpenShopifyExport();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-[#0284C7] flex items-center gap-1.5"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>Shopify Transfer (CSV / JSON)</span>
              </button>
              <a
                href="https://www.instagram.com/ever.after.diamonds"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#57534E] flex items-center gap-1 hover:text-[#B28359]"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@ever.after.diamonds</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
