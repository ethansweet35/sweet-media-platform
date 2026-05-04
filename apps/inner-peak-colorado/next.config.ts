import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [35, 50, 60, 75],
    remotePatterns: [
      { protocol: "https", hostname: "readdy.ai" },
      { protocol: "https", hostname: "static.readdy.ai" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
    ],
  },
};

export default nextConfig;
