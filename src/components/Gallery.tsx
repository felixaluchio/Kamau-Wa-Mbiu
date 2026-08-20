import React from 'react';
import { motion } from 'motion/react';

export function Gallery() {
  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-beige">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Media Gallery
          </span>
          <h2 className="font-heading text-4xl sm:text-[56px] leading-[1.1] text-brand-neutral-charcoal mb-6">
            Moments on the <span className="italic font-light text-brand-neutral-charcoal/70">Trail.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <motion.div 
            className="col-span-2 md:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group aspect-square md:aspect-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Campaign" />
            <div className="absolute inset-0 bg-brand-neutral-charcoal/0 group-hover:bg-brand-neutral-charcoal/40 transition-colors duration-500 flex items-end p-8">
               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                 <p className="text-brand-neutral-white font-heading text-xl">Youth Town Hall</p>
                 <p className="text-brand-neutral-white/80 font-body text-xs mt-2 uppercase tracking-widest">Nairobi &bull; Oct 2024</p>
               </div>
            </div>
          </motion.div>
          
          <motion.div 
             className="col-span-1 md:col-span-2 relative rounded-3xl overflow-hidden group aspect-square md:aspect-[2/1]"
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Campaign" />
          </motion.div>
          
          <motion.div 
            className="col-span-1 md:col-span-1 relative rounded-3xl overflow-hidden group aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0" alt="Campaign" />
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-1 relative rounded-3xl overflow-hidden group aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=600&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Community Assembly" 
            />
            <div className="absolute inset-0 bg-brand-neutral-charcoal/0 group-hover:bg-brand-neutral-charcoal/40 transition-colors duration-500 flex items-end p-6">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-brand-neutral-white font-heading text-lg">Grassroots Forum</p>
                <p className="text-brand-neutral-white/80 font-body text-[10px] mt-1 uppercase tracking-widest">Kiambu &bull; Sep 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
