import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WyomingPage from "@/views/wyoming/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Wyoming | Addiction Interventions",
  description:
    "Certified interventionists serving Wyoming. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/wyoming" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/wyoming", fallbackMetadata);
}

export default function Page() {
  return <WyomingPage />;
}
