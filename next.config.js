/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // github.io/durmusakkaya ve mevcut frame yönlendirmesi için gerekli
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
};

module.exports = nextConfig;
