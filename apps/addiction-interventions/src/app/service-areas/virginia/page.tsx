import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VirginiaPage from "@/views/virginia/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Virginia | Addiction Interventions",
  description:
    "Certified interventionists serving Virginia. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/virginia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/virginia", fallbackMetadata);
}

export default function Page() {
  return <VirginiaPage />;
}
