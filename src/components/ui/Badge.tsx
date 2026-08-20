import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'default', className = '', icon }: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-body whitespace-nowrap transition-colors";
  const variants = {
    default: "bg-brand-neutral-beige text-brand-primary",
    success: "bg-success-50 text-success-900 border border-success-500/20",
    warning: "bg-warning-50 text-warning-900 border border-warning-500/20",
    error: "bg-error-50 text-error-900 border border-error-500/20",
    outline: "bg-transparent text-brand-neutral-charcoal/70 border border-brand-neutral-grey",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
