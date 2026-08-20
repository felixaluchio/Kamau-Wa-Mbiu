import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { ChevronRight } from 'lucide-react';
import rallyBg from '../assets/images/kamau_rally_crowd_1787134306558.jpg';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { uploadToImgBB } from '../lib/uploadImage';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; href: string }[];
}

export function PageLayout({ children, breadcrumb }: PageLayoutProps) {
  const location = useLocation();
  const [ctaBgUrl, setCtaBgUrl] = useState<string>(rallyBg);

  // Isolate Firestore listener for CTA section
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'ctaBackground'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.bgUrl) {
            setCtaBgUrl(data.bgUrl);
          }
        }
      },
      (error) => {
        console.warn('Error fetching ctaBackground from Firestore:', error);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen pt-[104px] flex flex-col bg-brand-neutral-warm">
      {breadcrumb && (
        <div className="bg-brand-neutral-white py-4 border-b border-brand-neutral-grey/50">
          <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={12} className="mx-2 shrink-0" />
                {idx === breadcrumb.length - 1 ? (
                  <span className="text-brand-accent">{item.label}</span>
                ) : (
                  <Link to={item.href} className="hover:text-brand-primary transition-colors">{item.label}</Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {/* 
        We use motion.main for cinematic page transitions.
        Exit handles fading out, Initial handles entry state, Animate handles the final resting state.
      */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(5px)', y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow flex flex-col"
      >
        {children}
      </motion.main>

      <section className="py-24 bg-brand-neutral-charcoal text-brand-neutral-white text-center px-xs relative overflow-hidden mt-auto">
        {/* Rally Background Image & Atmospheric Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={ctaBgUrl} 
            alt="Kamau Wa Mbiu Campaign Rally" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-neutral-charcoal via-brand-neutral-charcoal/80 to-brand-neutral-charcoal/90" />
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 opacity-20 pointer-events-none z-[1]">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               opacity: [0.5, 0.8, 0.5]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" 
           />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Take Action</span>
          <h2 className="font-heading text-4xl sm:text-5xl mb-8 leading-[1.1]">Join the Movement for <span className="italic font-light">Change.</span></h2>
          <Link to="/volunteer">
            <Button size="lg" className="bg-brand-neutral-white text-brand-neutral-charcoal hover:bg-brand-neutral-white/90 group shadow-2xl">
              Be Part of the Vision
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
