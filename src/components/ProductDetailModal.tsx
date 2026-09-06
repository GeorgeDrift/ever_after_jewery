'use client';

import React, { useState } from 'react';
import { Product, MetalType, DiamondOrigin } from '../types';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Award, 
  ShoppingBag, 
  MessageCircle, 
  Calendar, 
  ChevronRight,
  HelpCircle,
  Check,
  Gem
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  initialMetal?: MetalType;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    metal: MetalType,
    carat: number,
    origin: DiamondOrigin,
    size: string,
    engraving: string
  ) => void;
  onOpenConsultation: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialMetal,
  onClose,
  onAddToCart,
  onOpenConsultation
}) => {
  if (!product) return null;

  const [selectedMetal, setSelectedMetal] = useState<MetalType>(initialMetal || product.defaultMetal);
  const [selectedCarat, setSelectedCarat] = useState<number>(product.defaultCarat);
  const [selectedOrigin, setSelectedOrigin] = useState<DiamondOrigin>(product.diamondType);
  const [selectedSize, setSelectedSize] = useState<string>('M'); // Standard UK average
  const [engravingText, setEngravingText] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'craft' | 'delivery'>('specs');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  // Dynamic Price calculation
  // Base price scaled by carat and metal
  const caratMultiplier = 1 + (selectedCarat - product.defaultCarat) * 0.45;
  const originMultiplier = selectedOrigin === 'Natural' ? 2.6 : 1.0;
  const metalSurcharge = selectedMetal === 'Platinum' ? 250 : selectedMetal === '18k Rose Gold' ? 100 : 0;
  
  const finalPrice = Math.round((product.price * caratMultiplier * originMultiplier) + metalSurcharge);
  const finalComparePrice = product.compareAtPrice 
    ? Math.round((product.compareAtPrice * caratMultiplier * originMultiplier) + metalSurcharge)
    : undefined;

  const ukRingSizes = ['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const handleAdd = () => {
    onAddToCart(product, selectedMetal, selectedCarat, selectedOrigin, selectedSize, engravingText);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 700);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ever After Diamonds, I would like to inquire about "${product.title}" in ${selectedMetal}, ${selectedCarat}ct ${selectedOrigin} diamond (SKU: ${product.sku}).`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white border border-[#EAE4DA] rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Specular Ambient Rim Light Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#B28359]/35 via-[#0284C7]/30 to-transparent" />

        {/* Close Button */}
        <button
          id="close-detail-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF9F5] text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2EDE4] transition-all border border-[#E5DFD5]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FAF9F5] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EAE4DA]">
            <div>
              {/* Main Preview Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#EAE4DA] shadow-xs group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={`${product.title} preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DFD5] text-[10px] text-[#8C5B32] uppercase tracking-wider font-semibold shadow-xs">
                  {selectedMetal} • {selectedCarat.toFixed(2)}ct
                </div>

                {/* Sky Blue Certification Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F0F9FF]/95 backdrop-blur-md border border-[#BAE6FD] text-[10px] text-[#0284C7] uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#0284C7]" />
                  <span>{product.certification}</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx 
                          ? 'border-[#B28359] ring-2 ring-[#B28359]/40 shadow-xs' 
                          : 'border-[#EAE4DA] opacity-70 hover:opacity-100 bg-white'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Certifications Guarantee */}
            <div className="mt-6 pt-6 border-t border-[#EAE4DA] grid grid-cols-2 gap-3 text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B28359] shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-[#1C1917] block font-medium">Assay Hallmarked UK</strong>
                  <span className="text-[#78716C]">Edinburgh & London Offices</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <strong className="text-[#0284C7] block font-medium">Independent Grading</strong>
                  <span className="text-[#78716C]">Official GIA / IGI Dossier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Customizer & Purchase */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
            <div className="space-y-5">
              
              {/* Header Details */}
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] text-[#8C5B32] font-bold mb-1.5">
                  <span>{product.diamondShape} Cut</span>
                  <span className="text-[#D6CEBF]">•</span>
                  <span>{product.clarity} Clarity</span>
                  <span className="text-[#D6CEBF]">•</span>
                  <span>Color {product.colorGrade}</span>
                </div>
                
                <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1C1917] leading-tight">
                  {product.title}
                </h1>
                
                <p className="text-sm sm:text-base text-[#78716C] mt-1.5 font-medium">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#B28359]">
                    £{finalPrice.toLocaleString()}
                  </span>
                  {finalComparePrice && (
                    <span className="text-base sm:text-lg text-[#A8A29E] line-through font-medium">
                      £{finalComparePrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm text-[#78716C] font-semibold">
                    VAT Included • Insured UK Delivery
                  </span>
                </div>
              </div>

              {/* 1. Metal Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-[#78716C] uppercase tracking-wider font-bold">1. Choose Precious Metal</span>
                  <span className="font-bold text-[#8C5B32]">
                    {selectedMetal}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {product.metals.map((metal) => {
                    const isSelected = selectedMetal === metal;
                    return (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3.5 py-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition-all ${
                          isSelected
                            ? 'border-[#B28359] bg-[#FDF7F0] text-[#8C5B32] ring-1 ring-[#B28359]/30 shadow-xs'
                            : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#57534E] hover:text-[#1C1917] hover:border-[#D5CABE]'
                        }`}
                      >
                        {metal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Diamond Origin */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-[#78716C] uppercase tracking-wider font-bold">2. Diamond Origin</span>
                  <span className={`font-bold ${selectedOrigin === 'Lab Grown' ? 'text-[#0284C7]' : 'text-[#8C5B32]'}`}>
                    {selectedOrigin}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedOrigin('Lab Grown')}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                      selectedOrigin === 'Lab Grown'
                        ? 'border-[#BAE6FD] bg-[#F0F9FF] text-[#0284C7] ring-1 ring-[#BAE6FD] shadow-xs'
                        : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#57534E] hover:text-[#1C1917] hover:border-[#D5CABE]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#1C1917] text-sm sm:text-base">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                      <span>Lab-Grown Diamond</span>
                    </div>
                    <div className="text-xs text-[#78716C] mt-1 font-medium">100% Real Carbon • Exceptional Value</div>
                  </button>
                  <button
                    onClick={() => setSelectedOrigin('Natural')}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                      selectedOrigin === 'Natural'
                        ? 'border-[#E8D9C8] bg-[#FDF7F0] text-[#8C5B32] ring-1 ring-[#E8D9C8] shadow-xs'
                        : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#57534E] hover:text-[#1C1917] hover:border-[#D5CABE]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[#1C1917] text-sm sm:text-base">
                      <Gem className="w-4 h-4 text-[#B28359]" />
                      <span>Natural Earth Diamond</span>
                    </div>
                    <div className="text-xs text-[#78716C] mt-1 font-medium">Mined from Earth • Rare & Heirloom</div>
                  </button>
                </div>
              </div>

              {/* 3. Carat Weight Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-[#78716C] uppercase tracking-wider font-bold">3. Center Diamond Carat</span>
                  <span className="text-[#8C5B32] font-bold">{selectedCarat.toFixed(2)} Carats</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.caratOptions.map((carat) => (
                    <button
                      key={carat}
                      onClick={() => setSelectedCarat(carat)}
                      className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                        selectedCarat === carat
                          ? 'border-[#B28359] bg-[#B28359] text-white shadow-sm scale-105'
                          : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#1C1917] hover:border-[#B28359]/40'
                      }`}
                    >
                      {carat.toFixed(1)} ct
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Ring Size & Engraving */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-1 font-semibold">
                    <span className="text-[#78716C] uppercase tracking-wider font-bold">UK Ring Size</span>
                    <button 
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-[#0284C7] hover:underline flex items-center gap-1 font-bold"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#1C1917] font-semibold focus:outline-none focus:border-[#B28359]"
                  >
                    {ukRingSizes.map((size) => (
                      <option key={size} value={size}>
                        Size {size} {size === 'M' ? '(UK Average)' : ''}
                      </option>
                    ))}
                    <option value="Not Sure - Free Sizer">Not Sure - Send Free Ring Sizer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs sm:text-sm uppercase tracking-wider text-[#78716C] font-bold block mb-1">
                    Free Laser Engraving
                  </label>
                  <input
                    type="text"
                    maxLength={25}
                    placeholder="e.g. Forever & Always"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#1C1917] font-semibold focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E]"
                  />
                </div>
              </div>

              {/* Sizing Guide Drawer Info */}
              {showSizeGuide && (
                <div className="p-3.5 bg-[#FAF9F5] rounded-lg border border-[#E5DFD5] text-xs sm:text-sm text-[#78716C] space-y-1 animate-in fade-in duration-150 font-medium">
                  <p className="font-bold text-[#1C1917]">Need help finding their ring size?</p>
                  <p>Our average UK female ring size is <strong>M</strong>. We provide <strong>100% complimentary resizing</strong> within 60 days of delivery.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md ${
                    addedAnimation 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#B28359] hover:bg-[#9E7249] text-white shadow-[#B28359]/25 active:scale-95'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Bag • £{finalPrice.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/447737806748?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-full bg-[#FAF9F5] hover:bg-[#F3EFE7] border border-[#E5DFD5] text-xs text-[#1C1917] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Specialist</span>
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultation();
                    }}
                    className="py-2.5 px-3 rounded-full bg-[#FAF9F5] hover:bg-[#F3EFE7] border border-[#E5DFD5] text-xs text-[#1C1917] font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#B28359]" />
                    <span>Book Viewing</span>
                  </button>
                </div>
              </div>

              {/* Accordion Tabs for specifications */}
              <div className="pt-3 border-t border-[#EAE4DA]">
                <div className="flex border-b border-[#EAE4DA] text-xs">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 px-3 uppercase tracking-wider font-semibold transition-all ${
                      activeTab === 'specs' ? 'text-[#8C5B32] border-b-2 border-[#B28359]' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`pb-2 px-3 uppercase tracking-wider font-semibold transition-all ${
                      activeTab === 'craft' ? 'text-[#8C5B32] border-b-2 border-[#B28359]' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Craftsmanship
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2 px-3 uppercase tracking-wider font-semibold transition-all ${
                      activeTab === 'delivery' ? 'text-[#8C5B32] border-b-2 border-[#B28359]' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Delivery & Returns
                  </button>
                </div>

                <div className="py-3 text-xs text-[#78716C] leading-relaxed">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div><strong className="text-[#1C1917]">SKU:</strong> {product.sku}</div>
                      <div><strong className="text-[#1C1917]">Certification:</strong> {product.certification}</div>
                      <div><strong className="text-[#1C1917]">Diamond Shape:</strong> {product.diamondShape}</div>
                      <div><strong className="text-[#1C1917]">Clarity & Color:</strong> {product.clarity} / {product.colorGrade}</div>
                      <div><strong className="text-[#1C1917]">Band Width:</strong> 1.65mm Comfort Fit</div>
                      <div><strong className="text-[#1C1917]">Hallmark:</strong> UK Assay Office 750 / 950</div>
                    </div>
                  )}

                  {activeTab === 'craft' && (
                    <p>
                      Every Ever After Diamonds piece is custom micro-cast and hand-finished by master goldsmiths in the UK. 
                      Claws are microscopically aligned and mirror-polished for maximum light scintillation and claw security.
                    </p>
                  )}

                  {activeTab === 'delivery' && (
                    <p>
                      Dispatched via insured Royal Mail Special Delivery before 1pm. Packaged discreetly in luxury velvet presentation boxes with complete GIA/IGI grading dossiers. 30-day return policy and complimentary resizing.
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Product metadata footer */}
            <div className="pt-2 text-xs text-[#78716C] font-mono flex items-center justify-between border-t border-[#EAE4DA]">
              <span>Product Ref: /{product.handle}</span>
              <span className="text-[#57534E]">Vendor: {product.vendor}</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
