import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServiceAreasPage from "@/views/ServiceAreasPage";

const fallback: Metadata = {
  title: "Service Areas",
  description: "Orange County-based intervention services with national and international reach.",
  alternates: { canonical: "/service-areas" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas", fallback);
}

export default function Page() {
  return <ServiceAreasPage />;
}
