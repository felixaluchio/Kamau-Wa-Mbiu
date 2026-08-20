import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Vision', href: '/vision' },
    { name: 'Events', href: '/events' },
    { name: 'Membership', href: '/membership' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'py-4 bg-brand-neutral-white/80 backdrop-blur-xl shadow-sm border-b border-brand-neutral-grey/50' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-cursor="interactive">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${isScrolled ? 'bg-brand-primary scale-95' : 'bg-brand-primary scale-100'} group-hover:scale-105 group-hover:rotate-3`}>
            <span className="text-brand-accent font-heading font-bold text-xl">K</span>
          </div>
          <span className="font-body text-sm font-bold tracking-[0.2em] uppercase text-brand-neutral-charcoal">
            Kamau Wa Mbiu
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link 
                key={link.name}
                to={link.href}
                data-cursor="pointer"
                className={`relative px-3 py-2 font-body text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-brand-primary' : 'text-brand-neutral-charcoal/80 hover:text-brand-primary'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/membership">
            <Button size={isScrolled ? 'sm' : 'md'}>Join Movement</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-brand-primary focus:outline-none z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 h-screen bg-brand-neutral-white/95 backdrop-blur-xl border-b border-brand-neutral-grey shadow-lg py-8 px-xs flex flex-col space-y-6"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link 
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-3xl font-bold py-2 block ${
                    location.pathname === link.href ? 'text-brand-primary' : 'text-brand-neutral-charcoal'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-8 flex flex-col space-y-3"
            >
              <Link to="/membership" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" size="lg">Join Movement</Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
