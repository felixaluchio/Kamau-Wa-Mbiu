import React from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Award, Target, Calendar, ChevronRight, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityDashboard() {
  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-neutral-grey/20 shadow-sm relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl text-brand-neutral-charcoal mb-4">
              Welcome back, <span className="italic font-light text-brand-primary">Citizen Kimani.</span>
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 text-lg mb-8 leading-relaxed">
              You are making a difference. Your contributions are helping shape the vision for a better Kenya. Let's see what we can accomplish today.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-lg shadow-brand-primary/20">Find an Initiative</Button>
              <Button variant="outline" size="lg">Share Campaign</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Impact */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl text-brand-neutral-charcoal flex items-center gap-2">
                  <TrendingUp className="text-brand-primary" /> Your Impact
                </h2>
                <button className="text-sm font-bold text-brand-primary uppercase tracking-widest hover:text-brand-accent transition-colors flex items-center">
                  View Full Report <ChevronRight size={16} className="ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Events Attended', value: '4' },
                  { label: 'Hours Volunteered', value: '28' },
                  { label: 'People Invited', value: '12' },
                  { label: 'Badges Earned', value: '3' },
                ].map((stat, i) => (
                  <Card key={i} className="p-6 bg-white border border-brand-neutral-grey/20 text-center hover:border-brand-primary/30 transition-colors">
                    <p className="font-heading text-3xl sm:text-4xl text-brand-primary mb-2">{stat.value}</p>
                    <p className="font-body text-xs font-bold text-brand-neutral-charcoal/50 uppercase tracking-widest">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recommended Initiatives */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl text-brand-neutral-charcoal flex items-center gap-2">
                  <Target className="text-brand-primary" /> Recommended for You
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Local Tech Hub Mentorship', desc: 'Share your skills with youth in the Limuru tech initiative.', type: 'Skills Based', date: 'Ongoing' },
                  { title: 'Community Cleanup Drive', desc: 'Join the weekend environmental action team.', type: 'Field Work', date: 'This Saturday' },
                ].map((item, i) => (
                  <Card key={i} className="p-6 bg-white border border-brand-neutral-grey/20 hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-brand-neutral-warm text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal">
                          {item.type}
                        </span>
                        <span className="text-xs text-brand-neutral-charcoal/50 font-medium flex items-center gap-1">
                          <Calendar size={14} /> {item.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors">{item.title}</h3>
                      <p className="font-body text-sm text-brand-neutral-charcoal/60 mt-1">{item.desc}</p>
                    </div>
                    <Button variant="outline" className="sm:w-auto w-full group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors">
                      Sign Up
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Progress / Badges */}
            <Card className="p-6 bg-white border border-brand-neutral-grey/20">
              <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-6 flex items-center gap-2">
                <Award className="text-brand-accent" /> Recent Badges
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: 'Early Adopter', desc: 'Joined during the first phase.', color: 'bg-brand-primary/10 text-brand-primary' },
                  { title: 'Townhall Regular', desc: 'Attended 3+ public meetings.', color: 'bg-brand-secondary/10 text-brand-secondary' },
                  { title: 'Community Voice', desc: 'Submitted a policy suggestion.', color: 'bg-success-100 text-success-600' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${badge.color}`}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-sm text-brand-neutral-charcoal">{badge.title}</h4>
                      <p className="text-xs text-brand-neutral-charcoal/60 mt-1">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-brand-neutral-grey/20">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/60 mb-2">
                  <span>Next Rank: Leader</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-brand-neutral-warm rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-brand-primary"
                  />
                </div>
              </div>
            </Card>

            {/* Quick Updates */}
            <Card className="p-6 bg-brand-neutral-charcoal text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-[40px] pointer-events-none" />
              
              <h3 className="font-heading text-xl mb-6 relative z-10">Campaign Updates</h3>
              
              <div className="space-y-4 relative z-10">
                <div className="border-l-2 border-brand-accent pl-4 py-1">
                  <p className="text-xs text-white/50 mb-1">Today</p>
                  <p className="text-sm font-medium">New Agricultural Policy draft is now open for community feedback.</p>
                </div>
                <div className="border-l-2 border-brand-neutral-grey/30 pl-4 py-1">
                  <p className="text-xs text-white/50 mb-1">Yesterday</p>
                  <p className="text-sm font-medium text-white/80">Kamau visits the tech hub in Limuru.</p>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-white/20 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">
                View All Updates
              </button>
            </Card>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
