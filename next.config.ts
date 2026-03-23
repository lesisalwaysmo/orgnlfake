import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
