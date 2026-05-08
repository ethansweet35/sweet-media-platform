import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthInterventionsPage from "@/views/mental-health-interventions/page";

const fallbackMetadata: Metadata = {
  title: "Mental Health Interventions | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-interventions", fallbackMetadata);
}

export default function Page() {
  return <MentalHealthInterventionsPage />;
}
