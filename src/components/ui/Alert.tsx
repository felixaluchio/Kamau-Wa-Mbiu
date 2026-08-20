import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'info' | 'error';

interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

export function Alert({ title, description, variant = 'info', onClose, className = '' }: AlertProps) {
  const variants = {
    success: { bg: 'bg-success-50', border: 'border-success-500/20', text: 'text-success-900', icon: <CheckCircle2 className="text-success-500" /> },
    warning: { bg: 'bg-warning-50', border: 'border-warning-500/20', text: 'text-warning-900', icon: <AlertTriangle className="text-warning-500" /> },
    error: { bg: 'bg-error-50', border: 'border-error-500/20', text: 'text-error-900', icon: <XCircle className="text-error-500" /> },
    info: { bg: 'bg-brand-neutral-beige', border: 'border-brand-primary/20', text: 'text-brand-primary', icon: <Info className="text-brand-primary" /> },
  };

  const v = variants[variant];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`flex p-4 rounded-xl border ${v.bg} ${v.border} ${v.text} ${className}`}
      >
        <div className="shrink-0 mr-3">{v.icon}</div>
        <div className="flex-grow">
          <h4 className="font-heading text-sm font-bold">{title}</h4>
          {description && <p className="font-body text-sm mt-1 opacity-80">{description}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="shrink-0 ml-4 hover:opacity-70 transition-opacity">
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
