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
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
