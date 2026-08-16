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
      {/* Rich Continuous Cyber Gradient Canvas — No Grid */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] via-[#0d1427] to-[#050814]"></div>
        {/* Top Radiant Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] max-w-[900px] h-[500px] bg-gradient-radial from-[rgba(217,70,239,0.25)] via-[rgba(139,92,246,0.18)] to-transparent blur-3xl"></div>
        {/* Center/Right Accent Glow */}
        <div className="absolute top-1/3 -right-20 w-[80vw] max-w-[600px] h-[600px] bg-gradient-radial from-[rgba(6,182,212,0.22)] via-[rgba(139,92,246,0.15)] to-transparent blur-3xl"></div>
        {/* Bottom Pagination Glow — Seamless colorful blend */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[900px] h-[550px] bg-gradient-radial from-[rgba(139,92,246,0.3)] via-[rgba(6,182,212,0.2)] via-45% to-transparent blur-3xl"></div>
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
