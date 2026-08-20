import React from 'react';
import { motion } from 'motion/react';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/ui/Card';
import { CheckCircle, XCircle, Heart, Shield, Users, Lightbulb, Activity, Type, Image as ImageIcon, Sparkles, Layout, MousePointer2 } from 'lucide-react';

export function UXBiblePage() {
  return (
    <PageLayout breadcrumb={[{ label: 'UX Bible', href: '/ux-bible' }]}>
      {/* Hero Section */}
      <section className="bg-brand-neutral-charcoal text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-secondary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> The Single Source of Truth
            </span>
            <h1 className="font-heading text-display-md sm:text-display-lg mb-6 leading-tight">
              Definitive UX Bible
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-body font-light leading-relaxed max-w-3xl">
              This document governs every aspect of the Kamau Wa Mbiu Digital Leadership Platform. Nothing should be created unless it follows this guide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents / Main Content */}
      <div className="max-w-5xl mx-auto px-xs sm:px-sm lg:px-md py-20 space-y-32">
        
        {/* Product Philosophy */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <Shield className="text-brand-primary" /> Product Philosophy
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xl leading-relaxed text-brand-neutral-charcoal/80 mb-6">
                The platform is <strong className="text-brand-primary">not a political website</strong>. It is a digital leadership experience.
              </p>
              <p className="text-body text-brand-neutral-charcoal/70">
                Everything we build must transcend typical campaign cycles and reinforce the core tenets of our movement.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Trust', 'Hope', 'Competence', 'Service', 'Community', 'Transparency', 'Innovation'].map((value, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-brand-neutral-grey/20 text-center shadow-sm">
                  <span className="font-heading text-lg text-brand-neutral-charcoal font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emotional Design */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <Heart className="text-brand-accent" /> Emotional Design
            </h2>
          </div>
          <p className="text-xl mb-12 text-brand-neutral-charcoal/70">Every design decision should support this emotional journey.</p>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-primary/20 hidden sm:block" />
            <div className="space-y-8">
              {[
                { stage: "When landing", emotion: "Curiosity", desc: "Draw them in with compelling visuals and clear messaging." },
                { stage: "After scrolling", emotion: "Trust", desc: "Demonstrate competence and transparency." },
                { stage: "After reading", emotion: "Connection", desc: "Resonate with their personal and community struggles." },
                { stage: "After exploring", emotion: "Confidence", desc: "Show a clear, actionable plan for the future." },
                { stage: "Before leaving", emotion: "Motivation", desc: "Inspire action, not just passive agreement." },
                { stage: "After returning", emotion: "Belonging", desc: "Make them feel part of an ongoing movement." }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:items-center relative z-10">
                  <div className="w-16 h-16 rounded-full bg-brand-neutral-warm border-2 border-brand-primary/20 flex items-center justify-center shrink-0 text-brand-primary font-bold">
                    0{idx + 1}
                  </div>
                  <Card className="flex-1 p-6 bg-white border border-brand-neutral-grey/20 hover:border-brand-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-1 block">{step.stage}</span>
                        <h4 className="font-heading text-2xl text-brand-primary">{step.emotion}</h4>
                      </div>
                      <p className="text-sm text-brand-neutral-charcoal/70 sm:text-right max-w-sm">{step.desc}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <Type className="text-brand-primary" /> Voice & Tone
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-success-50/50 border border-success-100">
              <h3 className="font-heading text-2xl mb-6 flex items-center gap-2 text-success-900">
                <CheckCircle className="text-success-500" /> Always Be
              </h3>
              <ul className="space-y-4">
                {['Respectful', 'Confident', 'Clear', 'Hopeful', 'Inclusive', 'Professional', 'Conversational'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-success-900/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-success-500" /> {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-8 bg-error-50/50 border border-error-100">
              <h3 className="font-heading text-2xl mb-6 flex items-center gap-2 text-error-900">
                <XCircle className="text-error-500" /> Never Be
              </h3>
              <ul className="space-y-4">
                {['Aggressive', 'Arrogant', 'Overly political', 'Sensational', 'Fear-based'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-error-900/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500" /> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <div className="mt-8 p-6 bg-brand-neutral-charcoal text-white rounded-2xl text-center">
            <p className="font-heading text-2xl italic font-light">"Every sentence should sound like Kamau himself."</p>
          </div>
        </section>

        {/* Writing Guidelines */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <Type className="text-brand-secondary" /> Writing Guidelines
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { label: 'Use Short Paragraphs', desc: 'Keep it scannable.' },
                { label: 'Strong Headlines', desc: 'Make the point immediately.' },
                { label: 'Meaningful Quotes', desc: 'Highlight human impact.' },
                { label: 'Simple Language', desc: 'Write for a 6th-grade level.' },
                { label: 'Authentic Storytelling', desc: 'Ground policy in reality.' }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-brand-neutral-grey/20">
                  <h4 className="font-bold text-brand-neutral-charcoal mb-2">{item.label}</h4>
                  <p className="text-sm text-brand-neutral-charcoal/60">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-brand-primary text-white p-8 rounded-3xl flex flex-col justify-center">
              <h4 className="font-heading text-2xl mb-6">Avoid at all costs:</h4>
              <ul className="space-y-4 font-bold opacity-90">
                <li className="flex items-center gap-2"><XCircle size={18} /> Jargon</li>
                <li className="flex items-center gap-2"><XCircle size={18} /> Clichés</li>
                <li className="flex items-center gap-2"><XCircle size={18} /> Empty promises</li>
              </ul>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-lg font-heading">Write for citizens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Storytelling & Assets */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <ImageIcon className="text-brand-primary" /> Visual & Media Style
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Photography</h3>
              <p className="text-brand-neutral-charcoal/70 mb-6">Prioritize authentic Kenyan imagery. Avoid staged stock photography.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Real communities', 'Real people', 'Natural lighting', 'Human moments', 'Leadership in action'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-neutral-warm rounded-full text-xs font-bold text-brand-neutral-charcoal/80">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">Iconography</h3>
              <p className="text-brand-neutral-charcoal/70 mb-6">One consistent outline icon system (Lucide). Elegant. Minimal. Readable.</p>
              
              <h3 className="text-xl font-bold mb-4">Illustration Style</h3>
              <p className="text-brand-neutral-charcoal/70">Soft. Modern. Minimal. Civic. Human.</p>
            </div>
            
            <div className="bg-brand-neutral-charcoal text-white p-8 rounded-3xl">
              <h3 className="font-heading text-2xl mb-6 text-brand-secondary">Visual Storytelling</h3>
              <p className="text-lg leading-relaxed text-white/80 mb-8">
                Every page should tell a story. Avoid blocks of text. Balance photography, illustration, whitespace, motion, and typography.
              </p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-white/50">Page Rhythm</h4>
                <div className="flex flex-col gap-2">
                  <div className="text-center py-2 bg-white/10 rounded">Image</div>
                  <div className="text-center py-1 text-white/30">↓</div>
                  <div className="text-center py-2 bg-white/10 rounded">Text</div>
                  <div className="text-center py-1 text-white/30">↓</div>
                  <div className="text-center py-2 bg-white/10 rounded border border-brand-primary text-brand-primary">Interactive</div>
                  <div className="text-center py-1 text-white/30">↓</div>
                  <div className="text-center py-2 bg-white/10 rounded">Image</div>
                  <div className="text-center py-1 text-white/30">↓</div>
                  <div className="text-center py-2 bg-brand-primary text-white font-bold rounded">Call to Action</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Behavior & Motion */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <MousePointer2 className="text-brand-accent" /> Interaction & Motion
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white border border-brand-neutral-grey/20">
              <h3 className="text-xl font-bold mb-6">Component Behavior</h3>
              <p className="text-brand-neutral-charcoal/70 mb-8">Every interaction should feel predictable.</p>
              <ul className="space-y-6">
                <li>
                  <strong className="block mb-1">Buttons</strong>
                  <span className="text-sm text-brand-neutral-charcoal/60">Respond immediately to touch/click.</span>
                </li>
                <li>
                  <strong className="block mb-1">Cards</strong>
                  <span className="text-sm text-brand-neutral-charcoal/60">Gently elevate on hover to signify interactability.</span>
                </li>
                <li>
                  <strong className="block mb-1">Navigation</strong>
                  <span className="text-sm text-brand-neutral-charcoal/60">Never surprises users; maintains context.</span>
                </li>
                <li>
                  <strong className="block mb-1">Forms</strong>
                  <span className="text-sm text-brand-neutral-charcoal/60">Guide users clearly with inline validation.</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-white border border-brand-neutral-grey/20">
              <h3 className="text-xl font-bold mb-6">Motion Principles</h3>
              <div className="flex gap-4 mb-8">
                <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl font-bold text-sm">Guide</span>
                <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl font-bold text-sm">Clarify</span>
                <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl font-bold text-sm">Reward</span>
              </div>
              <p className="text-xl font-heading text-error-600 border-l-4 border-error-500 pl-4">
                Motion should never distract.
              </p>
            </Card>
          </div>
        </section>

        {/* Calls to Action */}
        <section>
          <div className="mb-12 border-b border-brand-neutral-grey/30 pb-6">
            <h2 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-4">
              <Activity className="text-brand-primary" /> Calls to Action
            </h2>
          </div>
          <div className="bg-brand-neutral-warm p-8 sm:p-12 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Never pressure users.</h3>
            <p className="text-lg text-brand-neutral-charcoal/70 mb-12">Instead, invite participation.</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Be Part of the Vision",
                "Join the Conversation",
                "Explore the Journey",
                "Support Community Initiatives",
                "Stay Connected"
              ].map((cta, i) => (
                <div key={i} className="px-6 py-3 bg-white border border-brand-neutral-grey/30 shadow-sm rounded-full font-bold text-brand-primary">
                  {cta}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI & Accessibility */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="mb-8 border-b border-brand-neutral-grey/30 pb-4">
              <h2 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
                <Sparkles className="text-brand-secondary" /> AI Principles
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-brand-secondary shrink-0 mt-0.5" size={20} />
                <span className="text-brand-neutral-charcoal/80">Be transparent that they are interacting with AI.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-error-500 shrink-0 mt-0.5" size={20} />
                <span className="text-brand-neutral-charcoal/80">Never invent facts (Zero Hallucination Tolerance).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-brand-secondary shrink-0 mt-0.5" size={20} />
                <span className="text-brand-neutral-charcoal/80">Clearly distinguish between verified information and opinion.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-brand-secondary shrink-0 mt-0.5" size={20} />
                <span className="text-brand-neutral-charcoal/80">Respect privacy absolutely.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-brand-secondary shrink-0 mt-0.5" size={20} />
                <span className="text-brand-neutral-charcoal/80">Encourage human engagement (handoff to real volunteers).</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-8 border-b border-brand-neutral-grey/30 pb-4">
              <h2 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
                <Users className="text-brand-accent" /> Accessibility
              </h2>
            </div>
            <div className="p-8 bg-brand-accent/10 rounded-3xl border border-brand-accent/20">
              <p className="text-xl font-heading text-brand-accent-900 leading-relaxed">
                "Every citizen should be able to use the platform regardless of age or ability."
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-accent-700">WCAG AA</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-accent-700">Keyboard Nav</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-accent-700">Screen Readers</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-accent-700">Contrast</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-accent-700">Reduced Motion</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Checklist */}
        <section>
          <div className="bg-brand-primary text-white p-8 sm:p-16 rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-4xl sm:text-5xl mb-12">Quality Checklist</h2>
              <p className="text-xl text-white/80 mb-12 font-light">Before publishing any page, ask:</p>
              
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-2xl mx-auto">
                {[
                  "Is it useful?",
                  "Is it clear?",
                  "Is it trustworthy?",
                  "Is it accessible?",
                  "Is it beautiful?",
                  "Is it fast?",
                  "Would a first-time visitor understand it?",
                  "Would they want to come back?"
                ].map((question, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Layout size={16} />
                    </div>
                    <span className="text-lg font-medium">{question}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
