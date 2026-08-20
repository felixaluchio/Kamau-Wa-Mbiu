import React, { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Plus, FileText, MoreVertical, Layout, Edit3, Image as ImageIcon, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminContent() {
  const [activeTab, setActiveTab] = useState('all');

  const contentItems = [
    { id: 1, title: 'Healthcare Vision 2025', type: 'Vision Pillar', status: 'Published', author: 'Campaign Mgr', date: 'Oct 24, 2023' },
    { id: 2, title: 'Youth Empowerment Initiative', type: 'Manifesto', status: 'Draft', author: 'Content Editor', date: 'Oct 23, 2023' },
    { id: 3, title: 'Limuru Agricultural Reforms', type: 'Policy', status: 'Published', author: 'Kamau Wa Mbiu', date: 'Oct 20, 2023' },
    { id: 4, title: 'Homepage Hero Section', type: 'Page Block', status: 'In Review', author: 'Design Team', date: 'Oct 19, 2023' },
    { id: 5, title: 'My Early Beginnings', type: 'Biography', status: 'Published', author: 'Content Editor', date: 'Oct 15, 2023' },
  ];

  const contentTypes = ['All', 'Pages', 'Vision', 'Manifesto', 'News', 'Biography'];

  return (
    <AdminLayout>
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
              <Layout className="text-brand-primary" />
              Content Management
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 mt-1">Manage website pages, vision pillars, policies, and news.</p>
          </div>
          <Button size="sm" leftIcon={<Plus size={16} />}>Create Content</Button>
        </div>

        <div className="flex items-center gap-2 border-b border-brand-neutral-grey/30 shrink-0 overflow-x-auto pb-px">
          {contentTypes.map(type => {
            const id = type.toLowerCase();
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
                  activeTab === id 
                    ? 'text-brand-primary' 
                    : 'text-brand-neutral-charcoal/50 hover:text-brand-neutral-charcoal'
                }`}
              >
                {type}
                {activeTab === id && (
                  <motion.div 
                    layoutId="activeContentTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
                  />
                )}
              </button>
            );
          })}
        </div>

        <Card className="flex-1 bg-white border border-brand-neutral-grey/30 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-brand-neutral-grey/20 flex flex-col sm:flex-row gap-4 justify-between items-center bg-brand-neutral-warm/30 shrink-0">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search content..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select className="px-4 py-2 border border-brand-neutral-grey/50 rounded-lg text-sm font-medium hover:bg-brand-neutral-warm transition-colors bg-white w-full sm:w-auto cursor-pointer focus:outline-none focus:border-brand-primary">
                <option>All Statuses</option>
                <option>Published</option>
                <option>Draft</option>
                <option>In Review</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 w-1/2">Title</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 hidden sm:table-cell">Status</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 hidden lg:table-cell">Author</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 hidden md:table-cell">Last Edited</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral-grey/10">
                {contentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-neutral-warm/30 transition-colors group cursor-pointer">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          item.type.includes('Vision') || item.type.includes('Policy') ? 'bg-brand-secondary/10 text-brand-secondary' :
                          item.type.includes('Page') ? 'bg-brand-primary/10 text-brand-primary' :
                          'bg-brand-accent/10 text-brand-accent'
                        }`}>
                          {item.type.includes('Page') ? <Layout size={18} /> : item.type.includes('Biography') ? <ImageIcon size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <p className="font-body font-bold text-brand-neutral-charcoal text-sm group-hover:text-brand-primary transition-colors">{item.title}</p>
                          <p className="font-body text-xs text-brand-neutral-charcoal/50">{item.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        {item.status === 'Published' && <CheckCircle2 size={14} className="text-success-500" />}
                        {item.status === 'Draft' && <Edit3 size={14} className="text-brand-neutral-charcoal/40" />}
                        {item.status === 'In Review' && <Clock size={14} className="text-warning-500" />}
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          item.status === 'Published' ? 'text-success-600' :
                          item.status === 'In Review' ? 'text-warning-600' :
                          'text-brand-neutral-charcoal/50'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-brand-neutral-charcoal/60">
                      {item.author}
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-brand-neutral-charcoal/60">
                      {item.date}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-brand-neutral-charcoal/40 hover:text-brand-primary rounded-lg hover:bg-brand-primary/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
