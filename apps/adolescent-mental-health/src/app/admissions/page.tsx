import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsPage from "@/views/admissions/AdmissionsPage";

const fallbackMetadata: Metadata = {
  title: "Admissions | Adolescent Mental Health",
  description:
    "Start teen mental health care with a free, confidential admissions consultation. Insurance verification, clinical assessment, and intake in 24–48 hours.",
  alternates: { canonical: "/admissions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/admissions" brandName="Adolescent Mental Health" />
      <AdmissionsPage />
    </>
  );
}
