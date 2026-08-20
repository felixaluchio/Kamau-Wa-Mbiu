import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Cloud, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <PageLayout breadcrumb={[{ label: '404', href: '*' }]}>
      <section className="min-h-[70vh] py-24 sm:py-32 bg-brand-neutral-white flex items-center justify-center text-center relative overflow-hidden">
        {/* Animated Clouds */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 text-brand-primary"
          >
            <Cloud size={100} />
          </motion.div>
          <motion.div
            animate={{ x: [0, -150, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-20 text-brand-secondary"
          >
            <Cloud size={140} />
          </motion.div>
          <motion.div
            animate={{ x: [0, 80, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-1/3 text-brand-accent"
          >
            <Cloud size={80} />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neutral-beige/50 via-brand-neutral-white/50 to-brand-neutral-white -z-10" />
        
        <div className="max-w-2xl mx-auto px-xs relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative inline-block mb-6">
              <h1 className="font-heading text-9xl text-brand-primary/10">404</h1>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-brand-primary"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Search size={48} className="opacity-50" />
              </motion.div>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl text-brand-neutral-charcoal mb-6">
              It looks like you've <span className="italic font-light">wandered off the path.</span>
            </h2>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed mb-10">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track to exploring Kamau's vision for the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto hover:-translate-y-1 transition-transform">Return Home</Button>
              </Link>
              <Link to="/vision">
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:-translate-y-1 transition-transform">Explore Vision</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
