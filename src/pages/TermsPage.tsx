import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'motion/react';

export function TermsPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Terms of Use', href: '/terms' }]}>
      <section className="py-20 sm:py-28 bg-brand-neutral-white relative overflow-hidden">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-xs sm:px-sm lg:px-md text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              Terms of Use
            </span>
            <h1 className="font-heading text-5xl sm:text-7xl text-brand-neutral-charcoal mb-4 leading-[1.1]">
              Terms of <span className="italic font-light">Use</span>
            </h1>
          </motion.div>
        </div>

        {/* Full Terms Content Container */}
        <div className="w-full max-w-4xl mx-auto px-6 py-12 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 leading-relaxed space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
              <p className="text-base text-slate-600 mb-4">
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”), and the Kamau Wa Mbiu campaign platform ("we," "us," or "our"), concerning your access to and use of this website and any related media form or application. By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Representations</h2>
              <p className="text-base text-slate-600 mb-4">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
                <li>You will not use the Site for any illegal or unauthorized purpose.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Prohibited Activities</h2>
              <p className="text-base text-slate-600 mb-4">
                You may not access or use the Site for any purpose other than that for which we make the Site available. As a user of the Site, you agree not to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Systematically retrieve data or other content from the Site to create or compile a collection, compilation, database, or directory without written permission from us.</li>
                <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-base text-slate-600 mb-4">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Generated Contributions</h2>
              <p className="text-base text-slate-600 mb-4">
                The Site may invite you to chat, contribute to, or participate in community forums, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site. Any contributions you transmit may be treated in accordance with the Site Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications and Interruptions</h2>
              <p className="text-base text-slate-600 mb-4">
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
