import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Users, 
  UserCheck, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  ShieldCheck, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface MemberProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  ward: string;
  role: 'Ward Coordinator' | 'Youth Lead' | 'Volunteer' | 'Citizen Supporter' | 'Polling Agent';
  status: 'active' | 'pending' | 'verified';
  joinedDate: string;
  points: number;
}

export function AdminMembership() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const [members, setMembers] = useState<MemberProfile[]>([
    {
      id: 1,
      name: 'Sarah Wanjiru Njenga',
      email: 'sarah.wanjiru@gmail.com',
      phone: '+254 712 345 678',
      ward: 'Limuru East',
      role: 'Ward Coordinator',
      status: 'verified',
      joinedDate: 'Jun 12, 2026',
      points: 1420
    },
    {
      id: 2,
      name: 'John Njoroge Kamau',
      email: 'john.njoroge@yahoo.com',
      phone: '+254 722 890 123',
      ward: 'Ndeiya Ward',
      role: 'Polling Agent',
      status: 'verified',
      joinedDate: 'Jul 04, 2026',
      points: 980
    },
    {
      id: 3,
      name: 'Grace Mwangi',
      email: 'grace.m@outlook.com',
      phone: '+254 733 456 789',
      ward: 'Bibirioni',
      role: 'Youth Lead',
      status: 'verified',
      joinedDate: 'Aug 01, 2026',
      points: 1850
    },
    {
      id: 4,
      name: 'Peter Kariuki',
      email: 'peter.k@gmail.com',
      phone: '+254 701 234 567',
      ward: 'Limuru Central',
      role: 'Volunteer',
      status: 'pending',
      joinedDate: 'Aug 14, 2026',
      points: 210
    },
    {
      id: 5,
      name: 'Mary Wangari',
      email: 'mary.wangari@gmail.com',
      phone: '+254 745 678 901',
      ward: 'Tigoni / Ngecha',
      role: 'Citizen Supporter',
      status: 'active',
      joinedDate: 'Aug 16, 2026',
      points: 340
    }
  ]);

  const wards = ['All', 'Limuru East', 'Limuru Central', 'Ndeiya Ward', 'Bibirioni', 'Tigoni / Ngecha'];

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.phone.includes(searchQuery);
    const matchesWard = selectedWard === 'all' || m.ward.toLowerCase() === selectedWard.toLowerCase();
    const matchesRole = selectedRole === 'all' || m.role.toLowerCase() === selectedRole.toLowerCase();
    return matchesSearch && matchesWard && matchesRole;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-neutral-grey/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1148B8] mb-1">
              <Users size={14} className="text-[#0EA5D8]" />
              Core Navigation Tab 5 of 5
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal">
              Membership & Citizen Network
            </h1>
            <p className="font-body text-xs sm:text-sm text-brand-neutral-charcoal/60 mt-1">
              Manage registered supporters, assign ward volunteer leads, and monitor community engagement metrics.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" leftIcon={<Download size={16} />}>
              Export CSV
            </Button>
            <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
              Register Member
            </Button>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/50">Total Registered Members</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-brand-neutral-charcoal">1,248</span>
              <span className="text-xs font-bold text-success-600">+14% this month</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/50">Ward Coordinators</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-[#1148B8]">18</span>
              <span className="text-xs font-medium text-brand-neutral-charcoal/50">Across 5 wards</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/50">Active Polling Agents</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-brand-neutral-charcoal">94</span>
              <span className="text-xs font-medium text-brand-neutral-charcoal/50">Of 142 polling stations</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/50">Pending Verifications</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-amber-600">12</span>
              <span className="text-xs font-bold text-amber-700">Needs review</span>
            </div>
          </Card>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-brand-neutral-grey/30 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members by name, phone or email..."
              className="w-full pl-10 pr-4 py-2 bg-brand-neutral-warm/50 border border-brand-neutral-grey/40 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {wards.map((ward) => {
              const id = ward.toLowerCase().replace(' ward', '');
              const active = selectedWard === id || (selectedWard === 'all' && ward === 'All');
              return (
                <button
                  key={ward}
                  onClick={() => setSelectedWard(ward === 'All' ? 'all' : id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    active 
                      ? 'bg-[#1148B8] text-white shadow-xs' 
                      : 'bg-brand-neutral-warm text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
                  }`}
                >
                  {ward}
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Table */}
        <Card className="bg-white border border-brand-neutral-grey/30 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-neutral-warm/60 border-b border-brand-neutral-grey/30 text-[11px] font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/60">
                  <th className="py-3.5 px-6">Citizen Name & Contact</th>
                  <th className="py-3.5 px-4">Ward</th>
                  <th className="py-3.5 px-4">Role Assignment</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Activity Points</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-neutral-grey/20 text-xs">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-brand-neutral-warm/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-brand-neutral-charcoal">{member.name}</p>
                          <div className="flex items-center gap-2 text-[11px] text-brand-neutral-charcoal/50 mt-0.5">
                            <span>{member.email}</span>
                            <span>•</span>
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-semibold text-brand-neutral-charcoal">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#1148B8]" />
                        <span>{member.ward}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        member.role === 'Ward Coordinator' 
                          ? 'bg-brand-primary/10 text-brand-primary' 
                          : member.role === 'Youth Lead'
                          ? 'bg-purple-100 text-purple-800'
                          : member.role === 'Polling Agent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-brand-neutral-grey/20 text-brand-neutral-charcoal'
                      }`}>
                        {member.role === 'Ward Coordinator' && <ShieldCheck size={12} />}
                        {member.role}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        member.status === 'verified' ? 'bg-success-100 text-success-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {member.status === 'verified' ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                        {member.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-brand-neutral-charcoal">
                      <div className="inline-flex items-center gap-1 bg-brand-neutral-warm px-2 py-0.5 rounded-lg border border-brand-neutral-grey/30">
                        <Award size={12} className="text-[#0EA5D8]" />
                        <span>{member.points} pts</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Button variant="outline" size="sm">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
}
export default AdminMembership;
