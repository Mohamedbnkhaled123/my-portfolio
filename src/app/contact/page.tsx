import React from 'react';
import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mohamed Khaled for web development, software engineering, and collaboration opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Seamless Ambient Glow Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10"></div>
        {/* Full-bleed bottom ambient glow extending directly through pagination */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-radial from-[rgba(139,92,246,0.22)] via-[rgba(6,182,212,0.12)] to-transparent blur-3xl -z-10"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between min-h-[100svh] w-full">
        <div className="flex-1 flex items-center justify-center w-full">
          <Contact />
        </div>
        <div className="pb-4 sm:pb-6 w-full flex-shrink-0">
          <PagePagination />
        </div>
      </main>

      <Footer />
    </div>
  );
}
