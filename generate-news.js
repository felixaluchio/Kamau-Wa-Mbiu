import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const newsCode = `import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Search, ArrowRight, Calendar, User, Tag } from 'lucide-react';

const featuredArticle = {
  title: "Kamau Wa Mbiu Unveils Comprehensive Youth Tech Initiative in Limuru",
  category: "Campaign News",
  date: "October 12, 2023",
  author: "Press Team",
  image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1200&auto=format&fit=crop",
  excerpt: "In a packed town hall meeting, Kamau detailed the 'Digital Tomorrow' fund, aimed at equipping over 10,000 local youth with modern coding and digital marketing skills over the next two years."
};

const latestArticles = [
  { id: 1, title: "Farmers Cooperative Praises Proposed Subsidies", category: "Agriculture", date: "Oct 8, 2023", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Healthcare Taskforce Submits Initial Findings", category: "Policy", date: "Oct 5, 2023", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Record Turnout at Kiambu Voter Registration Drive", category: "Community", date: "Oct 1, 2023", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Editorial: Why Transparency is the Only Way Forward", category: "Opinion", date: "Sep 28, 2023", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" },
];

const categories = ['All News', 'Campaign News', 'Policy', 'Community', 'Agriculture', 'Opinion'];

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All News');

  return (
    <PageLayout breadcrumb={[{ label: 'News & Updates', href: '/news' }]}>
      <section className="py-24 bg-brand-neutral-white border-b border-brand-neutral-grey/50">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
              <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
                News & Updates
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-6 leading-[1.1]">
                Stories from the <br/><span className="italic font-light">trail.</span>
              </h1>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {/* Featured Article */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="group cursor-pointer mb-16"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-lg">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-brand-neutral-white px-4 py-2 rounded-full font-body text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                    {featuredArticle.category}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-brand-neutral-charcoal/50 font-body text-xs font-medium uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-2"><Calendar size={14} /> {featuredArticle.date}</span>
                  <span className="flex items-center gap-2"><User size={14} /> {featuredArticle.author}</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl text-brand-neutral-charcoal mb-6 group-hover:text-brand-primary transition-colors leading-[1.2]">
                  {featuredArticle.title}
                </h2>
                <p className="font-body text-lg text-brand-neutral-charcoal/70 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <div className="font-body text-xs font-bold uppercase tracking-widest text-brand-accent flex items-center group-hover:text-brand-primary transition-colors">
                  Read Full Story <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              <div className="w-full h-px bg-brand-neutral-grey/50 mb-16" />

              {/* Latest Articles Grid */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                {latestArticles.map((article, idx) => (
                  <motion.div 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-3 block">
                      {article.category}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl text-brand-neutral-charcoal mb-4 group-hover:text-brand-primary transition-colors leading-[1.3]">
                      {article.title}
                    </h3>
                    <div className="font-body text-xs text-brand-neutral-charcoal/50 flex items-center gap-2">
                      <Calendar size={12} /> {article.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              <div className="bg-brand-neutral-warm p-8 rounded-3xl border border-brand-neutral-grey/50">
                <h4 className="font-heading text-2xl text-brand-neutral-charcoal mb-6">Search News</h4>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full bg-brand-neutral-white border-none rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 font-body transition-all text-sm"
                  />
                </div>
              </div>

              <div className="bg-brand-neutral-warm p-8 rounded-3xl border border-brand-neutral-grey/50">
                <h4 className="font-heading text-2xl text-brand-neutral-charcoal mb-6">Categories</h4>
                <ul className="space-y-3">
                  {categories.map((cat, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => setActiveCategory(cat)}
                        className={\`w-full text-left flex justify-between items-center py-2 font-body text-sm transition-colors \${activeCategory === cat ? 'text-brand-primary font-bold' : 'text-brand-neutral-charcoal/70 hover:text-brand-primary'}\`}
                      >
                        {cat}
                        {activeCategory === cat && <ArrowRight size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-neutral-warm p-8 rounded-3xl border border-brand-neutral-grey/50">
                <h4 className="font-heading text-2xl text-brand-neutral-charcoal mb-6">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Policy', 'Limuru', 'Youth', 'Rally', 'Interview', 'Development', 'Economy'].map((tag, idx) => (
                    <span key={idx} className="bg-brand-neutral-white border border-brand-neutral-grey/50 text-brand-neutral-charcoal/70 px-4 py-2 rounded-full text-xs font-body hover:bg-brand-neutral-beige cursor-pointer transition-colors flex items-center gap-1.5">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
`;

fs.writeFileSync(path.join(pagesDir, 'NewsPage.tsx'), newsCode);

console.log('News page generated successfully!');
