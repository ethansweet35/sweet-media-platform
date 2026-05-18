import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BlogPage from "@/views/blog/page";

export const revalidate = 3600;

const BLOG_OG_IMAGE =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/og/og-blog.jpg";

const fallbackMetadata: Metadata = {
  title: "Blog | Mental Health & Recovery Resources | Mountain View Treatment",
  description:
    "Mental health, addiction recovery, trauma-informed care, and wellness resources from Mountain View Treatment.",
  keywords:
    "mental health resources Seattle, outpatient treatment blog, addiction recovery resources, trauma-informed care, Seattle mental health support",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    title: "Blog | Mental Health & Recovery Resources | Mountain View Treatment",
    description:
      "Mental health, addiction recovery, trauma-informed care, and wellness resources from Mountain View Treatment.",
    url: "/blog/",
    images: [{ url: BLOG_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/blog", fallbackMetadata);
}

export default function Page() {
  return <BlogPage />;
}
