import React from 'react';
import { motion } from 'motion/react';
import { Users, Leaf, GraduationCap, HeartPulse, Cpu, Building2, HardHat, Scale } from 'lucide-react';
import { Card } from './ui/Card';
import { Link } from 'react-router-dom';

export function Vision() {
  const visions = [
    { title: "Youth Empowerment", icon: <Users size={24} className="text-brand-primary" />, desc: "Digital skills training and accessible hubs for innovation." },
    { title: "Agricultural Growth", icon: <Leaf size={24} className="text-brand-primary" />, desc: "Modern farming techniques and direct market access." },
    { title: "Education for All", icon: <GraduationCap size={24} className="text-brand-primary" />, desc: "Upgrading school infrastructure and supporting teachers." },
    { title: "Universal Healthcare", icon: <HeartPulse size={24} className="text-brand-primary" />, desc: "Fully equipped local clinics within every ward." },
    { title: "Tech Integration", icon: <Cpu size={24} className="text-brand-primary" />, desc: "Digitizing public services for efficiency and transparency." },
    { title: "Business Support", icon: <Building2 size={24} className="text-brand-primary" />, desc: "Micro-loans and tax incentives for local SMEs." },
    { title: "Modern Infrastructure", icon: <HardHat size={24} className="text-brand-primary" />, desc: "Paving critical feeder roads and improving drainage." },
    { title: "Transparent Governance", icon: <Scale size={24} className="text-brand-primary" />, desc: "Open data portals and citizen-led budget oversight." },
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-beige relative">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block"
          >
            Vision for Limuru & Kenya
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-[56px] leading-[1.1] text-brand-neutral-charcoal mb-6"
          >
            A Blueprint for <span className="italic font-light text-brand-neutral-charcoal/70">Lasting Change.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-brand-neutral-charcoal/60 leading-relaxed text-lg"
          >
            Our vision is built on eight foundational pillars designed to address immediate challenges while laying the groundwork for generational prosperity.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {visions.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateX: -90, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: (i % 4) * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              style={{ transformOrigin: "top" }}
            >
              <Link to="/vision" className="block h-full">
                <Card className="h-full flex flex-col group items-start hover:-translate-y-2 transition-transform duration-500 bg-brand-neutral-white shadow-sm hover:shadow-xl border border-brand-neutral-grey cursor-pointer p-8 relative overflow-hidden">
                  
                  {/* Subtle Blueprint Scanline effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/0 via-brand-accent/5 to-brand-accent/0 opacity-0 group-hover:opacity-100 -translate-y-full group-hover:translate-y-full transition-all duration-1000 ease-in-out pointer-events-none" />

                  <div className="w-12 h-12 rounded-xl bg-brand-neutral-warm flex items-center justify-center mb-6 group-hover:bg-brand-accent/10 transition-colors relative z-10">
                    {v.icon}
                  </div>
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-3 relative z-10">{v.title}</h3>
                  <p className="font-body text-xs text-brand-neutral-charcoal/60 leading-relaxed flex-grow mb-6 relative z-10">
                    {v.desc}
                  </p>
                  <div className="mt-auto text-[10px] uppercase tracking-widest font-bold text-brand-accent group-hover:text-brand-primary transition-colors flex items-center relative z-10">
                    Learn More <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
