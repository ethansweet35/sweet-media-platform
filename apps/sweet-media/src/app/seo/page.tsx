import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SeoPage from "@/views/seo/page";

const fallbackMetadata: Metadata = {
  title: "SEO for Treatment Centers | Behavioral Health Search Optimization | Sweet Media",
  description:
    "Specialized SEO services for behavioral health treatment centers. Rank higher for addiction treatment, detox, and mental health searches.",
  alternates: { canonical: "/seo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/seo", fallbackMetadata);
}

export default function Page() {
  return <SeoPage />;
}
