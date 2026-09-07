'use client';

import React from 'react';
import { Product, MetalType, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RefreshCw, Gem, Sparkles, Check, Search, X } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product, initialMetal?: MetalType) => void;
  onQuickAdd: (product: Product, metal: MetalType) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onSelectProduct,
  onQuickAdd
}) => {
  const metals = ['All', '18k Yellow Gold', 'Platinum', '18k White Gold', '18k Rose Gold'];
  const shapes = ['All', 'Oval', 'Round Brilliant', 'Emerald', 'Cushion', 'Radiant', 'Pear'];
  const origins = ['All', 'Lab Grown', 'Natural'];

  const quickSearchTags = [
    'Oval Solitaire',
    'Eternity Band',
    '18k Yellow Gold',
    'Lab-Grown',
    'Emerald Cut',
    'Tennis Bracelet'
  ];

  const filteredProducts = products.filter((p) => {
    // Category
    if (filterState.category !== 'all' && p.category !== filterState.category) {
      return false;
    }
    // Metal
    if (filterState.metal !== 'All' && !p.metals.includes(filterState.metal as MetalType)) {
      return false;
    }
    // Shape
    if (filterState.shape !== 'All' && p.diamondShape !== filterState.shape) {
      return false;
    }
    // Diamond Origin
    if (filterState.diamondType !== 'All' && p.diamondType !== filterState.diamondType) {
      return false;
    }
    // Search Query
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchesTitle = p.title.toLowerCase().includes(q);
      const matchesDesc = p.description.toLowerCase().includes(q);
      const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesShape = p.diamondShape.toLowerCase().includes(q);
      const matchesSku = p.sku.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesTag && !matchesShape && !matchesSku) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filterState.sortBy === 'price-asc') return a.price - b.price;
    if (filterState.sortBy === 'price-desc') return b.price - a.price;
    if (filterState.sortBy === 'carat-desc') return b.defaultCarat - a.defaultCarat;
    // default: featured
    if (a.isBestseller && !b.isBestseller) return -1;
    if (!a.isBestseller && b.isBestseller) return 1;
    return 0;
  });

  const hasActiveFilters = 
    filterState.category !== 'all' || 
    filterState.metal !== 'All' || 
    filterState.shape !== 'All' || 
    filterState.diamondType !== 'All' ||
    Boolean(filterState.searchQuery);

  return (
    <section id="storefront-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EAE4DA] dark:border-[#332E2A]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.22em] text-[#8C5B32] dark:text-[#D4AF37] uppercase font-bold mb-1.5">
            <Sparkles className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
            <span>Curated Fine Diamond Storefront</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
            Handcrafted Jewelry Creations
          </h2>
          <p className="text-sm sm:text-base text-[#78716C] dark:text-[#D4CEC4] mt-1.5 font-medium">
            Search certified fine diamonds, engagement rings, and bespoke UK jewelry.
          </p>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#181614] border border-[#EAE4DA] dark:border-[#3A332B] shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4 transition-colors">
        
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wider text-[#1C1917] dark:text-[#F5F2EB] uppercase">
            <SlidersHorizontal className="w-4.5 h-4.5 text-[#B28359] dark:text-[#D4AF37]" />
            <span>Refine Jewelry Selection</span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="text-[#78716C] dark:text-[#D4CEC4]">
              Showing <strong className="text-[#1C1917] dark:text-[#F5F2EB] font-bold">{sortedProducts.length}</strong> creations
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-[#B28359] dark:text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[11px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium shrink-0 mr-1">
            Quick Focus:
          </span>

          {/* All Metals */}
          <button
            onClick={() => onFilterChange({ metal: 'All' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.metal === 'All'
                ? 'bg-[#1C1917] dark:bg-[#D4AF37] text-white dark:text-[#141210] border border-[#1C1917] dark:border-[#D4AF37] font-semibold shadow-xs'
                : 'm3-chip-outlined'
            }`}
          >
            {filterState.metal === 'All' && <Check className="w-3 h-3 text-[#B28359] dark:text-[#141210]" />}
            <span>All Metals</span>
          </button>

          {/* 18k Yellow Gold */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === '18k Yellow Gold' ? 'All' : '18k Yellow Gold' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.metal === '18k Yellow Gold'
                ? 'bg-[#B28359] text-white border border-[#B28359] shadow-xs font-semibold'
                : 'm3-chip-outlined hover:border-[#B28359]/50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterState.metal === '18k Yellow Gold' ? 'bg-white' : 'bg-[#B28359]'}`} />
            <span>18k Yellow Gold</span>
            {filterState.metal === '18k Yellow Gold' && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* 18k White Gold */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === '18k White Gold' ? 'All' : '18k White Gold' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.metal === '18k White Gold'
                ? 'bg-[#334155] text-white border border-[#334155] shadow-xs font-semibold'
                : 'm3-chip-outlined hover:border-[#CBD5E1]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterState.metal === '18k White Gold' ? 'bg-white' : 'bg-[#64748B]'}`} />
            <span>18k White Gold</span>
            {filterState.metal === '18k White Gold' && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Platinum */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === 'Platinum' ? 'All' : 'Platinum' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.metal === 'Platinum'
                ? 'bg-[#475569] text-white border border-[#475569] shadow-xs font-semibold'
                : 'm3-chip-outlined'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterState.metal === 'Platinum' ? 'bg-white' : 'bg-[#94A3B8]'}`} />
            <span>Platinum</span>
            {filterState.metal === 'Platinum' && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Lab Grown */}
          <button
            onClick={() => onFilterChange({ diamondType: filterState.diamondType === 'Lab Grown' ? 'All' : 'Lab Grown' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.diamondType === 'Lab Grown'
                ? 'bg-[#0284C7] text-white border border-[#0284C7] shadow-xs font-semibold'
                : 'm3-chip-outlined hover:border-[#BAE6FD]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filterState.diamondType === 'Lab Grown' ? 'bg-white' : 'bg-[#0284C7]'}`} />
            <span>Lab-Grown Diamonds</span>
            {filterState.diamondType === 'Lab Grown' && <Check className="w-3 h-3 text-white" />}
          </button>

          {/* Natural Diamond */}
          <button
            onClick={() => onFilterChange({ diamondType: filterState.diamondType === 'Natural' ? 'All' : 'Natural' })}
            className={`m3-chip shrink-0 cursor-pointer ${
              filterState.diamondType === 'Natural'
                ? 'bg-[#8C5B32] text-white border border-[#8C5B32] shadow-xs font-semibold'
                : 'm3-chip-outlined'
            }`}
          >
            <Gem className={`w-3 h-3 ${filterState.diamondType === 'Natural' ? 'text-white' : 'text-[#B28359]'}`} />
            <span>Natural Diamonds</span>
            {filterState.diamondType === 'Natural' && <Check className="w-3 h-3 text-white" />}
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-[#EAE4DA] dark:border-[#332E2A]">
          {/* Collection Category Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block mb-1 font-medium">
              Collection Category
            </label>
            <select
              value={filterState.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37] font-medium"
            >
              <option value="all">All Collections</option>
              <option value="engagement-rings">Engagement Rings</option>
              <option value="wedding-bands">Wedding Bands</option>
              <option value="fine-jewelry">Fine Jewellery</option>
              <option value="bespoke-creations">Bespoke</option>
            </select>
          </div>

          {/* Metal Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block mb-1 font-medium">
              Precious Metal
            </label>
            <select
              value={filterState.metal}
              onChange={(e) => onFilterChange({ metal: e.target.value })}
              className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
            >
              {metals.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Diamond Shape Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block mb-1 font-medium">
              Diamond Shape
            </label>
            <select
              value={filterState.shape}
              onChange={(e) => onFilterChange({ shape: e.target.value })}
              className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
            >
              {shapes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Diamond Origin Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block mb-1 font-medium">
              Diamond Origin
            </label>
            <select
              value={filterState.diamondType}
              onChange={(e) => onFilterChange({ diamondType: e.target.value })}
              className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#0284C7]"
            >
              {origins.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] block mb-1 font-medium">
              Sort By
            </label>
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="carat-desc">Diamond Carat (Largest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center py-16 px-4 rounded-2xl border border-[#EAE4DA] dark:border-[#332E2A] bg-white dark:bg-[#181614] shadow-sm">
          <Gem className="w-12 h-12 text-[#B28359] dark:text-[#D4AF37] mx-auto mb-4" />
          <h3 className="font-serif-luxury text-xl text-[#1C1917] dark:text-[#F5F2EB] font-semibold mb-2">
            No creations match your filters
          </h3>
          <p className="text-xs text-[#78716C] dark:text-[#A3998E] max-w-md mx-auto mb-6">
            Try adjusting your metal, diamond shape, or search term to discover our complete collection.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#B28359] dark:bg-[#D4AF37] hover:bg-[#9E7249] dark:hover:bg-[#C59F2D] text-white dark:text-[#141210] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
