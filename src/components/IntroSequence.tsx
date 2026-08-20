import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem('hasSeenIntro', 'true');
    } catch {
      // Ignore storage errors in private browsing/sandboxed iframes
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
      if (hasSeenIntro) {
        onComplete();
        return;
      }
    } catch {
      // Ignore storage error
    }

    const timer1 = setTimeout(() => setStage(1), 800); // Kenya outline
    const timer2 = setTimeout(() => setStage(2), 2200); // Zoom to Limuru + Message
    const timer3 = setTimeout(() => {
      handleComplete();
    }, 4200); // Complete and fade out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, handleComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-neutral-warm overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-neutral-warm to-brand-primary/5 pointer-events-none" />
        
        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleComplete}
          className="absolute bottom-12 right-12 font-body text-xs tracking-widest uppercase text-brand-neutral-charcoal/40 hover:text-brand-primary transition-colors"
        >
          Skip Intro
        </motion.button>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo / Outline Morph */}
          <div className="w-32 h-32 relative mb-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center shadow-floating"
                >
                  <span className="text-brand-accent font-heading font-bold text-4xl">K</span>
                </motion.div>
              )}
              {stage >= 1 && (
                <motion.div
                  key="outline"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: stage === 2 ? 1.5 : 1,
                    y: stage === 2 ? 20 : 0
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center justify-center"
                >
                  {/* Abstract representation of mapping/Kenya zooming to Limuru */}
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10Z" 
                      stroke="#1148B8" strokeWidth="2" strokeDasharray="4 4"
                      initial={{ pathLength: 0, rotate: -90 }}
                      animate={{ pathLength: 1, rotate: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="60" cy="60" r="4" fill="#0EA5D8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: stage === 2 ? [1, 2, 1] : 1, opacity: stage === 2 ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: stage === 2 ? 0 : 1 }}
                    />
                    {stage === 2 && (
                      <motion.circle 
                        cx="60" cy="60" r="16" stroke="#0EA5D8" strokeWidth="1"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Typography */}
          <div className="h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {stage === 2 && (
                <motion.p
                  key="message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-heading text-xl md:text-2xl text-brand-neutral-charcoal tracking-wide"
                >
                  Every great journey begins at home.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
