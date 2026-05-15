import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MatPage from "@/views/therapies/MatPage";

const fallbackMetadata: Metadata = {
  title: "Medication-Assisted Treatment (MAT) in Seattle | Mountain View Treatment",
  description: "FDA-approved MAT for opioid use disorder and alcohol use disorder in Seattle \u2014 buprenorphine, naltrexone, and methadone paired with comprehensive clinical care.",
  alternates: { canonical: "/therapies/medication-assisted/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/medication-assisted/", fallbackMetadata);
}

export default function Page() {
  return <MatPage />;
}
