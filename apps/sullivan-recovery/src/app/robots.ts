import type { MetadataRoute } from "next";
import { mergeRobotsDisallow } from "@sweetmedia/admin-core";
import { DRAFT_PAGE_PATHS } from "@/lib/draftPages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: mergeRobotsDisallow([
          "/admin/",
          "/api/",
          ...DRAFT_PAGE_PATHS,
        ]),
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
