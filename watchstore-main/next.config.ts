import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product 3 and 4 use Unsplash URLs in app/data/products.ts
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
