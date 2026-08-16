import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10"></div>
        {/* Soft Bottom Ambient Glow extending through pagination */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85vw] max-w-[650px] h-[250px] bg-gradient-radial from-[var(--glow)] via-[var(--glow-magenta)] to-transparent opacity-25 blur-3xl -z-10"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between">
        <Hero />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
