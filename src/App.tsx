import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
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
import { AdminLogin } from './components/admin/AdminLogin';
import { DarkAdminEventsDashboard } from './components/admin/DarkAdminUpcomingEvents';

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

// Protected Route Component for Admin Dashboard
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem('adminAuth') === 'true' ||
        localStorage.getItem('adminToken') === 'active' ||
        localStorage.getItem('isAdminAuthenticated') === 'true' ||
        Boolean(auth?.currentUser)
      );
    } catch {
      return false;
    }
  });
  const [authChecking, setAuthChecking] = useState<boolean>(!isAuthenticated);

  useEffect(() => {
    if (!auth) {
      setAuthChecking(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        const hasSession =
          sessionStorage.getItem('adminAuth') === 'true' ||
          localStorage.getItem('adminToken') === 'active' ||
          localStorage.getItem('isAdminAuthenticated') === 'true';
        setIsAuthenticated(hasSession);
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00B87C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

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
        {/* Core 5 Dashboard Navigation Tabs - Authenticated */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
        <Route path="/dashboard/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />

        <Route path="/admin/vision" element={<ProtectedRoute><AdminVisionManifesto /></ProtectedRoute>} />
        <Route path="/dashboard/vision" element={<ProtectedRoute><AdminVisionManifesto /></ProtectedRoute>} />

        <Route path="/admin/events" element={<ProtectedRoute><DarkAdminEventsDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/events" element={<ProtectedRoute><DarkAdminEventsDashboard /></ProtectedRoute>} />

        <Route path="/admin/membership" element={<ProtectedRoute><AdminMembership /></ProtectedRoute>} />
        <Route path="/dashboard/membership" element={<ProtectedRoute><AdminMembership /></ProtectedRoute>} />

        {/* Additional Admin Tools - Authenticated */}
        <Route path="/admin/volunteers" element={<ProtectedRoute><AdminVolunteers /></ProtectedRoute>} />
        <Route path="/dashboard/volunteers" element={<ProtectedRoute><AdminVolunteers /></ProtectedRoute>} />

        <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
        <Route path="/dashboard/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />

        <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
        <Route path="/dashboard/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />

        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />

        <Route path="/admin/ai" element={<ProtectedRoute><AdminAIHub /></ProtectedRoute>} />
        <Route path="/dashboard/ai" element={<ProtectedRoute><AdminAIHub /></ProtectedRoute>} />

        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
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
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path.startsWith('/admin') || path.startsWith('/dashboard') || path === '/login') {
          return true;
        }
        return sessionStorage.getItem('hasSeenIntro') === 'true';
      }
      return false;
    } catch {
      return true;
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
