import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const MEMBERSHIP_FAQS: FAQItem[] = [
  {
    question: 'Is membership free of charge?',
    answer: 'Yes, 100% free. The Kamau Wa Mbiu Digital Leadership Platform is open to every citizen without any registration fees or dues. We believe civic participation and community leadership must remain accessible to all.'
  },
  {
    question: 'How will the campaign team contact me?',
    answer: 'Depending on your preferences, you will receive updates via our official WhatsApp community broadcast, email briefs, and local ward coordinator SMS notices for town halls and volunteer activities in your area.'
  },
  {
    question: 'How are my personal details and privacy protected?',
    answer: 'Your personal data is encrypted and strictly used for internal civic mobilization, town hall invitations, and volunteer dispatch. We never sell, rent, or share member information with third-party marketers.'
  },
  {
    question: 'Can I change my engagement tier or ward later?',
    answer: 'Absolutely. You can update your profile, switch involvement pathways (e.g. from Supporter to Youth Ambassador or Policy Advisor), or adjust your time commitment at any time through our digital platform.'
  },
  {
    question: 'What happens immediately after I submit my membership?',
    answer: 'You will receive an instant Digital Supporter ID card with a unique verification code, an invite to join our local ward WhatsApp channel, and priority access to upcoming town halls and policy feedback rounds.'
  },
  {
    question: 'Can I contribute if I am in the diaspora or outside Nairobi/Kiambu?',
    answer: 'Yes! Our Digital Ambassador and Policy Advisory tiers welcome Kenyans across the country and the global diaspora to participate in virtual roundtables, digital advocacy, and policy drafting.'
  }
];

export function MembershipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F8FBFF] border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1148B8]/10 text-[#1148B8] text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#14213D] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Everything you need to know about joining the movement and getting active in your community.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {MEMBERSHIP_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#14213D]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1148B8] text-white' : 'text-slate-500'
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
