import type { NextConfig } from "next";
import { siteRedirects } from "./src/lib/site-redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  serverExternalPackages: ["@cursor/sdk"],
  experimental: {
    optimizePackageImports: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              "</images/mbh_home_hero_poster_mobile.avif>; rel=preload; as=image; type=image/avif; fetchpriority=high",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "yfwyxafsgexejjebkwor.supabase.co" },
      { protocol: "https", hostname: "missouribehavioralhealth.com" },
      { protocol: "https", hostname: "www.missouribehavioralhealth.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
  async redirects() {
    return siteRedirects;
  },
};

export default nextConfig;
