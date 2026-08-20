'use client';

import React, { useState } from 'react';
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
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

interface UploadedFilePreview {
  file: File;
  previewUrl: string;
}

export function DarkAdminGalleryUpload() {
  const [activeModule, setActiveModule] = useState<'gallery' | 'video' | 'events' | 'issues'>('gallery');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [category, setCategory] = useState('Campaign Rally');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<UploadedFilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Navigation module definitions
  const modules = [
    { id: 'gallery', label: 'Manage Photo Gallery', icon: Camera, count: photos.length },
    { id: 'video', label: 'Manage Video Library', icon: Video, count: 0 },
    { id: 'events', label: 'Manage Upcoming Events', icon: Calendar, count: 0 },
    { id: 'issues', label: 'Manage Community Issues', icon: AlertTriangle, count: 0 },
  ] as const;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newPreviews: UploadedFilePreview[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        newPreviews.push({
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
    });

    setPhotos((prev) => [...prev, ...newPreviews]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate upload to ImgBB and Firestore document creation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setEventTitle('');
        setEventDate('');
        setEventLocation('');
        setDescription('');
        setPhotos([]);
      }, 2000);
    }, 1200);
  };

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
                    Hybrid Backend Active
                  </p>
                  <span className="w-2 h-2 rounded-full bg-[#00B87C] animate-pulse" />
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Photos upload to ImgBB &amp; full event records save directly to the <code className="text-[#00B87C] font-mono text-[10px] bg-slate-900 px-1 py-0.5 rounded">events</code> collection in Firestore.
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
        {/* 2. MAIN CONTENT AREA: Upload Photo Gallery Event Form */}
        {/* ========================================================================= */}
        <main className="lg:col-span-8 xl:col-span-8 bg-[#131C31] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* Header */}
          <div className="mb-8 border-b border-slate-800/80 pb-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Upload New Photo Gallery Event
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium">
              Add past events, town halls, or rallies to the photo showcase.
            </p>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 2-Column Grid Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Row 1, Col 1: EVENT TITLE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  EVENT TITLE <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Limuru Mega Grassroots Rally 2026"
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all"
                />
              </div>

              {/* Row 1, Col 2: EVENT DATE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  EVENT DATE <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Row 2, Col 1: EVENT LOCATION / VENUE */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  EVENT LOCATION / VENUE
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. Limuru Main Community Grounds, Kiambu"
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all"
                />
              </div>

              {/* Row 2, Col 2: CATEGORY */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all"
                >
                  <option value="Campaign Rally">Campaign Rally</option>
                  <option value="Town Hall Meeting">Town Hall Meeting</option>
                  <option value="Youth Mentorship Summit">Youth Mentorship Summit</option>
                  <option value="Agricultural Policy Forum">Agricultural Policy Forum</option>
                  <option value="Community Action">Community Action</option>
                  <option value="Press Conference">Press Conference</option>
                </select>
              </div>
            </div>

            {/* Drag & Drop Photo Upload Zone (ImgBB Multi-file enabled) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                ATTACH PHOTOS (MULTIPLE ALLOWED)
              </label>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all bg-[#0B1121] cursor-pointer ${
                  isDragging
                    ? 'border-[#00B87C] bg-[#00B87C]/5'
                    : 'border-slate-700 hover:border-[#00B87C] hover:bg-[#0B1121]/90'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-[#00B87C]/15 text-[#00B87C] flex items-center justify-center shadow-inner">
                    <UploadCloud size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">
                      Drag &amp; drop photos here, or click to browse
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP up to 10MB each (Multi-file enabled)
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Thumbnail Grid Preview */}
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {photos.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden border border-slate-800 bg-[#0B1121] aspect-square"
                    >
                      <img
                        src={item.previewUrl}
                        alt={`Upload preview ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        title="Remove photo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                DESCRIPTION / PARAGRAPHS <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail key takeaways, grassroots community resolutions, notable attendees, and key milestones accomplished during the event..."
                className="w-full px-4 py-3 bg-[#0B1121] border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00B87C] focus:ring-2 focus:ring-[#00B87C]/20 transition-all resize-y"
              />
            </div>

            {/* Form Actions: Submit Button (Right-aligned) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 font-medium">
                {submitSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-[#00B87C] font-bold">
                    <CheckCircle2 size={16} /> Showcase successfully queued for Firestore!
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
                    <span>Uploading Assets...</span>
                  </>
                ) : (
                  <>
                    <span>+ Upload Photo Showcase ({photos.length})</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </main>

      </div>
    </div>
  );
}

export default DarkAdminGalleryUpload;
