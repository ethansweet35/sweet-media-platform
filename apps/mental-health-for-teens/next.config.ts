import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      { protocol: "https", hostname: "awalaktpqqwpdvzbafkv.supabase.co" },
    ],
  },
};

export default nextConfig;
