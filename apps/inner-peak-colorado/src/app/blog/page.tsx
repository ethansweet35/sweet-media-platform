import type { Metadata } from "next";
import BlogPage from "@/pages/blog/page";

export const dynamic = "force-dynamic";

const BLOG_OG_IMAGE =
  "https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/og-blog.jpg";

export const metadata: Metadata = {
  title: "Blog | Mental Health & Recovery Resources | Inner Peak Colorado",
  description:
    "Mental health, addiction recovery, trauma-informed care, and women’s wellness resources from Inner Peak Colorado.",
  keywords:
    "women’s mental health resources, virtual outpatient treatment, addiction recovery resources, trauma-informed care, Colorado mental health support",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Mental Health & Recovery Resources | Inner Peak Colorado",
    description:
      "Mental health, addiction recovery, trauma-informed care, and women’s wellness resources from Inner Peak Colorado.",
    url: "/blog",
    images: [{ url: BLOG_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <BlogPage />;
}
