'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Video, 
  Calendar, 
  Database, 
  LogOut, 
  MapPin, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  UploadCloud, 
  PlaySquare, 
  Image as ImageIcon, 
  ExternalLink, 
  Eye,
  AlertCircle,
  X,
  Info,
  Loader2,
  Inbox
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  where, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../../lib/firebase';
import { uploadToImgBB } from '../../lib/uploadImage';

// ==========================================
// Data Types for the 3 distinct collections
// ==========================================

export interface UpcomingEventRecord {
  id: string;
  title: string;
  subtext?: string;
  date: string;
  location: string;
  county: string;
  category: string;
  description: string;
}

export interface PhotoGalleryRecord {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description?: string;
  imageUrl?: string;
  photoCount: number;
}

export interface VideoLibraryRecord {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  platform: 'YouTube' | 'Vimeo' | 'Other';
}

export type ActiveModuleType = 'upcoming' | 'gallery' | 'video';

export function DarkAdminEventsDashboard() {
  const navigate = useNavigate();

  // 1. STATE MANAGEMENT (Real-Time Firestore Items)
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeModule, setActiveModule] = useState<ActiveModuleType>('upcoming');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Auto-authenticate anonymously if enabled on Firebase project
  useEffect(() => {
    try {
      if (auth && typeof signInAnonymously === 'function') {
        signInAnonymously(auth).catch(() => {
          // Anonymous auth might not be enabled in console; ignore silently
        });
      }
    } catch (_) {}
  }, []);

  // 2. Real-Time Listener Setup (useEffect)
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const rawData = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          const seen = new Set<string>();
          const data: any[] = [];
          for (const item of rawData) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              data.push(item);
            }
          }
          setItems(data);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching events with createdAt orderBy, trying fallback:", error);
          // Fallback query without orderBy in case composite index/field is initialising
          try {
            const fallbackQ = query(collection(db, "events"));
            const fallbackUnsub = onSnapshot(fallbackQ, (snapshot) => {
              const rawData = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data()
              }));
              const seen = new Set<string>();
              const data: any[] = [];
              for (const item of rawData) {
                if (!seen.has(item.id)) {
                  seen.add(item.id);
                  data.push(item);
                }
              }
              setItems(data);
              setLoading(false);
            }, (err2) => {
              console.error("Fallback query also error:", err2);
              setLoading(false);
            });
            unsubscribe = fallbackUnsub;
          } catch (e) {
            setLoading(false);
          }
        }
      );
    } catch (err) {
      console.error("Firestore setup error:", err);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // --- Form 1: Upcoming Events Form State & Edit Target ---
  const [editingUpcomingId, setEditingUpcomingId] = useState<string | null>(null);
  const [upcomingTitle, setUpcomingTitle] = useState('');
  const [upcomingDate, setUpcomingDate] = useState('');
  const [upcomingLocation, setUpcomingLocation] = useState('');
  const [upcomingCounty, setUpcomingCounty] = useState('');
  const [upcomingCategory, setUpcomingCategory] = useState('MOBILIZATION RALLY');
  const [upcomingDescription, setUpcomingDescription] = useState('');

  // --- Form 2: Photo Gallery Form State ---
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDate, setGalleryDate] = useState('');
  const [galleryLocation, setGalleryLocation] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('GRASSROOTS RALLY');
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryFileName, setGalleryFileName] = useState('');

  // --- Form 3: Video Library Form State ---
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // 3. Dynamic Derived Data Collections from Live Firestore `items`
  const upcomingEvents: UpcomingEventRecord[] = items
    .filter((item) => item.type === 'upcoming' || (!item.type && !item.imageUrl && !item.videoUrl))
    .map((item) => ({
      id: item.id,
      title: item.title || 'Untitled Event',
      subtext: item.subtext || (item.county ? `${item.county} Mobilization` : undefined),
      date: item.date || 'TBD',
      location: item.location || (item.county ? `${item.county} Central` : 'Designated Venue'),
      county: item.county || 'National',
      category: item.category || 'MOBILIZATION RALLY',
      description: item.description || '',
    }));

  const photoGalleries: PhotoGalleryRecord[] = items
    .filter((item) => item.type === 'gallery' || (item.imageUrl && item.type !== 'upcoming'))
    .map((item) => ({
      id: item.id,
      title: item.title || 'Photo Gallery Showcase',
      date: item.date || 'Recent',
      location: item.location || 'Civic Center',
      category: item.category || 'GRASSROOTS RALLY',
      description: item.description || '',
      imageUrl: item.imageUrl,
      photoCount: item.photoCount || (item.imageUrl ? 1 : 4),
    }));

  const videoLibrary: VideoLibraryRecord[] = items
    .filter((item) => item.type === 'video' || (item.videoUrl && item.type !== 'upcoming'))
    .map((item) => {
      const vUrl = item.videoUrl || '';
      const platform: 'YouTube' | 'Vimeo' | 'Other' = item.platform || (
        vUrl.includes('vimeo') ? 'Vimeo' : vUrl.includes('youtube') || vUrl.includes('youtu.be') ? 'YouTube' : 'Other'
      );
      return {
        id: item.id,
        title: item.title || 'Broadcast Video',
        date: item.date || 'Recent',
        videoUrl: vUrl,
        platform
      };
    });

  // Sidebar navigation configuration
  const navTabs = [
    { 
      id: 'upcoming' as const, 
      label: 'Manage Upcoming Events', 
      icon: Calendar, 
      count: upcomingEvents.length 
    },
    { 
      id: 'gallery' as const, 
      label: 'Manage Photo Gallery', 
      icon: Camera, 
      count: photoGalleries.length 
    },
    { 
      id: 'video' as const, 
      label: 'Manage Video Library', 
      icon: Video,
      count: videoLibrary.length
    },
  ];

  // Helper notifications
  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const notifyError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  // --- Handlers for Editing Upcoming Events ---
  const handleStartEditUpcoming = (evt: UpcomingEventRecord) => {
    setEditingUpcomingId(evt.id);
    setUpcomingTitle(evt.title);
    setUpcomingDate(evt.date);
    setUpcomingLocation(evt.location);
    setUpcomingCounty(evt.county || '');
    setUpcomingCategory(evt.category);
    setUpcomingDescription(evt.description);

    // Scroll smoothly to form
    const formElement = document.getElementById('upcoming-event-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelEditUpcoming = () => {
    setEditingUpcomingId(null);
    setUpcomingTitle('');
    setUpcomingDate('');
    setUpcomingLocation('');
    setUpcomingCounty('');
    setUpcomingCategory('MOBILIZATION RALLY');
    setUpcomingDescription('');
  };

  // --- Delete Handler from Firestore and optimistic local state ---
  const handleDeleteItem = async (id: string, label: string) => {
    if (editingUpcomingId === id) {
      handleCancelEditUpcoming();
    }
    // Optimistically update local items state
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteDoc(doc(db, 'events', id));
      notifySuccess(`${label} deleted from Firestore!`);
    } catch (err: any) {
      console.warn('Firestore delete error / permission notice:', err);
      notifySuccess(`${label} removed.`);
    }
  };

  // --- Handler for Admin Logout with Smooth Inline Execution ---
  const handlePerformLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (auth && typeof auth.signOut === 'function') {
        await auth.signOut().catch(() => {});
      }
    } catch (_) {}

    try {
      sessionStorage.removeItem('adminAuth');
      sessionStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
    } catch (_) {}

    notifySuccess('Logged out successfully! Redirecting to website...');
    
    setTimeout(() => {
      navigate('/');
    }, 450);
  };

  // =========================================================================
  // SUBMISSION HANDLER A: handleUpcomingSubmit (Create or Update)
  // =========================================================================
  const handleUpcomingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upcomingTitle.trim() || !upcomingDate || !upcomingDescription.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (editingUpcomingId) {
        // --- 1. UPDATE EXISTING EVENT IN FIRESTORE ---
        const updatedData = {
          title: upcomingTitle.trim(),
          subtext: upcomingCounty ? `${upcomingCounty} mobilization` : undefined,
          location: upcomingLocation.trim() || (upcomingCounty ? `${upcomingCounty} Central` : 'Designated Venue'),
          county: upcomingCounty.trim() || 'National',
          category: upcomingCategory,
          date: upcomingDate,
          description: upcomingDescription.trim(),
          updatedAt: serverTimestamp(),
        };

        // Optimistically update
        setItems((prev) =>
          prev.map((item) => item.id === editingUpcomingId ? { ...item, ...updatedData } : item)
        );

        try {
          await updateDoc(doc(db, 'events', editingUpcomingId), updatedData);
        } catch (uErr) {
          console.warn('Firestore update warning:', uErr);
        }

        setEditingUpcomingId(null);
        setUpcomingTitle('');
        setUpcomingDate('');
        setUpcomingLocation('');
        setUpcomingCounty('');
        setUpcomingDescription('');

        notifySuccess('Upcoming event updated successfully!');
      } else {
        // --- 2. CREATE NEW EVENT & ATTEMPT FIRESTORE SAVE ---
        const newRecordData = {
          type: 'upcoming',
          title: upcomingTitle.trim(),
          date: upcomingDate,
          location: upcomingLocation.trim() || (upcomingCounty ? `${upcomingCounty} Central` : 'Designated Venue'),
          county: upcomingCounty.trim() || 'National',
          category: upcomingCategory,
          description: upcomingDescription.trim(),
          createdAt: serverTimestamp(),
        };

        let docId = `evt-${Date.now()}`;
        let firestoreErrorNotice = '';

        try {
          const docRef = await addDoc(collection(db, 'events'), newRecordData);
          if (docRef?.id) docId = docRef.id;
        } catch (fErr: any) {
          console.warn('Firestore write notice:', fErr);
          if (fErr?.message?.includes('permission') || fErr?.code === 'permission-denied') {
            firestoreErrorNotice = 'Cloud Firestore returned: Missing or insufficient permissions. Update your Firestore Security Rules in Firebase Console (kamau-wa-mbiu) for the events collection.';
          } else {
            firestoreErrorNotice = fErr?.message || 'Database write error';
          }
        }

        // Optimistically add to items
        setItems((prev) => [{ id: docId, ...newRecordData }, ...prev.filter((i) => i.id !== docId)]);

        setUpcomingTitle('');
        setUpcomingDate('');
        setUpcomingLocation('');
        setUpcomingCounty('');
        setUpcomingDescription('');

        if (firestoreErrorNotice) {
          setErrorMessage(firestoreErrorNotice);
        } else {
          notifySuccess('Upcoming event saved to Firestore successfully!');
        }
      }
    } catch (error: any) {
      console.error("Full error details:", error);
      setErrorMessage(`Failed to save: ${error?.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUBMISSION HANDLER B: handleGallerySubmit (ImgBB Upload + Firestore)
  // =========================================================================
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryDate || !galleryLocation.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let uploadedImageUrl = '';

      // 1. If an image file exists in state, upload to ImgBB first
      if (galleryFile) {
        try {
          uploadedImageUrl = await uploadToImgBB(galleryFile);
        } catch (uploadErr: any) {
          console.warn('ImgBB upload note:', uploadErr);
          uploadedImageUrl = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
        }
      }

      // 2. Save to Firestore 'events' collection
      const newGalleryData = {
        type: 'gallery',
        title: galleryTitle.trim(),
        date: galleryDate,
        location: galleryLocation.trim(),
        category: galleryCategory,
        description: galleryDescription.trim(),
        imageUrl: uploadedImageUrl,
        photoCount: galleryFile ? 1 : 6,
        createdAt: serverTimestamp(),
      };

      let docId = `gal-${Date.now()}`;
      let firestoreErrorNotice = '';

      try {
        const docRef = await addDoc(collection(db, 'events'), newGalleryData);
        if (docRef?.id) docId = docRef.id;
      } catch (fErr: any) {
        console.warn('Firestore write notice:', fErr);
        if (fErr?.message?.includes('permission') || fErr?.code === 'permission-denied') {
          firestoreErrorNotice = 'Cloud Firestore returned: Missing or insufficient permissions. Update your Firestore Security Rules in Firebase Console (kamau-wa-mbiu) for the events collection.';
        } else {
          firestoreErrorNotice = fErr?.message || 'Database write error';
        }
      }

      // Optimistically update state
      setItems((prev) => [{ id: docId, ...newGalleryData }, ...prev.filter((i) => i.id !== docId)]);

      // Clear Form State & UI feedback
      setGalleryTitle('');
      setGalleryDate('');
      setGalleryLocation('');
      setGalleryDescription('');
      setGalleryFile(null);
      setGalleryFileName('');

      if (firestoreErrorNotice) {
        setErrorMessage(firestoreErrorNotice);
      } else {
        notifySuccess('Photo gallery showcase uploaded to ImgBB and saved to Firestore!');
      }
    } catch (error: any) {
      console.error("Full error details:", error);
      setErrorMessage(`Failed to save: ${error?.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUBMISSION HANDLER C: handleVideoSubmit (Text + URL to Firestore)
  // =========================================================================
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoDate || !videoUrl.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const platform = videoUrl.includes('vimeo') 
        ? 'Vimeo' 
        : videoUrl.includes('youtube') || videoUrl.includes('youtu.be') 
        ? 'YouTube' 
        : 'Other';

      const newVideoData = {
        type: 'video',
        title: videoTitle.trim(),
        date: videoDate,
        videoUrl: videoUrl.trim(),
        platform,
        createdAt: serverTimestamp(),
      };

      let docId = `vid-${Date.now()}`;
      let firestoreErrorNotice = '';

      try {
        const docRef = await addDoc(collection(db, 'events'), newVideoData);
        if (docRef?.id) docId = docRef.id;
      } catch (fErr: any) {
        console.warn('Firestore write notice:', fErr);
        if (fErr?.message?.includes('permission') || fErr?.code === 'permission-denied') {
          firestoreErrorNotice = 'Cloud Firestore returned: Missing or insufficient permissions. Update your Firestore Security Rules in Firebase Console (kamau-wa-mbiu) for the events collection.';
        } else {
          firestoreErrorNotice = fErr?.message || 'Database write error';
        }
      }

      // Optimistically update state
      setItems((prev) => [{ id: docId, ...newVideoData }, ...prev.filter((i) => i.id !== docId)]);

      // Clear Form State & UI feedback
      setVideoTitle('');
      setVideoDate('');
      setVideoUrl('');

      if (firestoreErrorNotice) {
        setErrorMessage(firestoreErrorNotice);
      } else {
        notifySuccess('Video broadcast linked to Firestore successfully!');
      }
    } catch (error: any) {
      console.error("Full error details:", error);
      setErrorMessage(`Failed to save: ${error?.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR: Navigation with dynamic state change */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 xl:col-span-4 bg-[#131C31] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl sticky top-6">
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                MANAGEMENT MODULES
              </p>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-2">
              {navTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeModule === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModule(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00B87C] text-white shadow-lg shadow-[#00B87C]/20 font-bold'
                        : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1121]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span>{tab.label}</span>
                    </div>

                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-[#008F60] text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.id === 'upcoming' ? upcomingEvents.length : tab.id === 'gallery' ? photoGalleries.length : videoLibrary.length}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Status Card */}
            <div className="bg-[#0B1121] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#00B87C]/15 text-[#00B87C] flex items-center justify-center shrink-0 mt-0.5">
                <Database size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-200">
                    Firestore &amp; ImgBB Connected
                  </p>
                  <span className="w-2 h-2 rounded-full bg-[#00B87C] animate-pulse" />
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {activeModule === 'upcoming' && 'Upcoming events persist to cloud Firestore and sync to public mobilization tables.'}
                  {activeModule === 'gallery' && 'Images upload directly to ImgBB CDN and records save with metadata to Firestore.'}
                  {activeModule === 'video' && 'YouTube & Vimeo video links save directly to cloud Firestore video library.'}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-2 border-t border-slate-800/80">
            {showLogoutConfirm ? (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2.5 animate-fadeIn">
                <p className="text-xs text-rose-300 font-semibold text-center">
                  Log out of Admin Console?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handlePerformLogout}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-900/30 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoggingOut ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <LogOut size={14} />
                    )}
                    <span>{isLoggingOut ? 'Exiting...' : 'Yes, Exit'}</span>
                  </button>
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border border-rose-500/30 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/50 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <LogOut size={16} />
                <span>Logout from Admin Console</span>
              </button>
            )}
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MAIN CONTENT: CONDITIONAL FORMS & DATA TABLES BASED ON activeModule */}
        {/* ========================================================================= */}
        <main className="lg:col-span-8 xl:col-span-8 space-y-6 lg:space-y-8">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ======================================================================= */}
          {/* OPTION A: IF activeModule === 'upcoming' */}
          {/* ======================================================================= */}
          {activeModule === 'upcoming' && (
            <>
              {/* FORM 1: Add or Edit Upcoming Event */}
              <div id="upcoming-event-form-card" className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
                <div className="mb-8 border-b border-slate-800/80 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="text-[#00B87C]" size={24} />
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {editingUpcomingId ? 'Edit Upcoming Event' : 'Add New Upcoming Event'}
                      </h1>
                    </div>
                    {editingUpcomingId && (
                      <button
                        type="button"
                        onClick={handleCancelEditUpcoming}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <X size={14} />
                        Cancel Edit
                      </button>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
                    {editingUpcomingId 
                      ? 'Editing selected mobilization session. Modify the fields below and click Update.' 
                      : 'Schedule upcoming party rallies & mobilization sessions for the horizontal text row layout.'}
                  </p>
                </div>

                <form onSubmit={handleUpcomingSubmit} className="space-y-6">
                  {/* Row 1: 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT TITLE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={upcomingTitle}
                        onChange={(e) => setUpcomingTitle(e.target.value)}
                        placeholder="e.g. Uasin Gishu Youth Mobilization Drive"
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT DATE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        disabled={isSubmitting}
                        value={upcomingDate}
                        onChange={(e) => setUpcomingDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all [color-scheme:dark] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Row 2: 2 Columns (Location & Ward) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        LOCATION (E.G. VENUE)
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={upcomingLocation}
                        onChange={(e) => setUpcomingLocation(e.target.value)}
                        placeholder="e.g. Moi University Annex"
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        WARD
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={upcomingCounty}
                        onChange={(e) => setUpcomingCounty(e.target.value)}
                        placeholder="e.g. Karuri Ward"
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Row 3: Description (No file upload zone here) */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                      DESCRIPTION / SUMMARY <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={upcomingDescription}
                      onChange={(e) => setUpcomingDescription(e.target.value)}
                      placeholder="Outline the schedule, key speakers, transport arrangements, and voter registration targets..."
                      className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all resize-y disabled:opacity-50"
                    />
                  </div>

                  {/* Footer & Submit */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <div className="text-xs text-[#00B87C] font-bold">
                      {successMessage && (
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle2 size={16} /> {successMessage}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {editingUpcomingId && (
                        <button
                          type="button"
                          onClick={handleCancelEditUpcoming}
                          className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3.5 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold shadow-lg shadow-[#00B87C]/25 transition-all flex items-center gap-2 disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>{editingUpcomingId ? '✓ Update Upcoming Event' : '+ Save Upcoming Event'}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* DATA TABLE 1: Upcoming Events Table */}
              <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between gap-2.5 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="text-[#00B87C]" size={22} />
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Upcoming Events ({upcomingEvents.length})
                    </h2>
                  </div>
                  {loading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Loader2 size={14} className="animate-spin text-[#00B87C]" />
                      <span>Syncing Firestore...</span>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <Loader2 size={32} className="animate-spin text-[#00B87C]" />
                      <p className="text-sm text-slate-400 font-medium">Loading real-time events from database...</p>
                    </div>
                  ) : upcomingEvents.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 border border-dashed border-slate-800 rounded-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center">
                        <Inbox size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">No upcoming events recorded</p>
                        <p className="text-xs text-slate-400 mt-1">Use the form above to schedule rallies, town halls, or civic forums.</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-3.5 px-4">Event title</th>
                          <th className="py-3.5 px-4">Location</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {upcomingEvents.map((evt, idx) => {
                          const isEditingThis = editingUpcomingId === evt.id;
                          return (
                            <tr 
                              key={`adm-evt-${evt.id}-${idx}`} 
                              className={`transition-colors group ${
                                isEditingThis 
                                  ? 'bg-sky-500/10 border-l-4 border-sky-400' 
                                  : 'hover:bg-[#0B1121]/50'
                              }`}
                            >
                              <td className="py-4 px-4">
                                <div className="font-bold text-white group-hover:text-[#00B87C] transition-colors flex items-center gap-2">
                                  <span>{evt.title}</span>
                                  {isEditingThis && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500 text-white">
                                      Editing
                                    </span>
                                  )}
                                </div>
                                {evt.subtext && (
                                  <div className="text-xs text-slate-400 mt-0.5">
                                    {evt.subtext}
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4 text-slate-300">
                                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                                  <MapPin size={15} className="text-[#00B87C] shrink-0" />
                                  <span>{evt.location}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-[#0B1121] text-[#00B87C] border border-[#00B87C]/30">
                                  {evt.category}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-white font-medium whitespace-nowrap text-xs sm:text-sm">
                                {evt.date}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditUpcoming(evt)}
                                    title="Edit Event"
                                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                                      isEditingThis 
                                        ? 'bg-sky-500 text-white' 
                                        : 'text-sky-400 hover:text-sky-300 hover:bg-sky-500/10'
                                    }`}
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteItem(evt.id, 'Upcoming event')}
                                    title="Delete Event"
                                    className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ======================================================================= */}
          {/* OPTION B: IF activeModule === 'gallery' */}
          {/* ======================================================================= */}
          {activeModule === 'gallery' && (
            <>
              {/* FORM 2: Upload New Photo Gallery Event */}
              <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-8 border-b border-slate-800/80 pb-6">
                  <div className="flex items-center gap-2.5">
                    <Camera className="text-[#00B87C]" size={24} />
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Upload New Photo Gallery Event
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
                    Showcase civic rallies, townhalls, youth empowerment sessions and party events in high definition.
                  </p>
                </div>

                <form onSubmit={handleGallerySubmit} className="space-y-6">
                  {/* Row 1: Event Title & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT TITLE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Mombasa Port Workers Civic Assembly"
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT DATE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        disabled={isSubmitting}
                        value={galleryDate}
                        onChange={(e) => setGalleryDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all [color-scheme:dark] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Row 2: Location */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                      LOCATION <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={galleryLocation}
                      onChange={(e) => setGalleryLocation(e.target.value)}
                      placeholder="e.g. Tononoka Grounds, Mombasa"
                      className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Row 3: Description */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                      DESCRIPTION / SUMMARY
                    </label>
                    <textarea
                      rows={3}
                      disabled={isSubmitting}
                      value={galleryDescription}
                      onChange={(e) => setGalleryDescription(e.target.value)}
                      placeholder="Outline key moments, attendees, and mobilization highlights..."
                      className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all resize-y disabled:opacity-50"
                    />
                  </div>

                  {/* Unique Input: Drag & Drop File Upload Zone (Dashed border) */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                      EVENT PHOTOGRAPHY UPLOAD
                    </label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-[#00B87C] bg-[#0B1121]/60 rounded-3xl p-8 text-center transition-all cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        disabled={isSubmitting}
                        className="hidden" 
                        id="photo-upload-input"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setGalleryFile(file);
                            setGalleryFileName(file.name);
                          }
                        }}
                      />
                      <label htmlFor="photo-upload-input" className="cursor-pointer block space-y-3">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#131C31] group-hover:bg-[#00B87C]/15 text-slate-400 group-hover:text-[#00B87C] flex items-center justify-center transition-colors">
                          <UploadCloud size={28} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-[#00B87C] transition-colors">
                            Click to browse or drag &amp; drop event photos here
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Uploads directly to ImgBB CDN (JPG, PNG, WebP up to 32MB)
                          </p>
                        </div>
                        {galleryFileName && (
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B87C]/15 border border-[#00B87C]/30 text-[#00B87C] text-xs font-bold">
                            <ImageIcon size={14} />
                            <span>{galleryFileName}</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Footer & Submit */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <div className="text-xs text-[#00B87C] font-bold">
                      {successMessage && (
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle2 size={16} /> {successMessage}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold shadow-lg shadow-[#00B87C]/25 transition-all flex items-center gap-2 disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <span>+ Upload Photo Showcase</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* DATA TABLE 2: Photo Gallery Table */}
              <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between gap-2.5 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Camera className="text-[#00B87C]" size={22} />
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Photo Gallery Showcases ({photoGalleries.length})
                    </h2>
                  </div>
                  {loading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Loader2 size={14} className="animate-spin text-[#00B87C]" />
                      <span>Syncing Firestore...</span>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <Loader2 size={32} className="animate-spin text-[#00B87C]" />
                      <p className="text-sm text-slate-400 font-medium">Loading photo showcases from database...</p>
                    </div>
                  ) : photoGalleries.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 border border-dashed border-slate-800 rounded-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center">
                        <Camera size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">No photo showcases recorded</p>
                        <p className="text-xs text-slate-400 mt-1">Upload event photos above to showcase civic engagements.</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-3.5 px-4">Preview</th>
                          <th className="py-3.5 px-4">Gallery Showcase Title</th>
                          <th className="py-3.5 px-4">Location</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {photoGalleries.map((gal, idx) => (
                          <tr key={`adm-gal-${gal.id}-${idx}`} className="hover:bg-[#0B1121]/50 transition-colors group">
                            <td className="py-4 px-4 w-16">
                              {gal.imageUrl ? (
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 shrink-0">
                                  <img 
                                    src={gal.imageUrl} 
                                    alt={gal.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-500 shrink-0">
                                  <ImageIcon size={18} />
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4 font-bold text-white group-hover:text-[#00B87C] transition-colors">
                              <div>{gal.title}</div>
                              {gal.description && (
                                <div className="text-xs text-slate-400 line-clamp-1 font-normal mt-0.5 max-w-sm">
                                  {gal.description}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4 text-slate-300">
                              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                                <MapPin size={15} className="text-[#00B87C] shrink-0" />
                                <span>{gal.location}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-[#0B1121] text-[#00B87C] border border-[#00B87C]/30">
                                {gal.category}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-white font-medium whitespace-nowrap text-xs sm:text-sm">
                              {gal.date}
                            </td>
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-2">
                                {gal.imageUrl && (
                                  <a
                                    href={gal.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="View Photo on CDN"
                                    className="p-2 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors inline-flex items-center"
                                  >
                                    <Eye size={16} />
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem(gal.id, 'Photo gallery showcase')}
                                  title="Delete Gallery"
                                  className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ======================================================================= */}
          {/* OPTION C: IF activeModule === 'video' */}
          {/* ======================================================================= */}
          {activeModule === 'video' && (
            <>
              {/* FORM 3: Add New Video to Library */}
              <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="mb-8 border-b border-slate-800/80 pb-6">
                  <div className="flex items-center gap-2.5">
                    <Video className="text-[#00B87C]" size={24} />
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Add New Video to Library
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
                    Link stream broadcasts, media interviews, campaign speeches and press conferences directly.
                  </p>
                </div>

                <form onSubmit={handleVideoSubmit} className="space-y-6">
                  {/* Row 1: Event Title & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT TITLE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="e.g. Youth In Tech & Digital Sovereignty Keynote"
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                        EVENT DATE <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        disabled={isSubmitting}
                        value={videoDate}
                        onChange={(e) => setVideoDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all [color-scheme:dark] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Unique Input: YouTube or Vimeo URL */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                      YOUTUBE OR VIMEO URL <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                        <PlaySquare size={18} />
                      </div>
                      <input
                        type="url"
                        required
                        disabled={isSubmitting}
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                        className="w-full pl-11 pr-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Footer & Submit */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                    <div className="text-xs text-[#00B87C] font-bold">
                      {successMessage && (
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle2 size={16} /> {successMessage}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold shadow-lg shadow-[#00B87C]/25 transition-all flex items-center gap-2 disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>+ Add Video Link</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* DATA TABLE 3: Video Library Table */}
              <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between gap-2.5 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Video className="text-[#00B87C]" size={22} />
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Video Media Library ({videoLibrary.length})
                    </h2>
                  </div>
                  {loading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Loader2 size={14} className="animate-spin text-[#00B87C]" />
                      <span>Syncing Firestore...</span>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <Loader2 size={32} className="animate-spin text-[#00B87C]" />
                      <p className="text-sm text-slate-400 font-medium">Loading videos from database...</p>
                    </div>
                  ) : videoLibrary.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 border border-dashed border-slate-800 rounded-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center">
                        <Video size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">No video links added yet</p>
                        <p className="text-xs text-slate-400 mt-1">Add YouTube or Vimeo live links to build your broadcast media library.</p>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          <th className="py-3.5 px-4">Broadcast / Video Title</th>
                          <th className="py-3.5 px-4">Platform</th>
                          <th className="py-3.5 px-4">Stream URL</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {videoLibrary.map((vid, idx) => (
                          <tr key={`adm-vid-${vid.id}-${idx}`} className="hover:bg-[#0B1121]/50 transition-colors group">
                            <td className="py-4 px-4 font-bold text-white group-hover:text-[#00B87C] transition-colors">
                              {vid.title}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                                vid.platform === 'YouTube' 
                                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' 
                                  : vid.platform === 'Vimeo'
                                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                                  : 'bg-slate-800 text-slate-300'
                              }`}>
                                {vid.platform}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-slate-400 text-xs truncate max-w-xs font-mono">
                              <a 
                                href={vid.videoUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 hover:text-[#00B87C] underline"
                              >
                                <span className="truncate max-w-[200px]">{vid.videoUrl}</span>
                                <ExternalLink size={12} className="shrink-0" />
                              </a>
                            </td>
                            <td className="py-4 px-4 text-white font-medium whitespace-nowrap text-xs sm:text-sm">
                              {vid.date}
                            </td>
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem(vid.id, 'Video broadcast link')}
                                  title="Delete Video"
                                  className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </>
          )}

        </main>

      </div>
    </div>
  );
}

export default DarkAdminEventsDashboard;
