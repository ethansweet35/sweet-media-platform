import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/admin/login", "/admin/blogs", "/admin/blog-edit/"],
        allow: [
          "/",
          "/blog",
          "/blog/",
          "/seo",
          "/paid-media",
          "/social-media",
          "/web-dev",
          "/industries",
          "/results",
          "/case-studies/",
          "/about",
          "/contact",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
