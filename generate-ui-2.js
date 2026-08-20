import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

// 1. Input Components
const inputCode = `import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-neutral-charcoal/40">{leftIcon}</div>}
          <input
            ref={ref}
            className={\`w-full bg-brand-neutral-white border rounded-xl px-4 py-3 font-body focus:outline-none focus:ring-2 transition-all \${leftIcon ? 'pl-12' : ''} \${error ? 'border-error-500 focus:ring-error-500/20' : 'border-brand-neutral-grey focus:border-brand-primary focus:ring-brand-primary/20'} \${className}\`}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-xs font-body text-error-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/70 mb-2">{label}</label>}
        <textarea
          ref={ref}
          className={\`w-full bg-brand-neutral-white border rounded-xl px-4 py-3 font-body focus:outline-none focus:ring-2 transition-all resize-none \${error ? 'border-error-500 focus:ring-error-500/20' : 'border-brand-neutral-grey focus:border-brand-primary focus:ring-brand-primary/20'} \${className}\`}
          {...props}
        />
        {error && <p className="mt-2 text-xs font-body text-error-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center w-5 h-5">
          <input type="checkbox" ref={ref} className="peer sr-only" {...props} />
          <div className="w-5 h-5 border-2 border-brand-neutral-grey rounded bg-brand-neutral-white peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors group-hover:border-brand-primary" />
          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className={\`font-body text-sm text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors \${className}\`}>{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
`;

// 2. Accordion
const accordionCode = `import React, { useState } from 'react';
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
    <div className={\`w-full \${variant === 'default' ? 'space-y-4' : 'divide-y divide-brand-neutral-grey/50'}\`}>
      {items.map((item, idx) => (
        <div key={idx} className={variant === 'default' ? 'bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50 overflow-hidden' : 'py-4'}>
          <button 
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className={\`w-full text-left flex justify-between items-center focus:outline-none \${variant === 'default' ? 'px-6 py-5' : 'py-2'}\`}
          >
            <span className="font-heading text-lg sm:text-xl text-brand-neutral-charcoal">{item.title}</span>
            <ChevronDown className={\`text-brand-primary transition-transform duration-300 shrink-0 ml-4 \${openIdx === idx ? 'rotate-180' : ''}\`} />
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className={\`font-body text-brand-neutral-charcoal/70 leading-relaxed \${variant === 'default' ? 'px-6 pb-5 pt-0' : 'pb-4 pt-2'}\`}>
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
`;

fs.writeFileSync(path.join(uiDir, 'Input.tsx'), inputCode);
fs.writeFileSync(path.join(uiDir, 'Accordion.tsx'), accordionCode);

console.log('Group 2 generated!');
