import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'xyhbmaetyufjbqrcrspe.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  serverExternalPackages: [
    "googleapis",
    "googleapis-common",
    "gaxios",
    "node-fetch",
    "fetch-blob",
    "nodemailer",
  ],
};

export default nextConfig;
