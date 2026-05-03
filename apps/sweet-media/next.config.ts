import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ynmldknprfusujudvutq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "grbxnkgzhquwdqxlscv.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
