import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';

export function PrivacyPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Privacy Policy', href: '/privacy' }]}>
      <section className="py-20 sm:py-28 bg-brand-neutral-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Privacy Policy
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-4 leading-[1.1]">
              Privacy <span className="italic font-light">Policy</span>
            </h1>
          </motion.div>
        </div>

        {/* Full Privacy Policy Content Container */}
        <div className="w-full max-w-4xl mx-auto px-6 py-12 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 leading-relaxed space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="text-base text-slate-600 mb-4">
                Welcome to the official platform for Kamau Wa Mbiu. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, register for membership, or engage with our community events.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <p className="text-base text-slate-600 mb-4">
                We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us, or participate in our events. The personal information we collect may include the following:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Names, email addresses, and phone numbers.</li>
                <li>Location data (such as your county or ward) provided during registration.</li>
                <li>Information you provide when RSVPing for town halls, rallies, or community forums.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <p className="text-base text-slate-600 mb-4">
                We use personal information collected via our website for a variety of campaign and community purposes described below:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>To facilitate account creation and logon processes.</li>
                <li>To send you administrative information, such as event updates, policy announcements, and newsletter communications.</li>
                <li>To organize volunteer efforts and grassroots mobilization.</li>
                <li>To request feedback and contact you about your use of our platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security and Storage</h2>
              <p className="text-base text-slate-600 mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. Your data is securely stored utilizing industry-standard cloud infrastructure (Google Firebase). While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Privacy Rights</h2>
              <p className="text-base text-slate-600 mb-4">
                Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in certain circumstances. If you wish to review, update, or delete the data we hold about you, please contact our support team.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-base text-slate-600 mb-4">
                If you have questions or comments about this notice, you may email our data protection team or contact the campaign office directly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
