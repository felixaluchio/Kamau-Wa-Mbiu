import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export function GetInvolved() {
  return (
    <section className="relative py-32 bg-brand-primary overflow-hidden text-brand-neutral-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      
      <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
            Get Involved
          </span>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-[72px] mb-8 leading-[1.05]">
            Be Part of the <br/>
            <span className="italic font-light">Vision.</span>
          </h2>
          <p className="font-body text-lg sm:text-xl text-brand-neutral-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
            Change doesn't happen from the top down. It happens when citizens like you decide to stand up, speak out, and take action. Join our movement today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto">
               <Button variant="ghost" size="lg" className="text-brand-neutral-white border border-brand-neutral-white/20 hover:bg-brand-neutral-white/10 hover:text-brand-neutral-white text-base px-8 h-14 w-full sm:w-auto">
                 Partner With Us
               </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
