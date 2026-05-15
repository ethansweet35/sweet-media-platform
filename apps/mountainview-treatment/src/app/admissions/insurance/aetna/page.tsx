import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AetnaPage from "@/views/insurance/AetnaPage";

const fallback: Metadata = {
  title: "Aetna Insurance Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment accepts Aetna insurance for PHP, IOP, and outpatient addiction and mental health treatment in Seattle, WA. Verify your Aetna benefits at no cost.",
  alternates: { canonical: "/admissions/insurance/aetna/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/aetna/", fallback);
}

export default function Page() {
  return <AetnaPage />;
}
