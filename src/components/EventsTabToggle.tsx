"use client";

import React, { useState } from 'react';

export type EventTab = 'Upcoming Events' | 'Past Events' | 'Video Library';

export interface EventsTabToggleProps {
  /**
   * Optional initial tab or controlled active tab
   */
  activeTab?: EventTab;
  /**
   * Callback fired when a tab is selected
   */
  onChange?: (tab: EventTab) => void;
  /**
   * Additional custom CSS classes for the container
   */
  className?: string;
}

const TABS: EventTab[] = [
  'Upcoming Events',
  'Past Events',
  'Video Library'
];

export function EventsTabToggle({
  activeTab: controlledActiveTab,
  onChange,
  className = ''
}: EventsTabToggleProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<EventTab>('Upcoming Events');

  const currentTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (tab: EventTab) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tab);
    }
    onChange?.(tab);
  };

  return (
    <div
      className={`inline-flex items-center justify-center bg-white border border-gray-200 rounded-full p-1.5 shadow-sm max-w-fit ${className}`}
      role="tablist"
      aria-label="Events View Filter"
    >
      <div className="grid grid-flow-col auto-cols-fr gap-1">
        {TABS.map((tab) => {
          const isActive = currentTab === tab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 text-center whitespace-nowrap select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1148B8] focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'bg-[#1148B8] text-white shadow-sm'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default EventsTabToggle;
