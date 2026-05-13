import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GeorgiaPage from "@/views/georgia/page";

const fallbackMetadata: Metadata = {
  title: "Georgia Addiction & Drug Intervention Services | Addiction Interventions",
  description:
    "Expert alcohol and drug intervention services in Georgia. Certified professional interventionists cover all 159 counties — inpatient rehab, outpatient, and detox coordination within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/georgia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/georgia", fallbackMetadata);
}

export default function Page() {
  return <GeorgiaPage />;
}
