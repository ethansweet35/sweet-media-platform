import type { Metadata } from "next";
import SeoPage from "@/pages/seo/page";

export const metadata: Metadata = {
  title: "SEO for Treatment Centers | Behavioral Health Search Optimization | Sweet Media",
  description:
    "Specialized SEO services for behavioral health treatment centers. Rank higher for addiction treatment, detox, and mental health searches.",
  alternates: { canonical: "/seo" },
};

export default function Page() {
  return <SeoPage />;
}
