import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DelawarePage from "@/views/delaware/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Delaware | Addiction Interventions",
  description: "Certified interventionists serving Delaware. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/delaware" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/delaware", fallbackMetadata);
}

export default function Page() {
  return <DelawarePage />;
}
