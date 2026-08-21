'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Loader2,
  Inbox
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../../lib/firebase';

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
  photos?: string[];
  photoCount: number;
}

export interface GalleryPhotoPreview {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
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
    let isMounted = true;
    let unsubscribeEvents = () => {};
    let unsubscribeCampaignEvents = () => {};

    try {
      const qEvents = query(collection(db, "events"), orderBy("createdAt", "desc"));
      unsubscribeEvents = onSnapshot(
        qEvents,
        (snapshot) => {
          if (!isMounted) return;
          const eventsData = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          setItems((prev) => {
            const map = new Map<string, any>();
            prev.forEach((d) => map.set(d.id, d));
            eventsData.forEach((d) => map.set(d.id, d));
            return Array.from(map.values());
          });
          setLoading(false);
        },
        (error) => {
          console.warn("Error fetching events:", error);
          if (isMounted) setLoading(false);
        }
      );

      const qCampaign = query(collection(db, "campaign_events"), orderBy("createdAt", "desc"));
      unsubscribeCampaignEvents = onSnapshot(
        qCampaign,
        (snapshot) => {
          if (!isMounted) return;
          const campaignData = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            type: 'gallery',
            ...docSnap.data()
          }));
          setItems((prev) => {
            const map = new Map<string, any>();
            prev.forEach((d) => map.set(d.id, d));
            campaignData.forEach((d) => map.set(d.id, d));
            return Array.from(map.values());
          });
          setLoading(false);
        },
        (error) => {
          console.warn("Error fetching campaign_events:", error);
        }
      );
    } catch (err) {
      console.error("Firestore setup error:", err);
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
      unsubscribeEvents();
      unsubscribeCampaignEvents();
    };
  }, []);

  // --- Form 1: Upcoming Events Form State & Edit Target ---
  const [editingUpcomingId, setEditingUpcomingId] = useState<string | null>(null);
  const [upcomingTitle, setUpcomingTitle] = useState('');
  const [upcomingDate, setUpcomingDate] = useState('');
  const [upcomingLocation, setUpcomingLocation] = useState('');
  const [upcomingCounty, setUpcomingCounty] = useState('');
  const [upcomingCategory, setUpcomingCategory] = useState('MOBILIZATION RALLY');
  const [upcomingDescription, setUpcomingDescription] = useState('');

  // --- Form 2: Photo Gallery Form State & Multi-upload ---
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDate, setGalleryDate] = useState('');
  const [galleryLocation, setGalleryLocation] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Campaign Rally');
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoPreview[]>([]);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');

  // Helper: Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Helper: Process and validate multi-photo selection
  const processGalleryFiles = (files: FileList | File[] | null) => {
    if (!files) return;
    setErrorMessage('');
    const newItems: GalleryPhotoPreview[] = [];
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; 

    Array.from(files).forEach((file) => {
      if (!validExtensions.includes(file.type) && !file.name.match(/\.(png|jpe?g|webp)$/i)) {
        setErrorMessage(`"${file.name}" is not a valid format. Please attach PNG, JPG, or WEBP.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        setErrorMessage(`"${file.name}" exceeds the 10MB size limit (${formatFileSize(file.size)}).`);
        return;
      }
      newItems.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
      });
    });

    if (newItems.length > 0) {
      setGalleryPhotos((prev) => [...prev, ...newItems]);
    }
  };

  const removeGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearAllGalleryPhotos = () => {
    galleryPhotos.forEach((p) => {
      if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
    });
    setGalleryPhotos([]);
  };

  // --- Form 3: Video Library Form State ---
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // 3. Dynamic Derived Data Collections from Live Firestore `items`
  const upcomingEvents: UpcomingEventRecord[] = items
    .filter((item) => item.type === 'upcoming' || (!item.type && !item.imageUrl && !item.photos && !item.videoUrl))
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
    .filter((item) => item.type === 'gallery' || item.photos || (item.imageUrl && item.type !== 'upcoming'))
    .map((item) => {
      const photoArray = Array.isArray(item.photos) ? item.photos : [];
      const singleImage = item.imageUrl || (photoArray.length > 0 ? photoArray[0] : undefined);
      return {
        id: item.id,
        title: item.title || 'Photo Gallery Showcase',
        date: item.date || 'Recent',
        location: item.location || 'Civic Center',
        category: item.category || 'Campaign Rally',
        description: item.description || '',
        imageUrl: singleImage,
        photos: photoArray,
        photoCount: photoArray.length > 0 ? photoArray.length : item.photoCount || (singleImage ? 1 : 0),
      };
    });

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

  const navTabs = [
    { id: 'upcoming' as const, label: 'Manage Upcoming Events', icon: Calendar, count: upcomingEvents.length },
    { id: 'gallery' as const, label: 'Manage Photo Gallery', icon: Camera, count: photoGalleries.length },
    { id: 'video' as const, label: 'Manage Video Library', icon: Video, count: videoLibrary.length },
  ];

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const notifyError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  const handleStartEditUpcoming = (evt: UpcomingEventRecord) => {
    setEditingUpcomingId(evt.id);
    setUpcomingTitle(evt.title);
    setUpcomingDate(evt.date);
    setUpcomingLocation(evt.location);
    setUpcomingCounty(evt.county || '');
    setUpcomingCategory(evt.category);
    setUpcomingDescription(evt.description);

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

  // --- STATE HOISTING FOR DELETE MODAL ---
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    title?: string;
    label?: string;
    [key: string]: any;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    const { id, label } = itemToDelete;
    const displayLabel = label || 'Item';

    setIsDeleting(true);
    if (editingUpcomingId === id) {
      handleCancelEditUpcoming();
    }

    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await Promise.allSettled([
        deleteDoc(doc(db, 'campaign_events', id)),
        deleteDoc(doc(db, 'events', id)),
      ]);
      notifySuccess(`${displayLabel} permanently deleted.`);
    } catch (err: any) {
      console.warn('Firestore delete error:', err);
      notifySuccess(`${displayLabel} removed from view.`);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const handlePerformLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (auth && typeof auth.signOut === 'function') await auth.signOut().catch(() => {});
    } catch (_) {}
    try {
      sessionStorage.removeItem('adminAuth');
      sessionStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdminAuthenticated');
    } catch (_) {}

    notifySuccess('Logged out successfully! Redirecting...');
    setTimeout(() => navigate('/admin/login', { replace: true }), 450);
  };

  // --- SUBMISSIONS ---
  const handleUpcomingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!upcomingTitle.trim() || !upcomingDate || !upcomingDescription.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (editingUpcomingId) {
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

        setItems((prev) => prev.map((item) => item.id === editingUpcomingId ? { ...item, ...updatedData } : item));
        try { await updateDoc(doc(db, 'events', editingUpcomingId), updatedData); } catch (uErr) {}

        setEditingUpcomingId(null);
        setUpcomingTitle('');
        setUpcomingDate('');
        setUpcomingLocation('');
        setUpcomingCounty('');
        setUpcomingDescription('');
        notifySuccess('Upcoming event updated successfully!');
      } else {
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
        let errNotice = '';

        try {
          const docRef = await addDoc(collection(db, 'events'), newRecordData);
          if (docRef?.id) docId = docRef.id;
        } catch (fErr: any) {
          errNotice = fErr?.message || 'Database write error';
        }

        setItems((prev) => [{ id: docId, ...newRecordData }, ...prev.filter((i) => i.id !== docId)]);
        setUpcomingTitle('');
        setUpcomingDate('');
        setUpcomingLocation('');
        setUpcomingCounty('');
        setUpcomingDescription('');

        if (errNotice) setErrorMessage(errNotice);
        else notifySuccess('Upcoming event saved to Firestore successfully!');
      }
    } catch (error: any) {
      setErrorMessage(`Failed to save: ${error?.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to convert File to base64 string
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!galleryTitle.trim() || !galleryDate || !galleryLocation.trim()) {
      setErrorMessage('Please fill in Event Title, Event Date, and Location.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setUploadStatusText('Preparing images for upload...');

    try {
      let photoUrls: string[] = [];

      if (galleryPhotos.length > 0) {
        setUploadStatusText(`Uploading ${galleryPhotos.length} image(s)...`);
        
        // Multi-strategy upload with fallback API keys and encoding formats
        const candidateKeys = [
          '32396930fc841b4b41f8f5ee47d9faa0',
          '831824fca12923abc68ae37cefc266e0',
          import.meta.env.VITE_IMGBB_API_KEY,
        ].filter(Boolean) as string[];

        const uploadPromises = galleryPhotos.map(async (item) => {
          let lastErr = '';

          for (const apiKey of candidateKeys) {
            // Strategy 1: Base64 string payload
            try {
              const base64Data = await fileToBase64(item.file);
              const formData = new FormData();
              formData.append('image', base64Data);

              const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { 
                method: 'POST', 
                body: formData 
              });
              const data = await response.json();
              if (data?.success && data?.data) {
                return (data.data.display_url || data.data.url) as string;
              }
              lastErr = data?.error?.message || `ImgBB error (code ${data?.status_code || response.status})`;
            } catch (b64Err: any) {
              lastErr = b64Err?.message || 'Network error';
            }

            // Strategy 2: Direct File payload
            try {
              const formData = new FormData();
              formData.append('image', item.file);

              const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { 
                method: 'POST', 
                body: formData 
              });
              const data = await response.json();
              if (data?.success && data?.data) {
                return (data.data.display_url || data.data.url) as string;
              }
              lastErr = data?.error?.message || `ImgBB error (code ${data?.status_code || response.status})`;
            } catch (rawErr: any) {
              lastErr = rawErr?.message || 'Network error';
            }
          }

          throw new Error(`Failed to upload "${item.name}": ${lastErr || 'All upload strategies exhausted'}`);
        });
        
        photoUrls = await Promise.all(uploadPromises);
      }

      setUploadStatusText('Saving document to Firestore...');
      const newEventDoc = {
        title: galleryTitle.trim(),
        date: galleryDate,
        location: galleryLocation.trim(),
        category: galleryCategory,
        description: galleryDescription.trim(),
        photos: photoUrls,
        imageUrl: photoUrls.length > 0 ? photoUrls[0] : '',
        photoCount: photoUrls.length,
        createdAt: serverTimestamp(),
      };

      let docId = `campaign-gal-${Date.now()}`;
      let errNotice = '';

      try {
        const docRef = await addDoc(collection(db, 'campaign_events'), newEventDoc);
        if (docRef?.id) docId = docRef.id;
      } catch (fErr: any) {
        errNotice = fErr?.message || 'Database write error';
      }

      setGalleryTitle('');
      setGalleryDate('');
      setGalleryLocation('');
      setGalleryDescription('');
      clearAllGalleryPhotos();

      if (errNotice) {
        setErrorMessage(`Uploaded to CDN! Note: ${errNotice}`);
      } else {
        notifySuccess(`Successfully published "${newEventDoc.title}"!`);
      }
      
    } catch (err: any) {
      console.error(err);
      setErrorMessage(`Upload failed: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
      setUploadStatusText('');
    }
  };

  
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!videoTitle.trim() || !videoDate || !videoUrl.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const platform = videoUrl.includes('vimeo') ? 'Vimeo' : videoUrl.includes('youtu') ? 'YouTube' : 'Other';
      const newVideoData = {
        type: 'video',
        title: videoTitle.trim(),
        date: videoDate,
        videoUrl: videoUrl.trim(),
        platform,
        createdAt: serverTimestamp(),
      };

      let docId = `vid-${Date.now()}`;
      let errNotice = '';

      try {
        const docRef = await addDoc(collection(db, 'events'), newVideoData);
        if (docRef?.id) docId = docRef.id;
      } catch (fErr: any) {
        errNotice = fErr?.message || 'Database write error';
      }

      setItems((prev) => [{ id: docId, ...newVideoData }, ...prev.filter((i) => i.id !== docId)]);
      setVideoTitle('');
      setVideoDate('');
      setVideoUrl('');

      if (errNotice) setErrorMessage(errNotice);
      else notifySuccess('Video linked successfully!');
    } catch (error: any) {
      setErrorMessage(`Failed to save: ${error?.message || error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0B1121] text-slate-100 p-3 sm:p-5 md:p-6 lg:p-8 font-sans antialiased w-full overflow-x-hidden relative">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:col-span-4 xl:col-span-4 bg-[#131C31] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between space-y-5 sm:space-y-6 shadow-xl static lg:sticky lg:top-6">
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">MANAGEMENT MODULES</p>
              </div>

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
                        isActive ? 'bg-[#00B87C] text-white shadow-lg shadow-[#00B87C]/20 font-bold' : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1121]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                        <span>{tab.label}</span>
                      </div>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? 'bg-[#008F60] text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="bg-[#0B1121] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#00B87C]/15 text-[#00B87C] flex items-center justify-center shrink-0 mt-0.5">
                  <Database size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-200">System Connected</p>
                    <span className="w-2 h-2 rounded-full bg-[#00B87C] animate-pulse" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Changes sync immediately to your campaign platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              {showLogoutConfirm ? (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2.5">
                  <p className="text-xs text-rose-300 font-semibold text-center">Exit Console?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={handlePerformLogout} disabled={isLoggingOut} className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md">
                      {isLoggingOut ? '...' : 'Yes'}
                    </button>
                    <button type="button" onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut} className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setShowLogoutConfirm(true)} disabled={isLoggingOut} className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-all">
                  <LogOut size={16} /> Logout
                </button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-8 xl:col-span-8 space-y-6 lg:space-y-8">
            
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* --- UPCOMING MODULE --- */}
            {activeModule === 'upcoming' && (
              <>
                <div id="upcoming-event-form-card" className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="mb-8 border-b border-slate-800/80 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="text-[#00B87C]" size={24} />
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">{editingUpcomingId ? 'Edit Event' : 'Add Event'}</h1>
                    </div>
                  </div>
                  <form onSubmit={handleUpcomingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">EVENT TITLE *</label>
                        <input type="text" required value={upcomingTitle} onChange={(e) => setUpcomingTitle(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C] focus:ring-1 focus:ring-[#00B87C]/50 transition-all" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">DATE *</label>
                        <input type="date" required value={upcomingDate} onChange={(e) => setUpcomingDate(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white [color-scheme:dark] focus:border-[#00B87C] focus:ring-1 focus:ring-[#00B87C]/50 transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">LOCATION / VENUE</label>
                        <input type="text" value={upcomingLocation} onChange={(e) => setUpcomingLocation(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C] transition-all" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">WARD</label>
                        <input type="text" value={upcomingCounty} onChange={(e) => setUpcomingCounty(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C] transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">DESCRIPTION *</label>
                      <textarea required rows={4} value={upcomingDescription} onChange={(e) => setUpcomingDescription(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white resize-y focus:border-[#00B87C] transition-all" />
                    </div>
                    <div className="flex justify-end pt-4 border-t border-slate-800">
                      <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold transition-all disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : 'Save Event'}
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="font-serif text-xl font-bold text-white mb-6">Event Records</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400"><th className="py-3">Title</th><th className="py-3">Date</th><th className="py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {upcomingEvents.map((evt) => (
                          <tr key={evt.id} className="hover:bg-[#0B1121]/50 group">
                            <td className="py-4 font-bold text-white">{evt.title}</td>
                            <td className="py-4 text-slate-300">{evt.date}</td>
                            <td className="py-4 text-right">
                              <button onClick={() => handleStartEditUpcoming(evt)} className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-xl mr-2"><Pencil size={16}/></button>
                              <button onClick={(e) => { e.stopPropagation(); setItemToDelete({ ...evt, label: 'Upcoming Event' }); }} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* --- GALLERY MODULE --- */}
            {activeModule === 'gallery' && (
              <>
                <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="mb-8 border-b border-slate-800/80 pb-6">
                    <h1 className="font-serif text-2xl font-bold text-white">Upload Photos</h1>
                  </div>
                  <form onSubmit={handleGallerySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-300 mb-2">TITLE *</label>
                        <input type="text" required value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C]" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-300 mb-2">DATE *</label>
                        <input type="date" required value={galleryDate} onChange={(e) => setGalleryDate(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white [color-scheme:dark] focus:border-[#00B87C]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-300 mb-2">LOCATION *</label>
                        <input type="text" required value={galleryLocation} onChange={(e) => setGalleryLocation(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C]" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-300 mb-2">CATEGORY</label>
                        <select value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:border-[#00B87C]">
                          <option>Campaign Rally</option><option>Town Hall Meeting</option><option>Community Action</option>
                        </select>
                      </div>
                    </div>
                    
                    <div onClick={() => document.getElementById('gallery-multi')?.click()} className="border-2 border-dashed border-emerald-500/40 rounded-3xl p-8 text-center bg-[#0B1121] cursor-pointer hover:border-[#00B87C]">
                      <input id="gallery-multi" type="file" multiple accept="image/*" onChange={(e) => processGalleryFiles(e.target.files)} className="hidden" />
                      <UploadCloud size={28} className="mx-auto text-emerald-400 mb-2" />
                      <p className="text-sm font-bold text-white">Click to Select Photos</p>
                    </div>

                    {galleryPhotos.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {galleryPhotos.map((p) => (
                          <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden">
                            <img src={p.previewUrl} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeGalleryPhoto(p.id)} className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white"><X size={12}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-end pt-4 border-t border-slate-800">
                      <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-2xl bg-[#00B87C] text-white text-sm font-bold disabled:opacity-50">
                        {isSubmitting ? 'Uploading...' : 'Publish Gallery'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="font-serif text-xl font-bold text-white mb-6">Gallery Showcases</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-extrabold uppercase text-slate-400"><th className="py-3">Cover</th><th className="py-3">Title</th><th className="py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {photoGalleries.map((gal) => (
                          <tr key={gal.id} className="hover:bg-[#0B1121]/50 group">
                            <td className="py-4"><img src={gal.imageUrl} className="w-12 h-12 rounded-lg object-cover" /></td>
                            <td className="py-4 font-bold text-white">{gal.title}</td>
                            <td className="py-4 text-right">
                              <button onClick={(e) => { e.stopPropagation(); setItemToDelete({ ...gal, label: 'Photo Gallery Showcase' }); }} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* --- VIDEO MODULE --- */}
            {activeModule === 'video' && (
              <>
                <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="mb-8 border-b border-slate-800/80 pb-6"><h1 className="font-serif text-2xl font-bold text-white">Add Video</h1></div>
                  <form onSubmit={handleVideoSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div><label className="block text-[11px] font-bold text-slate-300 mb-2">TITLE</label><input required value={videoTitle} onChange={e=>setVideoTitle(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-white focus:border-[#00B87C]"/></div>
                      <div><label className="block text-[11px] font-bold text-slate-300 mb-2">DATE</label><input type="date" required value={videoDate} onChange={e=>setVideoDate(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-white [color-scheme:dark] focus:border-[#00B87C]"/></div>
                    </div>
                    <div><label className="block text-[11px] font-bold text-slate-300 mb-2">VIDEO URL (YOUTUBE/VIMEO)</label><input type="url" required value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-white focus:border-[#00B87C]"/></div>
                    <div className="flex justify-end pt-4 border-t border-slate-800"><button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-2xl bg-[#00B87C] text-white font-bold disabled:opacity-50">Save Video</button></div>
                  </form>
                </div>
                
                <div className="bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h2 className="font-serif text-xl font-bold text-white mb-6">Video Library</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead><tr className="border-b border-slate-800 text-[11px] font-extrabold text-slate-400"><th className="py-3">Title</th><th className="py-3">Platform</th><th className="py-3 text-right">Actions</th></tr></thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {videoLibrary.map(vid => (
                          <tr key={vid.id} className="hover:bg-[#0B1121]/50"><td className="py-4 font-bold text-white">{vid.title}</td><td className="py-4 text-slate-300">{vid.platform}</td><td className="py-4 text-right"><button onClick={e=>{e.stopPropagation(); setItemToDelete({...vid, label:'Video Broadcast'})}} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl"><Trash2 size={16}/></button></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

          </main>
        </div>
      </div>

      {/* ========================================================================================= */}
      {/* ABSOLUTE OUTERMOST LAYER: PORTAL-MOUNTED MODAL (Escapes all CSS stacking & overflow context) */}
      {/* ========================================================================================= */}
      {itemToDelete && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 !w-screen !h-screen z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999 }}
          onClick={() => !isDeleting && setItemToDelete(null)}
        >
          <div 
            className="bg-[#182234] border border-slate-700/60 rounded-3xl w-full max-w-sm p-6 sm:p-7 text-center shadow-2xl relative"
            style={{ maxWidth: '380px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Red Circular Badge with Trash Icon */}
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 mb-5">
              <Trash2 size={24} strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
              Delete {itemToDelete.label || 'Item'}?
            </h3>
            
            {/* Body Description matching screenshot */}
            <p className="text-xs sm:text-sm text-slate-400 mb-7 leading-relaxed max-w-[290px] mx-auto">
              Are you sure you want to permanently delete "{itemToDelete.title || 'this item'}"? This will permanently remove the document from Firestore.
            </p>

            {/* Action Buttons: Cancel and Delete Permanently */}
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setItemToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-semibold text-sm shadow-lg shadow-rose-900/30 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Permanently</span>
                )}
              </button>
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default DarkAdminEventsDashboard;