import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Search, MessageSquare, Inbox, Star, Archive, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);

  const messages = [
    { id: 1, sender: 'Josephine K.', subject: 'Volunteer Availability for Weekend', preview: 'I wanted to check if you still need help this Saturday for the...', time: '10:42 AM', unread: true, tag: 'Volunteer' },
    { id: 2, sender: 'Press Team', subject: 'Interview Request: Standard News', preview: 'We would like to schedule a 30-minute sit-down interview with...', time: 'Yesterday', unread: true, tag: 'Media' },
    { id: 3, sender: 'Tech Hub Admin', subject: 'Follow up on mentorship', preview: 'Thank you for visiting the hub. The students were very excited...', time: 'Oct 24', unread: false, tag: 'Community' },
    { id: 4, sender: 'David Omondi', subject: 'Policy Suggestion: Local Transport', preview: 'I have attached a brief regarding the proposed changes to the...', time: 'Oct 22', unread: false, tag: 'Policy' },
  ];

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col sm:flex-row gap-6">
        
        {/* Inbox Sidebar */}
        <Card className="w-full sm:w-80 lg:w-96 bg-white border border-brand-neutral-grey/30 flex flex-col shrink-0 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-brand-neutral-grey/20 bg-brand-neutral-warm/30">
            <h2 className="font-heading text-xl text-brand-neutral-charcoal flex items-center gap-2 mb-4">
              <Inbox className="text-brand-primary" /> Inbox
            </h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-neutral-grey/30 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg.id)}
                className={`w-full text-left p-4 border-b border-brand-neutral-grey/10 transition-colors relative ${
                  selectedMessage === msg.id 
                    ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' 
                    : 'hover:bg-brand-neutral-warm/50 border-l-4 border-l-transparent'
                }`}
              >
                {msg.unread && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary" />
                )}
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-bold truncate pr-4 ${msg.unread ? 'text-brand-neutral-charcoal' : 'text-brand-neutral-charcoal/70'}`}>
                    {msg.sender}
                  </span>
                  <span className="text-xs text-brand-neutral-charcoal/40 whitespace-nowrap">{msg.time}</span>
                </div>
                <p className={`text-sm mb-1 truncate ${msg.unread ? 'font-semibold text-brand-neutral-charcoal' : 'text-brand-neutral-charcoal/70'}`}>
                  {msg.subject}
                </p>
                <p className="text-xs text-brand-neutral-charcoal/50 truncate mb-2">
                  {msg.preview}
                </p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-brand-neutral-warm text-brand-neutral-charcoal/60">
                  {msg.tag}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Message Content */}
        <Card className="flex-1 bg-white border border-brand-neutral-grey/30 overflow-hidden shadow-sm flex flex-col min-h-0 hidden sm:flex">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
              >
                {/* Message Header */}
                <div className="p-6 border-b border-brand-neutral-grey/20 shrink-0">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-heading text-2xl text-brand-neutral-charcoal">
                      Volunteer Availability for Weekend
                    </h2>
                    <div className="flex gap-2">
                      <button className="p-2 text-brand-neutral-charcoal/40 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                        <Star size={18} />
                      </button>
                      <button className="p-2 text-brand-neutral-charcoal/40 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                        <Archive size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary">
                      JK
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-neutral-charcoal">Josephine K. <span className="text-brand-neutral-charcoal/40 font-normal">&lt;josephine@example.com&gt;</span></p>
                      <p className="text-xs text-brand-neutral-charcoal/50">Today at 10:42 AM</p>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 overflow-y-auto p-6 font-body text-sm text-brand-neutral-charcoal/80 leading-relaxed">
                  <p className="mb-4">Hello Team,</p>
                  <p className="mb-4">
                    I wanted to check if you still need help this Saturday for the community cleanup drive in Limuru. I have gathered a group of 5 friends from my university who are eager to participate and support the vision.
                  </p>
                  <p className="mb-4">
                    Please let us know what time we should arrive and if there's any specific equipment we should bring with us (gloves, bags, etc).
                  </p>
                  <p className="mb-4">
                    Looking forward to making a difference!
                  </p>
                  <p>
                    Best regards,<br/>
                    Josephine
                  </p>
                </div>

                {/* Reply Area */}
                <div className="p-4 border-t border-brand-neutral-grey/20 bg-brand-neutral-warm/30 shrink-0">
                  <div className="bg-white border border-brand-neutral-grey/30 rounded-xl overflow-hidden focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all">
                    <textarea 
                      rows={3} 
                      placeholder="Write your reply..."
                      className="w-full p-4 text-sm focus:outline-none resize-none bg-transparent"
                    />
                    <div className="px-4 py-3 bg-brand-neutral-warm/50 border-t border-brand-neutral-grey/20 flex justify-between items-center">
                      <button className="text-xs font-bold text-brand-neutral-charcoal/50 hover:text-brand-primary flex items-center gap-2 transition-colors">
                        Use Template
                      </button>
                      <button className="px-4 py-1.5 bg-brand-primary text-white rounded-lg text-sm font-bold hover:bg-brand-primary/90 transition-colors flex items-center gap-2">
                        Send <Send size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-brand-neutral-charcoal/40">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-heading text-lg">Select a message to read</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </AdminLayout>
  );
}
