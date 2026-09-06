'use client';

import React from 'react';
import { Product, MetalType, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Plus, RefreshCw, Gem, Sparkles, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: Product, initialMetal?: MetalType) => void;
  onQuickAdd: (product: Product, metal: MetalType) => void;
  onOpenAddProduct: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onSelectProduct,
  onQuickAdd,
  onOpenAddProduct
}) => {
  const metals = ['All', '18k Yellow Gold', 'Platinum', '18k White Gold', '18k Rose Gold'];
  const shapes = ['All', 'Oval', 'Round Brilliant', 'Emerald', 'Cushion', 'Radiant', 'Pear'];
  const origins = ['All', 'Lab Grown', 'Natural'];

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
    <section id="storefront-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#EAE4DA]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.22em] text-[#8C5B32] uppercase font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B28359]" />
            <span>Curated Fine Diamond Storefront</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-[#1C1917]">
            Handcrafted Jewelry Creations
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            Browse our ready-to-wear creations or add your own bespoke piece to sell immediately.
          </p>
        </div>

        {/* Action button to add product */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F9F7F4] border border-[#D8D0C5] hover:border-[#B28359] text-[#1C1917] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#B28359]" />
            <span>Add New Product to Store</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE4DA] shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4">
        
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#1C1917] uppercase">
            <SlidersHorizontal className="w-4 h-4 text-[#B28359]" />
            <span>Refine Jewelry Selection</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#78716C]">
              Showing <strong className="text-[#1C1917] font-semibold">{sortedProducts.length}</strong> creations
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-xs text-[#B28359] hover:underline flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[11px] uppercase tracking-wider text-[#78716C] font-medium shrink-0 mr-1">
            Quick Focus:
          </span>

          {/* All Metals */}
          <button
            onClick={() => onFilterChange({ metal: 'All' })}
            className={`m3-chip shrink-0 ${
              filterState.metal === 'All'
                ? 'bg-[#F4EFE6] text-[#1C1917] border border-[#D5CABE] font-semibold'
                : 'm3-chip-outlined'
            }`}
          >
            {filterState.metal === 'All' && <Check className="w-3 h-3 text-[#B28359]" />}
            <span>All Metals</span>
          </button>

          {/* 18k Yellow Gold */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === '18k Yellow Gold' ? 'All' : '18k Yellow Gold' })}
            className={`m3-chip shrink-0 ${
              filterState.metal === '18k Yellow Gold'
                ? 'm3-chip-gold shadow-sm font-semibold'
                : 'm3-chip-outlined hover:border-[#B28359]/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#B28359]" />
            <span>18k Yellow Gold</span>
            {filterState.metal === '18k Yellow Gold' && <Check className="w-3 h-3 text-[#B28359]" />}
          </button>

          {/* 18k White Gold */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === '18k White Gold' ? 'All' : '18k White Gold' })}
            className={`m3-chip shrink-0 ${
              filterState.metal === '18k White Gold'
                ? 'm3-chip-white-gold shadow-sm font-semibold'
                : 'm3-chip-outlined hover:border-[#CBD5E1]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#64748B]" />
            <span>18k White Gold</span>
            {filterState.metal === '18k White Gold' && <Check className="w-3 h-3 text-[#475569]" />}
          </button>

          {/* Platinum */}
          <button
            onClick={() => onFilterChange({ metal: filterState.metal === 'Platinum' ? 'All' : 'Platinum' })}
            className={`m3-chip shrink-0 ${
              filterState.metal === 'Platinum'
                ? 'm3-chip-white-gold shadow-sm font-semibold'
                : 'm3-chip-outlined'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#94A3B8]" />
            <span>Platinum</span>
            {filterState.metal === 'Platinum' && <Check className="w-3 h-3 text-[#475569]" />}
          </button>

          {/* Lab Grown */}
          <button
            onClick={() => onFilterChange({ diamondType: filterState.diamondType === 'Lab Grown' ? 'All' : 'Lab Grown' })}
            className={`m3-chip shrink-0 ${
              filterState.diamondType === 'Lab Grown'
                ? 'm3-chip-sky-blue shadow-sm font-semibold'
                : 'm3-chip-outlined hover:border-[#BAE6FD]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
            <span>Lab-Grown Diamonds</span>
            {filterState.diamondType === 'Lab Grown' && <Check className="w-3 h-3 text-[#0284C7]" />}
          </button>

          {/* Natural Diamond */}
          <button
            onClick={() => onFilterChange({ diamondType: filterState.diamondType === 'Natural' ? 'All' : 'Natural' })}
            className={`m3-chip shrink-0 ${
              filterState.diamondType === 'Natural'
                ? 'm3-chip-gold shadow-sm font-semibold'
                : 'm3-chip-outlined'
            }`}
          >
            <Gem className="w-3 h-3 text-[#B28359]" />
            <span>Natural Diamonds</span>
            {filterState.diamondType === 'Natural' && <Check className="w-3 h-3 text-[#B28359]" />}
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EAE4DA]">
          {/* Metal Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1 font-medium">
              Precious Metal
            </label>
            <select
              value={filterState.metal}
              onChange={(e) => onFilterChange({ metal: e.target.value })}
              className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
            >
              {metals.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Diamond Shape Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1 font-medium">
              Diamond Shape
            </label>
            <select
              value={filterState.shape}
              onChange={(e) => onFilterChange({ shape: e.target.value })}
              className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
            >
              {shapes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Diamond Origin Filter */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1 font-medium">
              Diamond Origin
            </label>
            <select
              value={filterState.diamondType}
              onChange={(e) => onFilterChange({ diamondType: e.target.value })}
              className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#0284C7]"
            >
              {origins.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1 font-medium">
              Sort By
            </label>
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
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
        <div className="mt-12 text-center py-16 px-4 rounded-2xl border border-[#EAE4DA] bg-white shadow-sm">
          <Gem className="w-12 h-12 text-[#B28359] mx-auto mb-4" />
          <h3 className="font-serif-luxury text-xl text-[#1C1917] font-semibold mb-2">
            No creations match your filters
          </h3>
          <p className="text-xs text-[#78716C] max-w-md mx-auto mb-6">
            Try adjusting your metal, diamond shape, or search term to discover our complete collection, or create a custom piece.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              Clear All Filters
            </button>
            <button
              onClick={onOpenAddProduct}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#F9F7F4] border border-[#D5CABE] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Add New Product
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
