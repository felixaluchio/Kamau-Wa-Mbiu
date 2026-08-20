import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  UploadCloud, 
  Calendar, 
  Clock, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Sparkles
} from 'lucide-react';
import { EventCategory, EventType } from '../../types/firestore';

export interface CreateEventFormData {
  title: string;
  description: string;
  category: 'Upcoming Events' | 'Past Events' | 'Video Library';
  eventType: string;
  date: string;
  time: string;
  location: string;
  imageFile: File | null;
  imagePreviewUrl: string | null;
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateEventFormData) => void;
}

export function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Upcoming Events' | 'Past Events' | 'Video Library'>('Upcoming Events');
  const [eventType, setEventType] = useState('Town Hall');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileSelection = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please upload a valid image file (PNG, JPG, WebP).' }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.image;
      return next;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Event title is required';
    if (!description.trim()) newErrors.description = 'Event description is required';
    if (!date) newErrors.date = 'Event date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Mock submission simulation
    setTimeout(() => {
      onSubmit?.({
        title,
        description,
        category,
        eventType,
        date,
        time: time || '10:00 AM - 13:00 PM',
        location: location || 'Kiambu Leadership Hall',
        imageFile,
        imagePreviewUrl: imagePreview,
      });

      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200/80 flex flex-col z-10"
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1148B8]/10 text-[#1148B8] flex items-center justify-center font-bold">
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Create New Event
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Publish leadership rallies, community town halls, or recorded broadcasts
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Limuru Youth Leadership & Innovation Summit"
                  className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 border transition-all ${
                    errors.title
                      ? 'border-rose-500 ring-2 ring-rose-100'
                      : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.title}
                  </p>
                )}
              </div>

              {/* Event Category & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category (Tab Destination)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                  >
                    <option value="Upcoming Events">Upcoming Events</option>
                    <option value="Past Events">Past Events</option>
                    <option value="Video Library">Video Library</option>
                  </select>
                </div>

                {/* Event Format */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                  >
                    <option value="Town Hall">Town Hall</option>
                    <option value="Rally">Grassroots Rally</option>
                    <option value="Workshop">Empowerment Workshop</option>
                    <option value="Conference">Policy Conference</option>
                    <option value="Press Conference">Press Briefing</option>
                    <option value="Livestream">Live Broadcast</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Event Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-slate-900 border transition-all ${
                        errors.date
                          ? 'border-rose-500 ring-2 ring-rose-100'
                          : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Time / Hours
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 14:00 - 17:00 EAT"
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Location Venue */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Location / Venue
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Limuru Community Social Hall, Kiambu"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-slate-900 border border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline key objectives, key speakers, and agenda for attendees..."
                  className={`w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 border transition-all resize-none ${
                    errors.description
                      ? 'border-rose-500 ring-2 ring-rose-100'
                      : 'border-slate-200 focus:border-[#1148B8] focus:ring-4 focus:ring-[#1148B8]/10'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.description}
                  </p>
                )}
              </div>

              {/* Image Upload Zone (ImgBB Integration Placeholder) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Banner Image (Hosted via ImgBB)
                </label>
                
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-[#1148B8] bg-[#1148B8]/5'
                      : imagePreview
                      ? 'border-[#0EA5D8] bg-slate-50'
                      : 'border-slate-300 hover:border-[#1148B8] hover:bg-slate-50/70'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {imagePreview ? (
                    <div className="flex items-center gap-4 text-left">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {imageFile?.name || 'Selected Banner Image'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {imageFile ? `${(imageFile.size / 1024).toFixed(1)} KB` : 'Ready to upload to ImgBB'}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1148B8] mt-1.5 bg-[#1148B8]/10 px-2 py-0.5 rounded-full">
                          <Sparkles size={10} /> ImgBB Ready
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#1148B8]/10 text-[#1148B8] flex items-center justify-center mx-auto">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        Click or drag to upload an event image
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        PNG, JPG, or WebP up to 16MB (Automated ImgBB CDN Upload)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1148B8] hover:bg-[#0D3894] shadow-md shadow-[#1148B8]/20 transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Event...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Publish Event</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CreateEventModal;
