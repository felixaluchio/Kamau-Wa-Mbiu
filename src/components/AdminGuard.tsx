import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is authenticated in localStorage
    const authStatus = localStorage.getItem('isAdminAuthenticated');

    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to login page and preserve the attempted route
      navigate('/dashboard/login', { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  // While verifying authentication, render a full-screen loading state to avoid flashing protected content
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-neutral-warm p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
          </div>
          <div>
            <p className="font-heading font-bold text-base text-brand-neutral-charcoal">Verifying Admin Access</p>
            <p className="text-xs text-brand-neutral-charcoal/60 mt-1">Please wait while checking authorization credentials...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default AdminGuard;
