import type { MetadataRoute } from "next";
import { mergeRobotsDisallow } from "@sweetmedia/admin-core";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainviewtreatment.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: mergeRobotsDisallow(["/admin/", "/api/"]),
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
