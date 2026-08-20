import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';

export function MediaPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Media Centre', href: '/media' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Media Centre
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-8 leading-[1.1]">
              Media <span className="italic font-light">Centre</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed max-w-2xl mx-auto">
              This page is currently being designed and developed to provide you with the most premium experience. Check back soon.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
