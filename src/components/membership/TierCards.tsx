import React from 'react';
import { motion } from 'motion/react';
import { Heart, Megaphone, Zap, Briefcase, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export type MembershipTierId = 'supporter' | 'volunteer' | 'ambassador' | 'advisor';

export interface MembershipTier {
  id: MembershipTierId;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  accentColor: string;
  popular?: boolean;
  benefits: string[];
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'supporter',
    name: 'Community Supporter',
    badge: 'Civic Tier',
    tagline: 'Stay informed, vote on priorities, and support locally.',
    description: 'Perfect for citizens who want to follow verified policy updates, participate in civic surveys, and attend neighborhood town halls.',
    icon: Heart,
    accentColor: '#1148B8',
    benefits: [
      'Digital Supporter ID Card',
      'Exclusive Campaign & Policy Briefs',
      'Priority RSVP to Town Halls',
      'Participation in Citizen Opinion Polls'
    ]
  },
  {
    id: 'volunteer',
    name: 'Active Volunteer',
    badge: 'Most Popular',
    tagline: 'Grassroots outreach, event mobilization & ward action.',
    description: 'For enthusiastic community builders ready to help with on-the-ground canvassing, community clean-ups, and event logistics.',
    icon: Megaphone,
    accentColor: '#0EA5D8',
    popular: true,
    benefits: [
      'Official Volunteer Certificate & ID',
      'Ward-Level Coordination Group Access',
      'Community Action Toolkit & Merchandise',
      'Leadership & Public Speaking Workshops'
    ]
  },
  {
    id: 'ambassador',
    name: 'Youth & Digital Ambassador',
    badge: 'Next-Gen',
    tagline: 'Digital advocacy, storytelling & youth forums.',
    description: 'For students, creators, and young innovators championing civic education, social media campaigns, and creative media initiatives.',
    icon: Zap,
    accentColor: '#4F8DD9',
    benefits: [
      'Digital Creator Assets & Toolkits',
      'Exclusive Monthly Youth Forum with Kamau',
      'Media Training & Amplification Grants',
      'Ambassador Leadership Honors'
    ]
  },
  {
    id: 'advisor',
    name: 'Professional & Policy Advisory',
    badge: 'Domain Expert',
    tagline: 'Strategic counsel in tech, healthcare, business & agri.',
    description: 'For professionals, researchers, and entrepreneurs wishing to review whitepapers, propose policy solutions, and guide economic strategy.',
    icon: Briefcase,
    accentColor: '#14213D',
    benefits: [
      'Direct Policy Working Group Seats',
      'Co-Authoring Legislative Recommendations',
      'Quarterly Economic Roundtables',
      'Recognized Platform Fellow Designation'
    ]
  }
];

interface TierCardsProps {
  selectedTier: MembershipTierId;
  onSelectTier: (tierId: MembershipTierId) => void;
}

export function TierCards({ selectedTier, onSelectTier }: TierCardsProps) {
  return (
    <section id="pathways" className="py-20 sm:py-28 bg-[#F8FBFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1148B8]/10 text-[#1148B8] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Choose Your Pathway</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14213D] tracking-tight">
            How Do You Want to Get Involved?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Every voice, skill, and hour matters. Choose the tier that matches your passion and availability. 
            You can always update your preferences at any time.
          </p>
        </div>

        {/* 4 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const Icon = tier.icon;

            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectTier(tier.id)}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-white border-2 border-[#1148B8] shadow-2xl shadow-[#1148B8]/15 ring-4 ring-[#1148B8]/10'
                    : 'bg-white/90 border border-slate-200/90 hover:border-[#1148B8]/40 hover:shadow-lg shadow-sm'
                }`}
              >
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1148B8] to-[#0EA5D8] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-[#1148B8] text-white shadow-md shadow-[#1148B8]/30' 
                          : 'bg-[#1148B8]/10 text-[#1148B8]'
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {!tier.popular && (
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#14213D] mb-1.5">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0EA5D8] mb-3">
                    {tier.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-slate-100 w-full mb-5" />

                  {/* Benefits List */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Key Highlights
                    </p>
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="font-medium leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-[#1148B8] text-white shadow-md shadow-[#1148B8]/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-[#1148B8]/10 hover:text-[#1148B8]'
                    }`}
                  >
                    <span>{isSelected ? 'Selected Pathway' : 'Select This Pathway'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
