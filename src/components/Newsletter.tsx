import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [confetti, setConfetti] = useState<{ id: number, x: number }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      triggerConfetti();
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, 5000);
    }, 1500);
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50 // Random horizontal position
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => setConfetti([]), 2000);
  };

  return (
    <section className="py-24 border-b border-brand-neutral-grey/50 bg-brand-neutral-white relative overflow-hidden">
      
      {/* Minimal Confetti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: 0, x: c.x, scale: 0, opacity: 1 }}
              animate={{ 
                y: -150 - Math.random() * 100, 
                x: c.x + (Math.random() * 100 - 50),
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`absolute w-3 h-3 rounded-full ${Math.random() > 0.5 ? 'bg-brand-primary' : 'bg-brand-accent'}`}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center justify-center">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl text-brand-neutral-charcoal mb-2"
        >
          Stay <span className="italic text-brand-primary">Connected.</span>
        </motion.h3>
        
        <p className="w-full max-w-2xl mx-auto text-center text-slate-600 text-base md:text-lg mt-4 mb-8 px-4 leading-relaxed">
          Subscribe to our newsletter to receive the latest updates on the campaign trail and community initiatives.
        </p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="w-full relative max-w-md mx-auto"
        >
          <div className="relative flex items-center">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status !== 'idle'}
              className="w-full bg-brand-neutral-beige border border-brand-neutral-grey/50 rounded-full px-6 py-4 text-sm font-body text-brand-neutral-charcoal placeholder:text-brand-neutral-charcoal/40 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all pr-36 disabled:opacity-70"
            />
            <div className="absolute right-2">
              <Button 
                type="submit"
                size="sm"
                disabled={status !== 'idle'}
                className="w-28 shadow-none"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center">
                      Subscribe <Send size={14} className="ml-2" />
                    </motion.div>
                  )}
                  {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                      <Loader2 size={18} className="animate-spin" />
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-white">
                      <CheckCircle2 size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: 0 }}
                className="absolute -bottom-8 left-0 right-0 flex justify-center items-center text-success-500 text-xs font-bold font-body"
              >
                You're officially on the list! Welcome aboard.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
