import React, { useState } from 'react';
import { CommunityLayout } from '../components/CommunityLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, MapPin, Search, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function CommunityIssues() {
  const [filter, setFilter] = useState('All');
  
  const issues = [
    { id: 1, title: 'Potholes on Main Street', location: 'Limuru CBD', category: 'Roads', status: 'In Progress', upvotes: 142, date: 'Yesterday', severity: 'High' },
    { id: 2, title: 'Broken Water Pipe', location: 'Tigoni East', category: 'Water', status: 'Reported', upvotes: 89, date: '3 hours ago', severity: 'Critical' },
    { id: 3, title: 'Streetlight out of order', location: 'Market Road', category: 'Infrastructure', status: 'Resolved', upvotes: 45, date: 'Last week', severity: 'Medium' },
    { id: 4, title: 'Illegal Dumping', location: 'River Edge', category: 'Environment', status: 'Acknowledged', upvotes: 210, date: '2 days ago', severity: 'High' }
  ];

  return (
    <CommunityLayout>
      <div className="space-y-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl text-brand-neutral-charcoal flex items-center gap-3 mb-2">
              <AlertTriangle className="text-brand-primary" size={32} />
              Issue Reporting
            </h1>
            <p className="font-body text-brand-neutral-charcoal/60 text-lg">
              Report local issues directly to the leadership team. Track resolution progress and stay updated.
            </p>
          </div>
          <Button leftIcon={<Plus size={16} />}>Report Issue</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 gap-2 hide-scrollbar">
                {['All', 'Reported', 'Acknowledged', 'In Progress', 'Resolved'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                      filter === f 
                        ? 'bg-brand-primary text-white shadow-sm' 
                        : 'bg-white border border-brand-neutral-grey/30 text-brand-neutral-charcoal/70 hover:border-brand-primary/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {issues.map((issue, idx) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Card className="p-6 bg-white border border-brand-neutral-grey/20 hover:border-brand-primary/30 hover:shadow-md transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            issue.severity === 'Critical' ? 'bg-error-100 text-error-700' :
                            issue.severity === 'High' ? 'bg-warning-100 text-warning-700' :
                            'bg-brand-neutral-warm text-brand-neutral-charcoal'
                          }`}>
                            {issue.severity} Priority
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/50">
                            {issue.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors cursor-pointer">
                          {issue.title}
                        </h3>
                      </div>
                      
                      <div className="shrink-0 flex items-center sm:items-end flex-row sm:flex-col gap-2">
                        <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${
                          issue.status === 'Resolved' ? 'text-success-600' :
                          issue.status === 'In Progress' ? 'text-brand-secondary' :
                          issue.status === 'Acknowledged' ? 'text-brand-primary' :
                          'text-brand-neutral-charcoal/50'
                        }`}>
                          {issue.status === 'Resolved' ? <CheckCircle2 size={14} /> :
                           issue.status === 'In Progress' ? <Clock size={14} /> :
                           <AlertCircle size={14} />}
                          {issue.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-brand-neutral-charcoal/60 pt-4 border-t border-brand-neutral-grey/10">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {issue.location}</span>
                      <span>{issue.date}</span>
                      <span>{issue.upvotes} Citizens affected</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-brand-primary/5 border border-brand-primary/20">
              <h3 className="font-heading text-lg text-brand-neutral-charcoal mb-4">My Reports</h3>
              <div className="text-center py-6">
                <AlertTriangle size={32} className="mx-auto mb-3 text-brand-primary/40" />
                <p className="text-sm font-medium text-brand-neutral-charcoal/70">You haven't reported any issues yet.</p>
              </div>
              <Button className="w-full mt-4">Report an Issue</Button>
            </Card>

            <Card className="p-6 bg-white border border-brand-neutral-grey/20">
              <h3 className="font-heading text-lg text-brand-neutral-charcoal mb-4">Resolution Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-1">
                    <span>Resolved this month</span>
                    <span className="text-success-600">84%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-neutral-grey/20 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500 w-[84%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 mb-1">
                    <span>Avg Response Time</span>
                    <span className="text-brand-primary">4.2 hours</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
