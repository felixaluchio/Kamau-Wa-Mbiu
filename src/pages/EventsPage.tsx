import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { EventsTabToggle, EventTab } from '../components/EventsTabToggle';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Video, 
  Share2, 
  Download, 
  Filter, 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  Loader2,
  ExternalLink,
  UserPlus
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface EventPhoto {
  url: string;
  caption: string;
}

interface PastEvent {
  id: string | number;
  title: string;
  date: string;
  location: string;
  type: string;
  attendees: string;
  recap: string;
  photos: EventPhoto[];
}

// Utility function to extract YouTube video IDs and generate high-resolution thumbnail URLs
export const getYouTubeThumbnail = (url: string) => {
  if (!url) return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
  
  // Regex to handle youtu.be, watch?v=, embed/, and shorts/
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    // Using hqdefault as it is the most reliable resolution across all YouTube videos
    return `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
  }
  
  return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'; // Fallback if not a valid YouTube URL
};

export function EventsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EventTab>('Upcoming Events');
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedLightbox, setSelectedLightbox] = useState<{
    eventTitle: string;
    photos: EventPhoto[];
    index: number;
  } | null>(null);

  // Real-time Firestore Listener
  useEffect(() => {
    try {
      const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const rawItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const seen = new Set<string>();
          const items: any[] = [];
          for (const item of rawItems) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              items.push(item);
            }
          }
          setDbItems(items);
          setLoading(false);
        },
        (error) => {
          console.warn('Firestore onSnapshot error:', error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Error connecting to Firestore:', err);
      setLoading(false);
    }
  }, []);

  // Filter Firestore items strictly by type (no mock fallbacks)
  const upcomingEvents = dbItems
    .filter((item) => !item.type || item.type === 'upcoming')
    .map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date || item.createdAt || 'Upcoming',
      time: item.time || '10:00 - 14:00 EAT',
      location: item.location || 'Designated Venue',
      type: item.category || 'Civic Forum',
      description: item.description || item.subtext || 'Grassroots civic dialogue with constituents and community partners.',
    }));

  const pastEvents: PastEvent[] = dbItems
    .filter((item) => item.type === 'gallery')
    .map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date || 'Recent Event',
      location: item.location || 'Designated Venue',
      type: item.category || 'Photo Showcase',
      attendees: `${item.photoCount || 1}+ Photographs`,
      recap: item.description || 'Community gathering and grassroots mobilization highlights captured in photographic recap.',
      photos: [
        {
          url: item.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
          caption: `${item.title} - ${item.location}`
        }
      ]
    }));

  const videoList = dbItems
    .filter((item) => item.type === 'video')
    .map((item) => ({
      id: item.id,
      title: item.title,
      duration: 'Live Broadcast',
      date: item.date || 'Recent Broadcast',
      views: item.platform || 'Online',
      videoUrl: item.videoUrl || '',
      thumbnail: getYouTubeThumbnail(item.videoUrl || ''),
      description: `Official broadcast recorded for ${item.title}. Accessible on ${item.platform || 'video streaming platforms'}.`
    }));

  const handleOpenLightbox = (eventTitle: string, photos: EventPhoto[], index: number) => {
    setSelectedLightbox({ eventTitle, photos, index });
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedLightbox) return;
    setSelectedLightbox({
      ...selectedLightbox,
      index: (selectedLightbox.index + 1) % selectedLightbox.photos.length
    });
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedLightbox) return;
    setSelectedLightbox({
      ...selectedLightbox,
      index: (selectedLightbox.index - 1 + selectedLightbox.photos.length) % selectedLightbox.photos.length
    });
  };

  return (
    <PageLayout breadcrumb={[{ label: 'Events', href: '/events' }]}>
      <section className="py-20 sm:py-28 bg-brand-neutral-white">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
              Events & Public Forums
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl text-brand-neutral-charcoal mb-4 leading-[1.1]">
              Join the <span className="italic font-light text-brand-primary">conversation.</span>
            </h1>
            <p className="font-body text-base sm:text-lg text-brand-neutral-charcoal/60 leading-relaxed">
              Real change happens when we come together. Explore our upcoming schedule, view photographic recaps from past town halls, and watch recorded addresses.
            </p>
          </motion.div>

          {/* Events Pill-Shaped Toggle */}
          <div className="flex justify-center mb-12">
            <EventsTabToggle 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
          </div>

          {/* Tab Views */}
          <AnimatePresence mode="wait">
            {activeTab === 'Upcoming Events' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={36} className="animate-spin text-brand-primary" />
                    <p className="font-body text-sm text-brand-neutral-charcoal/60 font-medium">
                      Loading latest civic schedule from database...
                    </p>
                  </div>
                ) : upcomingEvents.length === 0 ? (
                  <div className="flex items-center justify-center w-full py-16 px-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-500 text-base font-medium">
                      No upcoming events scheduled at this time.
                    </p>
                  </div>
                ) : (
                  upcomingEvents.map((evt, idx) => {
                    const dateParts = String(evt.date).split(' ');
                    const month = dateParts[0] || 'TBA';
                    const day = dateParts[1] ? dateParts[1].replace(',', '') : '';

                    return (
                      <motion.div 
                        key={`pub-up-${evt.id || idx}-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        className="bg-brand-neutral-warm rounded-3xl p-8 sm:p-10 border border-brand-neutral-grey/50 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-8 group"
                      >
                        <div className="shrink-0 text-center bg-brand-neutral-white border border-brand-neutral-grey/50 rounded-2xl p-6 min-w-[140px]">
                          <div className="font-body text-sm font-bold text-brand-accent uppercase mb-1">{month}</div>
                          <div className="font-heading text-4xl text-brand-neutral-charcoal">{day || '2027'}</div>
                        </div>
                        
                        <div className="flex-grow text-center md:text-left">
                          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
                            {evt.type}
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal mb-2">{evt.title}</h3>
                          <p className="font-body text-sm text-brand-neutral-charcoal/70 mb-4 max-w-2xl">
                            {evt.description}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-8 text-brand-neutral-charcoal/60 font-body text-sm">
                            <div className="flex items-center gap-2"><Clock size={16} className="text-brand-primary" /> {evt.time}</div>
                            <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-secondary" /> {evt.location}</div>
                          </div>
                        </div>

                        <div className="shrink-0 mt-6 md:mt-0 flex flex-col items-center sm:items-end">
                          <button
                            type="button"
                            onClick={() => navigate('/membership')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                          >
                            <UserPlus size={16} />
                            Register as a Member
                          </button>
                          <p className="text-xs text-slate-400 mt-2 text-center sm:text-right max-w-[200px] leading-tight">
                            Membership registration required for new attendees.
                          </p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}

            {activeTab === 'Past Events' && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={36} className="animate-spin text-brand-primary" />
                    <p className="font-body text-sm text-brand-neutral-charcoal/60 font-medium">
                      Loading photo showcases from database...
                    </p>
                  </div>
                ) : pastEvents.length === 0 ? (
                  <div className="flex items-center justify-center w-full py-16 px-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-500 text-base font-medium">
                      No past events to display.
                    </p>
                  </div>
                ) : (
                  pastEvents.map((evt, idx) => {
                    const dateParts = String(evt.date).split(' ');
                    const month = dateParts[0] || 'Recent';
                    const day = dateParts[1] ? dateParts[1].replace(',', '') : '';
                    const year = dateParts[2] || '';

                    return (
                      <motion.div 
                        key={`pub-past-${evt.id || idx}-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.08 }}
                        className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-neutral-grey/30 hover:border-brand-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-6"
                      >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                          <div className="shrink-0 text-center bg-brand-neutral-warm border border-brand-neutral-grey/40 rounded-2xl p-5 min-w-[130px]">
                            <div className="font-body text-xs font-bold text-brand-neutral-charcoal/50 uppercase mb-1">{month}</div>
                            <div className="font-heading text-3xl text-brand-neutral-charcoal">{day || '•'}</div>
                            {year && <div className="text-[11px] text-brand-neutral-charcoal/40 font-bold">{year}</div>}
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal bg-brand-neutral-warm px-3 py-1 rounded-full">
                                {evt.type}
                              </span>
                              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-success-700 bg-success-50 px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={12} /> Concluded
                              </span>
                            </div>
                            <h3 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal mb-2">{evt.title}</h3>
                            <p className="font-body text-sm text-brand-neutral-charcoal/70 mb-3 max-w-2xl">
                              {evt.recap}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-brand-neutral-charcoal/60 font-body text-xs sm:text-sm">
                              <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-secondary" /> {evt.location}</div>
                              <div className="flex items-center gap-2 font-bold text-brand-primary">{evt.attendees}</div>
                            </div>
                          </div>

                          <div className="shrink-0 self-start md:self-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => alert(`Downloading official event proceedings and minutes for: ${evt.title}`)}
                            >
                              <Download size={14} /> Minutes & Notes
                            </Button>
                          </div>
                        </div>

                        {/* Pictures of the Past Event Gallery */}
                        {evt.photos && evt.photos.length > 0 && (
                          <div className="pt-4 border-t border-brand-neutral-grey/20">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/70">
                                <Camera size={15} className="text-brand-primary" />
                                <span>Event Photo Gallery ({evt.photos.length} photo{evt.photos.length > 1 ? 's' : ''})</span>
                              </div>
                              <span className="text-xs text-brand-primary font-medium cursor-pointer hover:underline" onClick={() => handleOpenLightbox(evt.title, evt.photos, 0)}>
                                View All Fullscreen
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {evt.photos.map((photo, pIdx) => (
                                <div
                                  key={`pub-photo-${evt.id || idx}-${pIdx}`}
                                  onClick={() => handleOpenLightbox(evt.title, evt.photos, pIdx)}
                                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-brand-neutral-warm border border-brand-neutral-grey/30 cursor-pointer shadow-sm hover:shadow-md transition-all"
                                >
                                  <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                                    <p className="text-[11px] font-medium text-white line-clamp-2 leading-tight">
                                      {photo.caption}
                                    </p>
                                    <div className="flex items-center gap-1 text-[10px] text-white/80 mt-1 font-bold">
                                      <Eye size={12} /> Click to expand
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}

            {activeTab === 'Video Library' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {loading ? (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <Loader2 size={36} className="animate-spin text-brand-primary" />
                    <p className="font-body text-sm text-brand-neutral-charcoal/60 font-medium">
                      Loading video library from database...
                    </p>
                  </div>
                ) : videoList.length === 0 ? (
                  <div className="col-span-full flex items-center justify-center w-full py-16 px-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <p className="text-slate-500 text-base font-medium">
                      No videos published in the Video Library yet.
                    </p>
                  </div>
                ) : (
                  videoList.map((vid, idx) => (
                    <motion.div 
                      key={`pub-vid-${vid.id || idx}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="bg-white rounded-2xl overflow-hidden border border-brand-neutral-grey/30 hover:border-brand-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      <div className="relative aspect-video overflow-hidden bg-brand-neutral-charcoal">
                        <img 
                          src={getYouTubeThumbnail(vid.videoUrl) || vid.thumbnail} 
                          alt={vid.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <a 
                          href={vid.videoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full bg-[#1148B8] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play size={24} className="fill-current ml-0.5" />
                          </div>
                        </a>
                        <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">
                          {vid.duration}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-brand-neutral-charcoal/50 mb-2">
                            <span>{vid.date}</span>
                            <span>{vid.views}</span>
                          </div>
                          <h3 className="font-heading text-xl font-bold text-brand-neutral-charcoal mb-2 group-hover:text-brand-primary transition-colors">
                            {vid.title}
                          </h3>
                          <p className="font-body text-xs text-brand-neutral-charcoal/70 line-clamp-2">
                            {vid.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-brand-neutral-grey/20 flex items-center justify-between">
                          <a 
                            href={vid.videoUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-xs font-bold text-brand-primary flex items-center gap-1.5 hover:underline"
                          >
                            <Video size={14} /> Watch Full Recording
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({ title: vid.title, url: vid.videoUrl }).catch(() => {});
                              } else {
                                navigator.clipboard.writeText(vid.videoUrl);
                                alert('Video broadcast link copied to clipboard!');
                              }
                            }}
                            className="p-1 text-brand-neutral-charcoal/40 hover:text-brand-primary cursor-pointer transition-colors"
                            title="Share Broadcast"
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Lightbox Modal for Past Event Photos */}
      <AnimatePresence>
        {selectedLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div>
                <h4 className="font-heading text-lg sm:text-xl font-bold">{selectedLightbox.eventTitle}</h4>
                <p className="text-xs text-white/70">
                  Photo {selectedLightbox.index + 1} of {selectedLightbox.photos.length}
                </p>
              </div>
              <button
                onClick={() => setSelectedLightbox(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Image Stage */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedLightbox.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={selectedLightbox.photos[selectedLightbox.index].url}
                alt={selectedLightbox.photos[selectedLightbox.index].caption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />

              {/* Prev / Next Arrows */}
              {selectedLightbox.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Caption Footer */}
            <div className="text-center text-white z-10 max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm sm:text-base font-medium text-white/90 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm">
                {selectedLightbox.photos[selectedLightbox.index].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
