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
    default: 'Mohamed Khaled | Full-Stack Engineer (MEAN Stack & React 19 / Next.js)',
    template: '%s | Mohamed Khaled - Full-Stack Engineer',
  },
  description: 'Official portfolio of Mohamed Khaled AbdelSattar - Full-Stack Engineer in Cairo, Egypt. Specializing in MEAN Stack, React 19, Next.js 15, TypeScript, and high-performance Web Applications.',
  keywords: [
    'Mohamed Khaled',
    'Mohamed Khaled Portfolio',
    'Mohamed Khaled Developer',
    'Full-Stack Engineer',
    'MEAN Stack Developer',
    'React 19 Developer',
    'Next.js 15 Developer',
    'TypeScript Developer',
    'Full Stack Engineer Cairo',
    'Full Stack Developer Egypt',
    'Software Engineer Cairo',
    'مطور فول ستاك',
    'مهندس برمجيات',
    'مطور رياكت مصر',
    'مطور مواقع القاهرة',
    'Remote Full Stack Developer',
    'E-commerce Developer Egypt',
    'Clinic System Developer',
    'الدوت',
    'محمد الدوت',
    'محمد خالد الدوت',
    'الدوت ويب ديفيلوبر',
    'الدوت مطور ويب',
    '.',
    'El Dot',
    'ElDot',
    'el-dot',
    'Mohamed El Dot',
    'Mohamed ElDot',
    'mohamed-el-dot',
    'Mohamed Khaled El Dot',
    'Mohamed Khaled ElDot',
    'mohamed-khaled-el-dot',
    'El Dot Web Developer',
    'ElDot Web Developer',
    'el-dot web developer',
    'El Dot Developer',
    'ElDot Developer',
    'el-dot developer',
    'Dot',
    'محمد .',
    'محمد خالد .',
    '. ويب ديفيلوبر',
    '. مطور ويب',
    'Mohamed .',
    'Mohamed Khaled .',
    'Mohamed . Developer',
    'Mohamed Khaled . Developer',
    '. Web Developer',
    '. Developer',
    'Mohamed . Web Developer',
    'Mohamed Khaled . Web Developer',
    'محمد ال .',
    'محمد خالد ال .',
    'ال .',
    'ال . ويب ديفيلوبر',
    'Mohamed El .',
    'Mohamed Khaled El .',
    'El .',
    'El . Web Developer',
    'Mohamed El . Web Developer',
    'Mohamed Khaled El . Web Developer',
    'MEAN Stack Engineer',
    'MEAN Stack Expert',
    'MEAN Stack Specialist',
    'MEAN Stack Developer Cairo',
    'MEAN Stack Developer Egypt',
    'Full Stack MEAN Developer',
    'MongoDB Express Angular Node',
    'مطور ميين ستاك',
    'مطور MEAN Stack',
    'مهندس MEAN Stack',
    'الدوت MEAN Stack',
    'الدوت MEAN Stack Developer',
    'محمد الدوت MEAN Stack',
    'El Dot MEAN Stack',
    'El Dot MEAN Stack Developer',
    'ElDot MEAN Stack Developer',
    'el-dot mean stack',
    'Mohamed El Dot MEAN Stack',
    'Mohamed Khaled El Dot MEAN Stack',
    '. MEAN Stack Developer',
    'Mohamed . MEAN Stack',
    'Mohamed Khaled . MEAN Stack',
    'El . MEAN Stack Developer',
    'محمد ال . MEAN Stack',
  ],
  authors: [{ name: 'Mohamed Khaled AbdelSattar' }],
  creator: 'Mohamed Khaled',
  metadataBase: new URL('https://mohamedkhaled-dev-portfolio.vercel.app'),
  icons: {
    icon: '/mk-web-developer-preview.png',
    shortcut: '/mk-web-developer-preview.png',
    apple: '/mk-web-developer-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohamedkhaled-dev-portfolio.vercel.app',
    title: 'Mohamed Khaled | Full-Stack Engineer',
    description: 'Crafting premium, scalable web applications with MEAN Stack, React 19, and Next.js 15.',
    siteName: 'Mohamed Khaled Portfolio',
    images: [
      {
        url: '/mk-web-developer-preview.png',
        width: 1200,
        height: 630,
        alt: 'Mohamed Khaled Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Khaled | Full-Stack Engineer',
    description: 'Crafting premium, scalable web applications with MEAN Stack, React 19, and Next.js 15.',
    images: ['/mk-web-developer-preview.png'],
  },
  verification: {
    google: 'k3GEuvEUGwyTALrLCKlcddDq3exItwA1R1Zhd',
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

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Khaled AbdelSattar",
  "alternateName": ["Mohamed Khaled", "محمد خالد عبد الستار", "Mohamed Khaled Developer"],
  "jobTitle": "Full-Stack Engineer",
  "url": "https://mohamedkhaled-dev-portfolio.vercel.app",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cairo",
    "addressCountry": "Egypt"
  },
  "sameAs": [
    "https://github.com/Mohamedbnkhaled123",
    "https://www.linkedin.com/in/mohamedbn-khaled"
  ],
  "knowsAbout": [
    "Full-Stack Engineering",
    "MEAN Stack",
    "React 19",
    "Next.js 15",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Tailwind CSS",
    "Web Application Development"
  ]
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-background text-primary antialiased min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
