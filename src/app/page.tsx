import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Global Seamless Ambient Glow Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[var(--glow-magenta)] to-transparent opacity-40 blur-3xl -z-10"></div>
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-radial from-[rgba(6,182,212,0.12)] to-transparent opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-[rgba(139,92,246,0.15)] to-transparent opacity-30 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-radial from-[rgba(139,92,246,0.18)] via-[rgba(6,182,212,0.1)] to-transparent blur-3xl -z-10"></div>
      </div>

      <Navbar />

      <main className="pt-16 sm:pt-20 flex-1 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}