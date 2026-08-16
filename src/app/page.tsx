import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Top Header Ambient Glow (Behind Navbar at scroll 0) */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[350px] bg-gradient-radial from-[var(--glow-magenta)] via-[var(--glow)] to-transparent opacity-70 blur-3xl -z-10 pointer-events-none"></div>
        {/* Side Glow */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-50 blur-3xl -z-10 pointer-events-none"></div>
        {/* Lower Content & Pagination Ambient Glow */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] h-[350px] bg-gradient-radial from-[var(--glow)] via-[var(--glow-magenta)] to-transparent opacity-40 blur-3xl -z-10 pointer-events-none"></div>
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
