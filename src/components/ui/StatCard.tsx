import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; positive: boolean };
  icon?: React.ReactNode;
}

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="bg-brand-neutral-white p-6 rounded-2xl border border-brand-neutral-grey/50 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/60">{label}</span>
        {icon && <div className="text-brand-primary p-2 bg-brand-neutral-beige rounded-lg">{icon}</div>}
      </div>
      <div className="font-heading text-4xl text-brand-neutral-charcoal mb-2">{value}</div>
      {trend && (
        <div className={`font-body text-xs font-bold flex items-center gap-1 ${trend.positive ? 'text-success-500' : 'text-error-500'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}
