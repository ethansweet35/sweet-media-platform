import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewHampshirePage from "@/views/new-hampshire/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in New Hampshire | Addiction Interventions",
  description:
    "Certified interventionists serving New Hampshire. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/new-hampshire" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/new-hampshire", fallbackMetadata);
}

export default function Page() {
  return <NewHampshirePage />;
}
