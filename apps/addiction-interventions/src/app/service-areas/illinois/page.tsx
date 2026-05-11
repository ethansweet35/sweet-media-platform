import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IllinoisPage from "@/views/illinois/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Illinois | Addiction Interventions",
  description:
    "Certified interventionists serving Illinois. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/illinois" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/illinois", fallbackMetadata);
}

export default function Page() {
  return <IllinoisPage />;
}
