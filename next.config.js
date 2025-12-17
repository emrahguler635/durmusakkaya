const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export', // GitHub Pages için static export
  basePath: process.env.NODE_ENV === 'production' ? '/durmusakkaya' : '', // GitHub Pages için repository adı
  assetPrefix: process.env.NODE_ENV === 'production' ? '/durmusakkaya' : '', // GitHub Pages için repository adı
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  // API routes'ları static export'ta çalışmayacağı için ignore et
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // API routes klasörünü exclude et
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
