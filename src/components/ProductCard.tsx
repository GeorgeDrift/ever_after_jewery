'use client';

import React, { useState } from 'react';
import { Product, MetalType } from '../types';
import { Sparkles, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product, initialMetal?: MetalType) => void;
  onQuickAdd: (product: Product, metal: MetalType) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.defaultMetal);
  const [isHovered, setIsHovered] = useState(false);

  const getMetalColorDot = (metal: MetalType) => {
    switch (metal) {
      case '18k Yellow Gold':
        return 'bg-[#E5C287] border-[#997D3D]';
      case 'Platinum':
        return 'bg-[#E5E7EB] border-[#9CA3AF]';
      case '18k White Gold':
        return 'bg-[#F3F4F6] border-[#D1D5DB]';
      case '18k Rose Gold':
        return 'bg-[#E0A899] border-[#B87A6B]';
    }
  };

  // Price modifier if Platinum is selected
  const displayPrice = selectedMetal === 'Platinum' ? product.price + 250 : product.price;
  const displayComparePrice = product.compareAtPrice 
    ? (selectedMetal === 'Platinum' ? product.compareAtPrice + 250 : product.compareAtPrice) 
    : undefined;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl border border-[#EAE4DA] hover:border-[#B28359]/60 transition-all duration-300 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges: Champagne Gold for Bestseller, Sky Blue for Certification */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestseller && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#B28359] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 border border-[#E5DFD5] text-[#1C1917] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
            New Creation
          </span>
        )}
        {/* Sky Blue Optical Certification Badge */}
        <span className="px-2.5 py-0.5 rounded-full bg-[#F0F9FF]/95 border border-[#BAE6FD] text-[#0284C7] text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-xs">
          <Sparkles className="w-2.5 h-2.5 text-[#0284C7]" />
          <span>{product.certification.split('&')[0].trim()}</span>
        </span>
      </div>

      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DFD5] text-[10px] text-[#57534E] tracking-wider uppercase font-medium shadow-xs">
          {product.diamondShape} Cut
        </span>
      </div>

      {/* Image Gallery Container */}
      <div 
        className="relative aspect-square w-full overflow-hidden bg-[#FBF9F5] cursor-pointer border-b border-[#F2ECE2]"
        onClick={() => onSelect(product, selectedMetal)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Quick View Hover Overlay */}
        <div className={`absolute inset-0 bg-[#1C1917]/30 backdrop-blur-[2px] flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product, selectedMetal);
            }}
            className="px-4 py-2 rounded-full bg-white text-[#1C1917] text-xs font-semibold tracking-wider flex items-center gap-1.5 hover:bg-[#B28359] hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize Ring</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metal Swatches */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              {product.metals.map((metal) => (
                <button
                  key={metal}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMetal(metal);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${getMetalColorDot(metal)} ${
                    selectedMetal === metal ? 'ring-2 ring-[#B28359] scale-110 shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={metal}
                />
              ))}
            </div>
            <span className="text-[11px] font-medium ml-1 truncate text-[#78716C]">
              {selectedMetal}
            </span>
          </div>

          <h3 
            onClick={() => onSelect(product, selectedMetal)}
            className="font-serif-luxury text-base font-semibold text-[#1C1917] group-hover:text-[#B28359] transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#78716C] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>

          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#78716C]">
            <span>{product.defaultCarat}ct {product.diamondShape}</span>
            <span className="text-[#D6CEBF]">•</span>
            <span>{product.clarity}/{product.colorGrade}</span>
            <span className="text-[#D6CEBF]">•</span>
            <span className="text-[#0284C7] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>{product.diamondType}</span>
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-lg font-bold text-[#B28359]">
                £{displayPrice.toLocaleString()}
              </span>
              {displayComparePrice && (
                <span className="text-xs text-[#A8A29E] line-through">
                  £{displayComparePrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#78716C] block">Inc. VAT & Royal Mail Insured</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onQuickAdd(product, selectedMetal)}
              className="p-2.5 rounded-full bg-[#FAF9F5] hover:bg-[#B28359] text-[#1C1917] hover:text-white border border-[#E0D9CE] hover:border-[#B28359] transition-all shadow-sm active:scale-90"
              title="Quick Add to Bag"
              aria-label="Quick Add to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelect(product, selectedMetal)}
              className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-white border border-[#E0D9CE] hover:border-[#B28359] text-[#1C1917] text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
            >
              View
            </button>
          </div>
        </div>

        {/* Shopify SKU reference badge */}
        <div className="text-[9px] text-[#A8A29E] font-mono flex items-center justify-between pt-1">
          <span>SKU: {product.sku}</span>
          <span className="text-[#0284C7] flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
            Shopify Ready
          </span>
        </div>
      </div>
    </div>
  );
};
