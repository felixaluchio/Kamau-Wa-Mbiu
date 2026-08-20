import React, { useState } from 'react';
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
            className={`relative px-6 py-4 font-body text-sm font-bold transition-colors whitespace-nowrap focus:outline-none ${
              activeTab === tab.id ? 'text-brand-primary' : 'text-brand-neutral-charcoal/60 hover:text-brand-neutral-charcoal'
            }`}
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
