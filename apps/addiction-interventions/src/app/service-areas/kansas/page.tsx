import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import KansasPage from "@/views/kansas/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Kansas | Addiction Interventions",
  description:
    "Certified interventionists serving Kansas. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/kansas" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/kansas", fallbackMetadata);
}

export default function Page() {
  return <KansasPage />;
}
