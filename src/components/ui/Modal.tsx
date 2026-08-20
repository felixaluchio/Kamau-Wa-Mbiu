import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'md' }: ModalProps) {
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const maxW = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-5xl',
    full: 'max-w-[95vw]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-neutral-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${maxW[maxWidth]} bg-brand-neutral-white rounded-[2rem] shadow-modal overflow-hidden flex flex-col max-h-[90vh]`}
          >
            {(title || onClose) && (
              <div className="flex justify-between items-center p-6 border-b border-brand-neutral-grey/50 shrink-0">
                <h3 className="font-heading text-2xl text-brand-neutral-charcoal">{title}</h3>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-brand-neutral-beige rounded-full flex items-center justify-center text-brand-neutral-charcoal hover:bg-brand-primary hover:text-brand-neutral-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
