/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds since we use Deno's linter
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Deno handles TypeScript checking via deno check
    ignoreBuildErrors: false,
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/static-blog",
  assetPrefix: "/static-blog",
  distDir: "out",
};

module.exports = nextConfig;
