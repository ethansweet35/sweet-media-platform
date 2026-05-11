import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MassachusettsPage from "@/views/massachusetts/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Massachusetts | Addiction Interventions",
  description:
    "Certified interventionists serving Massachusetts. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/massachusetts" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/massachusetts", fallbackMetadata);
}

export default function Page() {
  return <MassachusettsPage />;
}
