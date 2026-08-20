import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

// 1. Modals
const modalCode = `import React, { useEffect } from 'react';
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
            className={\`relative w-full \${maxW[maxWidth]} bg-brand-neutral-white rounded-[2rem] shadow-modal overflow-hidden flex flex-col max-h-[90vh]\`}
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
`;

// 2. Tabs
const tabCode = `import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TabProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
}

export function Tabs({ tabs }: TabProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div className="flex space-x-1 border-b border-brand-neutral-grey/50 overflow-x-auto scrollbar-hide pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`relative px-6 py-4 font-body text-sm font-bold transition-colors whitespace-nowrap focus:outline-none \${
              activeTab === tab.id ? 'text-brand-primary' : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
            }\`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
              />
            )}
          </button>
        ))}
      </div>
      <div className="py-8">
        {tabs.map(tab => (
          activeTab === tab.id && (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {tab.content}
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}
`;

// 3. Tables
const tableCode = `import React from 'react';

interface Column {
  key: string;
  header: string;
  render?: (val: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export function Table({ columns, data }: TableProps) {
  return (
    <div className="w-full overflow-x-auto bg-brand-neutral-white rounded-2xl border border-brand-neutral-grey/50 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-brand-neutral-warm border-b border-brand-neutral-grey/50">
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-brand-neutral-charcoal/60">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-neutral-grey/30">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-brand-neutral-beige/50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 font-body text-sm text-brand-neutral-charcoal">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center font-body text-brand-neutral-charcoal/50">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
`;

fs.writeFileSync(path.join(uiDir, 'Modal.tsx'), modalCode);
fs.writeFileSync(path.join(uiDir, 'Tabs.tsx'), tabCode);
fs.writeFileSync(path.join(uiDir, 'Table.tsx'), tableCode);

console.log('Group 4 generated!');
