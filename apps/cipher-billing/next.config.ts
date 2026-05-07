import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /** WP nav targets post-651 “Our Process”; post-168 lives at /our-process for deep links only */
      { source: "/our-process", destination: "/our-process-2", permanent: true },
    ];
  },
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
