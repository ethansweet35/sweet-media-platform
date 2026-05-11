import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NorthDakotaPage from "@/views/north-dakota/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in North Dakota | Addiction Interventions",
  description: "Certified interventionists serving North Dakota. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/north-dakota" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/north-dakota", fallbackMetadata);
}

export default function Page() {
  return <NorthDakotaPage />;
}
