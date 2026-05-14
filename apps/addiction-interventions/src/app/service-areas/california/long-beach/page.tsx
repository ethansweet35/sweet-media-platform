import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LongBeachPage from "@/views/long-beach/page";

const fallbackMetadata: Metadata = {
  title:
    "Alcohol Intervention Services in Long Beach | Certified Interventionists",
  description:
    "Effective alcohol intervention services in Long Beach, CA. Certified interventionists serving Long Beach and the South Bay — on-site within 24–48 hours.",
  alternates: { canonical: "/service-areas/california/long-beach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/long-beach",
    fallbackMetadata,
  );
}

export default function Page() {
  return <LongBeachPage />;
}
