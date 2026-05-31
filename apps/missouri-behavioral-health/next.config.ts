import type { NextConfig } from "next";

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
    return [
      // WP posts at /{slug}/ — normalize /blog/{slug} inbound links
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
      // WP blog archive page
      { source: "/blog-page", destination: "/blog", permanent: true },
      { source: "/blog-page/", destination: "/blog", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      {
        source: "/mental-health-facilities",
        destination: "/mental-health-treatment-missouri",
        permanent: true,
      },
      {
        source: "/mental-health-facilities/",
        destination: "/mental-health-treatment-missouri",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
