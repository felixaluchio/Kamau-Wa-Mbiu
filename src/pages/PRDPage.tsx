import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Target, Users, Zap, Shield, Map, Settings, CheckSquare, AlertTriangle, LayoutDashboard, Flag, Rocket, ChevronRight, ChevronDown } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function PRDPage() {
  const [activeSection, setActiveSection] = useState('vision');

  const sections = [
    { id: 'vision', label: 'Vision & Mission', icon: <Flag size={18} /> },
    { id: 'users', label: 'Target Users & Goals', icon: <Users size={18} /> },
    { id: 'features', label: 'Core Features', icon: <LayoutDashboard size={18} /> },
    { id: 'metrics', label: 'Success Metrics', icon: <Target size={18} /> },
    { id: 'nfr', label: 'Non-Functional Requirements', icon: <Zap size={18} /> },
    { id: 'functional', label: 'Functional Requirements', icon: <Settings size={18} /> },
    { id: 'acceptance', label: 'Acceptance Criteria', icon: <CheckSquare size={18} /> },
    { id: 'risks', label: 'Risks & Mitigation', icon: <AlertTriangle size={18} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={18} /> },
  ];

  return (
    <PageLayout breadcrumb={[{ label: 'Product Requirements Document', href: '/prd' }]}>
      {/* Header */}
      <section className="bg-brand-neutral-charcoal text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-white/10 text-brand-primary rounded-full text-xs font-bold tracking-widest uppercase border border-brand-primary/30">
              Official PRD
            </span>
            <span className="text-white/50 text-sm">v1.0.0</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6">Kamau Wa Mbiu <br /><span className="text-brand-primary font-light italic">Digital Leadership Platform</span></h1>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed font-light">
            A comprehensive product requirements document guiding the design, engineering, and operational strategy of Kenya's most modern civic leadership platform.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 bg-brand-neutral-warm">
        <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 sticky top-24 shrink-0">
              <Card className="p-4 bg-white border border-brand-neutral-grey/20">
                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-neutral-charcoal/50 mb-4 px-4">Document Index</h3>
                <nav className="space-y-1">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                        activeSection === section.id 
                          ? 'bg-brand-primary/10 text-brand-primary font-bold' 
                          : 'text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm hover:text-brand-neutral-charcoal'
                      }`}
                    >
                      <span className={activeSection === section.id ? 'text-brand-primary' : 'text-brand-neutral-charcoal/40'}>
                        {section.icon}
                      </span>
                      {section.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  
                  {activeSection === 'vision' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <Flag size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Product Vision & Mission</h2>
                      </div>
                      
                      <div className="space-y-10">
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-brand-primary">Vision</h3>
                          <p className="text-lg text-brand-neutral-charcoal/80 leading-relaxed bg-brand-neutral-warm p-6 rounded-2xl border border-brand-neutral-grey/20">
                            Build Kenya's most modern civic leadership platform. This platform is not simply an informational website. It is the official digital ecosystem where citizens can learn, engage, participate, volunteer, ask questions, track community impact, and stay updated. The platform should strengthen trust between leadership and citizens.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-brand-secondary">Mission</h3>
                          <p className="text-lg text-brand-neutral-charcoal/80 leading-relaxed bg-brand-neutral-warm p-6 rounded-2xl border border-brand-neutral-grey/20">
                            Create a transparent, accessible, AI-powered digital platform that connects leadership with communities through information, engagement, participation, and measurable impact.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSection === 'users' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                          <Users size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Target Users & Goals</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div>
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary"></div> Primary Users</h3>
                          <ul className="space-y-3 bg-brand-neutral-warm p-6 rounded-2xl border border-brand-neutral-grey/20">
                            {['Citizens', 'Youth', 'Farmers', 'Entrepreneurs', 'Professionals', 'Women Groups', 'Religious Organizations', 'Community Leaders'].map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-brand-neutral-charcoal/80"><CheckSquare size={14} className="text-brand-primary/50" /> {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-8">
                          <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-secondary"></div> Secondary Users</h3>
                            <ul className="grid grid-cols-2 gap-3 bg-brand-neutral-warm p-6 rounded-2xl border border-brand-neutral-grey/20">
                              {['Journalists', 'Researchers', 'Development Partners', 'NGOs', 'Volunteers'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-brand-neutral-charcoal/80"><CheckSquare size={14} className="text-brand-secondary/50" /> {item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-neutral-charcoal"></div> Internal Users</h3>
                            <ul className="grid grid-cols-2 gap-3 bg-brand-neutral-warm p-6 rounded-2xl border border-brand-neutral-grey/20">
                              {['Administrators', 'Campaign Team', 'Media Team', 'Events Team', 'Content Editors', 'AI Knowledge Managers'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-brand-neutral-charcoal/80"><CheckSquare size={14} className="text-brand-neutral-charcoal/30" /> {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-heading text-xl mb-4 border-b border-brand-neutral-grey/20 pb-2">User Goals</h3>
                          <ul className="space-y-2 text-brand-neutral-charcoal/80">
                            <li>• Learn about Kamau and his vision</li>
                            <li>• Read policies and manifesto</li>
                            <li>• Attend events and volunteer</li>
                            <li>• Submit ideas and report issues</li>
                            <li>• Contact leadership directly</li>
                            <li>• Receive timely updates</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-heading text-xl mb-4 border-b border-brand-neutral-grey/20 pb-2">Business Goals</h3>
                          <ul className="space-y-2 text-brand-neutral-charcoal/80">
                            <li>• Increase community engagement</li>
                            <li>• Increase newsletter subscribers</li>
                            <li>• Increase volunteer registrations</li>
                            <li>• Improve transparency and communication</li>
                            <li>• Strengthen public trust</li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSection === 'features' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                          <LayoutDashboard size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Core Features</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          'Homepage', 'About', 'Vision', 'Manifesto', 
                          'Community Impact', 'News', 'Media', 'Events', 
                          'Gallery', 'Volunteer', 'Citizen Portal', 'AI Assistant', 
                          'Contact', 'CMS', 'Analytics'
                        ].map((feature, i) => (
                          <div key={i} className="p-4 bg-brand-neutral-warm border border-brand-neutral-grey/20 rounded-xl font-medium text-brand-neutral-charcoal flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {activeSection === 'metrics' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-success-500/10 flex items-center justify-center text-success-600">
                          <Target size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Success Metrics</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <h3 className="font-bold text-lg flex items-center gap-2 text-brand-neutral-charcoal">
                            <Zap size={18} className="text-warning-500" /> Technical Performance
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/20">
                              <span className="font-medium text-brand-neutral-charcoal/80">Lighthouse Score</span>
                              <span className="font-bold text-success-600">&gt; 95</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/20">
                              <span className="font-medium text-brand-neutral-charcoal/80">Page Speed</span>
                              <span className="font-bold text-success-600">&lt; 2 seconds</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/20">
                              <span className="font-medium text-brand-neutral-charcoal/80">Bounce Rate</span>
                              <span className="font-bold text-brand-primary">Minimize</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="font-bold text-lg flex items-center gap-2 text-brand-neutral-charcoal">
                            <Users size={18} className="text-brand-secondary" /> Engagement Metrics
                          </h3>
                          <div className="space-y-4">
                            {[
                              'Average Session Time',
                              'Volunteer Growth Rate',
                              'Newsletter Growth Rate',
                              'Event Registrations',
                              'Community Participation (Ideas/Issues)',
                              'AI Engagement Rate'
                            ].map((metric, i) => (
                              <div key={i} className="flex justify-between items-center p-4 bg-brand-neutral-warm rounded-xl border border-brand-neutral-grey/20">
                                <span className="font-medium text-brand-neutral-charcoal/80">{metric}</span>
                                <TrendingUpIcon className="text-brand-secondary" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSection === 'nfr' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <Shield size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Non-Functional Requirements</h2>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                          { title: 'Accessibility', desc: 'WCAG AA compliance, screen reader support, keyboard nav.' },
                          { title: 'Security', desc: 'OWASP top 10, encryption at rest/transit, RBAC.' },
                          { title: 'Performance', desc: 'Edge caching, optimized assets, lazy loading.' },
                          { title: 'Scalability', desc: 'Cloud-native architecture, horizontal scaling.' },
                          { title: 'Maintainability', desc: 'Modular components, typed code (TypeScript), CI/CD.' },
                          { title: 'SEO', desc: 'Server-side rendering where needed, dynamic meta tags, schema.org.' },
                          { title: 'Responsive', desc: 'Mobile-first approach, perfect on all viewports.' },
                          { title: 'Offline Ready', desc: 'PWA capabilities for critical community forms.' }
                        ].map((req, i) => (
                          <div key={i} className="p-6 bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/20 hover:border-brand-primary/30 transition-colors">
                            <h4 className="font-bold text-brand-neutral-charcoal mb-2">{req.title}</h4>
                            <p className="text-sm text-brand-neutral-charcoal/60">{req.desc}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {activeSection === 'functional' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                          <Settings size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Functional Requirements (User Stories)</h2>
                      </div>
                      
                      <div className="space-y-8">
                        <UserStoryGroup title="Public Discovery" stories={[
                          "As a citizen, I want to search policies so that I can quickly understand Kamau's position.",
                          "As a voter, I want to view the leadership journey timeline so that I can evaluate past competence.",
                          "As a journalist, I want to download high-res assets from the Media gallery so I can publish accurate stories."
                        ]} />

                        <UserStoryGroup title="Citizen Engagement Hub" stories={[
                          "As a resident, I want to report a broken water pipe with photos and GPS so that it gets fixed.",
                          "As a youth leader, I want to submit a community development idea so that others can vote on it.",
                          "As a citizen, I want to track the status of my reported issues so I know they are being handled."
                        ]} />

                        <UserStoryGroup title="Volunteer & Events" stories={[
                          "As a volunteer, I want to match with local opportunities based on my skills so I can be most effective.",
                          "As a supporter, I want to register for the digital town hall so I can ask questions directly.",
                          "As an active community member, I want to earn digital badges for my participation."
                        ]} />

                        <UserStoryGroup title="AI Assistant (Ask Kamau)" stories={[
                          "As a busy citizen, I want to ask the AI 'Where is the next town hall?' so I don't have to search manually.",
                          "As an undecided voter, I want to ask the AI about specific agricultural policies to get instant answers.",
                          "As a non-English speaker, I want the AI to respond in Kiswahili so I can understand the manifesto."
                        ]} />
                      </div>
                    </Card>
                  )}

                  {activeSection === 'acceptance' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-success-500/10 flex items-center justify-center text-success-600">
                          <CheckSquare size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Acceptance Criteria</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="p-6 bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/20">
                          <h4 className="font-bold text-brand-neutral-charcoal mb-4 flex items-center gap-2"><FileText size={16} className="text-brand-primary" /> Feature: AI Search</h4>
                          <ul className="space-y-2 text-sm text-brand-neutral-charcoal/80 list-disc list-inside">
                            <li>Given the user enters a natural language query, the system must return semantically relevant results within 1.5 seconds.</li>
                            <li>Given the AI generates a direct answer, it must cite the specific manifesto or policy page used.</li>
                            <li>The AI must never generate responses outside the provided knowledge base (0% hallucination tolerance).</li>
                          </ul>
                        </div>
                        
                        <div className="p-6 bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/20">
                          <h4 className="font-bold text-brand-neutral-charcoal mb-4 flex items-center gap-2"><Map size={16} className="text-brand-secondary" /> Feature: Issue Reporting</h4>
                          <ul className="space-y-2 text-sm text-brand-neutral-charcoal/80 list-disc list-inside">
                            <li>User must be able to upload up to 3 images (max 5MB each).</li>
                            <li>System must capture or allow manual entry of geolocation coordinates.</li>
                            <li>Upon submission, user receives a unique tracking ID and automated email confirmation.</li>
                            <li>Dashboard must reflect the new issue status as "Reported" immediately.</li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeSection === 'risks' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-error-500/10 flex items-center justify-center text-error-600">
                          <AlertTriangle size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Risks & Mitigation</h2>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-brand-neutral-warm text-brand-neutral-charcoal/70 uppercase text-xs">
                            <tr>
                              <th className="px-6 py-4 font-bold rounded-tl-xl">Risk Type</th>
                              <th className="px-6 py-4 font-bold">Description</th>
                              <th className="px-6 py-4 font-bold rounded-tr-xl">Mitigation Strategy</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-neutral-grey/20 text-brand-neutral-charcoal/80">
                            <tr>
                              <td className="px-6 py-4 font-bold text-error-600">Technical</td>
                              <td className="px-6 py-4">High traffic spikes during live digital town halls crashing the site.</td>
                              <td className="px-6 py-4">Implement aggressive CDN caching (Cloudflare), auto-scaling container infrastructure, and rate limiting.</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 font-bold text-warning-600">Content / AI</td>
                              <td className="px-6 py-4">AI Assistant hallucinating policy stances or giving inappropriate answers.</td>
                              <td className="px-6 py-4">Strict RAG (Retrieval-Augmented Generation) implementation. AI only answers from approved CMS knowledge base. Fallback to human contact form if confidence is low.</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 font-bold text-brand-secondary">Security</td>
                              <td className="px-6 py-4">Spam submissions in community ideas or issue reporting.</td>
                              <td className="px-6 py-4">Implement invisible CAPTCHA, require verified email for submissions, and utilize automated content moderation APIs before public display.</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 font-bold text-brand-neutral-charcoal">Operational</td>
                              <td className="px-6 py-4">Citizen reports submitted but never actioned, leading to loss of trust.</td>
                              <td className="px-6 py-4">Implement SLA alerts in the Admin dashboard. Assign dedicated staff to triage incoming issues within 24 hours.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  )}

                  {activeSection === 'roadmap' && (
                    <Card className="p-8 sm:p-12 bg-white border border-brand-neutral-grey/20">
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-neutral-grey/20">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                          <Rocket size={24} />
                        </div>
                        <h2 className="font-heading text-3xl">Roadmap</h2>
                      </div>
                      
                      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-primary before:via-brand-secondary before:to-transparent">
                        
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                            1
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white border border-brand-primary/30 rounded-2xl shadow-sm">
                            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest mb-1 block">Phase 1</span>
                            <h3 className="font-heading text-xl mb-3">MVP Launch</h3>
                            <ul className="text-sm text-brand-neutral-charcoal/70 space-y-1">
                              <li>• Core public website pages</li>
                              <li>• Manifesto & Vision viewer</li>
                              <li>• Basic CMS integration</li>
                              <li>• Volunteer registration form</li>
                              <li>• Design System implementation</li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-secondary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                            2
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white border border-brand-neutral-grey/30 rounded-2xl shadow-sm">
                            <span className="text-brand-secondary font-bold text-xs uppercase tracking-widest mb-1 block">Phase 2 (v1.1)</span>
                            <h3 className="font-heading text-xl mb-3">Community Hub</h3>
                            <ul className="text-sm text-brand-neutral-charcoal/70 space-y-1">
                              <li>• Citizen Issue Reporting</li>
                              <li>• Community Ideas Board</li>
                              <li>• User profiles & authentication</li>
                              <li>• Admin triage dashboard</li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-neutral-charcoal text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                            3
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-white border border-brand-neutral-grey/30 rounded-2xl shadow-sm">
                            <span className="text-brand-neutral-charcoal font-bold text-xs uppercase tracking-widest mb-1 block">Phase 3 (v2.0)</span>
                            <h3 className="font-heading text-xl mb-3">AI & Real-time</h3>
                            <ul className="text-sm text-brand-neutral-charcoal/70 space-y-1">
                              <li>• Ask Kamau AI Assistant</li>
                              <li>• Digital Town Hall live streaming</li>
                              <li>• Smart personalized recommendations</li>
                              <li>• Advanced impact analytics</li>
                            </ul>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand-neutral-grey text-brand-neutral-charcoal shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                            4
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-brand-neutral-warm border border-brand-neutral-grey/20 rounded-2xl opacity-70">
                            <span className="text-brand-neutral-charcoal/50 font-bold text-xs uppercase tracking-widest mb-1 block">Future Vision</span>
                            <h3 className="font-heading text-xl mb-3 text-brand-neutral-charcoal/80">Ecosystem Expansion</h3>
                            <ul className="text-sm text-brand-neutral-charcoal/60 space-y-1">
                              <li>• WhatsApp & Telegram integration</li>
                              <li>• Native Mobile App</li>
                              <li>• Predictive Community Analytics</li>
                              <li>• AI Speech Summaries</li>
                            </ul>
                          </div>
                        </div>

                      </div>
                    </Card>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function UserStoryGroup({ title, stories }: { title: string, stories: string[] }) {
  return (
    <div className="border border-brand-neutral-grey/30 rounded-2xl overflow-hidden">
      <div className="bg-brand-neutral-warm px-6 py-4 border-b border-brand-neutral-grey/30">
        <h4 className="font-bold text-brand-neutral-charcoal">{title}</h4>
      </div>
      <div className="divide-y divide-brand-neutral-grey/10">
        {stories.map((story, i) => (
          <div key={i} className="px-6 py-4 text-brand-neutral-charcoal/80 text-sm flex gap-3 items-start hover:bg-brand-primary/5 transition-colors">
            <ChevronRight size={16} className="text-brand-primary shrink-0 mt-0.5" />
            <p>{story}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
