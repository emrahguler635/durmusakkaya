/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/durmusakkaya',
  assetPrefix: '/durmusakkaya',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Exclude admin pages from static generation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
