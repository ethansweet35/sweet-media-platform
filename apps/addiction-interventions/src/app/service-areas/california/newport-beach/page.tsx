import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewportBeachPage from "@/views/newport-beach/page";

const fallbackMetadata: Metadata = {
  title: "Drug Intervention in Newport Beach | Certified Interventionists",
  description:
    "On-site drug intervention services in Newport Beach, CA. Certified interventionists available 24/7 — on the ground in 24–48 hours. We know Orange County's treatment landscape.",
  alternates: { canonical: "/service-areas/california/newport-beach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/service-areas/california/newport-beach",
    fallbackMetadata,
  );
}

export default function Page() {
  return <NewportBeachPage />;
}
