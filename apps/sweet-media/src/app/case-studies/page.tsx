import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CaseStudiesIndexPage from "@/views/case-studies/index/page";

const ROUTE = "/case-studies";

const fallbackMetadata: Metadata = {
  title: "Case Studies | Behavioral Health Marketing Results | Sweet Media",
  description:
    "See how Sweet Media helps treatment centers grow with SEO, paid media, and web development. Case studies from California Prime Recovery, Rize OC, and more.",
  alternates: { canonical: ROUTE },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(ROUTE, fallbackMetadata);
}

export const revalidate = 15;

export default function Page() {
  return <CaseStudiesIndexPage />;
}
