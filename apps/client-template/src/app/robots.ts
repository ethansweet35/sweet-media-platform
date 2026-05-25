import type { MetadataRoute } from "next";
import { mergeRobotsDisallow } from "@sweetmedia/admin-core";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

/** Platform-wide `/_next/` + WP legacy disallows come from mergeRobotsDisallow — do not duplicate here. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: mergeRobotsDisallow(["/admin/", "/api/"]),
        allow: [
          "/",
          "/about",
          "/what-we-treat",
          "/virtual-outpatient",
          "/therapy",
          "/admissions",
          "/contact",
          "/resources",
          "/locations",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
