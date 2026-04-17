import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "11mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.acm-mrc.asia",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
