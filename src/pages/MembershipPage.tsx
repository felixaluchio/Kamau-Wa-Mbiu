import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MembershipHero } from '../components/membership/MembershipHero';
import { MembershipTierId } from '../components/membership/TierCards';
import { JoinMovementForm } from '../components/membership/JoinMovementForm';
import { MemberCardPreview, MemberCardData } from '../components/membership/MemberCardPreview';
import { MembershipFAQ } from '../components/membership/MembershipFAQ';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<MembershipTierId>('volunteer');
  const [memberCardData, setMemberCardData] = useState<MemberCardData | null>(null);
  const [bgUrl, setBgUrl] = useState<string>('');

  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'settings', 'quoteSection'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data?.bgUrl) {
            setBgUrl(data.bgUrl);
          }
        }
      },
      (error) => {
        console.warn('Error fetching quoteSection background from Firestore:', error);
      }
    );

    return () => unsub();
  }, []);

  const handleJoinClick = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (data: MemberCardData) => {
    setMemberCardData(data);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-slate-900 selection:bg-[#1148B8]/20 selection:text-[#1148B8]">
      
      {/* 1. Hero Section */}
      <MembershipHero onJoinClick={handleJoinClick} />

      {/* 2. Interactive Registration Form or Digital Member ID Card Preview */}
      <div ref={formSectionRef} className="scroll-mt-24">
        {memberCardData ? (
          <section className="py-16 sm:py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MemberCardPreview 
                data={memberCardData} 
                onReset={() => setMemberCardData(null)} 
              />
            </div>
          </section>
        ) : (
          <JoinMovementForm
            initialTier={selectedTier}
            onSuccess={handleRegistrationSuccess}
          />
        )}
      </div>

      {/* 3. Frequently Asked Questions Accordion */}
      <MembershipFAQ />

      {/* 4. Bottom Inspiring Quote & Quick CTA with Dynamic Background */}
      <section 
        className="py-20 bg-gradient-to-r from-[#1148B8] via-[#0D3894] to-[#14213D] text-white relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : 'none' }}
      >
        {/* Legibility overlay */}
        <div className="inset-0 absolute bg-blue-950/80 mix-blend-multiply pointer-events-none" />

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5D8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0EA5D8] mb-4">
            Servant Leadership in Action
          </p>
          <p className="font-heading text-lg sm:text-xl lg:text-2xl text-white/95 font-normal leading-relaxed mb-6 max-w-3xl mx-auto">
            "When people stand united with courage and clear purpose, no obstacle is too great to overcome."
          </p>
          <p className="text-sm font-semibold text-white/80 mb-8">
            — Hon. Kamau Wa Mbiu
          </p>
          {!memberCardData && (
            <button
              onClick={handleJoinClick}
              className="px-8 py-4 rounded-2xl bg-white text-[#1148B8] font-bold text-sm shadow-xl hover:bg-[#F8FBFF] hover:scale-105 transition-all"
            >
              Join 14,000+ Members Today
            </button>
          )}
        </div>
      </section>

    </div>
  );
}
