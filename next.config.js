/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://192.168.10.9:38080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
