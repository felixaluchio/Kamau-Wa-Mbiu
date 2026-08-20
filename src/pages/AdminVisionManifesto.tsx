import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Target, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Sparkles, 
  Layers, 
  Download, 
  ArrowUpRight,
  ShieldAlert,
  Clock,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface PolicyPillar {
  id: number;
  number: string;
  title: string;
  category: string;
  summary: string;
  keyActionPoints: string[];
  status: 'active' | 'in_review' | 'draft';
  progressScore: number;
}

export function AdminVisionManifesto() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'promises' | 'documents'>('pillars');
  const [selectedPillarId, setSelectedPillarId] = useState<number>(1);

  const [pillars, setPillars] = useState<PolicyPillar[]>([
    {
      id: 1,
      number: '01',
      title: 'Agricultural Revitalisation & Tea Value-Addition',
      category: 'Economic Pillar',
      summary: 'Guarantee minimum returns for tea and horticulture farmers by eliminating exploitative middlemen and constructing cold-storage aggregation hubs.',
      keyActionPoints: [
        'Direct subsidy vouchers for fertilizer and soil conditioning',
        'Establishment of Limuru Agro-Processing Cold Chain facility',
        'Partnership with national tea buyers for timely bonus disbursals'
      ],
      status: 'active',
      progressScore: 92
    },
    {
      id: 2,
      number: '02',
      title: 'Youth Digital Innovation Hubs & Micro-Grants',
      category: 'Youth & Tech',
      summary: 'Construct 4 high-speed fiber-connected digital incubation centers across all wards to equip GenZ youth with remote working gigs.',
      keyActionPoints: [
        'Free high-speed WiFi and workstation access across 4 wards',
        'Direct seed grants for youth-led technological and agribusiness startups',
        'Quarterly mentorship programs with Silicon Savannah tech leads'
      ],
      status: 'active',
      progressScore: 88
    },
    {
      id: 3,
      number: '03',
      title: 'Solar-Powered Clean Water & Borehole Grid',
      category: 'Infrastructure',
      summary: 'Eradicate water scarcity in semi-arid zones like Ndeiya through deep solar-hybrid boreholes and pressurized community water kiosks.',
      keyActionPoints: [
        'Drilling and piping for 6 new mega solar boreholes in Ndeiya',
        'Subsidized prepaid smart meters for transparent household billing',
        'Rainwater harvesting grants for public primary and secondary schools'
      ],
      status: 'active',
      progressScore: 79
    },
    {
      id: 4,
      number: '04',
      title: '100% Transparent NG-CDF Bursary Automation',
      category: 'Education & Governance',
      summary: 'Implement a fully digital, publicly auditable bursary allocation portal preventing political nepotism and prioritizing needy students.',
      keyActionPoints: [
        'Online application portal with automated vulnerability indexing',
        'Public dashboard displaying every shilling disbursed per school',
        'Zero manual paperwork for parents'
      ],
      status: 'active',
      progressScore: 95
    },
    {
      id: 5,
      number: '05',
      title: 'Accessible Healthcare & Ward Emergency Transit',
      category: 'Public Health',
      summary: 'Upgrade Limuru Level 4 hospital pharmacy stocks and introduce 2 dedicated 24/7 emergency dispatch ambulances for rapid ward transport.',
      keyActionPoints: [
        'Guaranteed continuous supply of essential hypertension & diabetes medications',
        'Maternal healthcare sub-clinics in rural outposts',
        '24/7 dedicated ambulance hotline for emergency obstetric transfers'
      ],
      status: 'active',
      progressScore: 84
    }
  ]);

  const selectedPillar = pillars.find(p => p.id === selectedPillarId) || pillars[0];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-neutral-grey/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1148B8] mb-1">
              <Target size={14} className="text-[#0EA5D8]" />
              Core Navigation Tab 3 of 5
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal">
              Vision & Manifesto Policy Management
            </h1>
            <p className="font-body text-xs sm:text-sm text-brand-neutral-charcoal/60 mt-1">
              Configure Limuru 2027 policy pillars, track public campaign promises, and manage downloadable manifesto publications.
            </p>
          </div>
          
          <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
            Add Policy Pillar
          </Button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-brand-neutral-grey/30 bg-white px-4 rounded-2xl border shadow-sm overflow-x-auto">
          {[
            { id: 'pillars', label: '5 Core Manifesto Pillars', icon: <Layers size={16} />, badge: '5 Active' },
            { id: 'promises', label: 'Campaign Promise Tracker', icon: <CheckCircle2 size={16} />, badge: '28 Items' },
            { id: 'documents', label: 'Manifesto Publications & PDFs', icon: <FileText size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#1148B8] font-extrabold'
                  : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id ? 'bg-[#1148B8] text-white' : 'bg-brand-neutral-grey/20'
                }`}>
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="visionManifestoTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#1148B8] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: 5 Policy Pillars */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Pillar Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal/60">
                  Select Pillar to Edit
                </span>
                <span className="text-xs font-bold text-success-700 bg-success-50 px-2 py-0.5 rounded-full border border-success-200">
                  All 5 Vectorized
                </span>
              </div>

              <div className="space-y-3">
                {pillars.map((pillar) => (
                  <Card
                    key={pillar.id}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    className={`p-4 cursor-pointer transition-all border ${
                      selectedPillarId === pillar.id
                        ? 'border-brand-primary ring-2 ring-brand-primary/20 bg-brand-primary/5'
                        : 'border-brand-neutral-grey/30 bg-white hover:border-brand-neutral-grey/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#1148B8] bg-brand-primary/10 px-2 py-0.5 rounded-lg">
                        PILLAR {pillar.number}
                      </span>
                      <span className="text-[11px] font-bold text-success-700">
                        {pillar.progressScore}% Readiness
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-brand-neutral-charcoal mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-brand-neutral-charcoal/60 line-clamp-2">
                      {pillar.summary}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Pillar Editor */}
            <div className="lg:col-span-7">
              <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-brand-neutral-grey/20 pb-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#1148B8]">
                      Pillar {selectedPillar.number} • {selectedPillar.category}
                    </span>
                    <h3 className="font-heading text-xl text-brand-neutral-charcoal mt-0.5">
                      {selectedPillar.title}
                    </h3>
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Edit2 size={14} />}>
                    Edit Details
                  </Button>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-2">
                    Executive Summary
                  </label>
                  <p className="text-xs leading-relaxed text-brand-neutral-charcoal/80 bg-brand-neutral-warm/50 p-4 rounded-2xl border border-brand-neutral-grey/30">
                    {selectedPillar.summary}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-brand-neutral-charcoal mb-2">
                    Key Action Deliverables
                  </label>
                  <div className="space-y-2">
                    {selectedPillar.keyActionPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-brand-neutral-warm/30 rounded-xl border border-brand-neutral-grey/20 text-xs">
                        <CheckCircle2 size={16} className="text-success-600 shrink-0 mt-0.5" />
                        <span className="text-brand-neutral-charcoal font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-neutral-grey/20 flex items-center justify-between text-xs text-brand-neutral-charcoal/60">
                  <span>AI Vector Synchronization: <strong>Indexed</strong></span>
                  <Button size="sm" variant="primary">Save Pillar Changes</Button>
                </div>
              </Card>
            </div>

          </div>
        )}

        {/* Tab 2: Promise Tracker */}
        {activeTab === 'promises' && (
          <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-brand-neutral-grey/20">
              <div>
                <h3 className="font-heading text-lg text-brand-neutral-charcoal">Public Campaign Commitments</h3>
                <p className="text-xs text-brand-neutral-charcoal/60">Auditable promises indexed on the public transparency scorecard.</p>
              </div>
              <Button size="sm" leftIcon={<Plus size={14} />}>New Promise</Button>
            </div>

            <div className="divide-y divide-brand-neutral-grey/20 text-xs">
              {[
                { title: 'Subsidize Ndeiya Solar Boreholes', ward: 'Ndeiya Ward', timeline: 'First 100 Days', status: 'Scheduled' },
                { title: 'Zero Market Stall Fees for Vegetable Vendors', ward: 'Limuru East & Central', timeline: 'Within 6 Months', status: 'Policy Draft' },
                { title: 'Automate 100% of NG-CDF Bursaries', ward: 'All 5 Wards', timeline: 'Immediately Upon Term Start', status: 'Architecture Ready' },
              ].map((p, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-brand-neutral-charcoal">{p.title}</p>
                    <p className="text-[11px] text-brand-neutral-charcoal/50 mt-0.5">{p.ward} • Target: {p.timeline}</p>
                  </div>
                  <span className="text-[11px] font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 3: Manifesto Publications */}
        {activeTab === 'documents' && (
          <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
            <h3 className="font-heading text-lg text-brand-neutral-charcoal border-b border-brand-neutral-grey/20 pb-3">
              Official Manifesto PDFs & Downloads
            </h3>
            <div className="p-4 bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error-50 text-error-600 flex items-center justify-center font-bold text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-neutral-charcoal">Limuru 2027 Comprehensive Manifesto.pdf</h4>
                  <p className="text-[11px] text-brand-neutral-charcoal/50">4.2 MB • Updated August 2026 • 2,420 Public Downloads</p>
                </div>
              </div>
              <Button size="sm" variant="outline" leftIcon={<Download size={14} />}>Download</Button>
            </div>
          </Card>
        )}

      </div>
    </DashboardLayout>
  );
}
export default AdminVisionManifesto;
