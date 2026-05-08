import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InterventionServicesPage from "@/views/intervention-services/page";

const fallbackMetadata: Metadata = {
  title: "Intervention Services | Addiction Interventions",
  description:
    "Browse the full range of addiction and mental health interventions we provide — substance-specific, mental health, dual diagnosis, family, executive, teen, and crisis interventions. Available 24/7.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/intervention-services", fallbackMetadata);
}

export default function Page() {
  return <InterventionServicesPage />;
}
