import React from 'react';
import { motion } from 'motion/react';

export function Spinner({ size = 'md', className = '' }: { size?: 'sm'|'md'|'lg', className?: string }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-3', lg: 'w-12 h-12 border-4' };
  return (
    <div className={`animate-spin rounded-full border-brand-primary border-t-transparent ${sizes[size]} ${className}`} />
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-brand-neutral-grey rounded-lg ${className}`} />
  );
}
