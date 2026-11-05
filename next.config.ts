import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Looping HyperFrames clips: file names carry a ?v= version, so cache them long.
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/demos/**",
      },
      {
        protocol: "https",
        hostname: "lottie.host",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};
export default nextConfig;
