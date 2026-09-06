'use client';

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Search, 
  X,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

// Default luxury assets
import heroModelDefault from '../assets/images/hero_model_portrait_1788678812463.jpg';
import jewelryHandsImg from '../assets/images/jewelry_hands_model_1788678830602.jpg';
import quiltedRingImg from '../assets/images/quilted_gold_ring_1788678850782.jpg';
import eternityBandImg from '../assets/images/eternity_band_1788549296021.jpg';
import heroLuminousImg from '../assets/images/hero_luminous_ring_1788550715750.jpg';
import emeraldCutImg from '../assets/images/emerald_cut_luxury_1788550731926.jpg';

const toSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || '');
const heroModelDefaultSrc = toSrc(heroModelDefault);
const jewelryHandsImgSrc = toSrc(jewelryHandsImg);
const quiltedRingImgSrc = toSrc(quiltedRingImg);
const eternityBandImgSrc = toSrc(eternityBandImg);
const heroLuminousImgSrc = toSrc(heroLuminousImg);
const emeraldCutImgSrc = toSrc(emeraldCutImg);

/**
 * =========================================================================
 * ✦ EDITORIAL HERO CONFIGURATION — CHANGE YOUR IMAGES & COPY IN CODE ✦
 * -------------------------------------------------------------------------
 * To change the centerpiece model image, simply replace `centerModelImage`
 * below with another local image import or any direct image URL string.
 * =========================================================================
 */
export const HERO_CONFIG = {
  // 1. CENTERPIECE MODEL IMAGE (replace here in code anytime):
  centerModelImage: heroModelDefaultSrc,

  // 2. GIANT EDITORIAL BRAND TYPOGRAPHY:
  brandWordLeft: 'Blu',
  brandWordRight: 'Nile',

  // 3. EDITORIAL COPY:
  manifesto:
    'Each design reflects the dialogue between craftsmanship and feeling, exploring what it means to express oneself with elegance and depth.',
  sinceTag: '[ Since 2017 ]',

  // 4. RIGHT COCO CRUSH RING CARD:
  cocoCrushCard: {
    title: 'Coco Crush ring',
    subtitle: '[ 18K yellow ]',
    price: '$25,550',
    image: quiltedRingImgSrc
  }
};

