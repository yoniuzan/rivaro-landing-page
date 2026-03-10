/**
 * Rivaro Landing Page
 * Luxury Suits & Menswear
 */

import React from 'react';
import { StickyHeader } from '@components/StickyHeader';
import { Hero } from '@components/Hero';
import { CollectionGallery } from '@components/CollectionGallery';
import { BookingSection } from '@components/BookingSection';
import { Footer } from '@components/Footer';
import { WhatsAppButton } from '@components/WhatsAppButton';

export const HomePage: React.FC = () => {
  return (
    <>
      <StickyHeader />
      <Hero />
      <CollectionGallery />
      <BookingSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};
