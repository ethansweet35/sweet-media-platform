import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WebDevPage from "@/views/web-dev/page";

const fallbackMetadata: Metadata = {
  title: "Web Development for Treatment Centers | CRO & UX | Sweet Media",
  description:
    "High-converting website development for behavioral health treatment centers. Custom sites, landing pages, and conversion rate optimization that turns visitors into admissions.",
  alternates: { canonical: "/web-dev" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/web-dev", fallbackMetadata);
}

export default function Page() {
  return <WebDevPage />;
}
