/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dr-cuotas-web.s3.us-east-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
