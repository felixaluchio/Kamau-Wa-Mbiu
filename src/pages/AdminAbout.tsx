import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  User, 
  Clock, 
  Award, 
  BookOpen, 
  Plus, 
  Edit3, 
  Check, 
  Save, 
  Eye, 
  Sparkles, 
  Upload,
  Calendar,
  Layers,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminAbout() {
  const [activeSection, setActiveSection] = useState<'bio' | 'journey' | 'quotes'>('bio');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Biography state
  const [bioData, setBioData] = useState({
    title: 'Kamau Wa Mbiu - Leader, Strategist & Public Servant',
    headline: 'Dedicated to ethical governance, youth empowerment, and economic revitalisation for Limuru.',
    birthplace: 'Limuru, Kiambu County, Kenya',
    education: 'University of Nairobi (MSc Public Governance)',
    philosophy: 'Real leadership begins with listening to the grassroot voices of everyday farmers, traders, and youth.',
    fullStory: `Raised in Limuru, Kamau Wa Mbiu developed a profound understanding of community-driven development from an early age. Having worked in grassroots economic advocacy, agricultural value chains, and digital policy, he bridges traditional wisdom with 21st-century technological execution.\n\nHis campaign represents a generational transition towards accountable, data-informed, and compassionate representation in the National Assembly.`
  });

  // Timeline milestones state
  const [timelineItems, setTimelineItems] = useState([
    {
      year: '2024 - Present',
      title: 'Limuru 2027 Parliamentary Candidacy Launch',
      description: 'Announced official candidacy on the Wiper Patriotic Front ticket, focusing on economic freedom and digital innovation.',
      category: 'Political Milestone'
    },
    {
      year: '2021 - 2023',
      title: 'Grassroots Community Irrigation Advocacy',
      description: 'Mobilized over 400 smallholder tea & horticulture farmers in Bibirioni & Ndeiya for subsidized borehole drilling.',
      category: 'Community Leadership'
    },
    {
      year: '2019 - 2021',
      title: 'Postgraduate Governance Fellowship',
      description: 'Completed advanced research on decentralized county budgeting and youth fiscal participation.',
      category: 'Academic & Strategy'
    },
    {
      year: '2016 - 2019',
      title: 'Youth Technology Hubs Co-Founding',
      description: 'Co-founded digital incubation initiatives connecting over 1,200 Kiambu youth with remote software gigs.',
      category: 'Youth Empowerment'
    }
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-brand-neutral-grey/30 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1148B8] mb-1">
              <User size={14} className="text-[#0EA5D8]" />
              Core Navigation Tab 2 of 5
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl text-brand-neutral-charcoal">
              About, Biography & Journey Management
            </h1>
            <p className="font-body text-xs sm:text-sm text-brand-neutral-charcoal/60 mt-1">
              Curate Kamau Wa Mbiu's official biography, timeline milestones, and personal leadership story.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="flex items-center gap-1 text-xs font-bold text-success-700 bg-success-50 px-3 py-2 rounded-xl border border-success-200 animate-fade-in">
                <Check size={14} /> Changes Saved
              </span>
            )}
            <Button 
              onClick={handleSave} 
              variant="primary" 
              size="md" 
              leftIcon={<Save size={16} />}
            >
              Publish Updates
            </Button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-brand-neutral-grey/30 bg-white px-4 rounded-2xl border shadow-sm overflow-x-auto">
          {[
            { id: 'bio', label: 'Official Biography', icon: <BookOpen size={16} /> },
            { id: 'journey', label: 'Timeline & Milestones', icon: <Clock size={16} />, badge: timelineItems.length },
            { id: 'quotes', label: 'Leadership Philosophy', icon: <Award size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                activeSection === tab.id
                  ? 'text-[#1148B8] font-extrabold'
                  : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeSection === tab.id ? 'bg-[#1148B8] text-white' : 'bg-brand-neutral-grey/20'
                }`}>
                  {tab.badge}
                </span>
              )}
              {activeSection === tab.id && (
                <motion.div
                  layoutId="aboutSectionTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#1148B8] rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Biography Form */}
        {activeSection === 'bio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm lg:col-span-2 space-y-4">
              <h3 className="font-heading text-lg text-brand-neutral-charcoal border-b border-brand-neutral-grey/20 pb-3">
                Core Profile Details
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                    Official Profile Title
                  </label>
                  <input
                    type="text"
                    value={bioData.title}
                    onChange={(e) => setBioData({ ...bioData, title: e.target.value })}
                    className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                    Headline / Summary Statement
                  </label>
                  <input
                    type="text"
                    value={bioData.headline}
                    onChange={(e) => setBioData({ ...bioData, headline: e.target.value })}
                    className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                      Origin & Constituency
                    </label>
                    <input
                      type="text"
                      value={bioData.birthplace}
                      onChange={(e) => setBioData({ ...bioData, birthplace: e.target.value })}
                      className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                      Highest Academic Qualification
                    </label>
                    <input
                      type="text"
                      value={bioData.education}
                      onChange={(e) => setBioData({ ...bioData, education: e.target.value })}
                      className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                    Full Biographical Narrative
                  </label>
                  <textarea
                    rows={6}
                    value={bioData.fullStory}
                    onChange={(e) => setBioData({ ...bioData, fullStory: e.target.value })}
                    className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs leading-relaxed"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
              <h3 className="font-heading text-lg text-brand-neutral-charcoal border-b border-brand-neutral-grey/20 pb-3">
                Live Public Card Preview
              </h3>
              
              <div className="p-4 bg-brand-neutral-warm rounded-2xl border border-brand-neutral-grey/30 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-heading font-extrabold text-2xl shadow-md">
                  KW
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-brand-neutral-charcoal">{bioData.title}</h4>
                  <p className="text-xs text-[#1148B8] font-semibold mt-0.5">{bioData.headline}</p>
                </div>
                <div className="space-y-1.5 text-[11px] text-brand-neutral-charcoal/70 pt-2 border-t border-brand-neutral-grey/20">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-brand-primary" />
                    <span>{bioData.birthplace}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={13} className="text-brand-primary" />
                    <span>{bioData.education}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" leftIcon={<Eye size={14} />}>
                  View Public About Page
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Timeline Milestones Section */}
        {activeSection === 'journey' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-brand-neutral-grey/30">
              <div>
                <h3 className="font-heading text-lg text-brand-neutral-charcoal">Leadership Journey Milestones</h3>
                <p className="text-xs text-brand-neutral-charcoal/60">Chronological history rendered on the public interactive journey roadmap.</p>
              </div>
              <Button size="sm" leftIcon={<Plus size={14} />}>Add Milestone</Button>
            </div>

            <div className="space-y-3">
              {timelineItems.map((item, idx) => (
                <Card key={idx} className="p-5 bg-white border border-brand-neutral-grey/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#1148B8] bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-neutral-charcoal/50">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-bold text-brand-neutral-charcoal">{item.title}</h4>
                    <p className="text-xs text-brand-neutral-charcoal/70">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Edit3 size={14} />}>Edit</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Philosophy & Quotes */}
        {activeSection === 'quotes' && (
          <Card className="p-6 bg-white border border-brand-neutral-grey/30 shadow-sm space-y-4">
            <h3 className="font-heading text-lg text-brand-neutral-charcoal border-b border-brand-neutral-grey/20 pb-3">
              Core Principles & Verified Quotes
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-neutral-charcoal mb-1.5 uppercase tracking-wider text-[11px]">
                  Guiding Leadership Philosophy
                </label>
                <textarea
                  rows={4}
                  value={bioData.philosophy}
                  onChange={(e) => setBioData({ ...bioData, philosophy: e.target.value })}
                  className="w-full p-3 bg-brand-neutral-warm/40 border border-brand-neutral-grey/40 rounded-xl text-xs leading-relaxed"
                />
              </div>
            </div>
          </Card>
        )}

      </div>
    </DashboardLayout>
  );
}
export default AdminAbout;
