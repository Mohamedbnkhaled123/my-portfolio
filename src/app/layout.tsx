import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Cairo } from 'next/font/google';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mohamed Khaled | Full-Stack Engineer (MEAN Stack & React)',
    template: '%s | Mohamed Khaled',
  },
  description: 'Portfolio of Mohamed Khaled AbdelSattar - Full-Stack Engineer specializing in MEAN Stack, React 19, Next.js, and high-performance UI/UX.',
  keywords: ['Mohamed Khaled', 'Full-Stack Engineer', 'MEAN Stack', 'React 19', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Mohamed Khaled AbdelSattar' }],
  creator: 'Mohamed Khaled',
  metadataBase: new URL('https://mohamedkhaled-dev-portfolio.vercel.app'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohamedkhaled-dev-portfolio.vercel.app',
    title: 'Mohamed Khaled | Full-Stack Engineer',
    description: 'Crafting premium, scalable web applications with modern architecture.',
    siteName: 'Mohamed Khaled Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mohamed Khaled Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Khaled | Full-Stack Engineer',
    description: 'Crafting premium, scalable web applications with modern architecture.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Inline blocking script for hydration-safe theme & language initialization
const themeInitScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('portfolio-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }

      var savedLang = localStorage.getItem('portfolio-lang') || 'en';
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      if (savedLang === 'ar') {
        document.body ? document.body.classList.add('font-arabic') : null;
      } else {
        document.body ? document.body.classList.add('font-english') : null;
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="bg-background text-primary antialiased min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
