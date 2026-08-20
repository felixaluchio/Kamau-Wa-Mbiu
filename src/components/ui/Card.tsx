import React from 'react';
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
        className={`bg-brand-card rounded-3xl overflow-hidden transition-all duration-300 ${elevations[elevation]} ${hoverable ? 'hover:shadow-level-3 hover:border-brand-primary/30 group cursor-pointer' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
