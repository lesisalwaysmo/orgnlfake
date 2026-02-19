import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
