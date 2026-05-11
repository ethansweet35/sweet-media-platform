import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WestVirginiaPage from "@/views/west-virginia/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in West Virginia | Addiction Interventions",
  description:
    "Certified interventionists serving West Virginia. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/west-virginia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/west-virginia", fallbackMetadata);
}

export default function Page() {
  return <WestVirginiaPage />;
}
