import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewJerseyPage from "@/views/new-jersey/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in New Jersey | Addiction Interventions",
  description:
    "Certified interventionists serving New Jersey. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/new-jersey" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/new-jersey", fallbackMetadata);
}

export default function Page() {
  return <NewJerseyPage />;
}
