import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LouisianaPage from "@/views/louisiana/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Louisiana | Addiction Interventions",
  description: "Certified interventionists serving Louisiana. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/louisiana" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/louisiana", fallbackMetadata);
}

export default function Page() {
  return <LouisianaPage />;
}
