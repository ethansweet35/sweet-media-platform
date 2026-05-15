import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsuranceOverviewPage from "@/views/insurance/InsuranceOverviewPage";

const fallback: Metadata = {
  title: "Insurance Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment is in-network with Aetna, Anthem, Cigna, TRICARE, and UnitedHealthcare. Free benefits verification — call our admissions team 24/7.",
  alternates: { canonical: "/admissions/insurance/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/", fallback);
}

export default function Page() {
  return <InsuranceOverviewPage />;
}
