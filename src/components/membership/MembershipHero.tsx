import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface MembershipHeroProps {
  onJoinClick?: () => void;
}

export function MembershipHero({ onJoinClick }: MembershipHeroProps) {
  const stats = [
    { label: 'Active Members', value: '14,250+', icon: Users, change: '+18% this month' },
    { label: 'Community Initiatives', value: '48+', icon: Sparkles, change: '100% Grassroots' },
    { label: 'Wards & Constituencies', value: '100%', icon: MapPin, change: 'Full Representation' },
    { label: 'Civic Town Halls', value: '36+', icon: Award, change: 'Citizen-Led' },
  ];

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#F8FBFF] border-b border-slate-200/60">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#0EA5D8]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1148B8]/10 rounded-full blur-[130px] pointer-events-none translate-y-1/4 -translate-x-1/4" />

      {/* Subtle Pattern Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#1148B8 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1148B8]/10 border border-[#1148B8]/20 text-[#1148B8] text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#0EA5D8] animate-pulse" />
            <span>Join the Movement • Kamau Wa Mbiu Platform</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#14213D] tracking-tight leading-[1.15] font-extrabold mb-6"
          >
            Be Part of the Journey. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1148B8] via-[#0EA5D8] to-[#4F8DD9]">
              Shape the Future.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-normal"
          >
            True progress begins when citizens unite around shared values, transparent governance, and servant leadership. 
            Claim your digital membership card, join local ward networks, and actively shape the policies that impact our everyday lives.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={onJoinClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1148B8] text-white font-bold text-base shadow-xl shadow-[#1148B8]/25 hover:bg-[#0d3aa0] hover:shadow-2xl hover:shadow-[#1148B8]/35 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <span>Register for Free Membership</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>100% Free & Open to All Citizens</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Instant Digital Member ID</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Direct Ward Community Access</span>
            </div>
          </motion.div>
        </div>

        {/* Highlight Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1148B8]/30 transition-all duration-200 text-left group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1148B8]/10 text-[#1148B8] flex items-center justify-center mb-4 group-hover:bg-[#1148B8] group-hover:text-white transition-colors duration-200">
                  <Icon size={22} />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight">{stat.value}</p>
                <p className="text-sm font-bold text-slate-800 mt-1">{stat.label}</p>
                <p className="text-xs font-semibold text-[#0EA5D8] mt-1">{stat.change}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
