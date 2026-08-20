import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export function VolunteerPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Volunteer', href: '/volunteer' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-warm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neutral-beige rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
              <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
                Volunteer
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-[72px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
                Your time can <br />
                <span className="italic font-light">change everything.</span>
              </h1>
              <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed mb-10">
                A movement is only as strong as the people behind it. Whether you can give a few hours a week or dedicate yourself full-time, there’s a place for you on this team.
              </p>

              <div className="space-y-6 mb-12">
                {['Door-to-door canvassing', 'Event organization and support', 'Digital advocacy and social media', 'Community outreach programs'].map((item, i) => (
                  <div key={i} className="flex items-center text-brand-neutral-charcoal/80">
                    <CheckCircle2 className="text-brand-accent mr-4" size={24} />
                    <span className="font-body">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-brand-neutral-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-neutral-grey/30 relative z-10">
                <h3 className="font-heading text-3xl text-brand-neutral-charcoal mb-8">Join the Team</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">First Name</label>
                      <input type="text" className="w-full bg-brand-neutral-warm border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-brand-neutral-warm border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-brand-neutral-warm border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Phone Number</label>
                    <input type="tel" className="w-full bg-brand-neutral-warm border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Areas of Interest</label>
                    <select className="w-full bg-brand-neutral-warm border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary appearance-none">
                      <option>Field Organization</option>
                      <option>Digital & Social Media</option>
                      <option>Events & Logistics</option>
                      <option>Data & Research</option>
                    </select>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4">Submit Application</Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
