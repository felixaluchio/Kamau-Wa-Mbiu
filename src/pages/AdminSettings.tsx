import React, { useState, useEffect, useRef } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings as SettingsIcon, Globe, Shield, Bell, Key, Palette, Save, Upload, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { uploadToImgBB } from '../lib/uploadImage';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('branding');

  // Background states for isolated sections
  const [heroBg, setHeroBg] = useState('');
  const [timelineBg, setTimelineBg] = useState('');
  const [ctaBg, setCtaBg] = useState('');
  const [quoteBg, setQuoteBg] = useState('');

  const [uploadingSection, setUploadingSection] = useState<string | null>(null);

  // Subscribe to all isolated Firestore documents
  useEffect(() => {
    const unsubHero = onSnapshot(doc(db, 'settings', 'hero'), (snap) => {
      if (snap.exists() && snap.data()?.bgUrl) setHeroBg(snap.data().bgUrl);
    });
    const unsubTimeline = onSnapshot(doc(db, 'settings', 'timelineBackground'), (snap) => {
      if (snap.exists() && snap.data()?.bgUrl) setTimelineBg(snap.data().bgUrl);
    });
    const unsubCta = onSnapshot(doc(db, 'settings', 'ctaBackground'), (snap) => {
      if (snap.exists() && snap.data()?.bgUrl) setCtaBg(snap.data().bgUrl);
    });
    const unsubQuote = onSnapshot(doc(db, 'settings', 'quoteSection'), (snap) => {
      if (snap.exists() && snap.data()?.bgUrl) setQuoteBg(snap.data().bgUrl);
    });

    return () => {
      unsubHero();
      unsubTimeline();
      unsubCta();
      unsubQuote();
    };
  }, []);

  const handleFileUpload = async (sectionKey: string, file: File) => {
    setUploadingSection(sectionKey);
    try {
      const url = await uploadToImgBB(file);
      await setDoc(doc(db, 'settings', sectionKey), { bgUrl: url }, { merge: true });
      if (sectionKey === 'hero') setHeroBg(url);
      if (sectionKey === 'timelineBackground') setTimelineBg(url);
      if (sectionKey === 'ctaBackground') setCtaBg(url);
      if (sectionKey === 'quoteSection') setQuoteBg(url);
    } catch (err) {
      console.error(`Failed to upload image for ${sectionKey}:`, err);
      alert(`Upload failed for ${sectionKey}. Please try again.`);
    } finally {
      setUploadingSection(null);
    }
  };

  const tabs = [
    { id: 'branding', label: 'Branding & Backgrounds', icon: <Palette size={18} /> },
    { id: 'general', label: 'General', icon: <SettingsIcon size={18} /> },
    { id: 'seo', label: 'SEO & Social', icon: <Globe size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'apikeys', label: 'API Keys', icon: <Key size={18} /> },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
              <SettingsIcon className="text-brand-primary" />
              Platform Settings
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 mt-1">Configure global preferences, branding, and background image assets.</p>
          </div>
          <Button size="sm" leftIcon={<Save size={16} />}>Save Changes</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 shrink-0">
            <Card className="bg-white border border-brand-neutral-grey/30 overflow-hidden">
              <nav className="flex flex-col p-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-brand-primary/10 text-brand-primary font-bold'
                        : 'text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm hover:text-brand-primary'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'branding' && (
                <motion.div
                  key="branding"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-brand-neutral-grey/30">
                    <h2 className="font-heading text-xl text-brand-neutral-charcoal mb-2">Section Background Images</h2>
                    <p className="text-xs text-brand-neutral-charcoal/60 mb-6">Each section connects to an isolated Firestore document to guarantee independent updates.</p>

                    <div className="space-y-6">
                      {/* 1. Hero Section */}
                      <div className="p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-sm text-brand-neutral-charcoal">1. Hero Section Background</p>
                          <p className="text-xs text-brand-neutral-charcoal/60 mt-0.5">Document: <code className="text-brand-primary font-mono">settings/hero</code></p>
                          {heroBg && <p className="text-[11px] text-emerald-600 mt-1 truncate max-w-xs sm:max-w-md">Active: {heroBg}</p>}
                        </div>
                        <label className="shrink-0 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload('hero', f);
                            }}
                          />
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary/90 transition-all shadow-sm">
                            {uploadingSection === 'hero' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploadingSection === 'hero' ? 'Uploading...' : 'Upload Image'}
                          </span>
                        </label>
                      </div>

                      {/* 2. Timeline Section */}
                      <div className="p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-sm text-brand-neutral-charcoal">2. Timeline ("A Legacy of Service")</p>
                          <p className="text-xs text-brand-neutral-charcoal/60 mt-0.5">Document: <code className="text-brand-primary font-mono">settings/timelineBackground</code></p>
                          {timelineBg && <p className="text-[11px] text-emerald-600 mt-1 truncate max-w-xs sm:max-w-md">Active: {timelineBg}</p>}
                        </div>
                        <label className="shrink-0 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload('timelineBackground', f);
                            }}
                          />
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary/90 transition-all shadow-sm">
                            {uploadingSection === 'timelineBackground' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploadingSection === 'timelineBackground' ? 'Uploading...' : 'Upload Image'}
                          </span>
                        </label>
                      </div>

                      {/* 3. CTA Section */}
                      <div className="p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-sm text-brand-neutral-charcoal">3. CTA Section ("Join the Movement")</p>
                          <p className="text-xs text-brand-neutral-charcoal/60 mt-0.5">Document: <code className="text-brand-primary font-mono">settings/ctaBackground</code></p>
                          {ctaBg && <p className="text-[11px] text-emerald-600 mt-1 truncate max-w-xs sm:max-w-md">Active: {ctaBg}</p>}
                        </div>
                        <label className="shrink-0 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload('ctaBackground', f);
                            }}
                          />
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary/90 transition-all shadow-sm">
                            {uploadingSection === 'ctaBackground' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploadingSection === 'ctaBackground' ? 'Uploading...' : 'Upload Image'}
                          </span>
                        </label>
                      </div>

                      {/* 4. Quote Section */}
                      <div className="p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-sm text-brand-neutral-charcoal">4. Quote Section ("Servant Leadership")</p>
                          <p className="text-xs text-brand-neutral-charcoal/60 mt-0.5">Document: <code className="text-brand-primary font-mono">settings/quoteSection</code></p>
                          {quoteBg && <p className="text-[11px] text-emerald-600 mt-1 truncate max-w-xs sm:max-w-md">Active: {quoteBg}</p>}
                        </div>
                        <label className="shrink-0 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleFileUpload('quoteSection', f);
                            }}
                          />
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:bg-brand-primary/90 transition-all shadow-sm">
                            {uploadingSection === 'quoteSection' ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {uploadingSection === 'quoteSection' ? 'Uploading...' : 'Upload Image'}
                          </span>
                        </label>
                      </div>

                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-brand-neutral-grey/30">
                    <h2 className="font-heading text-xl text-brand-neutral-charcoal mb-6">Site Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-2">Platform Name</label>
                        <input type="text" defaultValue="Kamau Wa Mbiu Digital Platform" className="w-full max-w-md px-4 py-2 bg-brand-neutral-warm border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary" />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-2">Contact Email</label>
                        <input type="email" defaultValue="info@kamauwambiu.com" className="w-full max-w-md px-4 py-2 bg-brand-neutral-warm border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary" />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-2">Timezone</label>
                        <select className="w-full max-w-md px-4 py-2 bg-brand-neutral-warm border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary cursor-pointer">
                          <option>Africa/Nairobi (EAT)</option>
                          <option>UTC</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
              
              {activeTab !== 'general' && activeTab !== 'branding' && (
                <motion.div
                  key="other"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-64 flex items-center justify-center border-2 border-dashed border-brand-neutral-grey/30 rounded-2xl"
                >
                  <p className="font-body text-brand-neutral-charcoal/50 font-medium">Settings panel in development.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
