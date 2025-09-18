/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/static-blog',
  assetPrefix: '/static-blog',
  distDir: 'out'
}

module.exports = nextConfig