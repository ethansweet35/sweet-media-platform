import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
    ],
  },
};

export default nextConfig;
