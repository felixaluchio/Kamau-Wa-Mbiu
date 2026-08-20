import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { Gallery } from '../components/Gallery';

export function GalleryPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'Gallery', href: '/gallery' }]}>
      <div className="py-12 bg-brand-neutral-white">
        <Gallery />
      </div>
    </PageLayout>
  );
}
