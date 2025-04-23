import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    ],
  },
};
export default nextConfig;
