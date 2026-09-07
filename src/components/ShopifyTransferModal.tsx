'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { downloadShopifyCSV, downloadShopifyJSON, generateShopifyCSV } from '../utils/shopifyExport';
import { 
  X, 
  DownloadCloud, 
  FileSpreadsheet, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface ShopifyTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const ShopifyTransferModal: React.FC<ShopifyTransferModalProps> = ({
  isOpen,
  onClose,
  products
}) => {
  if (!isOpen) return null;

  const [copiedCSV, setCopiedCSV] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'guide' | 'preview'>('export');

  const sampleCsv = generateShopifyCSV(products.slice(0, 2));

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShopifyCSV(products));
    setCopiedCSV(true);
    setTimeout(() => setCopiedCSV(false), 2000);
  };

  // Calculate total variants generated
  const totalVariants = products.reduce((acc, p) => acc + (p.metals.length * p.caratOptions.length), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] rounded-2xl shadow-2xl overflow-hidden my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-luxury text-xl font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                  Shopify Transfer & Migration Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  100% Native Compatible
                </span>
              </div>
              <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                Export Ever After Diamonds inventory directly into Shopify Admin with all variants, metals, and carats intact.
              </p>
            </div>
          </div>
          <button
            id="close-shopify-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E5DFD5] dark:border-[#332E2A] px-6 bg-[#FAF9F5] dark:bg-[#211E1A] text-xs">
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'export'
                ? 'border-[#B28359] dark:border-[#D4AF37] text-[#8C5B32] dark:text-[#D4AF37]'
                : 'border-transparent text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>1-Click Export</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'guide'
                ? 'border-[#B28359] dark:border-[#D4AF37] text-[#8C5B32] dark:text-[#D4AF37]'
                : 'border-transparent text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Import Guide (4 Steps)</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-4 font-semibold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'preview'
                ? 'border-[#B28359] dark:border-[#D4AF37] text-[#8C5B32] dark:text-[#D4AF37]'
                : 'border-transparent text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>CSV Preview ({products.length} Items, {totalVariants} Variants)</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: EXPORT BUTTONS */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Official Shopify CSV Card */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-semibold">.CSV Format</span>
                    </div>
                    <h3 className="font-serif-luxury text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      Shopify Product Import CSV
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                      Complies directly with Shopify’s official multi-variant specification. Includes titles, descriptions, metal variants, carat options, SKUs, inventory, and images.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      id="download-shopify-csv-btn"
                      onClick={() => downloadShopifyCSV(products)}
                      className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <DownloadCloud className="w-4 h-4" />
                      <span>Download Shopify CSV ({products.length} Products)</span>
                    </button>
                  </div>
                </div>

                {/* Headless JSON Card */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] hover:border-[#B28359]/50 transition-all space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[#FDF7F0] dark:bg-[#261E17] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37]">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-[#8C5B32] dark:text-[#D4AF37] font-mono font-semibold">.JSON Format</span>
                    </div>
                    <h3 className="font-serif-luxury text-base font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                      Shopify Storefront & API JSON
                    </h3>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] leading-relaxed">
                      Complete catalog schema for Hydrogen, Storefront API, or custom Node.js Shopify sync webhooks with store metadata.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      id="download-shopify-json-btn"
                      onClick={() => downloadShopifyJSON(products)}
                      className="w-full py-2.5 px-4 rounded-full bg-white dark:bg-[#181614] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] border border-[#E5DFD5] dark:border-[#3A332B] text-[#1C1917] dark:text-[#F5F2EB] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <DownloadCloud className="w-4 h-4 text-[#B28359] dark:text-[#D4AF37]" />
                      <span>Download Storefront JSON</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Data Summary Stats */}
              <div className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Total Products</span>
                  <span className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">{products.length}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Generated Variants</span>
                  <span className="font-serif-luxury text-xl font-bold text-[#B28359] dark:text-[#D4AF37]">{totalVariants}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Vendor Name</span>
                  <span className="text-xs font-semibold text-[#1C1917] dark:text-[#F5F2EB] mt-1 block">Ever After Diamonds</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block">Primary Currency</span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-1 block">GBP (£)</span>
                </div>
              </div>

              {/* Ready notice */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-[#1C1917] dark:text-[#F5F2EB]">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] dark:text-[#F5F2EB]">Built for Effortless Shopify Transition:</strong>
                  <p className="text-[#78716C] dark:text-[#A3998E] mt-0.5">
                    All options are mapped to Option1 (Precious Metal), Option2 (Diamond Carat), and Option3 (Origin), with price scaling formulas aligned with jewellery industry margins.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STEP BY STEP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="space-y-3">
                
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E]">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Download the CSV from this platform</h4>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] mt-1">
                      Click the "Download Shopify CSV" button above to get your complete ready-formatted file containing all current and custom-added products.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E]">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Log in to your Shopify Admin</h4>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] mt-1">
                      Navigate to your Shopify Dashboard, then click on <strong>Products</strong> on the left-hand navigation sidebar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E]">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Click "Import"</h4>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] mt-1">
                      In the top-right corner of the Products page, click <strong>Import</strong>. Select the downloaded CSV file from your computer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E]">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1917] dark:text-[#F5F2EB]">Confirm & Publish</h4>
                    <p className="text-xs text-[#78716C] dark:text-[#A3998E] mt-1">
                      Shopify will preview the first product and variants. Click <strong>Import products</strong>. All rings, bracelets, and diamond pieces will be published and ready to checkout!
                    </p>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-[#FAF9F5] dark:bg-[#211E1A] rounded-xl border border-[#E5DFD5] dark:border-[#3D352E] text-xs space-y-1">
                <span className="font-semibold text-[#8C5B32] dark:text-[#D4AF37]">Need Shopify Theme or Custom Liquid Customization?</span>
                <p className="text-[#78716C] dark:text-[#A3998E]">
                  The React component hierarchy in this codebase uses standard Shopify schema conventions, making it straightforward to convert into Liquid sections or keep as a headless React Storefront using the Shopify Storefront API.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CSV PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#78716C] dark:text-[#A3998E]">Raw CSV Output Sample:</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-full bg-white dark:bg-[#181614] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] border border-[#E5DFD5] dark:border-[#3A332B] text-xs text-[#1C1917] dark:text-[#F5F2EB] flex items-center gap-1.5 transition-colors"
                >
                  {copiedCSV ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCSV ? 'Copied to Clipboard' : 'Copy CSV Text'}</span>
                </button>
              </div>

              <div className="p-4 bg-[#FAF9F5] dark:bg-[#0E0D0C] border border-[#E5DFD5] dark:border-[#3D352E] rounded-xl font-mono text-[11px] text-[#1C1917] dark:text-[#F5F2EB] overflow-x-auto max-h-72">
                <pre className="whitespace-pre">{sampleCsv}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <span className="text-xs text-[#78716C] dark:text-[#A3998E]">
            Ever After Diamonds • everafterdiamonds.co.uk
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white dark:bg-[#181614] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] border border-[#E5DFD5] dark:border-[#3A332B] text-[#1C1917] dark:text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
