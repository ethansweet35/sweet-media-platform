import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewYorkPage from "@/views/new-york/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in New York | Addiction Interventions",
  description: "Certified interventionists serving New York. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/new-york" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/new-york", fallbackMetadata);
}

export default function Page() {
  return <NewYorkPage />;
}
