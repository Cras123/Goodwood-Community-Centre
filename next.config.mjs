// next.config.mjs

const nextConfig = {
  output: "standalone",

  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://goodwoodcommunity.localhost:3000",
      "https://goodwoodcommunity.localhost:3000",
      "https://goodwoodcommunity.lcl.host:3000",
      "https://goodwoodcommunity.lcl.host:44330",
      "https://goodwoodcommunity.localhost:44330",
    ],
  },
};

export default nextConfig;
