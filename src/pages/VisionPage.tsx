import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Briefcase, GraduationCap, Heart, Sprout, TrendingUp, Building2, Scale, Leaf, X } from 'lucide-react';

const pillars = [
  { id: 'youth', title: 'Youth Empowerment', icon: GraduationCap, desc: 'Creating pathways for education, skill development, and employment for the next generation.' },
  { id: 'agriculture', title: 'Modern Agriculture', icon: Sprout, desc: 'Equipping farmers with technology and resources to increase yield and ensure food security.' },
  { id: 'economy', title: 'Economic Growth', icon: TrendingUp, desc: 'Fostering a business-friendly environment that supports local entrepreneurs and attracts investment.' },
  { id: 'healthcare', title: 'Accessible Healthcare', icon: Heart, desc: 'Ensuring every citizen has access to quality, affordable, and well-equipped medical facilities.' },
  { id: 'infrastructure', title: 'Infrastructure', icon: Building2, desc: 'Building reliable roads, water systems, and digital networks to connect our communities.' },
  { id: 'governance', title: 'Transparent Governance', icon: Scale, desc: 'Committing to accountability, open communication, and zero tolerance for corruption.' },
];

export function VisionPage() {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const activePillarData = pillars.find(p => p.id === activePillar);

  return (
    <PageLayout breadcrumb={[{ label: 'Our Vision', href: '/vision' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-warm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Strategic Vision
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-[80px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
              A blueprint for <br />
              <span className="italic font-light">prosperity.</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed max-w-2xl mx-auto mb-16">
              Our vision is not just a collection of promises; it is a structured, actionable plan designed to elevate every aspect of our community's daily life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer bg-brand-neutral-white rounded-3xl p-8 border border-brand-neutral-grey/50 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300"
                onClick={() => setActivePillar(pillar.id)}
              >
                <div className="w-14 h-14 bg-brand-neutral-beige text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-neutral-white transition-colors duration-300">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-4">{pillar.title}</h3>
                <p className="font-body text-sm text-brand-neutral-charcoal/70 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-brand-accent group-hover:text-brand-primary transition-colors">
                  Explore Pillar <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activePillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-brand-neutral-charcoal/40 backdrop-blur-sm"
              onClick={() => setActivePillar(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-neutral-white rounded-[2rem] shadow-2xl p-8 sm:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setActivePillar(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-brand-neutral-beige rounded-full flex items-center justify-center text-brand-neutral-charcoal hover:bg-brand-primary hover:text-brand-neutral-white transition-colors"
              >
                <X size={20} />
              </button>
              
              {activePillarData && (
                <>
                  <div className="w-16 h-16 bg-brand-primary text-brand-neutral-white rounded-2xl flex items-center justify-center mb-8">
                    <activePillarData.icon size={32} />
                  </div>
                  <h2 className="font-heading text-4xl text-brand-neutral-charcoal mb-4">{activePillarData.title}</h2>
                  <div className="w-12 h-1 bg-brand-accent rounded-full mb-8" />
                  
                  <div className="prose prose-lg prose-headings:font-heading prose-p:font-body prose-p:text-brand-neutral-charcoal/70 mb-8">
                    <p className="text-xl font-medium text-brand-neutral-charcoal leading-relaxed">
                      {activePillarData.desc}
                    </p>
                    <p>
                      Our approach to {activePillarData.title.toLowerCase()} is comprehensive. We believe that by investing strategically in this sector, we create a cascading effect of positive change throughout the community.
                    </p>
                    <p>
                      Key initiatives include establishing public-private partnerships, reallocating budget resources to prioritize frontline impact, and ensuring all community voices are heard during the implementation phase.
                    </p>
                  </div>
                  
                  <div className="bg-brand-neutral-warm rounded-2xl p-6 border border-brand-neutral-grey/50">
                    <h4 className="font-heading text-xl mb-4">Core Objectives</h4>
                    <ul className="space-y-3 font-body text-brand-neutral-charcoal/80">
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Implement modern, data-driven frameworks.</li>
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Ensure equitable distribution of resources.</li>
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Establish transparent accountability metrics.</li>
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
