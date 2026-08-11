import React from 'react';
import type { Metadata } from 'next';
import { Projects } from '@/components/sections/Projects';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export const metadata: Metadata = {
  title: 'Featured Projects',
  description: 'Full-stack web applications built by Mohamed Khaled including Paris Clinic management system, Velora Bags e-commerce, and Next.js E-Shop.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      <div className="absolute inset-0 z-[-1] min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10 pointer-events-none"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col justify-between">
        <Projects />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
