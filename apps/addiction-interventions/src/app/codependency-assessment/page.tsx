import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CodependencyAssessmentPage from "@/views/codependency-assessment/page";

const fallbackMetadata: Metadata = {
  title: "Codependency Assessment | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/codependency-assessment", fallbackMetadata);
}

export default function Page() {
  return <CodependencyAssessmentPage />;
}
