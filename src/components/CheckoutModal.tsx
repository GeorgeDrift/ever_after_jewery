'use client';

import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [fullName, setFullName] = useState('George Chivalo');
  const [email, setEmail] = useState('georgechivalo01@gmail.com');
  const [phone, setPhone] = useState('07737 806748');
  const [address, setAddress] = useState('14 Hatton Garden, Suite 3B');
  const [city, setCity] = useState('London');
  const [postcode, setPostcode] = useState('EC1N 8AH');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'finance'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [giftNote, setGiftNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white border border-[#E5DFD5] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B28359]" />
            <h2 className="font-serif-luxury text-lg font-semibold text-[#1C1917]">
              {step === 'details' ? 'Secure Luxury Checkout' : 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F2ECE1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
            
            {/* Delivery Details */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-[#8C5B32] font-semibold flex items-center gap-1.5">
                <span>1. Insured UK Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#78716C] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#78716C] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-[#78716C] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#78716C] block mb-1">UK Postcode</label>
                  <input
                    type="text"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#78716C] block mb-1">Contact Phone (for Royal Mail Courier tracking)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#78716C] block mb-1">Discreet Gift Packaging & Hand-Written Card Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Happy Anniversary my love"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] focus:outline-none focus:border-[#B28359] placeholder-[#A8A29E]"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 pt-3 border-t border-[#EAE4DA]">
              <h3 className="text-xs uppercase tracking-wider text-[#8C5B32] font-semibold">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                    paymentMethod === 'card'
                      ? 'border-[#B28359] bg-[#FDF7F0] text-[#8C5B32] ring-1 ring-[#B28359]/30 shadow-xs'
                      : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#B28359] mb-1" />
                  <div className="font-semibold text-[#1C1917]">Credit / Debit Card</div>
                  <div className="text-[10px] text-[#A8A29E]">Visa, Mastercard, Amex</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                    paymentMethod === 'bank'
                      ? 'border-[#B28359] bg-[#FDF7F0] text-[#8C5B32] ring-1 ring-[#B28359]/30 shadow-xs'
                      : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#0284C7] mb-1" />
                  <div className="font-semibold text-[#1C1917]">Bank Wire Transfer</div>
                  <div className="text-[10px] text-[#A8A29E]">1.5% Wire Discount</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('finance')}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                    paymentMethod === 'finance'
                      ? 'border-[#B28359] bg-[#FDF7F0] text-[#8C5B32] ring-1 ring-[#B28359]/30 shadow-xs'
                      : 'border-[#E5DFD5] bg-[#FAF9F5] text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#B28359] mb-1" />
                  <div className="font-semibold text-[#1C1917]">0% Finance Option</div>
                  <div className="text-[10px] text-[#A8A29E]">Spread over 12 months</div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5DFD5] space-y-3">
                  <div>
                    <label className="text-[11px] text-[#78716C] block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#B28359]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#78716C] block mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#78716C] block mb-1">Security Code (CVC)</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-[#E5DFD5] rounded-lg px-3 py-2 text-xs text-[#1C1917] font-mono focus:outline-none focus:border-[#B28359]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary & Submit */}
            <div className="pt-4 border-t border-[#EAE4DA] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#78716C] block">Total Amount Due</span>
                <span className="font-serif-luxury text-2xl font-bold text-[#B28359]">
                  £{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                id="submit-order-btn"
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs tracking-[0.18em] uppercase transition-all flex items-center gap-2 shadow-md shadow-[#B28359]/25 active:scale-95"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>Confirm Order & Pay</span>
                )}
              </button>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-[#8C5B32] uppercase tracking-[0.22em] font-semibold">
                Order #EAD-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1917] mt-1">
                Thank You For Your Commission
              </h3>
              <p className="text-xs text-[#78716C] max-w-md mx-auto mt-2 leading-relaxed">
                Your order has been assigned to our master jeweler. Confirmation and your tracked Royal Mail dispatch estimate have been sent to <strong className="text-[#1C1917]">{email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#E5DFD5] max-w-md mx-auto text-left text-xs space-y-1">
              <p className="font-semibold text-[#1C1917]">Have questions about your pieces?</p>
              <p className="text-[#78716C]">Call us anytime at <strong>020 8166 6365</strong> or WhatsApp <strong>07737 806748</strong>.</p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Back to Storefront
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
