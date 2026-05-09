import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BlogPage from "@/views/blog/page";

export const dynamic = "force-dynamic";

const BLOG_OG_IMAGE =
  "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/og-blog.jpg";

const fallbackMetadata: Metadata = {
  title: "Blog | Behavioral Health Marketing Insights | Sweet Media",
  description:
    "Expert insights on behavioral health marketing, SEO, paid media, and web development for treatment centers. Read the latest from Sweet Media's team.",
  keywords:
    "behavioral health marketing blog, addiction treatment marketing tips, rehab SEO guide, treatment center marketing insights",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Behavioral Health Marketing Insights | Sweet Media",
    description:
      "Expert insights on behavioral health marketing, SEO, paid media, and web development for treatment centers. Read the latest from Sweet Media's team.",
    url: "/blog",
    images: [{ url: BLOG_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/blog", fallbackMetadata);
}

export default function Page() {
  return <BlogPage />;
}
