import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AetnaInsuranceCoverageForRehabPage from "@/views/aetna-insurance-coverage-for-rehab/page";

const fallbackMetadata: Metadata = {
  title: "Aetna Insurance Coverage For Rehab | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/aetna-insurance-coverage-for-rehab", fallbackMetadata);
}

export default function Page() {
  return <AetnaInsuranceCoverageForRehabPage />;
}
