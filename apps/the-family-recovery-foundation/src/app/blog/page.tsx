import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { DEFAULT_OG_IMAGE } from "@/lib/ogDefaults";
import BlogPage from "@/views/blog/page";

export const revalidate = 3600;

const BLOG_OG_IMAGE = DEFAULT_OG_IMAGE;

const fallbackMetadata: Metadata = {
  title: "Blog | Mental Health & Recovery Resources | The Family Recovery Foundation",
  description:
    "Mental health, addiction recovery, trauma-informed care, and wellness resources from The Family Recovery Foundation.",
  keywords:
    "clients’s mental health resources, virtual outpatient treatment, addiction recovery resources, trauma-informed care, Service Area mental health support",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Mental Health & Recovery Resources | The Family Recovery Foundation",
    description:
      "Mental health, addiction recovery, trauma-informed care, and wellness resources from The Family Recovery Foundation.",
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
