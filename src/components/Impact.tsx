import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export function Impact() {
  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
              <motion.div 
                className="space-y-4 sm:space-y-6 pt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-neutral-white">
                  <img src="https://images.unsplash.com/photo-1577414343169-58a474c10e30?q=80&w=800&auto=format&fit=crop" alt="Community" className="w-full h-full object-cover" />
                </div>
                <div className="bg-brand-secondary text-brand-neutral-white p-6 sm:p-8 rounded-3xl shadow-lg">
                  <span className="font-heading text-4xl sm:text-5xl block mb-2">45+</span>
                  <span className="font-body text-[10px] uppercase tracking-widest font-bold opacity-80">Projects Completed</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-brand-neutral-charcoal text-brand-neutral-white p-6 sm:p-8 rounded-3xl shadow-lg">
                  <span className="font-heading text-4xl sm:text-5xl block mb-2">12K</span>
                  <span className="font-body text-[10px] uppercase tracking-widest font-bold opacity-80">Citizens Engaged</span>
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-neutral-white">
                  <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop" alt="Meeting" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-neutral-beige rounded-full blur-[100px] -z-10 opacity-70" />
          </div>

          <motion.div 
            className="order-1 lg:order-2 flex flex-col items-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Community Impact
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
              Action speaks <br />
              <span className="italic font-light text-brand-neutral-charcoal/70">louder than words.</span>
            </h2>
            <p className="font-body text-base sm:text-lg text-brand-neutral-charcoal/60 leading-relaxed mb-10">
              For over a decade, Kamau has been on the ground, working side-by-side with citizens to solve real problems. From upgrading local markets to launching youth mentorship programs, his record is built on tangible results, not empty promises.
            </p>
            <Link to="/impact">
              <Button variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
                View All Initiatives
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
