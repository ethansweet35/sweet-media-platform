import type { NextConfig } from "next";
import { wpRedirects } from "./src/lib/wp-redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return wpRedirects;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ahufsygjwpbymomfdazb.supabase.co" },
    ],
  },
};

export default nextConfig;
