import React from 'react';
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
            className={`w-full bg-brand-neutral-white border rounded-xl px-4 py-3 font-body focus:outline-none focus:ring-2 transition-all ${leftIcon ? 'pl-12' : ''} ${error ? 'border-error-500 focus:ring-error-500/20' : 'border-brand-neutral-grey focus:border-brand-primary focus:ring-brand-primary/20'} ${className}`}
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
          className={`w-full bg-brand-neutral-white border rounded-xl px-4 py-3 font-body focus:outline-none focus:ring-2 transition-all resize-none ${error ? 'border-error-500 focus:ring-error-500/20' : 'border-brand-neutral-grey focus:border-brand-primary focus:ring-brand-primary/20'} ${className}`}
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
        <span className={`font-body text-sm text-brand-neutral-charcoal group-hover:text-brand-primary transition-colors ${className}`}>{label}</span>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';
