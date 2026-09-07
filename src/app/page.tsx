'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, CartItem, FilterState, MetalType, DiamondOrigin } from '@/types';
import { INITIAL_PRODUCTS } from '@/data/initialProducts';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { AddProductModal } from '@/components/AddProductModal';
import { ShopifyTransferModal } from '@/components/ShopifyTransferModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { BespokeInquiryModal } from '@/components/BespokeInquiryModal';
import { DiamondGuideModal } from '@/components/DiamondGuideModal';
import { AuthModal } from '@/components/AuthModal';
import { Footer } from '@/components/Footer';

export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage safely after mount to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedProducts = localStorage.getItem('ead_custom_products');
      if (savedProducts) {
        const customProds: Product[] = JSON.parse(savedProducts);
        const existingIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
        const nonDuplicateCustom = customProds.filter((p) => !existingIds.has(p.id));
        setProducts([...nonDuplicateCustom, ...INITIAL_PRODUCTS]);
      }

      const savedCart = localStorage.getItem('ead_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading saved data from localStorage:', e);
    }
  }, []);

  // Save cart changes after mount
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('ead_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart, isMounted]);

  // Filters State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    metal: 'All',
    shape: 'All',
    diamondType: 'All',
    searchQuery: '',
    sortBy: 'featured'
  });

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductMetal, setSelectedProductMetal] = useState<MetalType | undefined>(undefined);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isShopifyExportOpen, setIsShopifyExportOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isDiamondGuideOpen, setIsDiamondGuideOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Navigation View: 'home' (Home Image Editorial Poster) vs 'shop' (Ever After Storefront & Catalog)
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');

  const navigateToShop = (category?: string) => {
    setCurrentView('shop');
    if (category) {
      setFilterState((prev) => ({ ...prev, category }));
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Product Handler
  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      const customOnly = updated.filter((p) => p.id.startsWith('ead-custom-'));
      localStorage.setItem('ead_custom_products', JSON.stringify(customOnly));
    } catch (e) {
      console.error('Error saving custom product:', e);
    }
    showToast(`"${newProduct.title}" added to store & ready to sell!`);
  };

  // Add to Cart from Detail Modal
  const handleAddToCart = (
    product: Product,
    metal: MetalType,
    carat: number,
    origin: DiamondOrigin,
    size: string,
    engraving: string
  ) => {
    const caratMultiplier = 1 + (carat - product.defaultCarat) * 0.45;
    const originMultiplier = origin === 'Natural' ? 2.6 : 1.0;
    const metalSurcharge = metal === 'Platinum' ? 250 : metal === '18k Rose Gold' ? 100 : 0;
    const unitPrice = Math.round((product.price * caratMultiplier * originMultiplier) + metalSurcharge);

    const cartId = `${product.id}-${metal}-${carat}-${origin}-${size}-${engraving}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          selectedMetal: metal,
          selectedCarat: carat,
          selectedDiamondType: origin,
          ringSize: size,
          engravingText: engraving,
          unitPrice,
          quantity: 1
        }
      ];
    });

    showToast(`Added ${product.title} (${metal}) to bag`);
  };

  // Quick Add from Product Card
  const handleQuickAdd = (product: Product, metal: MetalType) => {
    handleAddToCart(
      product,
      metal,
      product.defaultCarat,
      product.diamondType,
      'M',
      ''
    );
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleOrderSuccess = () => {
    setCart([]);
  };

  const scrollToCatalog = () => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('brand-header-section') || document.getElementById('storefront-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#0E0D0C] text-[#1C1917] dark:text-[#F5F2EB] transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] text-[#1C1917] dark:text-[#F5F2EB] px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#B28359] dark:bg-[#D4AF37]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            /* HOME PAGE: High-Fashion Editorial Home Image Poster */
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.995 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <HeroSection
                onExploreClick={() => navigateToShop()}
                onGoShop={() => navigateToShop()}
                onGoHome={navigateToHome}
                onBespokeClick={() => setIsConsultationOpen(true)}
                onOpenDiamondGuide={() => setIsDiamondGuideOpen(true)}
                onOpenAddProduct={() => setIsAddProductOpen(true)}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenShopifyExport={() => setIsShopifyExportOpen(true)}
                onOpenAuth={() => setIsAuthOpen(true)}
                cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
                onSelectProduct={(p) => {
                  navigateToShop();
                  setSelectedProduct(p);
                  setSelectedProductMetal(p.defaultMetal);
                }}
                products={products}
                searchQuery={filterState.searchQuery}
                onSearchChange={(q) => setFilterState((prev) => ({ ...prev, searchQuery: q }))}
              />
            </motion.div>
          ) : (
            /* SHOP SECTION: Ever After Brand Header, Hallmarks & Product Catalog */
            <motion.div
              key="shop-view"
              id="shop-storefront-view"
              initial={{ opacity: 0, y: 16, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.995 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* 1. Ever After Top Announcement & Navigation Header */}
              <div id="brand-header-section" className="sticky top-0 z-40">
                <Header
                  cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
                  onOpenCart={() => setIsCartOpen(true)}
                  onOpenConsultation={() => setIsConsultationOpen(true)}
                  onOpenDiamondGuide={() => setIsDiamondGuideOpen(true)}
                  onOpenAuth={() => setIsAuthOpen(true)}
                  selectedCategory={filterState.category}
                  onSelectCategory={(cat) => {
                    setFilterState((prev) => ({ ...prev, category: cat }));
                    scrollToCatalog();
                  }}
                  searchQuery={filterState.searchQuery}
                  onSearchChange={(q) => setFilterState((prev) => ({ ...prev, searchQuery: q }))}
                  onGoHome={navigateToHome}
                />
              </div>

              {/* 2. Sleek Luxury Atelier Hallmark Bar */}
              <div className="border-b border-[#EAE3D5] dark:border-[#332E2A] bg-[#FDFBF7] dark:bg-[#1A1815] py-2.5 px-4 text-xs transition-colors">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-y-1 gap-x-6 text-[#78716C] dark:text-[#D4CEC4]">
                  <div className="flex items-center gap-1.5 font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B28359] dark:bg-[#D4AF37]" />
                    <span>GIA & IGI Certified Diamonds</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] dark:bg-[#38BDF8]" />
                    <span>Handcrafted in London</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B28359] dark:bg-[#D4AF37]" />
                    <span>Insured Royal Mail Delivery</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 font-medium text-[#1C1917] dark:text-[#F5F2EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    <span>Free Laser Engraving</span>
                  </div>
                </div>
              </div>

              {/* 3. Products Catalog with Filters, Metal Pickers, and 3D Customizer */}
              <ProductCatalog
                products={products}
                filterState={filterState}
                onFilterChange={(newFilter) => setFilterState((prev) => ({ ...prev, ...newFilter }))}
                onResetFilters={() =>
                  setFilterState({
                    category: 'all',
                    metal: 'All',
                    shape: 'All',
                    diamondType: 'All',
                    searchQuery: '',
                    sortBy: 'featured'
                  })
                }
                onSelectProduct={(product, metal) => {
                  setSelectedProduct(product);
                  setSelectedProductMetal(metal);
                }}
                onQuickAdd={handleQuickAdd}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          navigateToShop(cat);
        }}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenDiamondGuide={() => setIsDiamondGuideOpen(true)}
        onGoHome={navigateToHome}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        initialMetal={selectedProductMetal}
        onClose={() => {
          setSelectedProduct(null);
          setSelectedProductMetal(undefined);
        }}
        onAddToCart={handleAddToCart}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <ShopifyTransferModal
        isOpen={isShopifyExportOpen}
        onClose={() => setIsShopifyExportOpen(false)}
        products={products}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      <BespokeInquiryModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <DiamondGuideModal
        isOpen={isDiamondGuideOpen}
        onClose={() => setIsDiamondGuideOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
