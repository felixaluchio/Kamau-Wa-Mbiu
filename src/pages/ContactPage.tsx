import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Contact Us', href: '/contact' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-white relative">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Contact Us
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-6 leading-[1.1]">
              Let's <span className="italic font-light">Connect.</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed">
              We'd love to hear from you. Whether you have a question about the campaign, want to volunteer, or just want to share your thoughts, our team is ready to listen.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-brand-neutral-warm rounded-3xl p-8 sm:p-12 h-full border border-brand-neutral-grey/50">
                <h3 className="font-heading text-3xl text-brand-neutral-charcoal mb-8">Send a Message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">First Name</label>
                      <input type="text" className="w-full bg-brand-neutral-white border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Last Name</label>
                      <input type="text" className="w-full bg-brand-neutral-white border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Email Address</label>
                    <input type="email" className="w-full bg-brand-neutral-white border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">Message</label>
                    <textarea rows={5} className="w-full bg-brand-neutral-white border border-brand-neutral-grey rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors resize-none"></textarea>
                  </div>
                  <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col justify-between">
              <div className="space-y-12">
                <div>
                  <h3 className="font-heading text-3xl text-brand-neutral-charcoal mb-8">Campaign HQ</h3>
                  <div className="space-y-6 font-body text-brand-neutral-charcoal/80">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-neutral-beige rounded-full flex items-center justify-center shrink-0 text-brand-primary"><MapPin size={20} /></div>
                      <div>
                        <p className="font-bold text-brand-neutral-charcoal mb-1">Visit Us</p>
                        <p>Limuru Community Centre<br/>Limuru, Kiambu, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-neutral-beige rounded-full flex items-center justify-center shrink-0 text-brand-primary"><Phone size={20} /></div>
                      <div>
                        <p className="font-bold text-brand-neutral-charcoal mb-1">Call Us</p>
                        <p>+254 700 000 000</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-neutral-beige rounded-full flex items-center justify-center shrink-0 text-brand-primary"><Mail size={20} /></div>
                      <div>
                        <p className="font-bold text-brand-neutral-charcoal mb-1">Email Us</p>
                        <p>info@kamauwambiu.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-neutral-beige rounded-full flex items-center justify-center shrink-0 text-brand-primary"><Clock size={20} /></div>
                      <div>
                        <p className="font-bold text-brand-neutral-charcoal mb-1">Office Hours</p>
                        <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-64 rounded-3xl overflow-hidden relative shadow-lg">
                  {/* Google Maps placeholder */}
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="Map" />
                  <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-neutral-white p-4 rounded-2xl shadow-xl flex items-center justify-center">
                    <MapPin className="text-brand-primary" size={32} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
