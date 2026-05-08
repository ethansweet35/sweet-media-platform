import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServiceAreasPage from "@/views/service-areas/page";

const fallbackMetadata: Metadata = {
  title: "Service Areas | Addiction Interventions Nationwide",
  description:
    "Certified addiction & mental health interventionists serving families across all 50 states. On-site mobilisation in 24–48 hours, same-day for crises.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas", fallbackMetadata);
}

export default function Page() {
  return <ServiceAreasPage />;
}
