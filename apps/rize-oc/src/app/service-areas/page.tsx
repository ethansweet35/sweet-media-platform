import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServiceAreasHubPage from "@/views/service-areas/hub/ServiceAreasHubPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Service Areas | Rize OC — Orange County, CA",
  description:
    "Rize OC provides evidence-based addiction and mental health treatment to communities across Orange County — Irvine, Santa Ana, Laguna Beach, Lake Forest, Mission Viejo, Costa Mesa, and more. Within 25 minutes of every city.",
  alternates: { canonical: "/service-areas" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas", fallbackMetadata);
}

export default ServiceAreasHubPage;
