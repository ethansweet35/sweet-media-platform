import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "uivbbrwuaffqujzkqjvr.supabase.co" },
      { protocol: "https", hostname: "nfjlvkxrbzytjefmcvhg.supabase.co" },
      { protocol: "https", hostname: "rizeoc.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "*.gravatar.com" },
    ],
  },
};

export default nextConfig;
