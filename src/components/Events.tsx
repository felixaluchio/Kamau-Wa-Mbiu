import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/Button';

export function Events() {
  const events = [
    {
      title: "Limuru Town Hall Meeting",
      date: "OCT 24",
      time: "14:00 - 17:00 EAT",
      location: "Limuru Community Centre",
      type: "Town Hall"
    },
    {
      title: "Youth Tech Hub Launch",
      date: "NOV 02",
      time: "10:00 - 13:00 EAT",
      location: "Innovation Hub, Nairobi",
      type: "Launch"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-neutral-charcoal text-brand-neutral-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
             <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
              Upcoming Events
            </span>
            <h2 className="font-heading text-4xl sm:text-[56px] leading-[1.1] mb-6">
              Join the <span className="italic font-light text-brand-neutral-white/70">Conversation.</span>
            </h2>
            <p className="font-body text-brand-neutral-white/60 leading-relaxed text-lg">
              Democracy is an active pursuit. Find out where Kamau will be next and join us in shaping the future of our community.
            </p>
          </div>
          <Button variant="secondary" className="border-brand-neutral-white/20 text-brand-neutral-white hover:bg-brand-neutral-white hover:text-brand-neutral-charcoal">
            View Full Calendar
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, idx) => (
            <div key={idx} className="group bg-brand-neutral-white/5 border border-brand-neutral-white/10 rounded-3xl p-8 hover:bg-brand-neutral-white/10 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="bg-brand-primary/20 text-brand-accent p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px] border border-brand-primary/30">
                  <span className="text-sm font-bold uppercase tracking-widest">{event.date.split(' ')[0]}</span>
                  <span className="font-heading text-4xl mt-1">{event.date.split(' ')[1]}</span>
                </div>
                
                <div className="flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-2 block">{event.type}</span>
                  <h3 className="font-heading text-2xl mb-4 group-hover:text-brand-accent transition-colors">{event.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-brand-neutral-white/50">
                    <span className="flex items-center"><Clock size={14} className="mr-2" /> {event.time}</span>
                    <span className="flex items-center"><MapPin size={14} className="mr-2" /> {event.location}</span>
                  </div>
                </div>

                <div className="sm:ml-auto">
                   <Button variant="ghost" className="text-brand-neutral-white border border-brand-neutral-white/20 hover:bg-brand-accent hover:text-brand-neutral-white hover:border-brand-accent">
                     RSVP
                   </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
