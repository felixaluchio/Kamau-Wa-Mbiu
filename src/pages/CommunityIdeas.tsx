import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Lightbulb, MessageSquare, ChevronUp, Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityIdeas() {
  const [filter, setFilter] = useState('Trending');
  
  const ideas = [
    { id: 1, title: 'Solar-Powered Streetlights in Market Area', author: 'Jane N.', category: 'Infrastructure', upvotes: 342, comments: 45, status: 'Under Review', date: '2 days ago' },
    { id: 2, title: 'Youth Tech Hub in Old Library', author: 'David K.', category: 'Education', upvotes: 289, comments: 32, status: 'Planned', date: '1 week ago' },
    { id: 3, title: 'Weekly Farmers Market in Tigoni', author: 'Mary W.', category: 'Economy', upvotes: 156, comments: 18, status: 'Implemented', date: '1 month ago' },
    { id: 4, title: 'Community Waste Recycling Program', author: 'Peter O.', category: 'Environment', upvotes: 124, comments: 22, status: 'Open', date: '3 hours ago' }
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
              <Lightbulb className="text-brand-primary" size={32} />
              Community Ideas
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 text-lg">
              Shape the future of our community. Propose ideas, support others, and track implementation progress.
            </p>
          </div>
          <Button leftIcon={<Plus size={16} />}>Submit New Idea</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 gap-2 hide-scrollbar">
            {['Trending', 'Recent', 'Under Review', 'Planned', 'Implemented'].map(f => (
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
              placeholder="Search ideas..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-brand-neutral-grey/30 rounded-full text-sm focus:outline-none focus:border-brand-primary transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          {ideas.map((idea, idx) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Card className="p-6 bg-white border border-brand-neutral-grey/20 hover:border-brand-primary/30 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 group">
                <div className="flex sm:flex-col items-center gap-2 sm:w-16 shrink-0">
                  <button className="w-12 h-12 rounded-xl bg-brand-neutral-warm border border-brand-neutral-grey/20 flex flex-col items-center justify-center text-brand-neutral-charcoal hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30 transition-colors">
                    <ChevronUp size={20} className="mb-0.5" />
                  </button>
                  <span className="font-heading text-lg text-brand-neutral-charcoal font-bold">{idea.upvotes}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-neutral-warm text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal">
                      {idea.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      idea.status === 'Implemented' ? 'text-success-600' :
                      idea.status === 'Planned' ? 'text-brand-secondary' :
                      idea.status === 'Under Review' ? 'text-warning-600' :
                      'text-brand-neutral-charcoal/50'
                    }`}>
                      • {idea.status}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-2 group-hover:text-brand-primary transition-colors cursor-pointer">
                    {idea.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-brand-neutral-charcoal/60">
                    <span>By {idea.author}</span>
                    <span>{idea.date}</span>
                    <button className="flex items-center gap-1.5 hover:text-brand-primary transition-colors">
                      <MessageSquare size={14} /> {idea.comments} Comments
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
