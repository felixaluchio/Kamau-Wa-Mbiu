import React from 'react';

export function Stats() {
  const stats = [
    { value: "45+", label: "Community Projects Completed" },
    { value: "12K+", label: "Citizens Engaged Directly" },
    { value: "100%", label: "Commitment to Transparency" },
  ];

  return (
    <section className="py-24 bg-brand-primary text-brand-neutral-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-xs sm:px-sm lg:px-md relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-center items-center md:items-start md:pl-10 text-center md:text-left pt-8 md:pt-0 first:pt-0 first:pl-0">
              <span className="font-heading text-5xl lg:text-6xl mb-2 text-brand-neutral-white tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
