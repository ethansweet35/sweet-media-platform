import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { BLOG_OG_IMAGE } from "@/lib/ogDefaults";
import BlogPage from "@/views/blog/page";

export const revalidate = 3600;

const fallbackMetadata: Metadata = {
  title: "Blog | Teen Mental Health Resources | Adolescent Mental Health",
  description:
    "Evidence-based articles on Virtual IOP, adolescent therapy, anxiety, depression, school avoidance, and supporting teens ages 12–17.",
  keywords:
    "teen mental health blog, virtual IOP resources, adolescent therapy articles, school avoidance, teen anxiety, family support",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog | Teen Mental Health Resources | Adolescent Mental Health",
    description:
      "Evidence-based articles on Virtual IOP, adolescent therapy, anxiety, depression, school avoidance, and supporting teens ages 12–17.",
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
