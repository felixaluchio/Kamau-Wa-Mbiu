import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
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
import { MembershipPage } from './pages/MembershipPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { SearchPage } from './pages/SearchPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { UXBiblePage } from './pages/UXBiblePage';
import { PRDPage } from './pages/PRDPage';

import { AdminDashboard } from './pages/AdminDashboard';
import { AdminAbout } from './pages/AdminAbout';
import { AdminVisionManifesto } from './pages/AdminVisionManifesto';
import { AdminMembership } from './pages/AdminMembership';
import { AdminVolunteers } from './pages/AdminVolunteers';
import { AdminAIHub } from './pages/AdminAIHub';
import { AdminContent } from './pages/AdminContent';
import { AdminMedia } from './pages/AdminMedia';
import { AdminSettings } from './pages/AdminSettings';
import { AdminMessages } from './pages/AdminMessages';
import { AdminEvents } from './pages/AdminEvents';
import { AdminLogin } from './pages/AdminLogin';

import { CommunityDashboard } from './pages/CommunityDashboard';
import { CommunityInitiatives } from './pages/CommunityInitiatives';
import { CommunityEvents } from './pages/CommunityEvents';
import { CommunityResources } from './pages/CommunityResources';
import { CommunityBadges } from './pages/CommunityBadges';
import { CommunityIdeas } from './pages/CommunityIdeas';
import { CommunityIssues } from './pages/CommunityIssues';
import { CommunityImpact } from './pages/CommunityImpact';
import { CommunityTownhall } from './pages/CommunityTownhall';

import { SmoothScroll } from './components/SmoothScroll';
import { IntroSequence } from './components/IntroSequence';
import { AIAssistant } from './components/AIAssistant';
import { DynamicBackground } from './components/DynamicBackground';

function RouteWrapper() {
  const location = useLocation();
  
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/dashboard/login' || location.pathname === '/admin/login';
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');
  const isCommunityRoute = location.pathname.startsWith('/community');

  if (isLoginRoute) {
    return (
      // @ts-ignore
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard/login" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    );
  }

  if (isAdminRoute) {
    return (
      // @ts-ignore
      <Routes location={location} key={location.pathname}>
        {/* Core 5 Dashboard Navigation Tabs */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/dashboard/about" element={<AdminAbout />} />

        <Route path="/admin/vision" element={<AdminVisionManifesto />} />
        <Route path="/dashboard/vision" element={<AdminVisionManifesto />} />

        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/dashboard/events" element={<AdminEvents />} />

        <Route path="/admin/membership" element={<AdminMembership />} />
        <Route path="/dashboard/membership" element={<AdminMembership />} />

        {/* Additional Admin Tools */}
        <Route path="/admin/volunteers" element={<AdminMembership />} />
        <Route path="/dashboard/volunteers" element={<AdminMembership />} />

        <Route path="/admin/content" element={<AdminContent />} />
        <Route path="/dashboard/content" element={<AdminContent />} />

        <Route path="/admin/media" element={<AdminMedia />} />
        <Route path="/dashboard/media" element={<AdminMedia />} />

        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/dashboard/messages" element={<AdminMessages />} />

        <Route path="/admin/ai" element={<AdminAIHub />} />
        <Route path="/dashboard/ai" element={<AdminAIHub />} />

        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/dashboard/settings" element={<AdminSettings />} />

        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
      </Routes>
    );
  }
  
  if (isCommunityRoute) {
    return (
      // @ts-ignore
      <Routes location={location} key={location.pathname}>
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/community/ideas" element={<CommunityIdeas />} />
        <Route path="/community/issues" element={<CommunityIssues />} />
        <Route path="/community/impact" element={<CommunityImpact />} />
        <Route path="/community/townhall" element={<CommunityTownhall />} />
        <Route path="/community/initiatives" element={<CommunityInitiatives />} />
        <Route path="/community/events" element={<CommunityEvents />} />
        <Route path="/community/resources" element={<CommunityResources />} />
        <Route path="/community/badges" element={<CommunityBadges />} />
        <Route path="/community/*" element={<CommunityDashboard />} />
      </Routes>
    );
  }
  
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        {/* @ts-ignore */}
        <Routes location={location} key={location.pathname}>
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
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/join" element={<MembershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/ux-bible" element={<UXBiblePage />} />
          <Route path="/prd" element={<PRDPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <AIAssistant />
    </>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('hasSeenIntro') === 'true';
    } catch {
      return false;
    }
  });

  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen font-body text-brand-neutral-charcoal selection:bg-brand-primary/20 selection:text-brand-primary flex flex-col">
          <DynamicBackground />
          
          {!introComplete && (
            <IntroSequence onComplete={() => setIntroComplete(true)} />
          )}

          {introComplete && (
            <RouteWrapper />
          )}
        </div>
      </SmoothScroll>
    </Router>
  );
}
