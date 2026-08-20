import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Calendar, Heart, ArrowRight, X } from 'lucide-react';

export function PersonalizedHomeDashboard() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto px-xs sm:px-sm lg:px-md -mt-12 sm:-mt-16 relative z-20 mb-20 pointer-events-none"
      >
        <Card className="bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-brand-neutral-grey/20 pointer-events-auto">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <Sparkles size={20} className="text-brand-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-brand-neutral-charcoal">Welcome back, Sarah</h3>
                <p className="text-sm text-brand-neutral-charcoal/60">Here is what's happening in Limuru since your last visit.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-brand-neutral-charcoal/30 hover:text-brand-neutral-charcoal/70 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Suggested Event */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-3">
                <Calendar size={12} /> Nearby Event
              </div>
              <div className="p-4 rounded-2xl bg-brand-neutral-warm border border-brand-neutral-grey/20 group-hover:border-brand-primary/30 transition-colors h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-lg text-brand-neutral-charcoal mb-1">Limuru Town Hall</h4>
                  <p className="text-xs text-brand-neutral-charcoal/60 mb-4 flex items-center gap-1"><MapPin size={12} /> Limuru Community Center • Today, 14:00</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-brand-primary">RSVP Now</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Opportunity */}
            <div className="group cursor-pointer">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-3">
                <Heart size={12} /> Volunteer Match
              </div>
              <div className="p-4 rounded-2xl bg-brand-neutral-warm border border-brand-neutral-grey/20 group-hover:border-brand-accent/30 transition-colors h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-lg text-brand-neutral-charcoal mb-1">Tree Planting Drive</h4>
                  <p className="text-xs text-brand-neutral-charcoal/60 mb-4">Matches your interest in Environment.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-brand-accent">Join Mission</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Issue Update */}
            <div className="group cursor-pointer md:col-span-1 sm:col-span-2 col-span-1">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-success-600 mb-3">
                <Sparkles size={12} /> Report Update
              </div>
              <div className="p-4 rounded-2xl bg-success-50 border border-success-100 group-hover:border-success-200 transition-colors h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-lg text-brand-neutral-charcoal mb-1">Water Pipe Fixed</h4>
                  <p className="text-xs text-brand-neutral-charcoal/70 mb-4">Your report for Tigoni East has been resolved.</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-success-700">View Details</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-success-600 shadow-sm group-hover:scale-110 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
