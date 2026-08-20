import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { Gallery } from '../components/Gallery';
import kamauPortrait from '../assets/images/regenerated_image_1786347278447.png';

export function About() {
  return (
    <PageLayout breadcrumb={[{ label: 'About Kamau', href: '/about' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-warm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
                The Leader
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-[80px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
                A lifetime of <br />
                <span className="italic font-light">service.</span>
              </h1>
              <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed mb-8">
                From his early days in Limuru to leading transformative community initiatives, Kamau Wa Mbiu's journey is defined by a deep commitment to empowering the people.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-brand-neutral-white"
            >
              <img 
                src={kamauPortrait} 
                alt="Kamau Wa Mbiu Portrait" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-brand-primary/5 mix-blend-multiply pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-neutral-white border-y border-brand-neutral-grey/50 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-neutral-beige rounded-full blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-brand-neutral-charcoal mb-10 leading-[1.4]">
              "True leadership isn't about standing above the rest; it's about lifting others up. We must build a future where opportunity is not a privilege, but a promise to every citizen."
            </h2>
            <div className="flex flex-col items-center">
              <div className="font-heading italic text-3xl text-brand-neutral-charcoal mb-2">Kamau Wa Mbiu</div>
              <div className="w-12 h-1 bg-brand-accent rounded-full mt-4" />
            </div>
          </motion.div>
        </div>
      </section>

      <JourneyTimeline />
      
      <section className="py-24 bg-brand-neutral-white">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Integrity", desc: "Unwavering commitment to transparent and honest governance." },
              { title: "Community", desc: "Prioritizing the collective well-being and local prosperity." },
              { title: "Innovation", desc: "Embracing modern solutions for age-old challenges." }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-brand-neutral-beige rounded-2xl flex items-center justify-center mb-6 text-brand-primary font-heading text-2xl font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-2xl mb-4 text-brand-neutral-charcoal">{val.title}</h3>
                <p className="font-body text-brand-neutral-charcoal/60 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
