import React from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = <FileQuestion size={48} />, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-brand-neutral-white rounded-3xl border border-brand-neutral-grey border-dashed"
    >
      <div className="text-brand-neutral-charcoal/20 mb-6">{icon}</div>
      <h3 className="font-heading text-2xl text-brand-neutral-charcoal mb-2">{title}</h3>
      <p className="font-body text-brand-neutral-charcoal/60 max-w-md mb-8">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">{actionLabel}</Button>
      )}
    </motion.div>
  );
}
