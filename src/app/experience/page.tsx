import React from 'react';
import type { Metadata } from 'next';
import { Experience } from '@/components/sections/Experience';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export const metadata: Metadata = {
  title: 'Work Experience',
  description: 'Professional engineering experience and career timeline of Mohamed Khaled - Full-Stack Engineer in Cairo, Egypt.',
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Seamless Ambient Glow Layer */}
      <div className="absolute inset-0 z-[-1] min-h-screen pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10"></div>
        {/* Full-bleed bottom ambient glow extending directly through pagination */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-radial from-[rgba(139,92,246,0.22)] via-[rgba(6,182,212,0.12)] to-transparent blur-3xl -z-10"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between">
        <Experience />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
