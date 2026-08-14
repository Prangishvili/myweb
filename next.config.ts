import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Skip Vercel's on-demand image transform pipeline entirely. Source
    // files are already sized/compressed for the web, so the first-load
    // cost of a cold serverless transform isn't worth it — raw files are
    // served straight from the static CDN with no cold-start possible.
    unoptimized: true,
  },
};

export default nextConfig;
