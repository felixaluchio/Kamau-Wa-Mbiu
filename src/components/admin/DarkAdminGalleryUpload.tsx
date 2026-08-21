'use client';

import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Video, 
  Calendar, 
  AlertTriangle, 
  Database, 
  LogOut, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Trash2,
  Image as ImageIcon,
  MapPin,
  FileText
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface PhotoPreviewItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
}

export function DarkAdminGalleryUpload() {
  const [activeModule, setActiveModule] = useState<'gallery' | 'video' | 'events' | 'issues'>('gallery');

  // Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [category, setCategory] = useState('Campaign Rally');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<PhotoPreviewItem[]>([]);

  // Interaction & Submission State
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Process & validate multiple selected files (PNG, JPG, JPEG, WEBP, max 10MB each)
  const processFiles = (files: FileList | File[] | null) => {
    if (!files) return;
    setErrorMessage('');
    const newPhotos: PhotoPreviewItem[] = [];
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    Array.from(files).forEach((file) => {
      // Check file type
      if (!validExtensions.includes(file.type) && !file.name.match(/\.(png|jpe?g|webp)$/i)) {
        setErrorMessage(`"${file.name}" is not a valid format. Please upload PNG, JPG, or WEBP.`);
        return;
      }

      // Check file size (max 10MB)
      if (file.size > maxSizeBytes) {
        setErrorMessage(`"${file.name}" exceeds the maximum limit of 10MB (${formatFileSize(file.size)}).`);
        return;
      }

      newPhotos.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
      });
    });

    if (newPhotos.length > 0) {
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset file input so same file can be re-selected if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Remove individual photo
  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  // Clear all attached photos
  const clearAllPhotos = () => {
    photos.forEach((p) => {
      if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
    });
    setPhotos([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clean form reset
  const resetForm = () => {
    setEventTitle('');
    setEventDate('');
    setEventLocation('');
    setCategory('Campaign Rally');
    setDescription('');
    clearAllPhotos();
  };

  // Form Submit: Concurrent ImgBB upload via Promise.all + Firestore document write
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-submission
    setErrorMessage('');
    setSubmitSuccess(false);

    if (!eventTitle.trim()) {
      setErrorMessage('Please provide an Event Title.');
      return;
    }
    if (!eventDate) {
      setErrorMessage('Please select an Event Date.');
      return;
    }
    if (!eventLocation.trim()) {
      setErrorMessage('Please provide the Location/Venue.');
      return;
    }

    setIsSubmitting(true);
    setUploadStatusText('Preparing images for upload...');

    try {
      let photoUrls: string[] = [];

      // 1. ImgBB Multi-Upload using Promise.all & FormData
      if (photos.length > 0) {
        setUploadStatusText(`Uploading ${photos.length} image${photos.length > 1 ? 's' : ''} to ImgBB CDN...`);
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY || '831824fca12923abc68ae37cefc266e0';

        const uploadPromises = photos.map(async (item, index) => {
          const formData = new FormData();
          formData.append('image', item.file);

          const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();

          if (data.success && data.data) {
            // Extract direct URL (data.data.display_url)
            const directUrl = data.data.display_url || data.data.url;
            return directUrl as string;
          } else {
            throw new Error(data.error?.message || `Failed to upload image #${index + 1} (${item.name})`);
          }
        });

        photoUrls = await Promise.all(uploadPromises);
      }

      // 2. Firestore Submission to 'campaign_events' collection using addDoc
      setUploadStatusText('Writing event document to Firestore...');
      
      const newEventDoc = {
        title: eventTitle.trim(),
        date: eventDate,
        location: eventLocation.trim(),
        category,
        description: description.trim(),
        photos: photoUrls, // Array of ImgBB direct URL strings
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'campaign_events'), newEventDoc);

      // 3. Success state and form reset
      setSubmitSuccess(true);
      setUploadStatusText('Success!');
      resetForm();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Error submitting event to ImgBB / Firestore:', err);
      setErrorMessage(err?.message || 'Failed to submit event. Please check network connection and try again.');
    } finally {
      setIsSubmitting(false);
      setUploadStatusText('');
    }
  };

  // Sidebar navigation definitions
  const modules = [
    { id: 'gallery', label: 'Manage Photo Gallery', icon: Camera, count: photos.length },
    { id: 'video', label: 'Manage Video Library', icon: Video, count: 0 },
    { id: 'events', label: 'Manage Upcoming Events', icon: Calendar, count: 0 },
    { id: 'issues', label: 'Manage Community Issues', icon: AlertTriangle, count: 0 },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0B1121] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* 1. LEFT SIDEBAR: Navigation, System Backend Status & Logout */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 xl:col-span-4 bg-[#131C31] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-6">
            {/* Sidebar Section Title */}
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                MANAGEMENT MODULES
              </p>
            </div>

            {/* Navigation Vertical List */}
            <nav className="space-y-2">
              {modules.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeModule === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#00B87C] text-white shadow-lg shadow-[#00B87C]/20'
                        : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1121]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span>{item.label}</span>
                    </div>

                    {/* Circular Badge Count */}
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive
                          ? 'bg-[#008F60] text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Status Card: Hybrid Backend Active */}
            <div className="bg-[#0B1121] border border-slate-800/90 rounded-2xl p-4 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#00B87C]/15 text-[#00B87C] flex items-center justify-center shrink-0 mt-0.5">
                <Database size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-200">
                    Hybrid Cloud Storage
                  </p>
                  <span className="w-2 h-2 rounded-full bg-[#00B87C] animate-pulse" />
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Photos upload concurrently to ImgBB CDN and save directly into the <code className="text-[#00B87C] font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">campaign_events</code> collection in Firestore.
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border border-rose-500/30 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/50 text-xs font-bold transition-colors"
            >
              <LogOut size={16} />
              <span>Logout from Admin Console</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. MAIN CONTENT AREA: Event & Gallery Management Admin Form */}
        {/* ========================================================================= */}
        <main className="lg:col-span-8 xl:col-span-8 bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* Header */}
          <div className="mb-8 border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Camera className="text-[#00B87C]" size={26} />
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Event &amp; Gallery Management
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
                Upload multiple high-resolution photos, manage event metadata, and publish to Firestore.
              </p>
            </div>

            {photos.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold self-start sm:self-auto">
                <ImageIcon size={14} />
                <span>{photos.length} photo{photos.length > 1 ? 's' : ''} queued</span>
              </div>
            )}
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-start gap-3 text-xs sm:text-sm animate-in fade-in duration-200">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
              <div className="flex-1">
                <p className="font-bold">Error occurred</p>
                <p className="mt-0.5 text-rose-200/90 leading-relaxed">{errorMessage}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setErrorMessage('')}
                className="text-rose-400 hover:text-rose-200 p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {submitSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in duration-200">
              <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
              <div>
                <p className="font-bold">Event &amp; Gallery Published Successfully!</p>
                <p className="text-emerald-200/90 text-xs mt-0.5">Images uploaded to ImgBB and saved to Firestore <code className="bg-emerald-950 px-1 py-0.5 rounded text-emerald-300 font-mono">campaign_events</code>.</p>
              </div>
            </div>
          )}

          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 2-Column Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 1: EVENT TITLE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  EVENT TITLE <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Limuru Mega Grassroots Rally 2026"
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                />
              </div>

              {/* Field 2: EVENT DATE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  EVENT DATE <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  disabled={isSubmitting}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all [color-scheme:dark] disabled:opacity-50"
                />
              </div>

              {/* Field 3: LOCATION / VENUE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#00B87C]" />
                  <span>LOCATION / VENUE <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. Limuru Main Community Grounds, Kiambu"
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                />
              </div>

              {/* Field 4: CATEGORY */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  CATEGORY
                </label>
                <select
                  disabled={isSubmitting}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all disabled:opacity-50"
                >
                  <option value="Campaign Rally">Campaign Rally</option>
                  <option value="Town Hall Meeting">Town Hall Meeting</option>
                  <option value="Youth Mentorship Summit">Youth Mentorship Summit</option>
                  <option value="Agricultural Policy Forum">Agricultural Policy Forum</option>
                  <option value="Community Action">Community Action</option>
                  <option value="Press Conference">Press Conference</option>
                  <option value="Civic Assembly">Civic Assembly</option>
                </select>
              </div>
            </div>

            {/* Field 5: DESCRIPTION / PARAGRAPHS */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                <FileText size={13} className="text-[#00B87C]" />
                <span>DESCRIPTION / RECAP</span>
              </label>
              <textarea
                rows={4}
                disabled={isSubmitting}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail key takeaways, grassroots community resolutions, notable attendees, and key milestones accomplished during the event..."
                className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all resize-y disabled:opacity-50"
              />
            </div>

            {/* Field 6: Multi-File Drag & Drop Upload Zone (Emerald / Cyan Dashed Border) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  ATTACH PHOTOS (PNG, JPG, WEBP — MAX 10MB EACH)
                </label>
                {photos.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllPhotos}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Clear all ({photos.length})</span>
                  </button>
                )}
              </div>

              {/* Dashed Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isSubmitting && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all bg-[#0B1121] cursor-pointer group ${
                  isDragging
                    ? 'border-[#00B87C] bg-[#00B87C]/10 ring-4 ring-[#00B87C]/20'
                    : 'border-emerald-500/40 hover:border-cyan-400 hover:bg-[#0B1121]/90'
                } ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  disabled={isSubmitting}
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:border-cyan-500/40 text-emerald-400 group-hover:text-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-inner">
                    <UploadCloud size={30} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
                      Drag &amp; drop photos here, or <span className="text-[#00B87C] group-hover:text-cyan-400 underline decoration-2 underline-offset-2">browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 10MB each &bull; Multi-file concurrent upload enabled
                    </p>
                  </div>
                </div>
              </div>

              {/* Attached Photos Thumbnail Preview Grid */}
              {photos.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>Attached Photos Preview ({photos.length})</span>
                    <span>Click X to remove photo</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                    {photos.map((item, idx) => (
                      <div
                        key={item.id}
                        className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-[#0B1121] aspect-square shadow-md hover:border-slate-700 transition-all"
                      >
                        <img
                          src={item.previewUrl}
                          alt={`Upload preview ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Gradient overlay for meta info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-between pointer-events-none">
                          <div className="self-start">
                            <span className="bg-black/60 backdrop-blur-sm text-[10px] text-white px-2 py-0.5 rounded-full font-medium">
                              #{idx + 1}
                            </span>
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-white truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-300">{item.sizeFormatted}</p>
                          </div>
                        </div>

                        {/* Individual "X" remove button with Red Accent */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(item.id);
                          }}
                          disabled={isSubmitting}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 active:scale-95 disabled:opacity-40 cursor-pointer"
                          title="Remove photo"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions: Submit Button with Submitting/Loading State */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 font-medium">
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2 text-cyan-400 font-semibold">
                    <Loader2 size={15} className="animate-spin text-cyan-400" />
                    <span>{uploadStatusText || 'Uploading assets to ImgBB and writing to Firestore...'}</span>
                  </span>
                ) : submitSuccess ? (
                  <span className="inline-flex items-center gap-1.5 text-[#00B87C] font-bold">
                    <CheckCircle2 size={16} /> Saved to Firestore campaign_events collection!
                  </span>
                ) : (
                  <span>Ready to publish event with {photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {photos.length > 0 && !isSubmitting && (
                  <button
                    type="button"
                    onClick={clearAllPhotos}
                    className="px-4 py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
                  >
                    Clear All Photos
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-7 py-3.5 rounded-2xl bg-[#00B87C] hover:bg-[#00A36D] text-white text-sm font-bold shadow-lg shadow-[#00B87C]/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white" />
                      <span>Uploading ({photos.length} photos)...</span>
                    </>
                  ) : (
                    <>
                      <Camera size={18} />
                      <span>Submit Event &amp; Gallery ({photos.length})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>
        </main>

      </div>
    </div>
  );
}

export default DarkAdminGalleryUpload;
