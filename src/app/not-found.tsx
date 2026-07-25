import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-primary">
      <h1 className="text-6xl md:text-8xl font-bold text-premium-gradient mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-secondary max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-premium-gradient text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}
