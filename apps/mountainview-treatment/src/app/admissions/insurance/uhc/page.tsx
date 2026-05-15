import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import UhcPage from "@/views/insurance/UhcPage";

const fallback: Metadata = {
  title: "UnitedHealthcare Insurance Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment accepts UnitedHealthcare (UHC) insurance for PHP, IOP, and outpatient addiction and mental health treatment in Seattle, WA. Verify your UHC benefits at no cost.",
  alternates: { canonical: "/admissions/insurance/uhc/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/uhc/", fallback);
}

export default function Page() {
  return <UhcPage />;
}
