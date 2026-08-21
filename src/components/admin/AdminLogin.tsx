import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Lock, Mail, AlertCircle, Loader2, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);

      // Persist session tokens
      sessionStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminUser', email.trim());
      localStorage.setItem('adminToken', 'active');

      navigate('/admin');
    } catch (error: any) {
      console.error('Admin authentication error:', error);
      let message = 'Invalid email or password. Please verify your credentials.';
      if (
        error?.code === 'auth/user-not-found' ||
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential'
      ) {
        message = 'Invalid email or password. Please check your credentials and try again.';
      } else if (error?.code === 'auth/too-many-requests') {
        message = 'Access temporarily locked due to multiple failed attempts. Please try again later.';
      } else if (error?.code === 'auth/network-request-failed') {
        message = 'Network connection error. Please check your internet connection.';
      } else if (error?.message) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B1121] text-slate-100 flex items-center justify-center p-4 sm:p-6 antialiased font-sans">
      {/* Background ambient glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <div className="w-[500px] h-[500px] bg-[#00B87C]/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[400px] mx-auto bg-[#131C31] border border-[#1E293B] rounded-[24px] p-6 sm:p-8 shadow-2xl">
        
        {/* Back to Website Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="text-[#94A3B8] group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Public Site</span>
          </button>
        </div>

        {/* Shield Icon & Header Section */}
        <div className="text-center">
          {/* Shield Icon: Circular container 64px × 64px */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-[#00B87C]/15 text-[#00B87C] border-2 border-[#00B87C] shadow-lg shadow-[#00B87C]/15">
            <ShieldCheck size={32} strokeWidth={2.2} />
          </div>
          
          <div className="mt-4">
            <h1 className="font-serif text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-2">
              Admin Gateway
            </h1>
            <p className="font-sans text-[11px] sm:text-xs text-[#94A3B8] font-normal">
              Campaign Management &amp; Dispatch Console
            </p>
          </div>
        </div>

        {/* Error Alert Banner - 32px gap from header if present */}
        {errorMessage && (
          <div className="mt-8 p-4 rounded-2xl bg-[#FB7185]/10 border border-[#FB7185]/30 text-[#FB7185] text-xs flex items-start gap-2.5">
            <AlertCircle size={18} className="shrink-0 text-[#FB7185] mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Login Form - 32px spacing from header/alert, 24px between fields, 40px to button */}
        <form onSubmit={handleLogin} className={errorMessage ? 'mt-6' : 'mt-8'}>
          
          {/* Email Input Field */}
          <div className="space-y-2">
            <label className="block font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#CBD5E1]">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                className="w-full min-h-[48px] pl-11 pr-3.5 py-3 bg-[#0B1121] border border-[#475569] rounded-2xl text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input Field - 24px gap below email */}
          <div className="mt-6 space-y-2">
            <label className="block font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#CBD5E1]">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#64748B]">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-[#0B1121] border border-[#475569] rounded-2xl text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#64748B] hover:text-[#E2E8F0] transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button - 40px gap below password */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold shadow-lg shadow-[#00B87C]/25 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 shadow-sm animate-pulse" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Security Notice - 20px gap below button, top border, centered 280px max-width */}
        <div className="mt-5 pt-4 border-t border-[#1E293B]/60 text-center">
          <p className="text-xs text-[#64748B] leading-relaxed max-w-[280px] mx-auto font-normal">
            Protected by Kamau Wa Mbiu Campaign Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;