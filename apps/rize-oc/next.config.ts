import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "uivbbrwuaffqujzkqjvr.supabase.co" },
      { protocol: "https", hostname: "nfjlvkxrbzytjefmcvhg.supabase.co" },
    ],
  },
};

export default nextConfig;
