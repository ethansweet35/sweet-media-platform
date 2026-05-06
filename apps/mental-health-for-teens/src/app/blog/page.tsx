import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BlogPage from "@/pages/blog/page";

export const dynamic = "force-dynamic";

const BLOG_OG_IMAGE =
  "https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/og-blog.jpg";

const fallbackMetadata: Metadata = {
  title: "Blog | Mental Health & Recovery Resources | Client Brand",
  description:
    "Mental health, addiction recovery, trauma-informed care, and wellness resources from Client Brand.",
  keywords:
    "clients’s mental health resources, virtual outpatient treatment, addiction recovery resources, trauma-informed care, Service Area mental health support",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Mental Health & Recovery Resources | Client Brand",
    description:
      "Mental health, addiction recovery, trauma-informed care, and wellness resources from Client Brand.",
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
