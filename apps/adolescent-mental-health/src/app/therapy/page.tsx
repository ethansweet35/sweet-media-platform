import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyHubPage from "@/views/hubs/TherapyHubPage";

const fallbackMetadata: Metadata = {
  title: "Therapies | Adolescent Mental Health",
  description:
    "Individual, group, and family therapy for teens in Virtual IOP. CBT, DBT, and trauma-informed care ages 12–17.",
  alternates: { canonical: "/therapy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapy", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/therapy" brandName="Adolescent Mental Health" />
      <TherapyHubPage />
    </>
  );
}
