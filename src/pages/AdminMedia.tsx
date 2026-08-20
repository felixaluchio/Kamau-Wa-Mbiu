import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Plus, Image as ImageIcon, Video, FileText, UploadCloud, Folder } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminMedia() {
  const folders = [
    { name: 'Campaign 2024', count: 124, type: 'folder' },
    { name: 'Events & Rallies', count: 86, type: 'folder' },
    { name: 'Portraits', count: 32, type: 'folder' },
    { name: 'Brand Assets', count: 15, type: 'folder' },
  ];

  const mediaItems = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `IMG_${8439 + i}.jpg`,
    size: '2.4 MB',
    date: 'Oct 24, 2023',
    url: `https://images.unsplash.com/photo-${[
      '1542601906990-b4d3fb778b09',
      '1511632765486-a01980e01a18',
      '1489749798366-bea3a56d2dc5',
      '1531206715517-5c0ba140b2b8',
      '1517457373958-b7bdd4587205',
      '1506869640319-baa72659ce50',
      '1531804226572-d816fb41e40a',
      '1518063319800-0df20cbeec73'
    ][i]}?q=80&w=400&auto=format&fit=crop`
  }));

  return (
    <AdminLayout>
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal flex items-center gap-3">
              <ImageIcon className="text-brand-primary" />
              Media Library
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 mt-1">Manage images, videos, and documents globally.</p>
          </div>
          <Button size="sm" leftIcon={<UploadCloud size={16} />}>Upload Files</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Left Sidebar - Folders */}
          <div className="hidden md:flex flex-col gap-4 border-r border-brand-neutral-grey/20 pr-6 overflow-y-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search folders..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
            
            <div className="space-y-1 mt-4">
              <button className="flex items-center justify-between w-full p-2 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-bold">
                <span className="flex items-center gap-2"><ImageIcon size={16} /> All Media</span>
                <span>257</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-brand-neutral-warm text-brand-neutral-charcoal/70 text-sm font-medium transition-colors">
                <span className="flex items-center gap-2"><Video size={16} /> Videos</span>
                <span>42</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-brand-neutral-warm text-brand-neutral-charcoal/70 text-sm font-medium transition-colors">
                <span className="flex items-center gap-2"><FileText size={16} /> Documents</span>
                <span>18</span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-neutral-grey/20 space-y-1">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/40">Folders</span>
                <button className="text-brand-neutral-charcoal/40 hover:text-brand-primary"><Plus size={14} /></button>
              </div>
              {folders.map((folder, idx) => (
                <button key={idx} className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-brand-neutral-warm text-brand-neutral-charcoal/70 text-sm font-medium transition-colors group">
                  <span className="flex items-center gap-2"><Folder size={16} className="text-brand-neutral-charcoal/30 group-hover:text-brand-secondary" /> {folder.name}</span>
                  <span className="text-xs opacity-50">{folder.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content - Grid */}
          <div className="md:col-span-3 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h2 className="font-heading text-xl text-brand-neutral-charcoal">All Media</h2>
              <div className="flex items-center gap-2 text-sm text-brand-neutral-charcoal/50 font-bold">
                <span>Sort by:</span>
                <select className="bg-transparent border-none focus:outline-none cursor-pointer hover:text-brand-primary transition-colors">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Name A-Z</option>
                  <option>Size (Largest)</option>
                </select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
                {mediaItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: item.id * 0.05 }}
                    className="group relative cursor-pointer"
                  >
                    <Card className="aspect-square bg-brand-neutral-warm border border-brand-neutral-grey/20 overflow-hidden relative">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-brand-neutral-charcoal/0 group-hover:bg-brand-neutral-charcoal/40 transition-colors duration-300" />
                      
                      {/* Selection Checkbox (visible on hover) */}
                      <div className="absolute top-2 left-2 w-5 h-5 rounded border border-white/50 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                    <div className="mt-2 px-1">
                      <p className="font-body text-xs font-bold text-brand-neutral-charcoal truncate">{item.name}</p>
                      <p className="font-body text-[10px] text-brand-neutral-charcoal/50 mt-0.5">{item.size} • {item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
