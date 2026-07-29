/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Custom domain (durmusakkaya.com) kök dizinde yayınlanır; basePath kullanılmaz
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
};

module.exports = nextConfig;
