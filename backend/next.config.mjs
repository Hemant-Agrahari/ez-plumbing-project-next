/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["aiscmsbackend.aistechnolabs.pro","ezplumbingusaapi.aistechnolabs.in"]
    },
};

export default nextConfig;
