import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Lock, Mail, AlertCircle, CheckCircle2, Loader2, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

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

  const handleForgotPassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your admin email address above, then click Forgot Password.');
      return;
    }

    setIsResetting(true);

    try {
      if (!auth) {
        throw new Error('Firebase Auth is not initialized.');
      }

      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage(`Password recovery link sent to ${email.trim()}. Please check your email inbox.`);
    } catch (error: any) {
      console.error('Password reset error:', error);
      let message = 'Failed to send password recovery email. Please try again.';
      if (error?.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
      } else if (error?.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address format.';
      } else if (error?.code === 'auth/too-many-requests') {
        message = 'Too many requests. Please wait a few moments before trying again.';
      } else if (error?.message) {
        message = error.message;
      }
      setErrorMessage(message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800 flex items-center justify-center p-4 sm:p-6 antialiased font-sans">
      {/* Background ambient glow effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <div className="w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[400px] mx-auto bg-white border border-slate-200 rounded-[24px] p-6 sm:p-8 shadow-xl shadow-slate-200/50">
        
        {/* Back to Website Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="text-slate-400 group-hover:text-slate-800 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Public Site</span>
          </button>
        </div>

        {/* Shield Icon & Header Section */}
        <div className="text-center">
          {/* Shield Icon: Circular container 64px × 64px */}
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 border-2 border-blue-500 shadow-md shadow-blue-500/15">
            <ShieldCheck size={32} strokeWidth={2.2} />
          </div>
          
          <div className="mt-4">
            <h1 className="font-serif text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight mb-2">
              Admin Gateway
            </h1>
            <p className="font-sans text-[11px] sm:text-xs text-slate-500 font-normal">
              Campaign Management &amp; Dispatch Console
            </p>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mt-8 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 size={18} className="shrink-0 text-blue-600 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mt-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle size={18} className="shrink-0 text-rose-600 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className={(errorMessage || successMessage) ? 'mt-6' : 'mt-8'}>
          
          {/* Email Input Field */}
          <div className="space-y-2">
            <label className="block font-sans text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                disabled={isLoading || isResetting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@domain.com"
                className="w-full min-h-[48px] pl-11 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-sans text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading || isResetting}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer disabled:opacity-50"
              >
                {isResetting ? 'Sending link...' : 'Forgot Password?'}
              </button>
            </div>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading || isResetting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={isLoading || isResetting}
              className="w-full min-h-[48px] py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-200 shadow-sm animate-pulse" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Security Notice */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 leading-relaxed max-w-[280px] mx-auto font-normal">
            Protected by Kamau Wa Mbiu Campaign Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;