import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Video, MessageSquare, ThumbsUp, Users, Radio, Share2, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CommunityTownhall() {
  const [activeTab, setActiveTab] = useState('qna');
  const [question, setQuestion] = useState('');

  const questions = [
    { id: 1, text: "How will the new agricultural policies protect small-scale farmers from price fluctuations?", author: "Grace W.", upvotes: 342, status: 'Answered' },
    { id: 2, text: "What specific steps are being taken to improve the road network connecting Tigoni to the main highway?", author: "John M.", upvotes: 256, status: 'Up Next' },
    { id: 3, text: "Can you elaborate on the funding for the proposed youth tech hubs?", author: "David K.", upvotes: 189, status: 'Queued' },
    { id: 4, text: "How will we ensure clean water access during the dry season?", author: "Sarah N.", upvotes: 145, status: 'Queued' },
  ];

  return (
    <CommunityLayout>
      <div className="space-y-6 pb-12 h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-100 text-error-700 text-[10px] font-bold uppercase tracking-widest">
                <Radio size={12} className="animate-pulse" /> Live Now
              </div>
              <span className="text-sm font-bold text-brand-neutral-charcoal/50 flex items-center gap-1.5">
                <Users size={14} /> 1,248 Watching
              </span>
            </div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal">Digital Town Hall: Agricultural Reform</h1>
          </div>
          <Button variant="outline" leftIcon={<Share2 size={16} />}>Share Stream</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          {/* Video Player Area */}
          <div className="lg:w-2/3 flex flex-col gap-6 shrink-0 lg:shrink">
            <Card className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative border-none shadow-xl flex items-center justify-center group cursor-pointer">
              {/* Fake Video Player Placeholder */}
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop" alt="Townhall Stream" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all z-10" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-2 h-2 rounded-full bg-error-500 animate-pulse" />
                  <span className="text-sm font-bold">LIVE: Kamau Wa Mbiu Address</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-brand-neutral-grey/30 hidden lg:block">
              <h3 className="font-heading text-xl mb-2">About this Session</h3>
              <p className="text-sm text-brand-neutral-charcoal/70 leading-relaxed mb-4">
                Join Kamau Wa Mbiu for an interactive digital town hall discussing the upcoming agricultural reforms, infrastructure improvements, and answering your top-voted questions directly.
              </p>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50">
                <span>Duration: 2 Hours</span>
                <span>Topic: Agriculture & Infrastructure</span>
              </div>
            </Card>
          </div>

          {/* Q&A / Chat Area */}
          <Card className="lg:w-1/3 flex flex-col bg-white border border-brand-neutral-grey/30 overflow-hidden shadow-sm h-[500px] lg:h-auto">
            <div className="flex items-center border-b border-brand-neutral-grey/20 shrink-0">
              <button 
                onClick={() => setActiveTab('qna')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'qna' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-neutral-charcoal/50 hover:text-brand-neutral-charcoal'
                }`}
              >
                Top Questions
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'chat' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-neutral-charcoal/50 hover:text-brand-neutral-charcoal'
                }`}
              >
                Live Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-brand-neutral-warm/20">
              <AnimatePresence mode="wait">
                {activeTab === 'qna' ? (
                  <motion.div key="qna" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    {questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-xl border transition-all ${
                        q.status === 'Answered' ? 'bg-brand-neutral-warm/50 border-brand-neutral-grey/20 opacity-70' :
                        q.status === 'Up Next' ? 'bg-brand-primary/5 border-brand-primary/30 shadow-sm' :
                        'bg-white border-brand-neutral-grey/20 hover:border-brand-primary/30'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                            q.status === 'Answered' ? 'bg-brand-neutral-grey/20 text-brand-neutral-charcoal/50' :
                            q.status === 'Up Next' ? 'bg-brand-primary text-white' :
                            'bg-brand-neutral-warm text-brand-neutral-charcoal'
                          }`}>
                            {q.status}
                          </span>
                          <span className="text-xs text-brand-neutral-charcoal/50 font-medium">By {q.author}</span>
                        </div>
                        <p className="text-sm text-brand-neutral-charcoal font-medium mb-3">{q.text}</p>
                        <div className="flex items-center justify-between">
                          <button className="flex items-center gap-1.5 text-xs font-bold text-brand-neutral-charcoal/50 hover:text-brand-primary transition-colors">
                            <ThumbsUp size={14} /> {q.upvotes}
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full justify-end space-y-3">
                    <div className="text-center text-xs text-brand-neutral-charcoal/40 font-bold uppercase tracking-widest mb-4">Chat Started</div>
                    <div className="text-sm"><span className="font-bold text-brand-secondary">Mike T.</span> Great point on the water issue!</div>
                    <div className="text-sm"><span className="font-bold text-brand-primary">Sarah N.</span> Yes, we need more clarity on the timeline.</div>
                    <div className="text-sm"><span className="font-bold text-brand-accent">Peter O.</span> Tuning in from Limuru CBD! 🇰🇪</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-brand-neutral-grey/20 bg-white shrink-0">
              <div className="relative">
                <input 
                  type="text" 
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={activeTab === 'qna' ? "Ask a question..." : "Send a message..."}
                  className="w-full pl-4 pr-12 py-3 bg-brand-neutral-warm/50 border border-brand-neutral-grey/30 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CommunityLayout>
  );
}
