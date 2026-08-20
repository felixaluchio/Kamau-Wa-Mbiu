import React from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { BarChart, Users, Trees, Building, Heart, CheckCircle2, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityImpact() {
  const stats = [
    { label: 'Projects Completed', value: '142', increase: '+12 this month', icon: <CheckCircle2 size={24} /> },
    { label: 'Trees Planted', value: '15,400', increase: '+2,100 this year', icon: <Trees size={24} /> },
    { label: 'Volunteer Hours', value: '8,240', increase: '+450 this week', icon: <Heart size={24} /> },
    { label: 'Youth Reached', value: '4,500', increase: '+320 this month', icon: <Users size={24} /> },
  ];

  const recentProjects = [
    { name: 'Limuru Market Upgrade', location: 'Limuru CBD', status: 'Completed', impact: 'Supports 200+ vendors' },
    { name: 'Tigoni Clean Water Initiative', location: 'Tigoni', status: 'In Progress', impact: 'Will serve 1,200 households' },
    { name: 'Ngecha Youth Tech Hub', location: 'Ngecha', status: 'Completed', impact: 'Trains 50 youths monthly' },
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
            <BarChart className="text-brand-primary" size={32} />
            Community Impact Dashboard
          </h1>
          <p className="font-body text-brand-neutral-charcoal/60 text-lg">
            Track real-time statistics and see the tangible results of our collective efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col bg-white border border-brand-neutral-grey/30 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-primary pointer-events-none transform scale-150 translate-x-4 -translate-y-4">
                  {stat.icon}
                </div>
                <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary w-max mb-4">
                  {stat.icon}
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl mb-1 text-brand-neutral-charcoal">{stat.value}</h3>
                <p className="font-body text-sm font-bold text-brand-neutral-charcoal/50 uppercase tracking-widest">{stat.label}</p>
                <div className="mt-auto pt-4 border-t border-brand-neutral-grey/10 mt-4">
                  <p className="font-body text-xs text-brand-secondary font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> {stat.increase}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 h-full flex flex-col shadow-sm">
              <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-6">Issue Resolution Progress</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-brand-neutral-charcoal mb-2">
                    <span>Road Maintenance</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-neutral-warm rounded-full overflow-hidden">
                    <div className="h-full bg-brand-primary w-[75%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-brand-neutral-charcoal mb-2">
                    <span>Water Connectivity</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-neutral-warm rounded-full overflow-hidden">
                    <div className="h-full bg-brand-secondary w-[60%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-brand-neutral-charcoal mb-2">
                    <span>Healthcare Access</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-neutral-warm rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-brand-neutral-charcoal mb-2">
                    <span>Youth Employment</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-3 bg-brand-neutral-warm rounded-full overflow-hidden">
                    <div className="h-full bg-warning-500 w-[45%]" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 h-full shadow-sm">
              <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-6">Recent Projects</h3>
              <div className="space-y-6">
                {recentProjects.map((project, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-neutral-warm flex items-center justify-center shrink-0">
                      <Building size={18} className="text-brand-neutral-charcoal/50" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-neutral-charcoal text-sm">{project.name}</h4>
                      <p className="text-xs text-brand-neutral-charcoal/60 mt-0.5 flex items-center gap-1"><MapPin size={12} /> {project.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          project.status === 'Completed' ? 'bg-success-100 text-success-700' : 'bg-brand-primary/10 text-brand-primary'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-brand-neutral-charcoal/50">{project.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
}