interface HeroSectionProps {
  onExploreClick: () => void;
  onGoHome?: () => void;
  onGoShop?: () => void;
  onBespokeClick: () => void;
  onOpenDiamondGuide?: () => void;
  onOpenCart?: () => void;
  onOpenAddProduct?: () => void;
  onOpenShopifyExport?: () => void;
  cartCount?: number;
  onSelectProduct?: (product: Product) => void;
  products?: Product[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onGoHome,
  onGoShop,
  onBespokeClick,
  onOpenDiamondGuide,
  onOpenCart,
  cartCount = 2,
  onSelectProduct,
  products = [],
  searchQuery = '',
  onSearchChange
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Safe fallback to explore
  const triggerShop = onGoShop || onExploreClick;

  // Card 1: New Collection preview carousel
  const [collectionIndex, setCollectionIndex] = useState(0);
  const collectionLooks = [
    {
      title: 'New Collection',
      year: '2026',
      image: jewelryHandsImgSrc,
      subtitle: 'Layered Rings & Fine Chains'
    },
    {
      title: 'Solitaire Edit',
      year: '2026',
      image: heroLuminousImgSrc,
      subtitle: 'Oval Cut Hidden Halo'
    },
    {
      title: 'High Jewellery',
      year: '2026',
      image: emeraldCutImgSrc,
      subtitle: 'Mayfair Trilogy Step-Cut'
    }
  ];

  // Card 2: Advent ring carousel
  const [adventIndex, setAdventIndex] = useState(0);
  const adventRings = [
    {
      name: 'Advent',
      year: '2025',
      image: eternityBandImgSrc
    },
    {
      name: 'Eternity Crest',
      year: '2025',
      image: heroLuminousImgSrc
    },
    {
      name: 'Quilted Band',
      year: '2025',
      image: quiltedRingImgSrc
    },
    {
      name: 'Mayfair Trilogy',
      year: '2025',
      image: emeraldCutImgSrc
    }
  ];

  // Card 3: Open product details
  const handleOpenCocoCrush = () => {
    const coco = products.find(
      (p) => p.id === 'ead-000' || p.title.toLowerCase().includes('coco crush')
    );
    triggerShop();
    if (coco && onSelectProduct) {
      setTimeout(() => onSelectProduct(coco), 60);
    }
  };

  return (
    <section className="relative w-full bg-[#E5D7C5] p-3 sm:p-5 md:p-7 lg:p-8 select-none">
      
      {/* 
        =======================================================================
        EDITORIAL POSTER CONTAINER
        Clean studio grey-blue canvas framed inside the warm matte surround
        =======================================================================
      */}
      <div className="relative w-full max-w-[1540px] mx-auto bg-gradient-to-b from-[#EFF1F5] via-[#E8EBF1] to-[#DFE3EB] rounded-2xl md:rounded-[26px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] overflow-hidden border border-[#D5D9E2]">
        
        {/* Subtle Geometric Linear Circles / Arcs directly matching reference image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg
            className="absolute -left-28 top-16 w-[620px] h-[620px] text-[#D0D6E2] opacity-60"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="200" cy="300" r="280" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="300" r="420" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" />
          </svg>
          <svg
            className="absolute -right-32 top-28 w-[620px] h-[620px] text-[#D0D6E2] opacity-60"
            viewBox="0 0 600 600"
            fill="none"
          >
            <circle cx="400" cy="300" r="300" stroke="currentColor" strokeWidth="1" />
            <circle cx="400" cy="300" r="440" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>

        {/* 
          =======================================================================
          TOP EDITORIAL NAVIGATION BAR (Directly matching the screenshot)
          [ Home ]  Shop  Search  Catalog  About          Profile  Favorites  Cart ❷
          =======================================================================
        */}
        <header className="relative z-30 px-5 sm:px-10 lg:px-14 pt-6 sm:pt-8 pb-3 flex items-center justify-between text-xs sm:text-[13px] text-[#1C1917] font-sans font-medium tracking-normal">
          
          {/* Left Navigation Items */}
          <nav className="flex items-center gap-3 sm:gap-6 lg:gap-7">
            <button 
              onClick={onGoHome || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="text-black font-bold hover:opacity-75 transition-opacity"
            >
              [ Home ]
            </button>

            {/* Prominent Shop Button — Direct Access to Ever After Store Section */}
            <button 
              onClick={triggerShop}
              className="px-3 sm:px-4 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs tracking-wide transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
              title="Shop all fine rings and diamonds"
            >
              <span>Shop</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Inline Search Bar */}
            {isSearchActive ? (
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#CFD5DE] rounded-full px-3 py-1 shadow-xs animate-in fade-in">
                <Search className="w-3.5 h-3.5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search rings, diamonds..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      triggerShop();
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-black focus:outline-none w-28 sm:w-44 placeholder-[#9CA3AF]"
                />
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    onSearchChange?.('');
                  }}
                  className="text-[#9CA3AF] hover:text-black text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsSearchActive(true);
                }}
                className="text-[#4B5563] hover:text-black transition-colors"
              >
                Search
              </button>
            )}

            <button 
              onClick={triggerShop}
              className="text-[#4B5563] hover:text-black transition-colors"
            >
              Catalog
            </button>

            <button 
              onClick={onBespokeClick}
              className="text-[#4B5563] hover:text-black transition-colors"
            >
              About
            </button>

            {onOpenDiamondGuide && (
              <button
                onClick={onOpenDiamondGuide}
                className="text-[#4B5563] hover:text-black transition-colors hidden md:inline"
              >
                4Cs Guide
              </button>
            )}
          </nav>

          {/* Right Navigation Items */}
          <div className="flex items-center gap-4 sm:gap-7 lg:gap-8">
            <button 
              onClick={onBespokeClick}
              className="text-[#4B5563] hover:text-black transition-colors hidden sm:inline"
            >
              Profile
            </button>
            <button 
              onClick={triggerShop}
              className="text-[#4B5563] hover:text-black transition-colors hidden sm:inline"
            >
              Favorites
            </button>
            
            {/* Cart with solid black number pill */}
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-1.5 font-medium text-black hover:opacity-80 transition-opacity"
            >
              <span>Cart</span>
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {cartCount > 0 ? cartCount : 2}
              </span>
            </button>
          </div>
        </header>

        {/* 
          =======================================================================
          MAIN EDITORIAL STAGE (Typography, Model, Copy, and Bottom Floating Cards)
          =======================================================================
        */}
        <div className="relative min-h-[560px] sm:min-h-[660px] md:min-h-[740px] lg:min-h-[820px] flex flex-col justify-between px-5 sm:px-10 lg:px-14 pt-2 pb-8 sm:pb-12">
          
          {/* 
            GIANT BOLD HEADLINE: "Blu Nile"
            Layered seamlessly behind the model's head
          */}
          <div className="absolute inset-x-0 top-6 sm:top-8 z-10 pointer-events-none flex justify-between items-start px-4 sm:px-10 lg:px-14 w-full">
            <h1 className="font-sans font-black tracking-[-0.04em] text-[#0A0A0D] leading-none text-[22vw] sm:text-[20vw] md:text-[18.5vw] lg:text-[17vw] select-none">
              {HERO_CONFIG.brandWordLeft}
            </h1>
            <h1 className="font-sans font-black tracking-[-0.04em] text-[#0A0A0D] leading-none text-[22vw] sm:text-[20vw] md:text-[18.5vw] lg:text-[17vw] select-none">
              {HERO_CONFIG.brandWordRight}
            </h1>
          </div>

          {/* 
            EDITORIAL COPY & TAGS
            Left manifesto quote + Right [ Since 2017 ]
          */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-4 mt-8 sm:mt-12 md:mt-16 pointer-events-none">
            {/* Left Manifesto */}
            <div className="md:col-span-5 lg:col-span-4 text-left pointer-events-auto">
              <p className="text-xs sm:text-[13px] md:text-[13.5px] leading-[1.65] text-[#4B5563] max-w-[275px] font-normal">
                {HERO_CONFIG.manifesto}
              </p>
            </div>

            <div className="hidden md:block md:col-span-2 lg:col-span-4" />

            {/* Right Tag */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-end items-start text-right">
              <span className="text-xs sm:text-[13px] text-[#4B5563] font-medium tracking-wide">
                {HERO_CONFIG.sinceTag}
              </span>
            </div>
          </div>

          {/* 
            CENTERPIECE MODEL PORTRAIT
            Layered between the giant headline (z-10) and bottom cards (z-30).
            The portrait uses a soft gradient bottom mask so it dissolves seamlessly into the studio set.
          */}
          <div className="absolute inset-x-0 bottom-0 top-8 sm:top-10 z-20 flex items-end justify-center pointer-events-none">
            <div 
              className="relative w-[340px] sm:w-[440px] md:w-[540px] lg:w-[620px] xl:w-[680px] h-[500px] sm:h-[600px] md:h-[700px] lg:h-[780px] flex items-end justify-center"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.6) 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.6) 90%, transparent 100%)'
              }}
            >
              <img
                src={HERO_CONFIG.centerModelImage}
                alt="Editorial fine jewelry model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* 
            =======================================================================
            BOTTOM THREE FLOATING CARDS (Directly from the reference image)
            Card 1: New Collection [ 2026 ]
            Card 2: Advent [ 2025 ]
            Card 3: Coco Crush ring [ 18K yellow ]
            =======================================================================
          */}
          <div className="relative z-30 mt-auto pt-48 sm:pt-52 md:pt-48 lg:pt-40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-end">
              
              {/* CARD 1: NEW COLLECTION [ 2026 ] */}
              <div className="md:col-span-4 lg:col-span-3">
                <div 
                  onClick={onExploreClick}
                  className="bg-white rounded-xl p-3.5 sm:p-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-[#E3E6EC] transition-all hover:shadow-lg cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs sm:text-[13px] font-bold text-black tracking-tight">
                      {collectionLooks[collectionIndex].title}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      [{collectionLooks[collectionIndex].year}]
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F3F4F6] mb-3">
                    <img
                      src={collectionLooks[collectionIndex].image}
                      alt="Collection look preview"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Controls: Diamond on left, arrows on right */}
                  <div 
                    className="flex items-center justify-between pt-1 border-t border-[#F1F3F6]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs text-black">◆</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCollectionIndex((prev) =>
                            prev === 0 ? collectionLooks.length - 1 : prev - 1
                          )
                        }
                        className="p-1 rounded text-[#6B7280] hover:text-black transition-colors"
                        aria-label="Previous look"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setCollectionIndex((prev) => (prev + 1) % collectionLooks.length)
                        }
                        className="p-1 rounded text-[#6B7280] hover:text-black transition-colors"
                        aria-label="Next look"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: ADVENT [ 2025 ] */}
              <div className="md:col-span-4 lg:col-span-4 lg:col-start-5">
                <div 
                  onClick={onExploreClick}
                  className="bg-white rounded-xl p-3.5 sm:p-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-[#E3E6EC] transition-all hover:shadow-lg cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-[13px] font-bold text-black tracking-tight">
                      {adventRings[adventIndex].name}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      [{adventRings[adventIndex].year}]
                    </span>
                  </div>

                  {/* Ring Cutout Preview */}
                  <div className="relative h-20 sm:h-24 rounded-lg overflow-hidden bg-[#FAF9F6] flex items-center justify-center p-2 mb-2">
                    <img
                      src={adventRings[adventIndex].image}
                      alt="Advent diamond ring"
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Pagination Dots & Navigation */}
                  <div 
                    className="flex items-center justify-between pt-1 border-t border-[#F1F3F6]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] text-[#9CA3AF]">
                      {adventRings.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={idx === adventIndex ? 'text-black font-bold' : 'text-[#D1D5DB]'}
                        >
                          {idx === adventIndex ? '◆' : '◇'}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setAdventIndex((prev) =>
                            prev === 0 ? adventRings.length - 1 : prev - 1
                          )
                        }
                        className="p-1 rounded text-[#6B7280] hover:text-black transition-colors"
                        aria-label="Previous ring"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setAdventIndex((prev) => (prev + 1) % adventRings.length)
                        }
                        className="p-1 rounded text-[#6B7280] hover:text-black transition-colors"
                        aria-label="Next ring"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: COCO CRUSH RING [ 18K YELLOW ] */}
              <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
                <div 
                  onClick={handleOpenCocoCrush}
                  className="bg-white rounded-xl p-3.5 sm:p-4 shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-[#E3E6EC] transition-all hover:shadow-lg cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs sm:text-[13px] font-bold text-black tracking-tight">
                      {HERO_CONFIG.cocoCrushCard.title}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mb-2">
                    {HERO_CONFIG.cocoCrushCard.subtitle}
                  </div>

                  {/* Ring Cutout Image */}
                  <div className="relative h-20 sm:h-24 rounded-lg overflow-hidden bg-white flex items-center justify-center p-2 mb-2">
                    <img
                      src={HERO_CONFIG.cocoCrushCard.image}
                      alt="Coco Crush ring 18K yellow gold"
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Price & Solid Black Square CTA */}
                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block">
                        From
                      </span>
                      <span className="font-sans text-sm sm:text-base font-bold text-black tracking-tight">
                        {HERO_CONFIG.cocoCrushCard.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCocoCrush();
                      }}
                      className="w-8 h-8 rounded bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-transform active:scale-95 shadow-xs"
                      aria-label="View ring details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Shop Link Pill */}
            <div className="flex justify-center pt-6 pb-2">
              <button
                onClick={triggerShop}
                className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/90 hover:bg-black text-white text-xs tracking-widest uppercase font-medium shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Enter Storefront & Jewellery Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
