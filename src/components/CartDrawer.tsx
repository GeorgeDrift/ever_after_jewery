'use client';

import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1C1917]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E5DFD5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="relative p-6 border-b border-[#E5DFD5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF4ED] border border-[#B28359]/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#B28359]" />
              </div>
              <h2 className="font-serif-luxury text-lg font-semibold text-[#1C1917]">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF9F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5DFD5] flex items-center justify-center text-[#A8A29E] mx-auto shadow-xs">
                  <ShoppingBag className="w-8 h-8 text-[#B28359]" />
                </div>
                <h3 className="font-serif-luxury text-lg text-[#1C1917] font-medium">Your Bag is Empty</h3>
                <p className="text-xs text-[#78716C] max-w-xs mx-auto">
                  Explore our handcrafted bespoke diamond rings, wedding bands, and fine jewelry creations.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => {
                return (
                  <div
                    key={item.cartId}
                    className="p-4 rounded-2xl bg-white border border-[#E5DFD5] flex gap-4 relative group shadow-xs hover:border-[#B28359]/40 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF9F5] shrink-0 border border-[#E5DFD5]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-[#1C1917] truncate font-serif-luxury">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-[#A8A29E] hover:text-red-500 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] font-medium mt-0.5 flex items-center gap-1.5 text-[#8C5B32]">
                          <span>{item.selectedMetal}</span>
                          <span className="text-[#D6CEBF]">•</span>
                          <span className="text-[#78716C]">{item.selectedCarat}ct</span>
                          <span className="text-[#D6CEBF]">•</span>
                          <span className={item.selectedDiamondType === 'Lab Grown' ? 'text-[#0284C7]' : 'text-[#8C5B32]'}>
                            {item.selectedDiamondType}
                          </span>
                        </p>
                        
                        <div className="text-[10px] text-[#A8A29E] mt-0.5">
                          Size: {item.ringSize}
                          {item.engravingText && ` • Engraved: "${item.engravingText}"`}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#F2ECE1]">
                        <div className="flex items-center border border-[#E5DFD5] rounded-lg overflow-hidden bg-[#FAF9F5]">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="px-2 py-0.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE7]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs text-[#1C1917] font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="px-2 py-0.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE7]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif-luxury text-sm font-bold text-[#B28359]">
                          £{(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5DFD5] bg-white space-y-4 shadow-sm">
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal</span>
                  <span className="text-[#1C1917] font-medium">£{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#0284C7]" />
                    <span>Insured UK Special Delivery</span>
                  </span>
                  <span className="text-[#0284C7] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Luxury Box & GIA/IGI Dossier</span>
                  <span className="text-[#8C5B32] font-semibold">INCLUDED</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2.5 border-t border-[#EAE4DA]">
                  <span>Total (Inc. VAT)</span>
                  <span className="font-serif-luxury text-xl text-[#B28359]">£{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="checkout-trigger-btn"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-2 shadow-md shadow-[#B28359]/25 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A8A29E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>256-Bit SSL Encrypted • 30-Day Return Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
