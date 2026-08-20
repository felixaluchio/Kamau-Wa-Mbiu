import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const eventsCode = `import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const events = [
  { id: 1, title: 'Limuru Town Hall Meeting', date: 'October 15, 2023', time: '14:00 - 17:00', location: 'Limuru Community Centre', type: 'Town Hall' },
  { id: 2, title: 'Youth Tech Initiative Launch', date: 'October 22, 2023', time: '09:00 - 13:00', location: 'Kiambu Innovation Hub', type: 'Launch' },
  { id: 3, title: 'Agricultural Policy Forum', date: 'November 5, 2023', time: '10:00 - 15:00', location: 'Farmers Cooperative Hall', type: 'Forum' },
];

export function EventsPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Events', href: '/events' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-white">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Upcoming Events
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-6 leading-[1.1]">
              Join the <span className="italic font-light">conversation.</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed">
              Real change happens when we come together. Attend our town halls, community forums, and volunteer drives.
            </p>
          </motion.div>

          <div className="space-y-6">
            {events.map((evt, idx) => (
              <motion.div 
                key={evt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-neutral-warm rounded-3xl p-8 sm:p-10 border border-brand-neutral-grey/50 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8 group"
              >
                <div className="shrink-0 text-center bg-brand-neutral-white border border-brand-neutral-grey/50 rounded-2xl p-6 min-w-[140px]">
                  <div className="font-body text-sm font-bold text-brand-accent uppercase mb-1">{evt.date.split(' ')[0]}</div>
                  <div className="font-heading text-4xl text-brand-neutral-charcoal">{evt.date.split(' ')[1].replace(',','')}</div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                    {evt.type}
                  </span>
                  <h3 className="font-heading text-3xl text-brand-neutral-charcoal mb-4">{evt.title}</h3>
                  <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-8 text-brand-neutral-charcoal/60 font-body text-sm">
                    <div className="flex items-center gap-2"><Clock size={16} /> {evt.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} /> {evt.location}</div>
                  </div>
                </div>

                <div className="shrink-0 mt-6 md:mt-0">
                  <Button variant="secondary" className="group-hover:bg-brand-primary group-hover:text-brand-neutral-white group-hover:border-transparent transition-colors">
                    RSVP Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
`;

const galleryCode = `import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Gallery } from '../components/Gallery';

export function GalleryPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Gallery', href: '/gallery' }]}>
      <div className="py-12 bg-brand-neutral-white">
        <Gallery />
      </div>
    </PageLayout>
  );
}
`;

const faqCode = `import React, { useState } from 'react';
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
                  <ChevronDown className={\`text-brand-primary transition-transform duration-300 \${openIdx === idx ? 'rotate-180' : ''}\`} />
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
`;

fs.writeFileSync(path.join(pagesDir, 'EventsPage.tsx'), eventsCode);
fs.writeFileSync(path.join(pagesDir, 'GalleryPage.tsx'), galleryCode);
fs.writeFileSync(path.join(pagesDir, 'FAQPage.tsx'), faqCode);

console.log('Additional pages generated successfully!');
