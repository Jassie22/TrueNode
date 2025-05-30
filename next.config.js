/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // Enable basic compression
  compress: true,
  poweredByHeader: false,
  // ESLint configuration to allow build to pass
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Configure unoptimized images to prevent Image Optimization API errors
  images: {
    unoptimized: true
  },
  // Since we're using static export, API routes won't work natively
  // We'll need to modify our contact form to use a serverless function or third-party service
  // Allows devices on the same network to access the dev server
  async rewrites() {
    return [];
  },
  // Server configuration for network access
  webpack: (config, { isServer }) => {
    // Add your webpack config if needed
    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  },
  // Make sure environment variables are accessible
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  }
};
 
module.exports = nextConfig; 