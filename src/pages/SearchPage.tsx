import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, TrendingUp, ChevronRight, FileText, Calendar, Users, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const trendingSearches = [
    "Agricultural Reforms 2024",
    "Limuru Town Hall Schedule",
    "Youth Tech Hub Registration",
    "How to volunteer?",
    "Water Infrastructure Plans"
  ];

  const categories = [
    { name: "Manifesto & Vision", count: 24, icon: <FileText size={16} /> },
    { name: "Upcoming Events", count: 12, icon: <Calendar size={16} /> },
    { name: "Community Projects", count: 8, icon: <Users size={16} /> },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 1200);
  };

  return (
    <PageLayout breadcrumb={[{ label: 'AI-Powered Search', href: '/search' }]}>
      <section className="py-16 sm:py-24 bg-brand-neutral-warm min-h-[80vh] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> AI-Powered Search
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-brand-neutral-charcoal mb-6 leading-[1.1]">
              How can we <span className="italic font-light">help you?</span>
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed max-w-2xl mx-auto">
              Ask questions naturally. Our AI will search across policies, news, events, and community projects to find exactly what you need.
            </p>
          </div>

          <Card className="p-2 sm:p-4 bg-white border border-brand-neutral-grey/20 shadow-xl mb-12 relative z-20">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className="absolute left-4 sm:left-6 text-brand-primary/50">
                <Search size={24} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g., What is Kamau's plan for youth employment?"
                className="w-full bg-transparent border-none pl-12 sm:pl-16 pr-24 sm:pr-32 py-4 sm:py-5 text-base sm:text-lg font-body focus:outline-none text-brand-neutral-charcoal placeholder:text-brand-neutral-charcoal/30"
              />
              <div className="absolute right-2 sm:right-3">
                <Button 
                  type="submit" 
                  disabled={!query.trim() || isSearching}
                  className="rounded-xl h-10 sm:h-12 px-4 sm:px-6"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>
          </Card>

          <AnimatePresence mode="wait">
            {!hasSearched ? (
              <motion.div 
                key="default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal flex items-center gap-2 mb-6">
                    <TrendingUp className="text-brand-accent" size={20} />
                    Trending Searches
                  </h3>
                  <div className="space-y-3">
                    {trendingSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuery(term);
                          handleSearch();
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl border border-brand-neutral-grey/20 bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all flex items-center justify-between group"
                      >
                        <span className="font-body text-sm text-brand-neutral-charcoal/70 group-hover:text-brand-primary transition-colors">{term}</span>
                        <ChevronRight size={16} className="text-brand-neutral-charcoal/30 group-hover:text-brand-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-6">
                    Browse Categories
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left p-4 rounded-xl border border-brand-neutral-grey/20 bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all group flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-colors shrink-0">
                          {cat.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors">{cat.name}</h4>
                          <p className="text-xs text-brand-neutral-charcoal/50 mt-0.5">{cat.count} articles & resources</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : isSearching ? (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-2xl animate-ping" />
                  <Sparkles className="text-brand-primary animate-pulse" size={24} />
                </div>
                <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-2">Analyzing your request...</h3>
                <p className="text-brand-neutral-charcoal/50 text-sm">Searching across manifesto, news, and policies.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Instant Answer (AI) */}
                <Card className="p-6 sm:p-8 bg-gradient-to-br from-brand-primary to-brand-primary-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Sparkles size={16} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">AI Instant Answer</span>
                  </div>
                  
                  <h3 className="font-heading text-2xl sm:text-3xl mb-4 relative z-10">Here is what I found about youth employment</h3>
                  
                  <p className="font-body text-white/90 leading-relaxed text-sm sm:text-base relative z-10 max-w-2xl mb-6">
                    Kamau Wa Mbiu's manifesto outlines a comprehensive plan for youth employment focusing on three main pillars: establishing tech and innovation hubs in Ngecha and Limuru CBD, creating 5,000 paid apprenticeships in partnership with local businesses, and providing seed grants for young entrepreneurs in the agricultural sector.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 relative z-10">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                      Read Manifesto
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                      View Hub Locations
                    </button>
                  </div>
                </Card>

                {/* Standard Results */}
                <div>
                  <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-6 border-b border-brand-neutral-grey/20 pb-4">
                    Related Content (3)
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { title: "The Youth Empowerment Manifesto", category: "Policy", desc: "Detailed breakdown of the 5-year plan to create jobs and support young entrepreneurs.", date: "Oct 12, 2023" },
                      { title: "Ngecha Tech Hub Groundbreaking", category: "News", desc: "Construction begins on the first of three proposed innovation centers.", date: "Oct 28, 2023" },
                      { title: "Youth Mentorship Workshop", category: "Event", desc: "A weekend seminar connecting established business leaders with young professionals.", date: "Nov 02, 2023" },
                    ].map((res, idx) => (
                      <Card key={idx} className="p-6 bg-white border border-brand-neutral-grey/20 hover:border-brand-primary/30 hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2.5 py-1 rounded-full bg-brand-neutral-warm text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal">
                              {res.category}
                            </span>
                            <span className="text-xs text-brand-neutral-charcoal/40 font-medium">{res.date}</span>
                          </div>
                          <h4 className="font-heading text-xl text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors mb-2">
                            {res.title}
                          </h4>
                          <p className="font-body text-sm text-brand-neutral-charcoal/70">
                            {res.desc}
                          </p>
                        </div>
                        <div className="sm:w-12 sm:flex items-center justify-end shrink-0 hidden">
                          <div className="w-10 h-10 rounded-full border border-brand-neutral-grey/30 flex items-center justify-center text-brand-neutral-charcoal/40 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="text-center pt-8">
                  <Button variant="outline" onClick={() => { setQuery(''); setHasSearched(false); }}>
                    Clear Search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
}
