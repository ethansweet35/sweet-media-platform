import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainviewtreatment.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/"],
        allow: [
          "/",
          "/about-us/",
          "/what-we-treat/",
          "/therapies/",
          "/levels-of-care/",
          "/admissions/",
          "/guide/",
          "/blog/",
          "/contact/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
