import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Shield, Lock, User, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        setErrorMessage('Please enter both username and password.');
        setIsLoading(false);
        return;
      }

      // Fetch admin authentication document from Firestore
      const authDocRef = doc(db, 'adminSettings', 'auth');
      const authSnap = await getDoc(authDocRef);

      if (!authSnap.exists()) {
        setErrorMessage('Admin authentication configuration not found. Please contact the administrator.');
        setIsLoading(false);
        return;
      }

      const authData = authSnap.data();
      const expectedUsername = authData?.username;
      const expectedPassword = authData?.password;

      // Compare entered credentials against the Firestore document values
      if (
        expectedUsername &&
        expectedPassword &&
        username.trim() === String(expectedUsername).trim() &&
        password === String(expectedPassword)
      ) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        
        // Redirect to requested dashboard page or fallback to /dashboard
        const fromPath = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(fromPath, { replace: true });
      } else {
        setErrorMessage('Invalid username or password. Please try again.');
      }
    } catch (err: any) {
      console.error('Login authentication error:', err);
      setErrorMessage(err?.message || 'An error occurred during authentication. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-neutral-warm p-4 selection:bg-brand-primary/20 selection:text-brand-primary">
      <motion.div 
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-3xl border border-brand-neutral-grey/40 shadow-xl overflow-hidden"
      >
        {/* Card Header */}
        <div className="p-8 pb-6 text-center border-b border-brand-neutral-grey/20 bg-gradient-to-b from-brand-neutral-warm/40 to-transparent">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-primary/25">
            <Shield className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-accent block mb-1">
            Secure Portal
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-brand-neutral-charcoal">
            Admin Console Login
          </h1>
          <p className="font-body text-xs text-brand-neutral-charcoal/60 mt-1.5 max-w-xs mx-auto">
            Authorized campaign personnel access for Kamau Wa Mbiu leadership platform.
          </p>
        </div>

        {/* Card Body & Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-error-50 border border-error-200 text-error-700 text-xs flex items-start gap-2.5"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-error-600" />
              <span className="font-medium leading-relaxed">{errorMessage}</span>
            </motion.div>
          )}

          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/70">
              Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 text-brand-neutral-charcoal/40 w-4 h-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                autoComplete="username"
                className="w-full pl-10 pr-4 py-3 bg-brand-neutral-warm/50 border border-brand-neutral-grey/50 rounded-xl text-sm font-medium text-brand-neutral-charcoal placeholder:text-brand-neutral-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/70">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 text-brand-neutral-charcoal/40 w-4 h-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-11 py-3 bg-brand-neutral-warm/50 border border-brand-neutral-grey/50 rounded-xl text-sm font-medium text-brand-neutral-charcoal placeholder:text-brand-neutral-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-brand-neutral-charcoal/40 hover:text-brand-neutral-charcoal/70 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-primary/90 focus:outline-none focus:ring-4 focus:ring-brand-primary/20 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Return Home Link */}
          <div className="pt-2 text-center">
            <Link 
              to="/" 
              className="text-xs font-semibold text-brand-neutral-charcoal/60 hover:text-brand-primary transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
