import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "almncgkbmooyuptdgkhe.supabase.co" },
    ],
  },
};

export default nextConfig;
