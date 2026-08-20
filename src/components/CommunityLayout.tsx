import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Award, 
  Calendar, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X,
  Target,
  Share2,
  Lightbulb,
  AlertTriangle,
  BarChart,
  Radio
} from 'lucide-react';

interface CommunityLayoutProps {
  children: React.ReactNode;
}

export function CommunityLayout({ children }: CommunityLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: <Home size={18} />, label: 'Home', path: '/community' },
    { icon: <Lightbulb size={18} />, label: 'Ideas', path: '/community/ideas' },
    { icon: <AlertTriangle size={18} />, label: 'Issues', path: '/community/issues' },
    { icon: <Target size={18} />, label: 'Action', path: '/community/initiatives' },
    { icon: <Calendar size={18} />, label: 'Events', path: '/community/events' },
    { icon: <Radio size={18} />, label: 'Townhall', path: '/community/townhall' },
    { icon: <BarChart size={18} />, label: 'Impact', path: '/community/impact' },
  ];

  return (
    <div className="min-h-screen bg-brand-neutral-warm font-body flex flex-col">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-brand-neutral-grey/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-brand-accent font-heading font-bold text-xl">K</span>
              </div>
              <span className="font-body text-sm font-bold tracking-[0.2em] uppercase text-brand-neutral-charcoal hidden sm:block">
                Community
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/community');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      isActive 
                        ? 'bg-brand-primary/10 text-brand-primary font-bold' 
                        : 'text-brand-neutral-charcoal/70 hover:text-brand-primary hover:bg-brand-neutral-warm'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 text-brand-neutral-charcoal/70 hover:text-brand-primary hover:bg-brand-neutral-warm rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              <button className="relative p-2 text-brand-neutral-charcoal/70 hover:text-brand-primary hover:bg-brand-neutral-warm rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-secondary rounded-full border-2 border-white"></span>
              </button>
              
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-brand-neutral-grey/20">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/20 p-0.5">
                  <div className="w-full h-full rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                    CK
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-bold text-brand-neutral-charcoal">Citizen Kimani</p>
                  <p className="text-[10px] uppercase tracking-widest text-brand-primary">Advocate</p>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-brand-neutral-charcoal/70"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-brand-neutral-grey/20 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    location.pathname === item.path
                      ? 'bg-brand-primary/10 text-brand-primary font-bold'
                      : 'text-brand-neutral-charcoal hover:bg-brand-neutral-warm'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-brand-neutral-grey/20 my-2"></div>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-neutral-charcoal hover:bg-brand-neutral-warm">
                <User size={20} /> Profile Settings
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-error-600 hover:bg-error-50 w-full text-left">
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
