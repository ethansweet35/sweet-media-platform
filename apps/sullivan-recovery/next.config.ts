import type { NextConfig } from "next";
import { wpBlogRewrites } from "./src/lib/wp-blog-rewrites";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. It ships a sibling
  // `index.js.LICENSE.txt` artifact that Turbopack can't parse and ships
  // native bindings (sqlite3, statsig) that should resolve at runtime.
  // The SDK is only imported from server-side API routes via the
  // @sweetmedia/admin-core/server export path.
  serverExternalPackages: ["@cursor/sdk"],
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/blogs/", destination: "/blog/", permanent: true },
      { source: "/blogs/:path*/", destination: "/blog/:path*/", permanent: true },
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      { source: "/admissions/", destination: "/admissions-process/", permanent: true },
    ];
  },
  async rewrites() {
    return wpBlogRewrites;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "knvkrhwlflkulybcmgmq.supabase.co" },
      { protocol: "https", hostname: "sullivanrecovery.com" },
      { protocol: "https", hostname: "www.sullivanrecovery.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
};

export default nextConfig;
