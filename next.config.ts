import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.rede.natura.net' },
      { protocol: 'https', hostname: 'www.natura.cl' },
      { protocol: 'https', hostname: 'www.linksolution.cl' },
      { protocol: 'https', hostname: 'www.wabteccorp.com' },
      { protocol: 'https', hostname: 'www.prever.cl' },
      { protocol: 'https', hostname: 'www.ggelectrics.cl' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'assets.equifax.com' },
      { protocol: 'https', hostname: 'www.recaall.cl' },
    ],
  },
};

export default nextConfig;
