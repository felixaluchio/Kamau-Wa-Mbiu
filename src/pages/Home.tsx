import React from 'react';
import { Hero } from '../components/Hero';
import { AboutPreview } from '../components/AboutPreview';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { Vision } from '../components/Vision';

export function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <JourneyTimeline />
      <Vision />
    </main>
  );
}
