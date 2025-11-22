import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'bilal-lms.t3.storage.dev',
      }
    ]
  }

};

export default nextConfig;
