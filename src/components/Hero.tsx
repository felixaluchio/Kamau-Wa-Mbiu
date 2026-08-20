import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import heroPoster from '../assets/images/kamau_hero_limuru_1787212017505.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const [bgUrl, setBgUrl] = useState<string>(heroPoster);

  // Fetch background image URL from Firestore settings/hero
  useEffect(() => {
    let isMounted = true;
    async function fetchHeroBg() {
      try {
        const heroDocRef = doc(db, 'settings', 'hero');
        const heroSnap = await getDoc(heroDocRef);
        if (isMounted && heroSnap.exists() && heroSnap.data()?.bgUrl) {
          setBgUrl(heroSnap.data().bgUrl);
        }
      } catch (err) {
        // Fallback to local default poster when offline or network unavailable
        console.debug('Using default hero background:', err);
      }
    }
    fetchHeroBg();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-brand-neutral-charcoal pt-28 pb-36 sm:pb-48">
      {/* Dynamic Background Container */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top bg-cover bg-top"
        style={{ y, opacity, scale, backgroundImage: `url(${bgUrl})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <img 
          src={bgUrl} 
          alt="Kamau Wa Mbiu Campaign Poster - Incoming Limuru MP 2027" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-neutral-charcoal/90 via-brand-neutral-charcoal/40 to-brand-neutral-warm" />
        
        {/* Soft animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 20%, rgba(17, 72, 184, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(14, 165, 216, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(79, 141, 217, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(17, 72, 184, 0.4) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 my-auto pt-10 pb-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-accent font-body uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold mb-6 block"
        >
          Kamau Wa Mbiu
        </motion.span>
        
        <h1 className="font-heading text-5xl sm:text-7xl lg:text-[80px] leading-[1.05] text-brand-neutral-white mb-8 text-balance overflow-hidden">
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            A Life of Purpose.
          </motion.div>
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="italic font-light text-brand-neutral-white/70"
          >
            A Vision for Kenya.
          </motion.div>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-body text-base sm:text-xl text-brand-neutral-white/80 max-w-2xl mx-auto leading-relaxed mb-12 text-balance"
        >
          Committed to building a sustainable, transparent, and prosperous future through intelligent reform and servant leadership.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "backOut" }}
            className="w-full sm:w-auto"
          >
            <Link to="/vision" className="w-full sm:w-auto block">
              <Button size="lg" className="w-full sm:w-auto bg-brand-primary text-brand-neutral-white hover:bg-brand-primary/90 border-0 shadow-xl shadow-brand-primary/20">
                Explore the Vision
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
            className="w-full sm:w-auto"
          >
            <Link to="/about" className="w-full sm:w-auto block">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-brand-neutral-white hover:bg-brand-neutral-white/10 hover:text-brand-neutral-white border border-brand-neutral-white/20">
                Meet Kamau
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.span 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-brand-neutral-white/50 text-[10px] uppercase tracking-widest font-bold"
        >
          Scroll
        </motion.span>
        <div className="w-[1px] h-8 bg-brand-neutral-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent"
            animate={{ top: ['-50%', '150%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
