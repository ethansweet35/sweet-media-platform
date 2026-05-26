import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TreatmentHubPage from "@/views/hubs/TreatmentHubPage";

const fallbackMetadata: Metadata = {
  title: "Treatment Programs | Adolescent Mental Health",
  description:
    "Virtual IOP, adolescent IOP, CBT, insomnia, and bipolar treatment for teens ages 12–17. Evidence-based programs delivered from home.",
  alternates: { canonical: "/treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/treatment" brandName="Adolescent Mental Health" />
      <TreatmentHubPage />
    </>
  );
}
