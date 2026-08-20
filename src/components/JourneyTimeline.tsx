import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import rallyBg from '../assets/images/kamau_rally_crowd_1787134306558.jpg';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { uploadToImgBB } from '../lib/uploadImage';

const milestones = [
  { year: "1998", title: "Early Beginnings", description: "Graduated with honors, returning to Limuru with a vision for local enterprise." },
  { year: "2005", title: "Community Organizer", description: "Founded the Youth Empowerment Initiative, helping over 5,000 young people find employment." },
  { year: "2012", title: "Business Leadership", description: "Grew a local agricultural cooperative into a national supplier, empowering local farmers." },
  { year: "2018", title: "Public Service", description: "Appointed to the regional economic council, driving major infrastructure investments." },
  { year: "Today", title: "The Next Chapter", description: "Stepping up to run for office to bring radical transparency and progress to the county." },
];

export function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timelineBgUrl, setTimelineBgUrl] = useState<string>(rallyBg);
  
  // Isolate Firestore listener for Timeline section
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'timelineBackground'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.bgUrl) {
            setTimelineBgUrl(data.bgUrl);
          }
        }
      },
      (error) => {
        console.warn('Error fetching timelineBackground from Firestore:', error);
      }
    );

    return () => unsub();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-charcoal text-brand-neutral-white relative overflow-hidden" ref={containerRef}>
      {/* Background Image & Atmospheric Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={timelineBgUrl} 
          alt="Kamau Wa Mbiu Campaign Rally" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center sm:object-top opacity-60 scale-105 filter saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-neutral-charcoal/90 via-brand-neutral-charcoal/75 to-brand-neutral-charcoal/90" />
        <div className="absolute inset-0 bg-brand-neutral-charcoal/40 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
        
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block"
          >
            The Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] mb-6 text-brand-neutral-white"
          >
            A Legacy of <span className="italic font-light text-brand-neutral-white/70">Service.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-[28px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-brand-neutral-white/5" />
          
          {/* Animated Vertical Line */}
          <motion.div 
            className="absolute left-[28px] sm:left-1/2 sm:-translate-x-1/2 top-0 w-[2px] bg-brand-accent shadow-[0_0_15px_rgba(79,141,217,0.5)] origin-top" 
            style={{ height: lineHeight }}
          />

          <div className="space-y-20 pb-10">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  {/* Dot */}
                  <motion.div 
                    className="absolute left-[28px] sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-neutral-charcoal border-2 border-brand-neutral-white/20 z-10 top-2 sm:top-1/2 sm:-translate-y-1/2"
                    initial={{ backgroundColor: "rgba(20, 33, 61, 1)", borderColor: "rgba(255, 255, 255, 0.2)" }}
                    whileInView={{ backgroundColor: "#4F8DD9", borderColor: "#4F8DD9", scale: 1.2, boxShadow: "0 0 15px rgba(79, 141, 217, 0.6)" }}
                    viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${isEven ? 'sm:pr-16 text-left sm:text-right' : 'sm:pl-16 text-left'}`}
                    initial={{ opacity: 0, x: isEven ? 50 : -50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <span className="text-brand-neutral-white/30 font-heading text-4xl sm:text-6xl italic mb-2 block">{item.year}</span>
                    <h3 className="font-body text-xl font-bold mb-3">{item.title}</h3>
                    <p className="font-body text-brand-neutral-white/60 leading-relaxed text-sm sm:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
