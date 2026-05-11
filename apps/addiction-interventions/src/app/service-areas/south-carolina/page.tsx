import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SouthCarolinaPage from "@/views/south-carolina/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in South Carolina | Addiction Interventions",
  description:
    "Certified interventionists serving South Carolina. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/south-carolina" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/south-carolina", fallbackMetadata);
}

export default function Page() {
  return <SouthCarolinaPage />;
}
