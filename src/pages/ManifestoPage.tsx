import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Search, Filter, Download, ArrowRight, Activity, Clock } from 'lucide-react';

const policies = [
  { category: 'Economy', title: 'Small Business Innovation Fund', progress: 0, timeline: 'Year 1', desc: 'A dedicated fund to provide zero-interest micro-loans to youth and women-led startups in the county.' },
  { category: 'Healthcare', title: 'Mobile Clinic Expansion', progress: 20, timeline: 'Year 1-2', desc: 'Deploying 15 new fully-equipped mobile clinics to serve remote rural areas that currently lack immediate access.' },
  { category: 'Education', title: 'Digital Classrooms Initiative', progress: 50, timeline: 'Year 2-3', desc: 'Ensuring every public school has a modernized computer lab and reliable high-speed internet access.' },
  { category: 'Agriculture', title: 'Subsidized Fertilizer Program', progress: 10, timeline: 'Year 1', desc: 'Direct subsidies to registered local farmers to reduce input costs and increase annual crop yields.' },
  { category: 'Infrastructure', title: 'Farm-to-Market Roads', progress: 5, timeline: 'Year 1-4', desc: 'Upgrading 200km of rural dirt roads to all-weather standards to reduce post-harvest losses.' },
  { category: 'Governance', title: 'Open Budget Portal', progress: 80, timeline: 'First 100 Days', desc: 'A public digital dashboard showing exactly how and where county funds are being allocated and spent in real-time.' },
];

const categories = ['All', 'Economy', 'Healthcare', 'Education', 'Agriculture', 'Infrastructure', 'Governance'];

export function ManifestoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout breadcrumb={[{ label: 'The Manifesto', href: '/manifesto' }]}>
      <section className="py-24 bg-brand-neutral-white border-b border-brand-neutral-grey/50">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
              <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
                The Manifesto
              </span>
              <h1 className="font-heading text-5xl sm:text-6xl text-brand-neutral-charcoal mb-6 leading-[1.1]">
                Promises made. <br/><span className="italic font-light">Promises kept.</span>
              </h1>
              <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed">
                Explore our detailed policy commitments, implementation timelines, and progress tracking. We believe in complete transparency.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="shrink-0 flex items-center gap-4">
               <button className="flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-brand-primary border border-brand-primary/20 px-6 py-4 rounded-full hover:bg-brand-primary/5 transition-colors">
                 <Download size={16} /> Download PDF
               </button>
            </motion.div>
          </div>

          <div className="bg-brand-neutral-warm p-4 sm:p-6 rounded-3xl border border-brand-neutral-grey/50 flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" size={20} />
              <input 
                type="text" 
                placeholder="Search policies, keywords..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-neutral-white border-none rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide shrink-0">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`whitespace-nowrap px-6 py-4 rounded-xl font-body text-sm font-bold transition-colors shadow-sm ${activeCategory === cat ? 'bg-brand-primary text-brand-neutral-white' : 'bg-brand-neutral-white text-brand-neutral-charcoal/70 hover:bg-brand-neutral-beige'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredPolicies.map((policy, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-brand-neutral-white border border-brand-neutral-grey/50 hover:border-brand-primary/30 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent bg-brand-neutral-beige px-3 py-1.5 rounded-full">
                    {policy.category}
                  </span>
                  <div className="flex items-center gap-2 text-brand-neutral-charcoal/40 text-sm font-body font-medium">
                    <Clock size={16} /> {policy.timeline}
                  </div>
                </div>
                <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-4 group-hover:text-brand-primary transition-colors">{policy.title}</h3>
                <p className="font-body text-brand-neutral-charcoal/70 leading-relaxed mb-8 flex-grow">
                  {policy.desc}
                </p>
                
                <div className="border-t border-brand-neutral-grey/50 pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/50 flex items-center gap-2">
                      <Activity size={14} /> Implementation Status
                    </span>
                    <span className="font-heading text-sm text-brand-primary">{policy.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-brand-neutral-beige rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${policy.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredPolicies.length === 0 && (
              <div className="col-span-full py-24 text-center text-brand-neutral-charcoal/50 font-body text-lg">
                No policies found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
