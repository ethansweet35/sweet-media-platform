import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IdahoPage from "@/views/idaho/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Idaho | Addiction Interventions",
  description: "Certified interventionists serving Idaho. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/idaho" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/idaho", fallbackMetadata);
}

export default function Page() {
  return <IdahoPage />;
}
