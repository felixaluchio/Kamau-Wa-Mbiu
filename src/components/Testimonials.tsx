import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/Card';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Kamau has consistently shown that true leadership is about serving the people, not self-interest. His vision for our county is exactly what we need.",
      name: "Sarah Wanjiku",
      role: "Local Business Owner",
    },
    {
      quote: "The dedication to improving rural infrastructure will transform how we do business. I trust his proven track record of getting things done.",
      name: "David Omondi",
      role: "Agricultural Cooperative Lead",
    },
    {
      quote: "Finally, a leader who listens. The town hall meetings were a breath of fresh air. He genuinely cares about the youth and our future.",
      name: "Grace Mutua",
      role: "University Student Council",
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-warm">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-[56px] leading-[1.1] text-brand-neutral-charcoal mb-6">
            Voices of the <span className="italic font-light">People.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="flex flex-col text-brand-neutral-charcoal h-full bg-brand-neutral-white border border-brand-neutral-grey shadow-sm p-8 rounded-3xl">
                <div className="text-brand-accent mb-6 opacity-30">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="font-body text-lg leading-relaxed mb-10 flex-grow font-medium italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-brand-neutral-grey/50 pt-6">
                  <div className="w-12 h-12 bg-brand-neutral-beige rounded-full flex items-center justify-center text-brand-primary font-heading font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-lg leading-tight">{testimonial.name}</p>
                    <p className="font-body text-[10px] text-brand-neutral-charcoal/50 uppercase tracking-widest mt-1 font-bold">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
