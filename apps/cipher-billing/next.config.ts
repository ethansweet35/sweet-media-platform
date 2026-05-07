import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "readdy.ai" },
      { protocol: "https", hostname: "static.readdy.ai" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
      { protocol: "https", hostname: "nstzjqmtsqgeihkyvkqq.supabase.co" },
      { protocol: "https", hostname: "cipherbilling.com" },
    ],
  },
};

export default nextConfig;
