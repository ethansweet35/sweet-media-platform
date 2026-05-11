import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MontanaPage from "@/views/montana/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Montana | Addiction Interventions",
  description: "Certified interventionists serving Montana. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/montana" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/montana", fallbackMetadata);
}

export default function Page() {
  return <MontanaPage />;
}
