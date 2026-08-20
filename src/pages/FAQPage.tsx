import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "How can I volunteer for the campaign?", a: "You can sign up through our Volunteer page. Once registered, a member of our field team will contact you with upcoming opportunities that match your interests." },
  { q: "Where can I find the full manifesto?", a: "The full manifesto is available on our Manifesto page, where you can browse by category or download a PDF version." },
  { q: "When are the town hall meetings held?", a: "Town halls are typically held bi-weekly across different sub-counties. Check our Events page for the latest schedule." },
  { q: "How is the campaign funded?", a: "Our campaign is powered by grassroots donations from ordinary citizens and transparent contributions from local businesses that align with our vision. We regularly publish our funding reports." },
];

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <PageLayout breadcrumb={[{ label: 'FAQ', href: '/faq' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-white">
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Support
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl text-brand-neutral-charcoal mb-6">
              Frequently Asked <span className="italic font-light">Questions.</span>
            </h1>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/50 overflow-hidden">
                <button 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center bg-transparent focus:outline-none"
                >
                  <span className="font-heading text-xl text-brand-neutral-charcoal">{faq.q}</span>
                  <ChevronDown className={`text-brand-primary transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pt-0 font-body text-brand-neutral-charcoal/70 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
