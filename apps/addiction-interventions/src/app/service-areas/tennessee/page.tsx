import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TennesseePage from "@/views/tennessee/page";

const fallbackMetadata: Metadata = {
  title: "Addiction & Mental Health Interventions in Tennessee | Addiction Interventions",
  description:
    "Certified interventionists serving Tennessee. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation.",
  alternates: { canonical: "/service-areas/tennessee" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/tennessee", fallbackMetadata);
}

export default function Page() {
  return <TennesseePage />;
}
