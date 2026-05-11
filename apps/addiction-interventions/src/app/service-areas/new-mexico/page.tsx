import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NewMexicoPage from "@/views/new-mexico/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in New Mexico | Addiction Interventions",
  description: "Certified interventionists serving New Mexico. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/new-mexico" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/new-mexico", fallbackMetadata);
}

export default function Page() {
  return <NewMexicoPage />;
}
