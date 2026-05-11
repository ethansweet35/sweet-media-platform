import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GeorgiaPage from "@/views/georgia/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Georgia | Addiction Interventions",
  description:
    "Certified interventionists serving Georgia. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/georgia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/georgia", fallbackMetadata);
}

export default function Page() {
  return <GeorgiaPage />;
}
