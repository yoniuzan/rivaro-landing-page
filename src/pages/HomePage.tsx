/**
 * Rivaro Landing Page
 * Luxury Suits & Menswear
 */

import React from 'react';
import { StickyHeader } from '@components/StickyHeader';
import { Hero } from '@components/Hero';
import { CollectionGallery } from '@components/CollectionGallery';
import { AboutSection } from '@components/AboutSection';
import { ProcessSection } from '@components/ProcessSection';
import { Footer } from '@components/Footer';
import { WhatsAppButton } from '@components/WhatsAppButton';
import { AccessibilityWidget } from '@components/AccessibilityWidget';
import { FaqSection } from '@/components/FaqSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <StickyHeader />
      <Hero />
      <CollectionGallery />
      <AboutSection />
      <ProcessSection />
      <FaqSection />
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </>
  );
};
