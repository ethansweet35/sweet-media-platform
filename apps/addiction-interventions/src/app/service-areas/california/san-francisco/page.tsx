import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SanFranciscoPage from "@/views/san-francisco/page";

const fallbackMetadata: Metadata = {
  title: "Alcohol Intervention San Francisco | Certified Interventionists",
  description:
    "On-site alcohol intervention services in San Francisco, CA. Certified interventionists available 24/7 — covering the Bay Area including Oakland, Berkeley, and Marin.",
  alternates: { canonical: "/service-areas/california/san-francisco" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/san-francisco",
    fallbackMetadata,
  );
}

export default function Page() {
  return <SanFranciscoPage />;
}
