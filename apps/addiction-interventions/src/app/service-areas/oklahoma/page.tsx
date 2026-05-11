import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OklahomaPage from "@/views/oklahoma/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Oklahoma | Addiction Interventions",
  description: "Certified interventionists serving Oklahoma. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/oklahoma" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/oklahoma", fallbackMetadata);
}

export default function Page() {
  return <OklahomaPage />;
}
