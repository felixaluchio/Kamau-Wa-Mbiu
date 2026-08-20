import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'minimal';
}

export function Accordion({ items, variant = 'default' }: AccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={`w-full ${variant === 'default' ? 'space-y-4' : 'divide-y divide-brand-neutral-grey/50'}`}>
      {items.map((item, idx) => (
        <div key={idx} className={variant === 'default' ? 'bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50 overflow-hidden' : 'py-4'}>
          <button 
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className={`w-full text-left flex justify-between items-center focus:outline-none ${variant === 'default' ? 'px-6 py-5' : 'py-2'}`}
          >
            <span className="font-heading text-lg sm:text-xl text-brand-neutral-charcoal">{item.title}</span>
            <ChevronDown className={`text-brand-primary transition-transform duration-300 shrink-0 ml-4 ${openIdx === idx ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={`font-body text-brand-neutral-charcoal/70 leading-relaxed ${variant === 'default' ? 'px-6 pb-5 pt-0' : 'pb-4 pt-2'}`}>
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
