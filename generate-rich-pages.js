import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const aboutCode = `import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { Gallery } from '../components/Gallery';

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
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop" 
                alt="Kamau Wa Mbiu Portrait" 
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
              />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply" />
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

      <Gallery />
    </PageLayout>
  );
}
`;

const contactCode = `import React from 'react';
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
`;

const volunteerCode = `import React from 'react';
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
`;

const notFoundCode = `import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <PageLayout breadcrumb={[{ label: '404', href: '*' }]}>
      <section className="min-h-[70vh] py-24 sm:py-32 bg-brand-neutral-white flex items-center justify-center text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neutral-beige/50 via-brand-neutral-white to-brand-neutral-white -z-10" />
        <div className="max-w-2xl mx-auto px-xs">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-9xl text-brand-primary/10 mb-6">404</h1>
            <h2 className="font-heading text-4xl sm:text-5xl text-brand-neutral-charcoal mb-6">
              It looks like you've <span className="italic font-light">wandered off the path.</span>
            </h2>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed mb-10">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track to exploring Kamau's vision for the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">Return Home</Button>
              </Link>
              <Link to="/vision">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">Explore Vision</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
`;

fs.writeFileSync(path.join(pagesDir, 'About.tsx'), aboutCode);
fs.writeFileSync(path.join(pagesDir, 'ContactPage.tsx'), contactCode);
fs.writeFileSync(path.join(pagesDir, 'VolunteerPage.tsx'), volunteerCode);
fs.writeFileSync(path.join(pagesDir, 'NotFoundPage.tsx'), notFoundCode);

console.log('Rich pages generated successfully!');
