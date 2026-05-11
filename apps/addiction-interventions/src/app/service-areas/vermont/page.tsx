import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VermontPage from "@/views/vermont/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Vermont | Addiction Interventions",
  description:
    "Certified interventionists serving Vermont. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/vermont" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/vermont", fallbackMetadata);
}

export default function Page() {
  return <VermontPage />;
}
