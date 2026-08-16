import React from 'react';
import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export const metadata: Metadata = {
  title: 'Contact & Hire',
  description: 'Get in touch with Mohamed Khaled for full-stack engineering opportunities, remote work, or custom web application development.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10 pointer-events-none"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between">
        <Contact />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
