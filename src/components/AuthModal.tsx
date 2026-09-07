'use client';

import React from 'react';
import { X } from 'lucide-react';
import { AuthCard, AuthMode } from './AuthCard';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onSuccess?: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1917]/70 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Container Card */}
      <div 
        className="relative w-full max-w-5xl my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-30 w-10 h-10 rounded-full bg-white dark:bg-[#24201D] text-[#1C1917] dark:text-[#F5F2EB] hover:bg-[#FAF7F2] dark:hover:bg-[#2D2720] hover:text-[#B28359] dark:hover:text-[#D4AF37] border border-[#E5DFD5] dark:border-[#3D352E] shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105"
          aria-label="Close Sign In Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded AuthCard */}
        <AuthCard
          initialMode={initialMode}
          isModal={true}
          onSuccess={(userData) => {
            if (onSuccess) onSuccess(userData);
            setTimeout(() => {
              onClose();
            }, 800);
          }}
        />
      </div>

    </div>
  );
};
