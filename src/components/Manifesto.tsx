import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';

export function Manifesto() {
  const priorities = [
    "Revitalizing rural infrastructure to connect farmers directly to broader markets.",
    "Implementing zero-tolerance anti-corruption measures across all local government offices.",
    "Establishing accessible tech hubs to provide digital skills training for the youth.",
    "Upgrading local healthcare facilities with modern equipment and adequately paid staff.",
  ];

  return (
    <section id="manifesto" className="py-24 sm:py-32 bg-brand-neutral-warm">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square sm:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577414343169-58a474c10e30?q=80&w=2000&auto=format&fit=crop" 
                alt="Community meeting" 
                className="object-cover w-full h-full grayscale-[20%] sepia-[10%] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-heading text-2xl text-brand-neutral-white italic mb-2">
                  "Progress is not promised; it is built, block by block, by a united community."
                </p>
                <p className="font-body text-sm text-brand-neutral-white/70 uppercase tracking-widest">
                  — Kamau Wa Mbiu
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-start">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
              The Manifesto
            </span>
            <h2 className="font-heading text-4xl sm:text-[56px] leading-[1.1] text-brand-neutral-charcoal mb-8">
              A clear path to <br />
              <span className="italic font-light">practical progress.</span>
            </h2>
            
            <p className="font-body text-lg text-brand-neutral-charcoal/60 mb-10 leading-relaxed">
              We move beyond empty rhetoric. Our manifesto outlines specific, measurable actions designed to uplift every citizen, streamline public services, and foster an environment where local enterprise thrives.
            </p>

            <ul className="space-y-6 mb-12">
              {priorities.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-6 h-6 rounded bg-brand-accent/20 flex items-center justify-center shrink-0 mr-4 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  </div>
                  <span className="font-body text-brand-neutral-charcoal leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="secondary" size="lg">
              Download Full Manifesto
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
