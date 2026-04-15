/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ezapi.ezplumbingusa.com",
      "www.ezheatandair.com",
      "ezheatandairapi.aistechnolabs.pro",
      "ezheatandairapi.aistechnolabs.prohttps",
      "ezapi.ezheatandair.com",
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
