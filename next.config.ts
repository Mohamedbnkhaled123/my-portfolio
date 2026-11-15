import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/skills', destination: '/#skills', permanent: true },
      { source: '/experience', destination: '/#experience', permanent: true },
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/education', destination: '/#education', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;