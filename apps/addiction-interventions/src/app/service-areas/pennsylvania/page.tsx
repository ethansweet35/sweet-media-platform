import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PennsylvaniaPage from "@/views/pennsylvania/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Pennsylvania | Addiction Interventions",
  description:
    "Certified interventionists serving Pennsylvania. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/pennsylvania" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/pennsylvania", fallbackMetadata);
}

export default function Page() {
  return <PennsylvaniaPage />;
}
