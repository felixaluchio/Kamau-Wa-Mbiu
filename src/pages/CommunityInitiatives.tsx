import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Target, Search, Filter, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityInitiatives() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Education', 'Environment', 'Healthcare', 'Tech', 'Agriculture'];

  const initiatives = [
    {
      id: 1,
      title: 'Limuru Tech Mentorship Program',
      category: 'Tech',
      location: 'Limuru Innovation Hub',
      date: 'Ongoing',
      participants: 124,
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop',
      description: 'Share your digital skills with youth looking to enter the tech industry. We are looking for developers, designers, and marketers.'
    },
    {
      id: 2,
      title: 'Tigoni Reforestation Drive',
      category: 'Environment',
      location: 'Tigoni Forest Edge',
      date: 'Next Saturday',
      participants: 45,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
      description: 'Join us to plant 1,000 indigenous trees to restore the local water catchment areas.'
    },
    {
      id: 3,
      title: 'Local Clinic Upgrade Support',
      category: 'Healthcare',
      location: 'Kiambu Ward 4',
      date: 'Nov 12 - Nov 14',
      participants: 28,
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop',
      description: 'Volunteer to help paint and organize the newly expanded community health clinic.'
    }
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
              <Target className="text-brand-primary" size={32} />
              Active Initiatives
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 text-lg">
              Find projects where your skills and passion can make the most impact. Sign up and start contributing today.
            </p>
          </div>
          <Button>Propose Initiative</Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 gap-2 hide-scrollbar">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  filter === f 
                    ? 'bg-brand-primary text-white shadow-sm' 
                    : 'bg-white border border-brand-neutral-grey/30 text-brand-neutral-charcoal/70 hover:border-brand-primary/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
            <input 
              type="text" 
              placeholder="Search initiatives..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-brand-neutral-grey/30 rounded-full text-sm focus:outline-none focus:border-brand-primary transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group h-full"
            >
              <Card className="h-full flex flex-col bg-white border border-brand-neutral-grey/20 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-brand-primary rounded-full">
                    {item.category}
                  </div>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-3 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  <p className="font-body text-sm text-brand-neutral-charcoal/60 line-clamp-2 mb-6 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-brand-neutral-charcoal/70">
                      <MapPin size={14} className="text-brand-accent" /> {item.location}
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-brand-neutral-charcoal/70">
                      <span className="flex items-center gap-2"><Calendar size={14} className="text-brand-secondary" /> {item.date}</span>
                      <span className="flex items-center gap-2"><Users size={14} className="text-brand-primary" /> {item.participants} Joined</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors" rightIcon={<ArrowRight size={16} />}>
                    View Details & Join
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
