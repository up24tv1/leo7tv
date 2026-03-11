/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // simplifies deployment on Vercel for static exports
  },
};

module.exports = nextConfig;
