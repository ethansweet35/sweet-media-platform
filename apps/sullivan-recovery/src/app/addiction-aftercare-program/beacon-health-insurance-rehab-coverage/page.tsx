import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BeaconHealthInsuranceRehabCoveragePage from "@/views/beacon-health-insurance-rehab-coverage/page";

const fallbackMetadata: Metadata = {
  title: "Beacon Health Insurance Rehab Coverage | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/beacon-health-insurance-rehab-coverage", fallbackMetadata);
}

export default function Page() {
  return <BeaconHealthInsuranceRehabCoveragePage />;
}
