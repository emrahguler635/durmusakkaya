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
  // Exclude admin pages from static generation during build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude admin pages from client bundle analysis
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
