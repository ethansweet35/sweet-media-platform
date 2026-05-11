import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NevadaPage from "@/views/nevada/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Nevada | Addiction Interventions",
  description: "Certified interventionists serving Nevada. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/nevada" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/nevada", fallbackMetadata);
}

export default function Page() {
  return <NevadaPage />;
}
