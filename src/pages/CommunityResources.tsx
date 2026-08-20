import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Image as ImageIcon, Video, Search, File, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityResources() {
  const [activeTab, setActiveTab] = useState('documents');

  const tabs = [
    { id: 'documents', label: 'Policy Documents', icon: <FileText size={16} /> },
    { id: 'media', label: 'Media Kits', icon: <ImageIcon size={16} /> },
    { id: 'training', label: 'Training Materials', icon: <Video size={16} /> },
  ];

  const resources = [
    { id: 1, title: 'Agricultural Reform Policy Brief', category: 'documents', type: 'PDF', size: '2.4 MB', date: 'Oct 20, 2023' },
    { id: 2, title: 'Youth Empowerment Manifesto', category: 'documents', type: 'PDF', size: '1.8 MB', date: 'Oct 15, 2023' },
    { id: 3, title: 'Healthcare Vision 2025 Summary', category: 'documents', type: 'PDF', size: '3.1 MB', date: 'Oct 10, 2023' },
    
    { id: 4, title: 'Social Media Graphics Kit', category: 'media', type: 'ZIP', size: '24.5 MB', date: 'Oct 22, 2023' },
    { id: 5, title: 'Official Portraits (High Res)', category: 'media', type: 'ZIP', size: '45.2 MB', date: 'Oct 18, 2023' },
    { id: 6, title: 'Campaign Brand Guidelines', category: 'media', type: 'PDF', size: '5.6 MB', date: 'Oct 12, 2023' },

    { id: 7, title: 'Volunteer Onboarding Guide', category: 'training', type: 'PDF', size: '4.2 MB', date: 'Oct 24, 2023' },
    { id: 8, title: 'Community Outreach Playbook', category: 'training', type: 'PDF', size: '3.8 MB', date: 'Oct 19, 2023' },
    { id: 9, title: 'Digital Advocacy 101 Video', category: 'training', type: 'MP4', size: '124 MB', date: 'Oct 14, 2023' },
  ];

  const filteredResources = resources.filter(r => r.category === activeTab);

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
            <FileText className="text-brand-primary" size={32} />
            Resource Center
          </h1>
          <p className="font-body text-brand-neutral-charcoal/60 text-lg">
            Download official campaign materials, policy briefs, and training guides to support your advocacy.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 shrink-0 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-neutral-grey/30 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors shadow-sm"
              />
            </div>
            
            <Card className="bg-white border border-brand-neutral-grey/30 overflow-hidden shadow-sm">
              <nav className="flex flex-col p-2 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                      activeTab === tab.id
                        ? 'bg-brand-primary/10 text-brand-primary font-bold'
                        : 'text-brand-neutral-charcoal/70 hover:bg-brand-neutral-warm hover:text-brand-primary'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>

            <Card className="bg-brand-neutral-warm/50 border border-brand-neutral-grey/20 p-4">
              <h3 className="font-bold text-sm text-brand-neutral-charcoal mb-2">Need something else?</h3>
              <p className="text-xs text-brand-neutral-charcoal/60 mb-4">If you can't find a specific document, our team can help.</p>
              <Button variant="outline" size="sm" className="w-full bg-white">Request Material</Button>
            </Card>
          </div>

          {/* Resource List */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <Card className="p-4 bg-white border border-brand-neutral-grey/20 hover:border-brand-primary/30 hover:shadow-md transition-all group cursor-pointer flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.type === 'PDF' ? 'bg-error-50 text-error-600' :
                      item.type === 'ZIP' ? 'bg-warning-50 text-warning-600' :
                      item.type === 'MP4' ? 'bg-brand-primary/10 text-brand-primary' :
                      'bg-brand-neutral-warm text-brand-neutral-charcoal/50'
                    }`}>
                      {item.type === 'PDF' ? <FileText size={24} /> :
                       item.type === 'ZIP' ? <File size={24} /> :
                       <Video size={24} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-neutral-charcoal text-sm truncate group-hover:text-brand-primary transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-brand-neutral-charcoal/50 font-medium uppercase tracking-wider">
                        <span>{item.type}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-neutral-grey/50" />
                        <span>{item.size}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-neutral-grey/50" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    
                    <button className="p-2 text-brand-neutral-charcoal/30 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors">
                      <Download size={20} />
                    </button>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12 text-brand-neutral-charcoal/40">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-heading text-lg">No resources found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </CommunityLayout>
  );
}
