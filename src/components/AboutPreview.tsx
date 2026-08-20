import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';
import kamauPortrait from '../assets/images/regenerated_image_1786347278447.png';

export function AboutPreview() {
  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-warm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative border-[8px] border-brand-neutral-white shadow-xl">
              <img 
                src={kamauPortrait} 
                alt="Kamau Wa Mbiu Portrait" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-multiply pointer-events-none" />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-neutral-beige rounded-full -z-10 blur-2xl opacity-60" />
          </motion.div>

          <motion.div 
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Who is Kamau?
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
              Rooted in the community. <br />
              <span className="italic font-light text-brand-neutral-charcoal/70">Ready to lead.</span>
            </h2>
            
            <div className="space-y-6 text-brand-neutral-charcoal/70 font-body text-base sm:text-lg leading-relaxed mb-10">
              <p>
                Born and raised in the heart of Limuru, Kamau Wa Mbiu understands the pulse of the people. His journey from a local entrepreneur to a dedicated public servant is defined by a singular purpose: empowering communities to reach their full potential.
              </p>
              <p className="border-l-2 border-brand-accent pl-6 italic">
                "True leadership isn't about standing above the rest; it's about lifting others up. We must build a future where opportunity is not a privilege, but a promise to every citizen."
              </p>
            </div>

            <div className="mb-12 flex flex-col items-start">
              {/* Signature Graphic Placeholdler */}
              <div className="font-heading italic text-4xl text-brand-neutral-charcoal mb-2">Kamau Wa Mbiu</div>
              <div className="text-[10px] uppercase tracking-widest text-brand-neutral-charcoal/40 font-bold">Candidate for Governor</div>
            </div>

            <Link to="/about">
              <Button variant="secondary" size="lg">Continue Reading</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
