/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://192.168.10.9:38080/api/v1/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
