import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight, 
  Activity,
  User,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const stats = [
    { label: 'Registered Citizens', value: '1,248', increase: '+14% this month', icon: <Users size={22} />, link: '/admin/membership' },
    { label: 'Active Campaign Events', value: '12', increase: 'Next 30 days', icon: <Calendar size={22} />, link: '/admin/events' },
    { label: 'Biography & Timeline Milestones', value: '8', increase: 'Verified & Published', icon: <User size={22} />, link: '/admin/about' },
    { label: 'Community Volunteer Leads', value: '184', increase: 'Across 5 Wards', icon: <Users size={22} />, link: '/admin/membership' },
  ];

  const coreModules = [
    {
      title: 'About & Journey',
      tabNumber: 'Tab 2',
      desc: 'Biography narrative, leadership milestones, and personal story timeline',
      icon: User,
      link: '/admin/about',
      badge: 'Verified'
    },
    {
      title: 'Events & Town Halls',
      tabNumber: 'Tab 3',
      desc: 'Schedule rallies, manage RSVPs, and delegate ward venues',
      icon: Calendar,
      link: '/admin/events',
      badge: '12 Live'
    },
    {
      title: 'Membership & Community',
      tabNumber: 'Tab 4',
      desc: 'Citizen profiles, volunteer coordinators & ward network tracking',
      icon: Users,
      link: '/admin/membership',
      badge: '1.2k Citizens'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-neutral-grey/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1148B8] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0EA5D8] animate-ping"></span>
              Limuru 2027 Command Center
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal">
              Kamau Wa Mbiu Administrative Hub
            </h1>
            <p className="font-body text-xs sm:text-sm text-brand-neutral-charcoal/60 mt-1">
              Real-time oversight of campaign policies, grassroots volunteers, events, and citizen intelligence.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/admin/events">
              <Button size="sm" variant="primary" leftIcon={<Plus size={16} />}>
                Create Event
              </Button>
            </Link>
            <Link to="/admin/membership">
              <Button size="sm" variant="outline" leftIcon={<Users size={16} />}>
                Add Volunteer
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <Link to={stat.link}>
                <Card className="p-5 h-full flex flex-col bg-white border border-brand-neutral-grey/30 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-3 bg-brand-neutral-warm rounded-2xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {stat.icon}
                    </div>
                    <span className="text-brand-neutral-charcoal/30 group-hover:text-brand-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-0.5 text-brand-neutral-charcoal">{stat.value}</h3>
                  <p className="font-body text-xs font-bold text-brand-neutral-charcoal/50 uppercase tracking-wider">{stat.label}</p>
                  <div className="mt-auto pt-3 border-t border-brand-neutral-grey/20 mt-3 flex items-center justify-between">
                    <p className="font-body text-[11px] text-success-700 font-semibold">{stat.increase}</p>
                    <span className="text-[10px] text-brand-neutral-charcoal/40 group-hover:text-brand-primary font-bold">Manage &rarr;</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 5 Core Tabs Quick Jump Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-brand-neutral-charcoal">
                Core Leadership Management Modules
              </h2>
              <p className="text-xs text-brand-neutral-charcoal/60">
                Direct access to the 5 primary administrative control portals.
              </p>
            </div>
            <span className="text-xs font-extrabold text-[#1148B8] bg-brand-primary/10 px-3 py-1 rounded-full">
              Tabs 2 - 5
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Link key={i} to={mod.link}>
                  <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm hover:border-[#1148B8] hover:shadow-md transition-all group h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-neutral-warm text-brand-primary flex items-center justify-center group-hover:bg-[#1148B8] group-hover:text-white transition-colors">
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/40 bg-brand-neutral-warm px-2 py-0.5 rounded-md">
                          {mod.tabNumber}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-brand-neutral-charcoal group-hover:text-[#1148B8] transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-brand-neutral-charcoal/60 mt-1 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-brand-neutral-grey/20 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                        {mod.badge}
                      </span>
                      <ChevronRight size={16} className="text-brand-neutral-charcoal/30 group-hover:text-[#1148B8] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Live Activity & System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-brand-neutral-grey/20">
                <div>
                  <h3 className="font-heading text-lg text-brand-neutral-charcoal">Recent Platform Activity</h3>
                  <p className="text-xs text-brand-neutral-charcoal/60">Live audit log of citizen registrations, event RSVPs and content updates.</p>
                </div>
                <span className="text-xs font-bold text-success-700 bg-success-50 px-2.5 py-1 rounded-full border border-success-200">
                  Live Stream
                </span>
              </div>

              <div className="divide-y divide-brand-neutral-grey/20 text-xs">
                {[
                  { time: '5 mins ago', event: 'New volunteer registration', detail: 'Faith Njoki signed up for Limuru Central ward coordination' },
                  { time: '35 mins ago', event: 'Pillar 02 Updated', detail: 'Youth Digital Innovation Hub specs refreshed' },
                  { time: '2 hours ago', event: 'Town Hall RSVP Spike', detail: '+42 new RSVPs for Ndeiya Farmers Baraza' },
                  { time: '4 hours ago', event: 'AI Knowledge Re-indexed', detail: 'Manifesto policy Q&A vector embeddings synchronized' }
                ].map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#1148B8] mt-1.5 shrink-0"></div>
                      <div>
                        <p className="font-bold text-brand-neutral-charcoal">{item.event}</p>
                        <p className="text-[11px] text-brand-neutral-charcoal/60">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-brand-neutral-charcoal/40 shrink-0 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
              <h3 className="font-heading text-lg text-brand-neutral-charcoal border-b border-brand-neutral-grey/20 pb-3">
                Quick Action Shortcuts
              </h3>
              
              <div className="space-y-2.5 text-xs">
                <Link 
                  to="/admin/about" 
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-neutral-warm/60 hover:bg-brand-neutral-warm border border-brand-neutral-grey/30 transition-colors"
                >
                  <span className="font-bold text-brand-neutral-charcoal">Edit Official Biography</span>
                  <ChevronRight size={14} className="text-brand-neutral-charcoal/40" />
                </Link>

                <Link 
                  to="/admin/vision" 
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-neutral-warm/60 hover:bg-brand-neutral-warm border border-brand-neutral-grey/30 transition-colors"
                >
                  <span className="font-bold text-brand-neutral-charcoal">Update 5 Policy Pillars</span>
                  <ChevronRight size={14} className="text-brand-neutral-charcoal/40" />
                </Link>

                <Link 
                  to="/admin/events" 
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-neutral-warm/60 hover:bg-brand-neutral-warm border border-brand-neutral-grey/30 transition-colors"
                >
                  <span className="font-bold text-brand-neutral-charcoal">Publish Town Hall</span>
                  <ChevronRight size={14} className="text-brand-neutral-charcoal/40" />
                </Link>

                <Link 
                  to="/admin/membership" 
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-neutral-warm/60 hover:bg-brand-neutral-warm border border-brand-neutral-grey/30 transition-colors"
                >
                  <span className="font-bold text-brand-neutral-charcoal">Assign Ward Coordinators</span>
                  <ChevronRight size={14} className="text-brand-neutral-charcoal/40" />
                </Link>

                <Link 
                  to="/admin/ai" 
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-primary/10 hover:bg-brand-primary/15 border border-brand-primary/20 transition-colors"
                >
                  <span className="font-bold text-[#1148B8] flex items-center gap-2">
                    <Sparkles size={14} /> Train AI Knowledge Base
                  </span>
                  <ChevronRight size={14} className="text-brand-primary" />
                </Link>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
export default AdminDashboard;
