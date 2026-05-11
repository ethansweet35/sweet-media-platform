import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MissouriPage from "@/views/missouri/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Missouri | Addiction Interventions",
  description:
    "Certified interventionists serving Missouri. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/missouri", fallbackMetadata);
}

export default function Page() {
  return <MissouriPage />;
}
