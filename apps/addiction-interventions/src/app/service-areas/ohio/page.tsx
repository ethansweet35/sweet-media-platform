import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OhioPage from "@/views/ohio/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Ohio | Addiction Interventions",
  description:
    "Certified interventionists serving Ohio. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/ohio" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/ohio", fallbackMetadata);
}

export default function Page() {
  return <OhioPage />;
}
