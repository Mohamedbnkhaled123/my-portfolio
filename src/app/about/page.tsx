import React from 'react';
import type { Metadata } from 'next';
import { About } from '@/components/sections/About';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Mohamed Khaled - Full-Stack Engineer and MEAN Stack specialist based in Cairo, Egypt.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10 pointer-events-none"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between">
        <About />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
