import React from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Award, Star, Zap, Users, Share2, Lock, Target } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityBadges() {
  const earnedBadges = [
    { id: 1, title: 'Early Adopter', desc: 'Joined during the first phase of the campaign.', icon: <Star size={24} />, color: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20', date: 'Oct 12, 2023' },
    { id: 2, title: 'Townhall Regular', desc: 'Attended 3+ public townhall meetings.', icon: <Users size={24} />, color: 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20', date: 'Oct 20, 2023' },
    { id: 3, title: 'Community Voice', desc: 'Submitted a recognized policy suggestion.', icon: <Zap size={24} />, color: 'bg-success-100 text-success-600 border-success-200', date: 'Oct 24, 2023' },
  ];

  const lockedBadges = [
    { id: 4, title: 'Digital Advocate', desc: 'Share 10 campaign updates on social media.', icon: <Share2 size={24} />, progress: 40 },
    { id: 5, title: 'Field Leader', desc: 'Organize or lead a community initiative.', icon: <Target size={24} />, progress: 0 },
    { id: 6, title: 'Inner Circle', desc: 'Contribute consistently for 6 months.', icon: <Award size={24} />, progress: 15 },
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="max-w-3xl text-center mx-auto">
          <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="text-brand-accent w-10 h-10" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-brand-neutral-charcoal mb-4">
            Your Achievements
          </h1>
          <p className="font-body text-brand-neutral-charcoal/60 text-lg mb-8">
            Badges recognize your commitment and impact in the Kamau Wa Mbiu community. Earn them by participating in events, initiatives, and discussions.
          </p>
          
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white border border-brand-neutral-grey/20 rounded-full shadow-sm">
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-brand-primary">3</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50">Earned</p>
            </div>
            <div className="w-px h-10 bg-brand-neutral-grey/30" />
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-brand-neutral-charcoal/40">12</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50">Available</p>
            </div>
            <div className="w-px h-10 bg-brand-neutral-grey/30" />
            <div className="text-center px-4">
              <p className="text-3xl font-bold text-brand-secondary">Top 15%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50">Ranking</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <h2 className="font-heading text-2xl text-brand-neutral-charcoal mb-6 border-b border-brand-neutral-grey/20 pb-4">Earned Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="p-6 bg-white border border-brand-neutral-grey/20 text-center hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none z-10" />
                  
                  <div className={`w-20 h-20 mx-auto rounded-full border-4 flex items-center justify-center mb-4 relative z-20 group-hover:scale-110 transition-transform ${badge.color}`}>
                    {badge.icon}
                  </div>
                  
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-2">{badge.title}</h3>
                  <p className="text-sm text-brand-neutral-charcoal/60 mb-4">{badge.desc}</p>
                  
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/40">
                    Earned: {badge.date}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h2 className="font-heading text-2xl text-brand-neutral-charcoal mb-6 border-b border-brand-neutral-grey/20 pb-4">Locked Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedBadges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
              >
                <Card className="p-6 bg-brand-neutral-warm/30 border border-brand-neutral-grey/20 text-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                  
                  <div className="w-20 h-20 mx-auto rounded-full bg-brand-neutral-grey/20 text-brand-neutral-charcoal/40 flex items-center justify-center mb-4 relative">
                    <Lock size={20} className="absolute -top-1 -right-1 text-brand-neutral-charcoal/50" />
                    {badge.icon}
                  </div>
                  
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal/60 mb-2">{badge.title}</h3>
                  <p className="text-sm text-brand-neutral-charcoal/50 mb-6">{badge.desc}</p>
                  
                  <div className="w-full">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-neutral-grey/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-neutral-charcoal/30 rounded-full"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
