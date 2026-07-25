import React from 'react';
import { Experience } from '@/components/sections/Experience';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PagePagination } from '@/components/PagePagination';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      <div className="absolute inset-0 z-[-1] min-h-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-60 blur-3xl -z-10 pointer-events-none"></div>
      </div>

      <Navbar />

      <main className="pt-20 flex-1 flex flex-col justify-between">
        <Experience />
        <PagePagination />
      </main>

      <Footer />
    </div>
  );
}
