/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "aiscmsbackend.aistechnolabs.pro",
      "ezplumbingusaapi.aistechnolabs.in",
      "http://ezapi.ezheatandair.com",
      "http://ezapi.ezheatandair.com"
    ],
  },
};

export default nextConfig;
