import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsurancePage from "@/views/insurance/InsurancePage";

const fallbackMetadata: Metadata = {
  title: "Insurance Coverage | Adolescent Mental Health",
  description:
    "Verify insurance for teen Virtual IOP. Most major plans cover telehealth intensive outpatient programs for adolescents ages 12–17.",
  alternates: { canonical: "/insurance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/insurance" brandName="Adolescent Mental Health" />
      <InsurancePage currentPath="/insurance" />
    </>
  );
}
