import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelsOfCareHubPage from "@/views/hubs/LevelsOfCareHubPage";

const fallbackMetadata: Metadata = {
  title: "Levels of Care | Adolescent Mental Health",
  description:
    "Compare outpatient therapy and Virtual IOP for teens ages 12–17. Structured intensive care from home with insurance coverage.",
  alternates: { canonical: "/levels-of-care" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/levels-of-care", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/levels-of-care" brandName="Adolescent Mental Health" />
      <LevelsOfCareHubPage />
    </>
  );
}
