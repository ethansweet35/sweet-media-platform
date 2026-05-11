import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MichiganPage from "@/views/michigan/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Michigan | Addiction Interventions",
  description:
    "Certified interventionists serving Michigan. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/michigan" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/michigan", fallbackMetadata);
}

export default function Page() {
  return <MichiganPage />;
}
