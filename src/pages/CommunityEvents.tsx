import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EventsTabToggle, EventTab } from '../components/EventsTabToggle';
import { Calendar as CalendarIcon, MapPin, Users, Clock, Filter, Share2, Play, Video, CheckCircle2, Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventPhoto {
  url: string;
  caption: string;
}

export function CommunityEvents() {
  const [activeTab, setActiveTab] = useState<EventTab>('Upcoming Events');
  const [selectedLightbox, setSelectedLightbox] = useState<{
    eventTitle: string;
    photos: EventPhoto[];
    index: number;
  } | null>(null);

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

  const upcomingEvents = [
    {
      id: 1,
      title: 'Limuru Town Hall Meeting',
      type: 'Town Hall',
      date: 'Oct 28, 2023',
      time: '14:00 - 17:00',
      location: 'Limuru Community Center',
      attendees: 145,
      isAttending: true,
      description: 'Join us for an open dialogue regarding the recent agricultural reforms and local infrastructure improvements.'
    },
    {
      id: 2,
      title: 'Youth Tech Mentorship Kickoff',
      type: 'Workshop',
      date: 'Nov 02, 2023',
      time: '09:00 - 13:00',
      location: 'Innovation Hub, Kiambu',
      attendees: 82,
      isAttending: false,
      description: 'The start of our 6-week mentorship program connecting established tech professionals with university students.'
    },
    {
      id: 3,
      title: 'Agricultural Policy Dialogue',
      type: 'Conference',
      date: 'Nov 15, 2023',
      time: '10:00 - 15:00',
      location: 'Tigoni Farmers Co-op',
      attendees: 210,
      isAttending: false,
      description: 'A deep dive into the Kamau Wa Mbiu agricultural framework. Expert panels and open Q&A sessions.'
    }
  ];

  const pastEvents = [
    {
      id: 101,
      title: 'Limuru Campaign Launch Rally',
      type: 'Rally',
      date: 'Oct 15, 2023',
      time: '13:00 - 18:00',
      location: 'Limuru Main Grounds',
      attendees: 1250,
      recap: 'Over 1,200 grassroots supporters assembled to unveil the 2027 Strategic Manifesto and volunteer charter.',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
          caption: 'Mass grassroots assembly at Limuru Main Grounds'
        },
        {
          url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
          caption: 'Kamau Wa Mbiu outlining the constituency transformation roadmap'
        },
        {
          url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&auto=format&fit=crop&q=80',
          caption: 'Supporters and organizers signing the citizen leadership charter'
        },
        {
          url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop&q=80',
          caption: 'Celebratory gathering with grassroots delegates'
        }
      ]
    },
    {
      id: 102,
      title: 'Youth Leadership & Economic Summit',
      type: 'Summit',
      date: 'Sep 22, 2023',
      time: '10:00 - 16:00',
      location: 'Kiambu Social Hall',
      attendees: 340,
      recap: 'Deliberations on digital job hubs, technical bursaries, and youth-led agri-business cooperatives.',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
          caption: 'Interactive workshop on digital entrepreneurship pathways'
        },
        {
          url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&auto=format&fit=crop&q=80',
          caption: 'Youth caucus leaders presenting policy resolutions'
        },
        {
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
          caption: 'Roundtable dialogue between entrepreneurs and mentors'
        }
      ]
    }
  ];

  const videoLibrary = [
    {
      id: 201,
      title: '2027 Vision Keynote Address - Kamau Wa Mbiu',
      duration: '42:15',
      date: 'Oct 15, 2023',
      views: '4.2k views',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      description: 'Full recording of the keynote manifesto presentation outlining the 4 strategic pillars for Limuru constituency.'
    },
    {
      id: 202,
      title: 'Agricultural Modernization Panel Q&A',
      duration: '28:40',
      date: 'Sep 30, 2023',
      views: '2.8k views',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      description: 'Live interactive exchange with tea farmers, co-op leaders, and agricultural technology innovators.'
    }
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
              <CalendarIcon className="text-brand-primary" size={32} />
              Community Events
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 text-lg">
              Join local gatherings, town halls, and workshops to connect and contribute in person.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto" leftIcon={<Filter size={16} />}>Filter</Button>
            <Button className="w-full md:w-auto">Host an Event</Button>
          </div>
        </div>

        {/* Pill-Shaped Tab Toggle */}
        <div className="flex justify-start sm:justify-start">
          <EventsTabToggle activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-heading text-2xl text-brand-neutral-charcoal mb-4">
              {activeTab === 'Upcoming Events' && 'Upcoming Schedule'}
              {activeTab === 'Past Events' && 'Past Events & Recaps'}
              {activeTab === 'Video Library' && 'Recorded Events & Live Streams'}
            </h2>
            
            <AnimatePresence mode="wait">
              {activeTab === 'Upcoming Events' && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4"
                >
                  {upcomingEvents.map((evt, idx) => (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <Card className={`p-6 border transition-all duration-300 group ${
                        evt.isAttending 
                          ? 'bg-brand-primary/5 border-brand-primary/30 shadow-md' 
                          : 'bg-white border-brand-neutral-grey/20 hover:border-brand-primary/30 hover:shadow-md'
                      }`}>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-32 shrink-0 text-center md:text-left flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start border-b md:border-b-0 border-brand-neutral-grey/20 pb-4 md:pb-0">
                            <div>
                              <p className="font-body font-bold text-brand-primary uppercase tracking-widest text-xs mb-1">{evt.date.split(',')[0]}</p>
                              <p className="font-heading text-3xl text-brand-neutral-charcoal">{evt.date.split(' ')[1].replace(',','')}</p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-brand-neutral-warm text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal md:mt-2">
                              {evt.type}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-heading text-xl text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors">{evt.title}</h3>
                              <button className="text-brand-neutral-charcoal/40 hover:text-brand-primary transition-colors">
                                <Share2 size={18} />
                              </button>
                            </div>
                            <p className="font-body text-sm text-brand-neutral-charcoal/70 mb-4">
                              {evt.description}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-brand-neutral-charcoal/60 mb-6">
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand-primary" /> {evt.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-brand-secondary" /> {evt.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users size={14} className="text-brand-accent" /> {evt.attendees} Attending
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {evt.isAttending ? (
                                <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-error-50 hover:text-error-600 hover:border-error-200">Cancel RSVP</Button>
                              ) : (
                                <Button>RSVP Now</Button>
                              )}
                              <Button variant="outline">Add to Calendar</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'Past Events' && (
                <motion.div
                  key="past"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-4"
                >
                  {pastEvents.map((evt, idx) => (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <Card className="p-6 border border-brand-neutral-grey/20 bg-white hover:border-brand-primary/30 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-32 shrink-0">
                            <p className="font-body font-bold text-brand-neutral-charcoal/50 uppercase tracking-widest text-xs mb-1">{evt.date}</p>
                            <span className="px-2.5 py-1 rounded-full bg-brand-neutral-warm text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal inline-block mt-1">
                              {evt.type}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-heading text-xl text-brand-neutral-charcoal">{evt.title}</h3>
                              <span className="text-xs font-bold text-success-700 bg-success-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={12} /> Concluded
                              </span>
                            </div>
                            <p className="font-body text-sm text-brand-neutral-charcoal/70 mb-4">
                              {evt.recap}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-brand-neutral-charcoal/60 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-brand-secondary" /> {evt.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users size={14} className="text-brand-accent" /> {evt.attendees} Turnout
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <Button variant="outline" size="sm">Read Full Minutes & Policy Notes</Button>
                            </div>

                            {/* Pictures of the Past Event */}
                            <div className="pt-3 border-t border-brand-neutral-grey/20">
                              <div className="flex items-center justify-between mb-2.5">
                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-neutral-charcoal/70">
                                  <Camera size={14} className="text-brand-primary" />
                                  <span>Event Photos ({evt.photos.length})</span>
                                </div>
                                <span 
                                  onClick={() => handleOpenLightbox(evt.title, evt.photos, 0)}
                                  className="text-xs text-brand-primary font-medium cursor-pointer hover:underline"
                                >
                                  Expand Gallery
                                </span>
                              </div>

                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {evt.photos.map((photo, pIdx) => (
                                  <div
                                    key={pIdx}
                                    onClick={() => handleOpenLightbox(evt.title, evt.photos, pIdx)}
                                    className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-brand-neutral-warm border border-brand-neutral-grey/30 cursor-pointer shadow-xs hover:shadow-sm transition-all"
                                  >
                                    <img
                                      src={photo.url}
                                      alt={photo.caption}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                      <Eye size={16} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'Video Library' && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {videoLibrary.map((vid, idx) => (
                    <motion.div
                      key={vid.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <Card className="overflow-hidden border border-brand-neutral-grey/20 bg-white hover:border-brand-primary/40 hover:shadow-md transition-all flex flex-col h-full group">
                        <div className="relative aspect-video overflow-hidden bg-brand-neutral-charcoal">
                          <img 
                            src={vid.thumbnail} 
                            alt={vid.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#1148B8] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Play size={20} className="fill-current ml-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                            {vid.duration}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs text-brand-neutral-charcoal/50 mb-1">
                              <span>{vid.date}</span>
                              <span>{vid.views}</span>
                            </div>
                            <h3 className="font-heading text-base font-bold text-brand-neutral-charcoal mb-2 group-hover:text-brand-primary transition-colors">
                              {vid.title}
                            </h3>
                            <p className="font-body text-xs text-brand-neutral-charcoal/70 line-clamp-2">
                              {vid.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-brand-neutral-grey/20 flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-primary flex items-center gap-1.5">
                              <Video size={14} /> Watch Stream
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-brand-neutral-charcoal text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-primary/30 rounded-full blur-[40px] pointer-events-none" />
              <h3 className="font-heading text-xl mb-2 relative z-10">Your Schedule</h3>
              <p className="text-sm text-white/60 mb-6 relative z-10">You have 1 upcoming event.</p>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Oct 28 • 14:00</p>
                  <p className="font-heading text-lg mb-1">Limuru Town Hall</p>
                  <p className="text-xs text-white/70 flex items-center gap-1"><MapPin size={12} /> Limuru Community Center</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-brand-neutral-grey/20 shadow-sm">
              <h3 className="font-heading text-xl text-brand-neutral-charcoal mb-4">Past Events Archive</h3>
              <p className="text-sm text-brand-neutral-charcoal/60 mb-4">Missed an event? Catch up on the discussions and materials.</p>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('Past Events')}
                  className="w-full text-left p-3 rounded-lg hover:bg-brand-neutral-warm border border-transparent hover:border-brand-neutral-grey/20 transition-all flex justify-between items-center group"
                >
                  <div>
                    <p className="text-sm font-bold text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors">Campaign Launch Rally</p>
                    <p className="text-xs text-brand-neutral-charcoal/50">Oct 15, 2023</p>
                  </div>
                  <span className="text-xs font-bold text-brand-primary">View Recap</span>
                </button>
                <button 
                  onClick={() => setActiveTab('Past Events')}
                  className="w-full text-left p-3 rounded-lg hover:bg-brand-neutral-warm border border-transparent hover:border-brand-neutral-grey/20 transition-all flex justify-between items-center group"
                >
                  <div>
                    <p className="text-sm font-bold text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors">Youth Leadership Summit</p>
                    <p className="text-xs text-brand-neutral-charcoal/50">Sep 22, 2023</p>
                  </div>
                  <span className="text-xs font-bold text-brand-primary">View Recap</span>
                </button>
              </div>
            </Card>
          </div>

        </div>
      </div>

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
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
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
                    className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all"
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
    </CommunityLayout>
  );
}

