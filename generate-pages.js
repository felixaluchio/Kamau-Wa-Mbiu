import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(process.cwd(), 'src', 'pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

const writePage = (filename, content) => {
  fs.writeFileSync(path.join(pagesDir, filename), content);
};

const pageLayoutCode = `
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { ChevronRight } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; href: string }[];
}

export function PageLayout({ children, breadcrumb }: PageLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-[104px] flex flex-col bg-brand-neutral-warm">
      {breadcrumb && (
        <div className="bg-brand-neutral-white py-4 border-b border-brand-neutral-grey/50">
          <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={12} className="mx-2 shrink-0" />
                {idx === breadcrumb.length - 1 ? (
                  <span className="text-brand-accent">{item.label}</span>
                ) : (
                  <Link to={item.href} className="hover:text-brand-primary transition-colors">{item.label}</Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-grow"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      <section className="py-24 bg-brand-neutral-charcoal text-brand-neutral-white text-center px-xs relative overflow-hidden mt-auto">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Take Action</span>
          <h2 className="font-heading text-4xl sm:text-5xl mb-8 leading-[1.1]">Join the Movement for <span className="italic font-light">Change.</span></h2>
          <Link to="/volunteer">
            <Button size="lg" className="bg-brand-neutral-white text-brand-neutral-charcoal hover:bg-brand-neutral-white/90">
              Be Part of the Vision
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'components', 'PageLayout.tsx'), pageLayoutCode);

const pages = [
  { name: 'About', path: '/about', title: 'About Kamau' },
  { name: 'Journey', path: '/journey', title: 'Leadership Journey' },
  { name: 'VisionPage', path: '/vision', title: 'Our Vision' },
  { name: 'ManifestoPage', path: '/manifesto', title: 'The Manifesto' },
  { name: 'ImpactPage', path: '/impact', title: 'Community Impact' },
  { name: 'NewsPage', path: '/news', title: 'News & Updates' },
  { name: 'EventsPage', path: '/events', title: 'Upcoming Events' },
  { name: 'MediaPage', path: '/media', title: 'Media Centre' },
  { name: 'GalleryPage', path: '/gallery', title: 'Gallery' },
  { name: 'VolunteerPage', path: '/volunteer', title: 'Volunteer' },
  { name: 'ContactPage', path: '/contact', title: 'Contact Us' },
  { name: 'FAQPage', path: '/faq', title: 'FAQ' },
  { name: 'SearchPage', path: '/search', title: 'Search Results' },
  { name: 'PrivacyPage', path: '/privacy', title: 'Privacy Policy' },
  { name: 'TermsPage', path: '/terms', title: 'Terms of Use' },
  { name: 'NotFoundPage', path: '*', title: '404 - Not Found' },
];

pages.forEach(p => {
  const splitTitle = p.title.split(' ');
  const styledTitle = splitTitle.map((w, i) => i === splitTitle.length - 1 ? `<span className="italic font-light">${w}</span>` : w).join(' ');
  
  const code = `import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';

export function ${p.name}() {
  return (
    <PageLayout breadcrumb={[{ label: '${p.title}', href: '${p.path}' }]}>
      <section className="py-24 sm:py-32 bg-brand-neutral-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              ${p.title}
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-8 leading-[1.1]">
              ${styledTitle}
            </h1>
            <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed max-w-2xl mx-auto">
              This page is currently being designed and developed to provide you with the most premium experience. Check back soon.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
`;
  writePage(`${p.name}.tsx`, code);
});

const appCode = `import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Journey } from './pages/Journey';
import { VisionPage } from './pages/VisionPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { ImpactPage } from './pages/ImpactPage';
import { NewsPage } from './pages/NewsPage';
import { EventsPage } from './pages/EventsPage';
import { MediaPage } from './pages/MediaPage';
import { GalleryPage } from './pages/GalleryPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { SearchPage } from './pages/SearchPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-neutral-warm font-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
`;
fs.writeFileSync(path.join(process.cwd(), 'src', 'App.tsx'), appCode);

console.log('Pages generated successfully!');
