import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SeoStrategyPage from "@/views/seo-strategy/page";

const fallbackMetadata: Metadata = {
  title: "Free SEO Strategy Audit | AI + Semrush Snapshot | Sweet Media",
  description:
    "Get an AI-powered SEO strategy report for your treatment center website. Semrush keyword data, competitor gaps, CRO recommendations, site hierarchy, and technical fixes.",
  alternates: { canonical: "/seo-strategy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/seo-strategy", fallbackMetadata);
}

export default function Page() {
  return <SeoStrategyPage />;
}
