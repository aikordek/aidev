import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath matches the GitHub repo name for GitHub Pages deployment
  basePath: "/aidev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
