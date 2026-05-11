import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NebraskaPage from "@/views/nebraska/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Nebraska | Addiction Interventions",
  description:
    "Certified interventionists serving Nebraska. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/nebraska" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/nebraska", fallbackMetadata);
}

export default function Page() {
  return <NebraskaPage />;
}
