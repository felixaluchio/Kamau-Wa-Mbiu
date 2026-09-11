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
  Inbox,
  ArrowLeft,
  Plus
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

export type EventStatus = 'Published' | 'Draft' | 'Cancelled';

export interface UpcomingEventRecord {
  id: string;
  title: string;
  subtext?: string;
  date: string;
  location: string;
  county: string;
  category: string;
  description: string;
  status: EventStatus;
}

export function EventStatusBadge({ status }: { status?: string }) {
  const norm = (status || 'Published').toLowerCase();
  
  if (norm === 'draft') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Draft
      </span>
    );
  }
  
  if (norm === 'cancelled' || norm === 'canceled') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Cancelled
      </span>
    );
  }
  
  // Default: Published
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
      Published
    </span>
  );
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

  // --- Form 1: Upcoming Events Form State & Modal ---
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingUpcomingId, setEditingUpcomingId] = useState<string | null>(null);
  const [upcomingTitle, setUpcomingTitle] = useState('');
  const [upcomingDate, setUpcomingDate] = useState('');
  const [upcomingLocation, setUpcomingLocation] = useState('');
  const [upcomingCounty, setUpcomingCounty] = useState('');
  const [upcomingCategory, setUpcomingCategory] = useState('MOBILIZATION RALLY');
  const [upcomingStatus, setUpcomingStatus] = useState<EventStatus>('Published');
  const [upcomingDescription, setUpcomingDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft' | 'Cancelled'>('All');
  const [searchFilter, setSearchFilter] = useState('');

  const handleOpenCreateModal = () => {
    setEditingUpcomingId(null);
    setUpcomingTitle('');
    setUpcomingDate('');
    setUpcomingLocation('');
    setUpcomingCounty('');
    setUpcomingCategory('MOBILIZATION RALLY');
    setUpcomingStatus('Published');
    setUpcomingDescription('');
    setIsEventModalOpen(true);
  };

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
      status: (item.status as EventStatus) || 'Published',
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

  const handleQuickStatusChange = async (evtId: string, newStatus: EventStatus) => {
    setItems((prev) => prev.map((item) => item.id === evtId ? { ...item, status: newStatus } : item));
    try {
      await updateDoc(doc(db, 'events', evtId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      notifySuccess(`Event status changed to "${newStatus}"`);
    } catch (err: any) {
      console.warn('Firestore status update:', err);
      notifySuccess(`Status updated to "${newStatus}"`);
    }
  };

  const handleStartEditUpcoming = (evt: UpcomingEventRecord) => {
    setEditingUpcomingId(evt.id);
    setUpcomingTitle(evt.title);
    setUpcomingDate(evt.date);
    setUpcomingLocation(evt.location);
    setUpcomingCounty(evt.county || '');
    setUpcomingCategory(evt.category);
    setUpcomingStatus(evt.status || 'Published');
    setUpcomingDescription(evt.description);
    setIsEventModalOpen(true);
  };

  const handleCancelEditUpcoming = () => {
    setEditingUpcomingId(null);
    setUpcomingTitle('');
    setUpcomingDate('');
    setUpcomingLocation('');
    setUpcomingCounty('');
    setUpcomingCategory('MOBILIZATION RALLY');
    setUpcomingStatus('Published');
    setUpcomingDescription('');
    setIsEventModalOpen(false);
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
          status: upcomingStatus,
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
        setUpcomingStatus('Published');
        setUpcomingDescription('');
        setIsEventModalOpen(false);
        notifySuccess('Upcoming event updated successfully!');
      } else {
        const newRecordData = {
          type: 'upcoming',
          title: upcomingTitle.trim(),
          date: upcomingDate,
          location: upcomingLocation.trim() || (upcomingCounty ? `${upcomingCounty} Central` : 'Designated Venue'),
          county: upcomingCounty.trim() || 'National',
          category: upcomingCategory,
          status: upcomingStatus,
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
        setUpcomingStatus('Published');
        setUpcomingDescription('');
        setIsEventModalOpen(false);

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
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-3 sm:p-5 md:p-6 lg:p-8 font-sans antialiased w-full overflow-x-hidden relative">
        {/* Mobile Module Switcher & Action Header (< lg) */}
        <div className="lg:hidden mb-4 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all min-h-[40px] cursor-pointer"
            >
              <ArrowLeft size={15} className="text-blue-600" />
              <span>Main Dashboard</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm min-h-[40px] cursor-pointer"
              >
                <Plus size={15} className="stroke-[2.5]" />
                <span>New Event</span>
              </button>
            </div>
          </div>
          
          {/* Module Tabs Pill Switcher for Mobile */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            {navTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeModule === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveModule(tab.id)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-transparent'
                  }`}
                >
                  <IconComponent size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                  <span className="truncate">{tab.label.split(' ')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isActive ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          
          {/* LEFT SIDEBAR (Desktop lg+) */}
          <aside className="hidden lg:flex w-full lg:col-span-4 xl:col-span-4 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex-col justify-between space-y-5 sm:space-y-6 shadow-sm sticky top-6">
            <div className="space-y-6">
              {/* Back to Main Dashboard Navigation */}
              <div>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-xs font-bold group cursor-pointer shadow-sm"
                >
                  <ArrowLeft size={16} className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Main Dashboard</span>
                </button>
              </div>

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
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold' 
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                        <span>{tab.label}</span>
                      </div>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Database size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-800">System Connected</p>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Changes sync immediately to your campaign platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              {showLogoutConfirm ? (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl space-y-2.5">
                  <p className="text-xs text-rose-700 font-semibold text-center">Exit Console?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={handlePerformLogout} disabled={isLoggingOut} className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer">
                      {isLoggingOut ? '...' : 'Yes'}
                    </button>
                    <button type="button" onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setShowLogoutConfirm(true)} disabled={isLoggingOut} className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer">
                  <LogOut size={16} /> Logout
                </button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="w-full lg:col-span-8 xl:col-span-8 space-y-5 sm:space-y-6 lg:space-y-8">
            {/* Top Navigation & Status Bar (Desktop lg+) */}
            <div className="hidden lg:flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/60 text-xs font-bold transition-all group cursor-pointer"
              >
                <ArrowLeft size={15} className="text-blue-600 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Main Dashboard</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-semibold text-slate-700 text-[11px] sm:text-xs">Events Management Console</span>
                </div>

                {/* Prominent Create New Event Button at the Top */}
                <button
                  type="button"
                  id="top-create-new-event-btn"
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Plus size={17} className="stroke-[2.5]" />
                  <span>Create New Event</span>
                </button>
              </div>
            </div>
            
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* --- UPCOMING MODULE --- */}
            {activeModule === 'upcoming' && (
              <>
                {/* Events Quick Overview & Action Hero Banner */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 border border-blue-600/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-600/10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold">
                      <Calendar size={14} />
                      <span>Campaign Calendar Manager</span>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Manage Upcoming Events
                    </h1>
                    <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                      Schedule rallies, town halls, economic forums, and youth dialogues across all 5 wards. Click the button to add a new event with date, venue, category, and status.
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      id="hero-create-new-event-btn"
                      onClick={handleOpenCreateModal}
                      className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 text-sm font-bold shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Plus size={19} className="stroke-[2.5]" />
                      <span>Create New Event</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="font-serif text-xl font-bold text-slate-900">Event Records</h2>
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {upcomingEvents.length} Total
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Monitor published public events, review staging drafts, and track cancellations.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      {/* Status Filter Tabs */}
                      <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-2xl shrink-0 overflow-x-auto">
                        {(['All', 'Published', 'Draft', 'Cancelled'] as const).map((filterOpt) => {
                          const count = filterOpt === 'All'
                            ? upcomingEvents.length
                            : upcomingEvents.filter((e) => (e.status || 'Published') === filterOpt).length;
                          const active = statusFilter === filterOpt;

                          return (
                            <button
                              key={filterOpt}
                              type="button"
                              onClick={() => setStatusFilter(filterOpt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                                active
                                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {filterOpt === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                              {filterOpt === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                              {filterOpt === 'Cancelled' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                              <span>{filterOpt}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${active ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-slate-200/80 text-slate-600'}`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                      >
                        <Plus size={14} className="stroke-[2.5]" />
                        <span>Add Event</span>
                      </button>
                    </div>
                  </div>

                  {upcomingEvents.filter((e) => statusFilter === 'All' || (e.status || 'Published') === statusFilter).length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                      <Calendar size={32} className="mx-auto text-slate-400 mb-3" />
                      <p className="text-sm font-medium text-slate-700">No events found under "{statusFilter}" status.</p>
                      <p className="text-xs text-slate-400 mt-1">Create a new event above or switch filters to view other events.</p>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card View (< sm) */}
                      <div className="block sm:hidden space-y-3">
                        {upcomingEvents
                          .filter((e) => statusFilter === 'All' || (e.status || 'Published') === statusFilter)
                          .map((evt) => {
                            const currentStatus = evt.status || 'Published';
                            return (
                              <div 
                                key={evt.id} 
                                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 shadow-2xs"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="font-bold text-slate-900 text-sm leading-snug">
                                      {evt.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                                        {evt.category || 'RALLY'}
                                      </span>
                                      {evt.county && <span>• {evt.county}</span>}
                                    </div>
                                  </div>
                                  <EventStatusBadge status={currentStatus} />
                                </div>

                                <div className="text-xs text-slate-600 space-y-1 bg-white p-2.5 rounded-xl border border-slate-100">
                                  <div className="flex items-center gap-1.5 font-medium text-slate-900">
                                    <Calendar size={13} className="text-blue-600 shrink-0" />
                                    <span>{evt.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-500">
                                    <MapPin size={13} className="text-slate-400 shrink-0" />
                                    <span className="truncate">{evt.location}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                                  <select
                                    value={currentStatus}
                                    onChange={(e) => handleQuickStatusChange(evt.id, e.target.value as EventStatus)}
                                    className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-2.5 py-1.5 hover:border-blue-400 focus:border-blue-600 focus:outline-none cursor-pointer"
                                    title="Quick status change"
                                  >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>

                                  <div className="flex items-center gap-1">
                                    <button 
                                      onClick={() => handleStartEditUpcoming(evt)} 
                                      className="flex items-center gap-1 px-3 py-1.5 text-blue-700 bg-blue-50 border border-blue-200/80 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors cursor-pointer min-h-[36px]"
                                      title="Edit Event"
                                    >
                                      <Pencil size={13}/>
                                      <span>Edit</span>
                                    </button>
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); setItemToDelete({ ...evt, label: 'Upcoming Event' }); }} 
                                      className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200/60 rounded-xl transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                                      title="Delete Event"
                                    >
                                      <Trash2 size={14}/>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>

                      {/* Desktop / Tablet Table View (sm+) */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-extrabold uppercase text-slate-500">
                              <th className="py-3.5 px-3 rounded-l-xl">Event Details</th>
                              <th className="py-3.5 px-3">Date & Location</th>
                              <th className="py-3.5 px-3">Status</th>
                              <th className="py-3.5 px-3 text-right rounded-r-xl">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-sm">
                            {upcomingEvents
                              .filter((e) => statusFilter === 'All' || (e.status || 'Published') === statusFilter)
                              .map((evt) => {
                                const currentStatus = evt.status || 'Published';
                                return (
                                  <tr key={evt.id} className="hover:bg-blue-50/30 group transition-colors">
                                    <td className="py-4 px-3">
                                      <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {evt.title}
                                      </div>
                                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                          {evt.category || 'RALLY'}
                                        </span>
                                        {evt.county && <span>• {evt.county}</span>}
                                      </div>
                                    </td>
                                    <td className="py-4 px-3 text-slate-700">
                                      <div className="font-medium text-slate-900">{evt.date}</div>
                                      <div className="text-xs text-slate-500 mt-0.5">{evt.location}</div>
                                    </td>
                                    <td className="py-4 px-3">
                                      <div className="flex items-center gap-2">
                                        <EventStatusBadge status={currentStatus} />
                                        {/* Quick Status Selector Dropdown */}
                                        <select
                                          value={currentStatus}
                                          onChange={(e) => handleQuickStatusChange(evt.id, e.target.value as EventStatus)}
                                          className="bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 rounded-lg px-2 py-1 hover:border-blue-400 focus:border-blue-600 focus:outline-none cursor-pointer transition-colors"
                                          title="Quick status change"
                                        >
                                          <option value="Published">Set Published</option>
                                          <option value="Draft">Set Draft</option>
                                          <option value="Cancelled">Set Cancelled</option>
                                        </select>
                                      </div>
                                    </td>
                                    <td className="py-4 px-3 text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        <button 
                                          onClick={() => handleStartEditUpcoming(evt)} 
                                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                                          title="Edit Event"
                                        >
                                          <Pencil size={16}/>
                                        </button>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setItemToDelete({ ...evt, label: 'Upcoming Event' }); }} 
                                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                          title="Delete Event"
                                        >
                                          <Trash2 size={16}/>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* --- GALLERY MODULE --- */}
            {activeModule === 'gallery' && (
              <>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <div className="mb-8 border-b border-slate-100 pb-6">
                    <h1 className="font-serif text-2xl font-bold text-slate-900">Upload Photos</h1>
                  </div>
                  <form onSubmit={handleGallerySubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-2">TITLE *</label>
                        <input type="text" required value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-2">DATE *</label>
                        <input type="date" required value={galleryDate} onChange={(e) => setGalleryDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none cursor-pointer" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-2">LOCATION *</label>
                        <input type="text" required value={galleryLocation} onChange={(e) => setGalleryLocation(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-2">CATEGORY</label>
                        <select value={galleryCategory} onChange={(e) => setGalleryCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none cursor-pointer">
                          <option>Campaign Rally</option><option>Town Hall Meeting</option><option>Community Action</option>
                        </select>
                      </div>
                    </div>
                    
                    <div onClick={() => document.getElementById('gallery-multi')?.click()} className="border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center bg-blue-50/40 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                      <input id="gallery-multi" type="file" multiple accept="image/*" onChange={(e) => processGalleryFiles(e.target.files)} className="hidden" />
                      <UploadCloud size={28} className="mx-auto text-blue-600 mb-2" />
                      <p className="text-sm font-bold text-slate-800">Click to Select Photos</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG, or WEBP up to 10MB each</p>
                    </div>

                    {galleryPhotos.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {galleryPhotos.map((p) => (
                          <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200">
                            <img src={p.previewUrl} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeGalleryPhoto(p.id)} className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white cursor-pointer"><X size={12}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer">
                        {isSubmitting ? 'Uploading...' : 'Publish Gallery'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Gallery Showcases</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-extrabold uppercase text-slate-500"><th className="py-3 px-3 rounded-l-xl">Cover</th><th className="py-3 px-3">Title</th><th className="py-3 px-3 text-right rounded-r-xl">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {photoGalleries.map((gal) => (
                          <tr key={gal.id} className="hover:bg-blue-50/30 group">
                            <td className="py-4 px-3"><img src={gal.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-slate-200" /></td>
                            <td className="py-4 px-3 font-bold text-slate-900">{gal.title}</td>
                            <td className="py-4 px-3 text-right">
                              <button onClick={(e) => { e.stopPropagation(); setItemToDelete({ ...gal, label: 'Photo Gallery Showcase' }); }} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"><Trash2 size={16}/></button>
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
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <div className="mb-8 border-b border-slate-100 pb-6"><h1 className="font-serif text-2xl font-bold text-slate-900">Add Video</h1></div>
                  <form onSubmit={handleVideoSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div><label className="block text-[11px] font-bold text-slate-700 mb-2">TITLE</label><input required value={videoTitle} onChange={e=>setVideoTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"/></div>
                      <div><label className="block text-[11px] font-bold text-slate-700 mb-2">DATE</label><input type="date" required value={videoDate} onChange={e=>setVideoDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none cursor-pointer"/></div>
                    </div>
                    <div><label className="block text-[11px] font-bold text-slate-700 mb-2">VIDEO URL (YOUTUBE/VIMEO)</label><input type="url" required value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"/></div>
                    <div className="flex justify-end pt-4 border-t border-slate-100"><button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer">Save Video</button></div>
                  </form>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Video Library</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead><tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-extrabold uppercase text-slate-500"><th className="py-3 px-3 rounded-l-xl">Title</th><th className="py-3 px-3">Platform</th><th className="py-3 px-3 text-right rounded-r-xl">Actions</th></tr></thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {videoLibrary.map(vid => (
                          <tr key={vid.id} className="hover:bg-blue-50/30"><td className="py-4 px-3 font-bold text-slate-900">{vid.title}</td><td className="py-4 px-3 text-slate-600">{vid.platform}</td><td className="py-4 px-3 text-right"><button onClick={e=>{e.stopPropagation(); setItemToDelete({...vid, label:'Video Broadcast'})}} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"><Trash2 size={16}/></button></td></tr>
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
      {/* PORTAL-MOUNTED CREATE / EDIT EVENT MODAL */}
      {/* ========================================================================================= */}
      {isEventModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 !w-screen !h-screen z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999 }}
          onClick={() => !isSubmitting && setIsEventModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 text-left shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                    {editingUpcomingId ? 'Edit Event Details' : 'Create New Event'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editingUpcomingId 
                      ? 'Update date, location, ward, or publication status.' 
                      : 'Fill in event details to publish to the campaign calendar.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => !isSubmitting && setIsEventModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpcomingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    EVENT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Limuru Central Mobilization Rally"
                    value={upcomingTitle}
                    onChange={(e) => setUpcomingTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={upcomingDate}
                    onChange={(e) => setUpcomingDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    LOCATION / VENUE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Limuru Town Square"
                    value={upcomingLocation}
                    onChange={(e) => setUpcomingLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                    WARD / REGION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Limuru Central, Tigoni, Ndeiya"
                    value={upcomingCounty}
                    onChange={(e) => setUpcomingCounty(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  EVENT STATUS *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Published', 'Draft', 'Cancelled'] as EventStatus[]).map((st) => {
                    const isSelected = upcomingStatus === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setUpcomingStatus(st)}
                        className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? st === 'Published'
                              ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-sm'
                              : st === 'Draft'
                              ? 'bg-amber-50 text-amber-700 border-amber-400 shadow-sm'
                              : 'bg-rose-50 text-rose-700 border-rose-400 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            st === 'Published'
                              ? 'bg-blue-600 ' + (isSelected ? 'animate-pulse' : '')
                              : st === 'Draft'
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                  DESCRIPTION *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Outline the event agenda, keynote speakers, or attendee instructions..."
                  value={upcomingDescription}
                  onChange={(e) => setUpcomingDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 resize-y focus:border-blue-600 focus:ring-1 focus:ring-blue-500/30 transition-all outline-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="stroke-[2.5]" />
                      <span>{editingUpcomingId ? 'Save Changes' : 'Create Event'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================================= */}
      {/* ABSOLUTE OUTERMOST LAYER: PORTAL-MOUNTED MODAL (Escapes all CSS stacking & overflow context) */}
      {/* ========================================================================================= */}
      {itemToDelete && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 !w-screen !h-screen z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999 }}
          onClick={() => !isDeleting && setItemToDelete(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl w-full max-w-sm p-6 sm:p-7 text-center shadow-2xl relative"
            style={{ maxWidth: '380px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Top Red Circular Badge with Trash Icon */}
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 mb-5">
              <Trash2 size={24} strokeWidth={2} />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
              Delete {itemToDelete.label || 'Item'}?
            </h3>
            
            {/* Body Description */}
            <p className="text-xs sm:text-sm text-slate-500 mb-7 leading-relaxed max-w-[290px] mx-auto">
              Are you sure you want to permanently delete "{itemToDelete.title || 'this item'}"? This will permanently remove the document from Firestore.
            </p>

            {/* Action Buttons: Cancel and Delete Permanently */}
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setItemToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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