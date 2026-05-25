import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BlogPage from "@/views/blog/page";

export const revalidate = 3600;

const fallbackMetadata: Metadata = {
  title: "Recovery Insights & Resources | Sullivan Recovery",
  description:
    "Articles on drug and alcohol detox, addiction recovery, and mental health from Sullivan Recovery in Mission Viejo, Orange County.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    title: "Recovery Insights & Resources | Sullivan Recovery",
    description:
      "Articles on drug and alcohol detox, addiction recovery, and mental health from Sullivan Recovery in Mission Viejo, Orange County.",
    url: "/blog/",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/blog", fallbackMetadata);
}

export default function Page() {
  return <BlogPage />;
}
