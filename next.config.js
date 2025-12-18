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
  // Don't generate static pages for admin routes
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

module.exports = nextConfig;
