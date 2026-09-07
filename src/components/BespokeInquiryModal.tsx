'use client';

import React, { useState } from 'react';
import { X, Sparkles, Calendar, CheckCircle2, Phone, Mail } from 'lucide-react';

interface BespokeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BespokeInquiryModal: React.FC<BespokeInquiryModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Bespoke Engagement Ring');
  const [shape, setShape] = useState('Oval');
  const [budget, setBudget] = useState('£3,000 - £5,000');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/50 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#3A332B] rounded-2xl shadow-2xl overflow-hidden my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5DFD5] dark:border-[#332E2A] flex items-center justify-between bg-[#FAF9F5] dark:bg-[#211E1A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDF7F0] dark:bg-[#261E17] border border-[#B28359]/40 dark:border-[#574628] flex items-center justify-center text-[#8C5B32] dark:text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-semibold text-[#1C1917] dark:text-[#F5F2EB]">
                Book a Bespoke Consultation
              </h2>
              <p className="text-xs text-[#78716C] dark:text-[#A3998E]">
                Private showroom viewing in London or online video consultation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#78716C] dark:text-[#A3998E] hover:text-[#1C1917] dark:hover:text-[#F5F2EB] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>

              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Telephone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07737 806748"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
                />
              </div>

              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Consultation Focus</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
                >
                  <option value="Bespoke Engagement Ring">Bespoke Engagement Ring</option>
                  <option value="Wedding Band Consultation">Wedding Bands</option>
                  <option value="Fine Jewellery Styling">Diamond Tennis Bracelet / Fine Jewelry</option>
                  <option value="Diamond Sourcing">Diamond Sourcing (GIA / IGI)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Preferred Diamond Shape</label>
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
                >
                  <option value="Oval">Oval</option>
                  <option value="Round">Round Brilliant</option>
                  <option value="Emerald">Emerald Cut</option>
                  <option value="Cushion">Cushion</option>
                  <option value="Radiant">Radiant</option>
                  <option value="Pear">Pear</option>
                  <option value="Not Sure">Undecided / Need Guidance</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">Estimated Budget Range</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37]"
                >
                  <option value="£1,500 - £3,000">£1,500 - £3,000</option>
                  <option value="£3,000 - £5,000">£3,000 - £5,000</option>
                  <option value="£5,000 - £10,000">£5,000 - £10,000</option>
                  <option value="£10,000+">£10,000+ (High Jewellery)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-[#78716C] dark:text-[#A3998E] uppercase tracking-wider block mb-1">
                Tell us about your dream design or timeline
              </label>
              <textarea
                rows={3}
                placeholder="Mention setting styles (hidden halo, trilogy, pavé) or target proposal date..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#FAF9F5] dark:bg-[#211E1A] border border-[#E5DFD5] dark:border-[#3D352E] rounded-lg px-3 py-2 text-xs text-[#1C1917] dark:text-[#F5F2EB] focus:outline-none focus:border-[#B28359] dark:focus:border-[#D4AF37] placeholder-[#A8A29E] dark:placeholder-[#6E675F]"
              />
            </div>

            <div className="pt-3 border-t border-[#EAE4DA] dark:border-[#332E2A] flex items-center justify-between">
              <div className="text-[11px] text-[#78716C] dark:text-[#A3998E]">
                No consultation fee • London & Virtual
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#B28359] hover:bg-[#9E7249] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95"
              >
                Request Appointment
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1C1917] dark:text-[#F5F2EB]">
              Consultation Requested
            </h3>
            <p className="text-xs text-[#78716C] dark:text-[#A3998E] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1C1917] dark:text-[#F5F2EB]">{fullName}</strong>. Our senior jewelry consultant will contact you at <strong className="text-[#1C1917] dark:text-[#F5F2EB]">{email}</strong> within 24 hours to confirm your private viewing.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#FAF9F5] dark:bg-[#211E1A] hover:bg-[#F2ECE1] dark:hover:bg-[#2A241E] border border-[#E5DFD5] dark:border-[#3D352E] text-[#1C1917] dark:text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
