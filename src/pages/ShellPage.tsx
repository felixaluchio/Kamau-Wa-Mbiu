import React from 'react';

export function ShellPage({ title, description }: { title: string, description: string }) {
  return (
    <main className="min-h-[70vh] pt-32 pb-24 flex items-center justify-center text-center">
      <div className="max-w-3xl mx-auto px-xs">
        <span className="text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">
          {title}
        </span>
        <h1 className="font-heading text-5xl sm:text-6xl text-brand-neutral-charcoal mb-6">
          {title}
        </h1>
        <p className="font-body text-lg text-brand-neutral-charcoal/60 leading-relaxed">
          {description}
        </p>
      </div>
    </main>
  );
}
