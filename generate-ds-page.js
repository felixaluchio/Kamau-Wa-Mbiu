import fs from 'fs';
import path from 'path';

const dsPageCode = `import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { Spinner, Skeleton } from '../components/ui/Loading';
import { EmptyState } from '../components/ui/EmptyState';
import { Input, Textarea, Checkbox } from '../components/ui/Input';
import { Accordion } from '../components/ui/Accordion';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Modal } from '../components/ui/Modal';
import { Tabs } from '../components/ui/Tabs';
import { Table } from '../components/ui/Table';
import { Mail, Search, FileQuestion, Upload, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-neutral-warm font-body pt-[104px] pb-24">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md">
        
        <div className="mb-20 text-center">
          <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
            Kamau Wa Mbiu Platform
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl text-brand-neutral-charcoal mb-4">
            Design <span className="italic font-light">System.</span>
          </h1>
          <p className="font-body text-brand-neutral-charcoal/60 max-w-2xl mx-auto">
            A comprehensive guide to the UI components, design tokens, and interaction patterns that power the digital experience.
          </p>
        </div>

        {/* --- COLORS --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">1. Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-24 bg-brand-primary rounded-2xl shadow-sm"></div>
              <p className="font-heading font-bold">Royal Blue</p>
              <p className="text-xs text-brand-neutral-charcoal/50 uppercase">Primary / #1148B8</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-secondary rounded-2xl shadow-sm"></div>
              <p className="font-heading font-bold">Cyan</p>
              <p className="text-xs text-brand-neutral-charcoal/50 uppercase">Secondary / #0EA5D8</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-accent rounded-2xl shadow-sm"></div>
              <p className="font-heading font-bold">Soft Blue</p>
              <p className="text-xs text-brand-neutral-charcoal/50 uppercase">Accent / #4F8DD9</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-neutral-charcoal rounded-2xl shadow-sm"></div>
              <p className="font-heading font-bold">Deep Navy</p>
              <p className="text-xs text-brand-neutral-charcoal/50 uppercase">Text / #14213D</p>
            </div>
          </div>
        </section>

        {/* --- TYPOGRAPHY --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">2. Typography</h2>
          <div className="space-y-8 bg-brand-neutral-white p-8 rounded-3xl border border-brand-neutral-grey/50">
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Display XL</p>
              <h1 className="text-display-xl">Voices of the People</h1>
            </div>
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Heading 1</p>
              <h1 className="text-h1">A Blueprint for Prosperity</h1>
            </div>
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Heading 2</p>
              <h2 className="text-h2">Strategic Vision</h2>
            </div>
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Heading 3</p>
              <h3 className="text-h3">Youth Empowerment</h3>
            </div>
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Body Large</p>
              <p className="text-body-lg text-brand-neutral-charcoal/70">Our vision is not just a collection of promises; it is a structured, actionable plan designed to elevate every aspect of our community's daily life.</p>
            </div>
            <div>
              <p className="text-label text-brand-neutral-charcoal/40 mb-2">Body</p>
              <p className="text-body text-brand-neutral-charcoal/70">Our vision is not just a collection of promises; it is a structured, actionable plan designed to elevate every aspect of our community's daily life.</p>
            </div>
          </div>
        </section>

        {/* --- BUTTONS --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">3. Buttons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 bg-brand-neutral-white p-8 rounded-3xl border border-brand-neutral-grey/50">
            <div className="space-y-4">
              <h3 className="font-heading text-lg">Variants</h3>
              <div className="flex flex-col gap-4 items-start">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="text">Text Button</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-lg">States & Semantic</h3>
              <div className="flex flex-col gap-4 items-start">
                <Button variant="success">Success Action</Button>
                <Button variant="danger">Danger Action</Button>
                <Button variant="primary" isLoading>Loading State</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-lg">Sizes & Icons</h3>
              <div className="flex flex-col gap-4 items-start">
                <Button size="sm">Small Button</Button>
                <Button size="lg">Large Button</Button>
                <Button leftIcon={<Mail size={18} />}>With Left Icon</Button>
                <Button rightIcon={<Search size={18} />}>With Right Icon</Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- INPUTS --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">4. Form Inputs</h2>
          <div className="grid md:grid-cols-2 gap-12 bg-brand-neutral-white p-8 rounded-3xl border border-brand-neutral-grey/50">
            <div className="space-y-6">
              <Input label="Standard Input" placeholder="Enter text..." />
              <Input label="With Icon" leftIcon={<Search size={18} />} placeholder="Search..." />
              <Input label="Error State" error="This field is required." defaultValue="Invalid input" />
            </div>
            <div className="space-y-6">
              <Textarea label="Text Area" placeholder="Write a message..." rows={4} />
              <div className="space-y-3 pt-2">
                <Checkbox label="Accept terms and conditions" />
                <Checkbox label="Subscribe to newsletter" defaultChecked />
              </div>
            </div>
          </div>
        </section>

        {/* --- ALERTS & BADGES --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">5. Alerts & Badges</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Alert variant="info" title="Information" description="There is a new update available for the platform." />
              <Alert variant="success" title="Success" description="Your volunteer registration was successful." />
              <Alert variant="warning" title="Warning" description="Please verify your email address to continue." />
              <Alert variant="error" title="Error" description="Failed to connect to the server. Please try again." />
            </div>
            <div className="bg-brand-neutral-white p-8 rounded-3xl border border-brand-neutral-grey/50 space-y-8">
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="space-y-4">
                <h3 className="font-heading text-lg">Loading States</h3>
                <div className="flex gap-4 items-center">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CARDS & ACCORDION --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">6. Data Display (Cards, Stats, Accordions)</h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <StatCard label="Total Volunteers" value="4,250" trend={{ value: '12%', positive: true }} icon={<Users size={20} />} />
            <StatCard label="Town Halls Held" value="24" trend={{ value: '2', positive: true }} />
            <StatCard label="Campaign Funds" value="KES 1.2M" trend={{ value: '5%', positive: false }} icon={<TrendingUp size={20} />} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card hoverable className="p-8">
              <Badge variant="outline" className="mb-4">Standard Card</Badge>
              <h3 className="text-h3 mb-4">Interactive Content Card</h3>
              <p className="text-body text-brand-neutral-charcoal/70 mb-6">Cards can be wrapped with hoverable interactions and varying elevation levels to guide user focus.</p>
              <Button variant="outline" size="sm">Read More</Button>
            </Card>

            <div>
              <Accordion 
                items={[
                  { title: "What is the core vision?", content: "Our core vision focuses on grassroots empowerment, ensuring resource transparency, and leveraging modern agriculture." },
                  { title: "How can I participate?", content: "You can volunteer, donate, or attend our scheduled town hall meetings." },
                ]}
              />
            </div>
          </div>
        </section>

        {/* --- COMPLEX COMPONENTS --- */}
        <section className="mb-24">
          <h2 className="font-heading text-3xl border-b border-brand-neutral-grey/50 pb-4 mb-8">7. Complex Layouts</h2>
          
          <div className="mb-12">
            <Tabs 
              tabs={[
                { id: 'tab1', label: 'Overview', content: <div className="p-6 bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50">Overview content goes here.</div> },
                { id: 'tab2', label: 'Details', content: <div className="p-6 bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50">Detailed information and metrics.</div> },
                { id: 'tab3', label: 'Settings', content: <div className="p-6 bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50">Configuration options.</div> },
              ]}
            />
          </div>

          <div className="mb-12">
            <Table 
              columns={[
                { header: 'Initiative', key: 'name' },
                { header: 'Status', key: 'status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'outline'}>{val}</Badge> },
                { header: 'Budget', key: 'budget' },
              ]}
              data={[
                { name: 'Limuru Youth Hub', status: 'Active', budget: 'KES 500,000' },
                { name: 'Water Sanitation Project', status: 'Planning', budget: 'KES 1,200,000' },
                { name: 'Farmers Subsidies', status: 'Active', budget: 'KES 800,000' },
              ]}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading text-xl mb-4">Modals & Overlays</h3>
              <Button onClick={() => setIsModalOpen(true)}>Open Demo Modal</Button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirmation">
                <p className="font-body text-brand-neutral-charcoal/70 mb-8">Are you sure you want to proceed with this action? This cannot be undone.</p>
                <div className="flex justify-end gap-4">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
                </div>
              </Modal>
            </div>

            <div>
              <h3 className="font-heading text-xl mb-4">Empty States</h3>
              <EmptyState 
                title="No Events Found" 
                description="There are currently no upcoming events scheduled for this region."
                actionLabel="View All Regions"
                onAction={() => {}}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'pages', 'DesignSystemPage.tsx'), dsPageCode);
console.log('Design System page generated!');
