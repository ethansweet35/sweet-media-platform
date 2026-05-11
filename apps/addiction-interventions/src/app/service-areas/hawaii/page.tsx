import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HawaiiPage from "@/views/hawaii/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Hawaii | Addiction Interventions",
  description:
    "Certified interventionists serving Hawaii. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/hawaii" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/hawaii", fallbackMetadata);
}

export default function Page() {
  return <HawaiiPage />;
}
