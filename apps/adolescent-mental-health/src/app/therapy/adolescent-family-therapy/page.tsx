import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FamilyTherapyPage from "@/views/therapy/FamilyTherapyPage";

const fallbackMetadata: Metadata = {
  title: "Family Therapy for Teens | Adolescent Mental Health",
  description:
    "Virtual family therapy and caregiver coaching in adolescent IOP. Support communication, boundaries, and recovery at home.",
  alternates: { canonical: "/therapy/adolescent-family-therapy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapy/adolescent-family-therapy", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner
        trackedPagePath="/therapy/adolescent-family-therapy"
        brandName="Adolescent Mental Health"
      />
      <FamilyTherapyPage />
    </>
  );
}
