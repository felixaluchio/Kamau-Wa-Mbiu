import React from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Filter, Download, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';

export function AdminVolunteers() {
  const volunteers = [
    { id: 1, name: 'David Kimani', email: 'david.k@example.com', role: 'Field Coordinator', status: 'Active', date: 'Oct 24, 2023' },
    { id: 2, name: 'Sarah Wanjiku', email: 'sarah.w@example.com', role: 'Social Media', status: 'Pending', date: 'Oct 23, 2023' },
    { id: 3, name: 'John Omondi', email: 'john.o@example.com', role: 'Event Support', status: 'Active', date: 'Oct 21, 2023' },
    { id: 4, name: 'Grace Njoroge', email: 'grace.n@example.com', role: 'Content Writer', status: 'Inactive', date: 'Oct 15, 2023' },
    { id: 5, name: 'Michael Mutua', email: 'michael.m@example.com', role: 'Community Lead', status: 'Active', date: 'Oct 10, 2023' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
          <div>
            <h1 className="font-heading text-3xl text-brand-neutral-charcoal">Volunteer Management</h1>
            <p className="font-body text-brand-neutral-charcoal/60 mt-1">Review applications and manage active volunteers.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>Export</Button>
            <Button size="sm">Add Volunteer</Button>
          </div>
        </div>

        <Card className="flex-1 bg-white border border-brand-neutral-grey/30 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-brand-neutral-grey/20 flex flex-col sm:flex-row gap-4 justify-between items-center bg-brand-neutral-warm/30 shrink-0">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search volunteers by name, email or role..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-brand-neutral-grey/50 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex items-center gap-2 px-4 py-2 border border-brand-neutral-grey/50 rounded-lg text-sm font-medium hover:bg-brand-neutral-warm transition-colors bg-white w-full sm:w-auto justify-center">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20">Volunteer</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 hidden sm:table-cell">Role / Skills</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20">Status</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 hidden md:table-cell">Joined</th>
                  <th className="p-4 font-body text-xs font-bold uppercase tracking-widest text-brand-neutral-charcoal/50 border-b border-brand-neutral-grey/20 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral-grey/10">
                {volunteers.map((vol) => (
                  <tr key={vol.id} className="hover:bg-brand-neutral-warm/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {vol.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-body font-bold text-brand-neutral-charcoal text-sm">{vol.name}</p>
                          <p className="font-body text-xs text-brand-neutral-charcoal/60">{vol.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="inline-block px-3 py-1 bg-brand-neutral-warm border border-brand-neutral-grey/30 rounded-full text-xs font-medium text-brand-neutral-charcoal">
                        {vol.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {vol.status === 'Active' && <CheckCircle2 size={14} className="text-success-500" />}
                        {vol.status === 'Pending' && <div className="w-2 h-2 rounded-full bg-warning-500" />}
                        {vol.status === 'Inactive' && <XCircle size={14} className="text-brand-neutral-charcoal/40" />}
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          vol.status === 'Active' ? 'text-success-600' :
                          vol.status === 'Pending' ? 'text-warning-600' :
                          'text-brand-neutral-charcoal/50'
                        }`}>
                          {vol.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-brand-neutral-charcoal/60">
                      {vol.date}
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
          
          <div className="p-4 border-t border-brand-neutral-grey/20 bg-white flex items-center justify-between text-sm text-brand-neutral-charcoal/60 shrink-0">
            <p>Showing 1 to 5 of 1,248 entries</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-brand-neutral-grey/50 rounded-lg hover:bg-brand-neutral-warm disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-brand-primary text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-brand-neutral-grey/50 rounded-lg hover:bg-brand-neutral-warm">2</button>
              <button className="px-3 py-1 border border-brand-neutral-grey/50 rounded-lg hover:bg-brand-neutral-warm">3</button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 border border-brand-neutral-grey/50 rounded-lg hover:bg-brand-neutral-warm">Next</button>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
