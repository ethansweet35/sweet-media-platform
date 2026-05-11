import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IndianaPage from "@/views/indiana/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Indiana | Addiction Interventions",
  description:
    "Certified interventionists serving Indiana. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/indiana" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/indiana", fallbackMetadata);
}

export default function Page() {
  return <IndianaPage />;
}
