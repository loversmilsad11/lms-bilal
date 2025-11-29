import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "utfs.io",
      },
      {
        protocol: "https" as const,
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
