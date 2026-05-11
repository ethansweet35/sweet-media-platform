import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MainePage from "@/views/maine/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Maine | Addiction Interventions",
  description:
    "Certified interventionists serving Maine. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/maine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/maine", fallbackMetadata);
}

export default function Page() {
  return <MainePage />;
}
