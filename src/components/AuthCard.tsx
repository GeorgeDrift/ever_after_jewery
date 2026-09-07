'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ShieldCheck, 
  Gem, 
  CheckCircle2, 
  ArrowRight, 
  Crown,
  ChevronRight,
  AlertCircle,
  KeyRound,
  Check
} from 'lucide-react';
import profileBadgeImg from '../assets/images/ead_profile_badge_1788549227010.jpg';
import luxuryModelImg from '../assets/images/jewelry_hands_model_1788678830602.jpg';

const profileBadgeImgSrc = typeof profileBadgeImg === 'string' ? profileBadgeImg : (profileBadgeImg as any)?.src || '';
const luxuryModelImgSrc = typeof luxuryModelImg === 'string' ? luxuryModelImg : (luxuryModelImg as any)?.src || '';

export type AuthMode = 'login' | 'signup';

interface AuthCardProps {
  initialMode?: AuthMode;
  onSuccess?: (userData: { name: string; email: string }) => void;
  onToggleMode?: (mode: AuthMode) => void;
  isModal?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  initialMode = 'login',
  onSuccess,
  onToggleMode,
  isModal = false
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Form Inputs State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clientTier, setClientTier] = useState('Bespoke Bridal');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI Interactive States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isForgotView, setIsForgotView] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsForgotView(false);
    setForgotSent(false);
    if (onToggleMode) onToggleMode(newMode);
  };

  // Password strength logic
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-rose-500' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 75, label: 'Strong Atelier Grade', color: 'bg-emerald-500' };
      case 4:
        return { score: 100, label: 'Exceptional (Master Diamond Standard)', color: 'bg-[#B28359]' };
      default:
        return { score: 15, label: 'Very Weak', color: 'bg-rose-400' };
    }
  };

  const pwdStrength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (isForgotView) {
      if (!email || !email.includes('@')) {
        setErrorMsg('Please provide a valid client email address.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setForgotSent(true);
      }, 1000);
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name for your private client account.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please re-enter carefully.');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please accept the Client Terms of Service to proceed.');
        return;
      }
    }

    // Simulate Auth API Request
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: fullName || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'VIP Member'),
        email
      };
      const actionText = mode === 'signup' ? 'Private Client Account Created!' : 'Welcome back to Ever After Diamonds';
      setSuccessMsg(`${actionText} Redirecting to your exclusive portal...`);
      
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('ead_user', JSON.stringify(user));
        } catch (err) {
          console.error(err);
        }
      }

      if (onSuccess) {
        setTimeout(() => {
          onSuccess(user);
        }, 1200);
      }
    }, 1200);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: `VIP Client (${provider})`,
        email: `vip.client@${provider.toLowerCase()}.com`
      };
      setSuccessMsg(`Authenticated via ${provider}! Welcome to Ever After Diamonds.`);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ead_user', JSON.stringify(user));
      }
      if (onSuccess) {
        setTimeout(() => onSuccess(user), 1000);
      }
    }, 1000);
  };

  return (
    <div className={`w-full bg-white rounded-3xl border border-[#E8E2D7] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${isModal ? 'max-w-4xl mx-auto' : 'max-w-5xl mx-auto'}`}>
      
      {/* LEFT COLUMN: Luxury Atelier Visual Banner (Hidden on smallest screens, visible on lg) */}
      <div className="lg:col-span-5 relative bg-[#1C1917] text-white p-8 lg:p-10 flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-[640px]">
        {/* Background Image with Warm Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={luxuryModelImgSrc} 
            alt="Ever After Fine Jewelry Model"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(178,131,89,0.25),transparent_60%)]" />
        </div>

        {/* Brand Crest & Logo */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-[1px] bg-gradient-to-tr from-[#B28359] to-[#F3E5D8]">
              <img 
                src={profileBadgeImgSrc} 
                alt="Emblem" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <span className="font-brand-display text-lg tracking-[0.18em] text-[#F5F2EB] uppercase block font-semibold">
                EVER AFTER
              </span>
              <span className="text-[10px] tracking-[0.24em] text-[#B28359] uppercase block font-bold">
                DIAMONDS • LONDON
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B28359]/20 border border-[#B28359]/40 text-[#EADDCB] text-xs font-medium backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Private Client Portal</span>
          </div>
        </div>

        {/* Atelier Benefits Carousel / List */}
        <div className="relative z-10 my-auto py-6 space-y-6">
          <h2 className="font-serif-luxury text-2xl lg:text-3xl font-normal leading-tight text-[#FAF7F2]">
            {mode === 'login' 
              ? 'Return to your bespoke jewellery sanctuary.' 
              : 'Unlock exclusive atelier privileges & bespoke diamond care.'}
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm text-[#D6CEBF]">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#B28359]/20 border border-[#B28359]/50 flex items-center justify-center shrink-0 mt-0.5">
                <Gem className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <p>
                <strong className="text-white font-medium">GIA & IGI Digital Vault:</strong> Access certified gemological dossiers for your diamond portfolio.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#B28359]/20 border border-[#B28359]/50 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <p>
                <strong className="text-white font-medium">Annual Master Spa Care:</strong> Complimentary annual diamond inspection, laser cleaning & ultrasonic refresh.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#B28359]/20 border border-[#B28359]/50 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              </div>
              <p>
                <strong className="text-white font-medium">Bespoke Priority Concierge:</strong> Direct WhatsApp access to senior Hatton Garden master jewellers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between text-[11px] text-[#A8A29E]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Atelier Vault</span>
          </span>
          <span className="text-[#B28359] font-medium">London Hatton Garden</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Form */}
      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#FAF9F5]/50">
        
        {/* Top Header & Tab Switcher */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1C1917] font-semibold">
                {isForgotView 
                  ? 'Reset Atelier Password' 
                  : mode === 'login' 
                    ? 'Sign In to Your Account' 
                    : 'Create Client Account'}
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] mt-1">
                {isForgotView
                  ? 'Enter your registered email to receive a secure login reset token.'
                  : mode === 'login' 
                    ? 'Enter your credentials to access saved wishlists and bespoke designs.' 
                    : 'Join Ever After Diamonds for concierge privileges and certified diamond management.'}
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs (Sign In / Create Account) */}
          {!isForgotView && (
            <div className="grid grid-cols-2 p-1 bg-[#EFECE6] rounded-2xl mb-6 border border-[#E3DDD1]">
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 ${
                  mode === 'login'
                    ? 'bg-white text-[#1C1917] shadow-sm border border-[#E0D8CB]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <User className="w-4 h-4 text-[#B28359]" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeSwitch('signup')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 ${
                  mode === 'signup'
                    ? 'bg-white text-[#1C1917] shadow-sm border border-[#E0D8CB]'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#B28359]" />
                <span>Create Account</span>
              </button>
            </div>
          )}

          {/* Alert Error / Success Messages */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Social Sign-In Buttons */}
          {!isForgotView && (
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E2DDD3] bg-white hover:bg-[#F9F7F3] text-[#334155] text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Apple')}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E2DDD3] bg-white hover:bg-[#F9F7F3] text-[#334155] text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current text-[#1C1917]" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 .92-2.85-.9.04-2 .6-2.63 1.34-.56.65-1.05 1.72-.92 2.74 1.01.08 2.01-.48 2.63-1.23z" />
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-[#E5DFD5] w-full" />
                <span className="bg-[#FAF9F5] px-3 text-[11px] uppercase tracking-wider text-[#A8A29E] shrink-0 font-medium">
                  Or continue with email
                </span>
                <div className="border-t border-[#E5DFD5] w-full" />
              </div>
            </div>
          )}

          {/* MAIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* FORGOT PASSWORD CONFIRMATION VIEW */}
            {isForgotView ? (
              <div>
                {forgotSent ? (
                  <div className="text-center py-6 space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif-luxury text-xl text-[#1C1917]">Password Reset Link Sent</h4>
                    <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                      We have dispatched a confidential password reset link to <strong className="text-[#1C1917]">{email}</strong>. Please check your inbox.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setIsForgotView(false); setForgotSent(false); }}
                      className="text-xs font-semibold text-[#B28359] hover:underline block mx-auto pt-2"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E] mb-1.5">
                        Client Registered Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="client@everafterdiamonds.co.uk"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="auth-input pl-10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-[#B28359] hover:bg-[#9E7249] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Send Reset Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsForgotView(false)}
                      className="w-full text-center text-xs text-[#78716C] hover:text-[#1C1917] font-medium pt-1"
                    >
                      Cancel and Return to Sign In
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* SIGNUP: Full Name Field */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E] mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Lady Victoria Cavendish"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="auth-input pl-10"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address Field */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input pl-10"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E]">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setIsForgotView(true)}
                        className="text-[11px] text-[#B28359] hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* SIGNUP: Real-time Password Strength Meter */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="mt-2.5 space-y-1.5 animate-in fade-in">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#78716C]">Password Strength:</span>
                        <span className="font-semibold text-[#1C1917]">{pwdStrength.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E5DFD5] rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                          style={{ width: `${pwdStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* SIGNUP: Confirm Password Field */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E] mb-1.5">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="auth-input pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* SIGNUP: Preferred Client Tier */}
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#57534E] mb-1.5">
                      Primary Jewellery Interest
                    </label>
                    <select
                      value={clientTier}
                      onChange={(e) => setClientTier(e.target.value)}
                      className="auth-input bg-white"
                    >
                      <option value="Bespoke Bridal">Bespoke Bridal & Engagement Rings</option>
                      <option value="Fine Collector">Fine Diamond Collector & High Jewellery</option>
                      <option value="Anniversary">Anniversary & Custom Remodeling</option>
                      <option value="Daily Luxury">Daily Fine Jewellery & Gifts</option>
                    </select>
                  </div>
                )}

                {/* Checkboxes: Remember Me / Terms */}
                <div className="pt-1">
                  {mode === 'login' ? (
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#57534E]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-[#B28359] rounded border-[#CBD5E1]"
                      />
                      <span>Keep me signed in on this secure device</span>
                    </label>
                  ) : (
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#57534E]">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 accent-[#B28359] rounded border-[#CBD5E1] mt-0.5 shrink-0"
                      />
                      <span>
                        I accept the Ever After Diamonds <a href="#" className="text-[#B28359] underline">Client Terms</a> and <a href="#" className="text-[#B28359] underline">Privacy Vault Policy</a>.
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#B28359] hover:bg-[#9E7249] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Access Atelier Portal' : 'Create VIP Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}

          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-[#E8E2D7] text-center text-xs text-[#78716C]">
          {!isForgotView && (
            <p>
              {mode === 'login' ? (
                <>
                  Don't have a client account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('signup')}
                    className="font-bold text-[#B28359] hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already registered with us?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('login')}
                    className="font-bold text-[#B28359] hover:underline"
                  >
                    Sign in to account
                  </button>
                </>
              )}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
