import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

// 1. Cards (Updated to be a generic wrapper, we have Card in src/components/ui/Card.tsx but let's make it robust)
const cardCode = `import React from 'react';
import { motion } from 'motion/react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevation?: '1' | '2' | '3';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverable = false, elevation = '1', children, ...props }, ref) => {
    
    const elevations = {
      '1': 'shadow-level-1 border border-brand-neutral-grey/50',
      '2': 'shadow-level-2 border border-brand-neutral-grey/20',
      '3': 'shadow-level-3 border-transparent',
    };
    
    return (
      <div 
        ref={ref}
        className={\`bg-brand-card rounded-3xl overflow-hidden transition-all duration-300 \${elevations[elevation]} \${hoverable ? 'hover:shadow-level-3 hover:border-brand-primary/30 group cursor-pointer' : ''} \${className}\`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
`;

// 2. Statistics
const statCode = `import React from 'react';
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
        <div className={\`font-body text-xs font-bold flex items-center gap-1 \${trend.positive ? 'text-success-500' : 'text-error-500'}\`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Card.tsx'), cardCode);
fs.writeFileSync(path.join(uiDir, 'StatCard.tsx'), statCode);

console.log('Group 3 generated!');
