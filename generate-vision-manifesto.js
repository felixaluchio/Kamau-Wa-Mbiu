import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const visionCode = `import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Briefcase, GraduationCap, Heart, Sprout, TrendingUp, Building2, Scale, Leaf, X } from 'lucide-react';

const pillars = [
  { id: 'youth', title: 'Youth Empowerment', icon: GraduationCap, desc: 'Creating pathways for education, skill development, and employment for the next generation.' },
  { id: 'agriculture', title: 'Modern Agriculture', icon: Sprout, desc: 'Equipping farmers with technology and resources to increase yield and ensure food security.' },
  { id: 'economy', title: 'Economic Growth', icon: TrendingUp, desc: 'Fostering a business-friendly environment that supports local entrepreneurs and attracts investment.' },
  { id: 'healthcare', title: 'Accessible Healthcare', icon: Heart, desc: 'Ensuring every citizen has access to quality, affordable, and well-equipped medical facilities.' },
  { id: 'infrastructure', title: 'Infrastructure', icon: Building2, desc: 'Building reliable roads, water systems, and digital networks to connect our communities.' },
  { id: 'governance', title: 'Transparent Governance', icon: Scale, desc: 'Committing to accountability, open communication, and zero tolerance for corruption.' },
];

export function VisionPage() {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const activePillarData = pillars.find(p => p.id === activePillar);

  return (
    <PageLayout breadcrumb={[{ label: 'Our Vision', href: '/vision' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-warm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Strategic Vision
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl lg:text-[80px] text-brand-neutral-charcoal mb-8 leading-[1.1]">
              A blueprint for <br />
              <span className="italic font-light">prosperity.</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed max-w-2xl mx-auto mb-16">
              Our vision is not just a collection of promises; it is a structured, actionable plan designed to elevate every aspect of our community's daily life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer bg-brand-neutral-white rounded-3xl p-8 border border-brand-neutral-grey/50 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300"
                onClick={() => setActivePillar(pillar.id)}
              >
                <div className="w-14 h-14 bg-brand-neutral-beige text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-neutral-white transition-colors duration-300">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-4">{pillar.title}</h3>
                <p className="font-body text-sm text-brand-neutral-charcoal/70 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-brand-accent group-hover:text-brand-primary transition-colors">
                  Explore Pillar <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activePillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-brand-neutral-charcoal/40 backdrop-blur-sm"
              onClick={() => setActivePillar(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-neutral-white rounded-[2rem] shadow-2xl p-8 sm:p-12 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setActivePillar(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-brand-neutral-beige rounded-full flex items-center justify-center text-brand-neutral-charcoal hover:bg-brand-primary hover:text-brand-neutral-white transition-colors"
              >
                <X size={20} />
              </button>
              
              {activePillarData && (
                <>
                  <div className="w-16 h-16 bg-brand-primary text-brand-neutral-white rounded-2xl flex items-center justify-center mb-8">
                    <activePillarData.icon size={32} />
                  </div>
                  <h2 className="font-heading text-4xl text-brand-neutral-charcoal mb-4">{activePillarData.title}</h2>
                  <div className="w-12 h-1 bg-brand-accent rounded-full mb-8" />
                  
                  <div className="prose prose-lg prose-headings:font-heading prose-p:font-body prose-p:text-brand-neutral-charcoal/70 mb-8">
                    <p className="text-xl font-medium text-brand-neutral-charcoal leading-relaxed">
                      {activePillarData.desc}
                    </p>
                    <p>
                      Our approach to {activePillarData.title.toLowerCase()} is comprehensive. We believe that by investing strategically in this sector, we create a cascading effect of positive change throughout the community.
                    </p>
                    <p>
                      Key initiatives include establishing public-private partnerships, reallocating budget resources to prioritize frontline impact, and ensuring all community voices are heard during the implementation phase.
                    </p>
                  </div>
                  
                  <div className="bg-brand-neutral-warm rounded-2xl p-6 border border-brand-neutral-grey/50">
                    <h4 className="font-heading text-xl mb-4">Core Objectives</h4>
                    <ul className="space-y-3 font-body text-brand-neutral-charcoal/80">
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Implement modern, data-driven frameworks.</li>
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Ensure equitable distribution of resources.</li>
                      <li className="flex items-start"><span className="text-brand-primary mr-3">•</span> Establish transparent accountability metrics.</li>
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
`;

const manifestoCode = `import React, { useState } from 'react';
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
                   className={\`whitespace-nowrap px-6 py-4 rounded-xl font-body text-sm font-bold transition-colors shadow-sm \${activeCategory === cat ? 'bg-brand-primary text-brand-neutral-white' : 'bg-brand-neutral-white text-brand-neutral-charcoal/70 hover:bg-brand-neutral-beige'}\`}
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
                      style={{ width: \`\${policy.progress}%\` }}
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
`;

fs.writeFileSync(path.join(pagesDir, 'VisionPage.tsx'), visionCode);
fs.writeFileSync(path.join(pagesDir, 'ManifestoPage.tsx'), manifestoCode);

console.log('Vision and Manifesto pages generated successfully!');
