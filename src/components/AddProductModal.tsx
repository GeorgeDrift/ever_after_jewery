'use client';

import React, { useState } from 'react';
import { Product, ProductCategory, MetalType, DiamondShape, DiamondOrigin } from '../types';
import { X, Plus, Sparkles, Check, Image as ImageIcon, Eye, UploadCloud, Link as LinkIcon } from 'lucide-react';

import heroRingImg from '../assets/images/hero_diamond_ring_1788549247112.jpg';
import emeraldRingImg from '../assets/images/emerald_cut_ring_1788549264736.jpg';
import tennisBraceletImg from '../assets/images/tennis_bracelet_1788549280773.jpg';
import eternityBandImg from '../assets/images/eternity_band_1788549296021.jpg';

const toSrc = (img: any): string => (typeof img === 'string' ? img : img?.src || '');
const heroRingImgSrc = toSrc(heroRingImg);
const emeraldRingImgSrc = toSrc(emeraldRingImg);
const tennisBraceletImgSrc = toSrc(tennisBraceletImg);
const eternityBandImgSrc = toSrc(eternityBandImg);

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProductCategory>('engagement-rings');
  const [price, setPrice] = useState<number>(3250);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(3750);
  const [diamondShape, setDiamondShape] = useState<DiamondShape>('Oval');
  const [defaultCarat, setDefaultCarat] = useState<number>(2.0);
  const [caratOptionsStr, setCaratOptionsStr] = useState<string>('1.0, 1.5, 2.0, 2.5, 3.0');
  const [diamondType, setDiamondType] = useState<DiamondOrigin>('Lab Grown');
  const [clarity, setClarity] = useState('VVS1');
  const [colorGrade, setColorGrade] = useState('D');
  const [selectedMetals, setSelectedMetals] = useState<MetalType[]>([
    '18k Yellow Gold',
    'Platinum',
    '18k White Gold',
    '18k Rose Gold'
  ]);
  const [imageUrl, setImageUrl] = useState(heroRingImgSrc);
  const [sku, setSku] = useState(`EAD-${Date.now().toString().slice(-4)}`);
  const [inventoryQuantity, setInventoryQuantity] = useState<number>(5);
  const [tagsStr, setTagsStr] = useState('Bespoke, New Arrival, Fine Jewelry');
  const [certification, setCertification] = useState('GIA & IGI Certified');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        setErrorMsg('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Auto handle creation
  const handleSlug = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : 'new-diamond-piece';

  const handleToggleMetal = (metal: MetalType) => {
    if (selectedMetals.includes(metal)) {
      if (selectedMetals.length === 1) return; // Keep at least one
      setSelectedMetals(selectedMetals.filter((m) => m !== metal));
    } else {
      setSelectedMetals([...selectedMetals, metal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Product title is required');
      return;
    }
    if (!price || price <= 0) {
      setErrorMsg('Please enter a valid price');
      return;
    }

    const caratOptions = caratOptionsStr
      .split(',')
      .map((c) => parseFloat(c.trim()))
      .filter((n) => !isNaN(n) && n > 0);

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProduct: Product = {
      id: `ead-custom-${Date.now()}`,
      handle: handleSlug,
      title: title.trim(),
      tagline: tagline.trim() || `${defaultCarat}ct ${diamondShape} Diamond in ${selectedMetals[0]}`,
      description: description.trim() || 'Handcrafted bespoke fine diamond creation by Ever After Diamonds master jewelers.',
      category,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      metals: selectedMetals,
      defaultMetal: selectedMetals[0] || '18k Yellow Gold',
      diamondShape,
      caratOptions: caratOptions.length > 0 ? caratOptions : [1.0, 1.5, 2.0],
      defaultCarat: Number(defaultCarat),
      diamondType,
      clarity,
      colorGrade,
      images: [imageUrl],
      sku: sku.trim() || `EAD-${Date.now().toString().slice(-4)}`,
      inventoryQuantity: Number(inventoryQuantity) || 1,
      tags: tags.length > 0 ? tags : ['Fine Jewelry'],
      isNew: true,
      certification,
      vendor: 'Ever After Diamonds',
      productType: category === 'engagement-rings' ? 'Engagement Ring' : category === 'wedding-bands' ? 'Wedding Band' : 'Fine Jewelry'
    };

    onAddProduct(newProduct);
    onClose();
  };

  const presetImages = [
    { label: 'Oval Solitaire', url: heroRingImgSrc },
    { label: 'Emerald Trilogy', url: emeraldRingImgSrc },
    { label: 'Tennis Bracelet', url: tennisBraceletImgSrc },
    { label: 'Eternity Band', url: eternityBandImgSrc },
    { label: 'Classic Diamond', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Diamond Pendant', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] rounded-3xl shadow-2xl overflow-hidden my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF7F0] dark:bg-[#261E17] border border-[#B28359]/30 dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37] shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Add New Product to Storefront
              </h2>
              <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                Ready to sell immediately • Automatically Shopify & CSV compatible
              </p>
            </div>
          </div>
          <button
            id="close-add-product-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Westminster Radiant Solitaire Ring"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
                <span className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] mt-1 block">
                  Shopify Handle: /{handleSlug}
                </span>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2.00ct radiant diamond solitaire in 18k gold"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  >
                    <option value="engagement-rings">Engagement Rings</option>
                    <option value="wedding-bands">Wedding Bands</option>
                    <option value="fine-jewelry">Fine Jewellery</option>
                    <option value="bespoke-creations">Bespoke Creations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Diamond Shape
                  </label>
                  <select
                    value={diamondShape}
                    onChange={(e) => setDiamondShape(e.target.value as DiamondShape)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  >
                    <option value="Oval">Oval</option>
                    <option value="Round Brilliant">Round Brilliant</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Radiant">Radiant</option>
                    <option value="Pear">Pear</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Princess">Princess</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Price (£ GBP) *
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Compare At Price (£)
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Default Carat
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    value={defaultCarat}
                    onChange={(e) => setDefaultCarat(Number(e.target.value))}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Clarity
                  </label>
                  <input
                    type="text"
                    value={clarity}
                    onChange={(e) => setClarity(e.target.value)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Color Grade
                  </label>
                  <input
                    type="text"
                    value={colorGrade}
                    onChange={(e) => setColorGrade(e.target.value)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Carat Sizes Available (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.0, 1.5, 2.0, 2.5, 3.0"
                  value={caratOptionsStr}
                  onChange={(e) => setCaratOptionsStr(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>

            </div>

            {/* Right Fields: Media, Metals, Preview */}
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Available Precious Metals
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['18k Yellow Gold', 'Platinum', '18k White Gold', '18k Rose Gold'] as MetalType[]).map((metal) => {
                    const isSelected = selectedMetals.includes(metal);
                    return (
                      <button
                        type="button"
                        key={metal}
                        onClick={() => handleToggleMetal(metal)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#B28359] bg-[#FDF7F0] dark:bg-[#261E17] text-[#8C5B32] dark:text-[#D4AF37] ring-1 ring-[#B28359]/30 shadow-xs'
                            : 'border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
                        }`}
                      >
                        <span>{metal}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[#8C5B32] dark:text-[#D4AF37]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Product Image *
                </label>
                
                {/* Primary Drag & Drop File Upload Area */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-4 transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                    isDragging
                      ? 'border-[#B28359] dark:border-[#D4AF37] bg-[#FDF7F0] dark:bg-[#261E17]'
                      : 'border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] hover:border-[#B28359] dark:hover:border-[#D4AF37]'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="product-photo-upload"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {imageUrl ? (
                    <div className="flex items-center gap-3.5 w-full">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#E5DFD5] dark:border-[#3D352E] shrink-0 bg-white dark:bg-[#181614] shadow-xs">
                        <img src={imageUrl} alt="Product Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left flex-1 space-y-1">
                        <span className="text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB] block">
                          Photo Selected & Loaded
                        </span>
                        <p className="text-[11px] text-[#78716C] dark:text-[#A3998E]">
                          Click button to upload another image from device.
                        </p>
                        <label
                          htmlFor="product-photo-upload"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#B28359] hover:bg-[#9E7249] text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 mt-0.5"
                        >
                          <UploadCloud className="w-3.5 h-3.5 text-white" />
                          <span>Upload Photo</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="product-photo-upload" className="w-full py-3 cursor-pointer flex flex-col items-center">
                      <div className="w-10 h-10 rounded-2xl bg-[#FDF7F0] dark:bg-[#261E17] border border-[#B28359]/30 dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37] mb-1.5 shadow-xs">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#1C1917] dark:text-[#F5F2EB]">
                        Upload Photo from Computer
                      </span>
                      <span className="text-[11px] text-[#78716C] dark:text-[#A3998E]">
                        Click here or drag & drop image file
                      </span>
                    </label>
                  )}
                </div>

                {/* Sample Presets Gallery & Optional URL Toggle */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C] dark:text-[#A3998E]">
                      Or pick sample creation photo:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowUrlInput(!showUrlInput)}
                      className="text-[10px] text-[#0284C7] dark:text-[#38BDF8] font-semibold hover:underline flex items-center gap-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>{showUrlInput ? 'Hide URL' : 'Use Web Link'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {presetImages.map((p) => (
                      <button
                        type="button"
                        key={p.label}
                        onClick={() => setImageUrl(p.url)}
                        className={`shrink-0 w-12 h-12 rounded-xl overflow-hidden border transition-all relative ${
                          imageUrl === p.url
                            ? 'border-[#B28359] dark:border-[#D4AF37] ring-2 ring-[#B28359]/40'
                            : 'border-[#E5DFD5] dark:border-[#3D352E] opacity-70 hover:opacity-100'
                        }`}
                        title={p.label}
                      >
                        <img src={p.url} alt={p.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {showUrlInput && (
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://... image web link"
                      className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3 py-1.5 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E] dark:placeholder-[#6E675F] mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                    Initial Stock Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={inventoryQuantity}
                    onChange={(e) => setInventoryQuantity(Number(e.target.value))}
                    className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the diamond cut, setting details, and craftsmanship..."
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#78716C] dark:text-[#A3998E] font-medium block mb-1">
                  Tags (for search & Shopify collections)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl px-3.5 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359]"
                />
              </div>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#EAE4DA] dark:border-[#332E2A] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#E5DFD5] dark:border-[#3D352E] bg-[#FAF9F5] dark:bg-[#211E1A] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#B28359]/25 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Product to Store</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
