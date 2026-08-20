import React from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export function News() {
  const articles = [
    {
      title: "Kamau Unveils Comprehensive Youth Tech Initiative",
      date: "October 12, 2024",
      readTime: "4 min read",
      category: "Policy",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      preview: "A bold new plan to integrate digital skills training into local community centers."
    },
    {
      title: "Record Turnout at the Eastern Region Town Hall",
      date: "October 08, 2024",
      readTime: "3 min read",
      category: "Campaign Trail",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
      preview: "Citizens gathered in record numbers to discuss the upcoming agricultural reforms."
    },
    {
      title: "Agricultural Taskforce Submits Final Blueprint",
      date: "October 02, 2024",
      readTime: "5 min read",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=800&auto=format&fit=crop",
      preview: "The comprehensive strategy focuses on sustainable farming and direct market access."
    }
  ];

  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <section id="updates" className="py-24 sm:py-32 bg-brand-neutral-warm relative">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
              Latest News
            </span>
            <h2 className="font-heading text-4xl sm:text-[56px] leading-[1.1] text-brand-neutral-charcoal mb-4">
              Campaign <span className="italic font-light text-brand-neutral-charcoal/70">Updates.</span>
            </h2>
          </div>
          <Link to="/news">
            <Button variant="secondary">View All News</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-7">
            <Link to="/news" className="group flex flex-col h-full bg-brand-neutral-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-neutral-grey">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={featured.image} 
                  alt={featured.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-6 bg-brand-neutral-white px-4 py-1.5 rounded-full text-[10px] font-body font-bold text-brand-primary uppercase tracking-widest shadow-sm">
                  {featured.category}
                </div>
              </div>
              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-4 font-body text-[11px] text-brand-neutral-charcoal/50 uppercase tracking-widest font-bold mb-4">
                  <span className="flex items-center"><Calendar size={12} className="mr-1.5" /> {featured.date}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1.5" /> {featured.readTime}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal mb-4 group-hover:text-brand-primary transition-colors leading-[1.2]">
                  {featured.title}
                </h3>
                <p className="font-body text-brand-neutral-charcoal/60 leading-relaxed mb-8 flex-grow">
                  {featured.preview}
                </p>
                <div className="mt-auto flex items-center text-brand-accent font-bold uppercase tracking-widest text-[10px] group-hover:text-brand-primary transition-colors">
                  Read Full Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Other Articles */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {others.map((article, idx) => (
              <Link key={idx} to="/news" className="group flex flex-col sm:flex-row h-full bg-brand-neutral-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-neutral-grey">
                <div className="sm:w-2/5 relative overflow-hidden aspect-video sm:aspect-auto">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <span className="text-[10px] font-body font-bold text-brand-primary uppercase tracking-widest mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="font-heading text-lg text-brand-neutral-charcoal mb-3 group-hover:text-brand-primary transition-colors leading-[1.2]">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 font-body text-[10px] text-brand-neutral-charcoal/50 uppercase tracking-widest font-bold mt-auto">
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
