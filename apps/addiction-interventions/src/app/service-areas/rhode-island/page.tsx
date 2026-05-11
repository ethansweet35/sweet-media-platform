import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import RhodeIslandPage from "@/views/rhode-island/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Rhode Island | Addiction Interventions",
  description:
    "Certified interventionists serving Rhode Island. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/rhode-island" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/rhode-island", fallbackMetadata);
}

export default function Page() {
  return <RhodeIslandPage />;
}
