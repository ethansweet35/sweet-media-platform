import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CignaPage from "@/views/insurance/CignaPage";

const fallback: Metadata = {
  title: "Cigna Insurance Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment accepts Cigna insurance for PHP, IOP, and outpatient addiction and mental health treatment in Seattle, WA. Verify your Cigna benefits at no cost.",
  alternates: { canonical: "/admissions/insurance/cigna/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/cigna/", fallback);
}

export default function Page() {
  return <CignaPage />;
}
