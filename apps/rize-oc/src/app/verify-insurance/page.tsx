import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VerifyInsurancePage from "@/views/verify-insurance/VerifyInsurancePage";

const fallbackMetadata: Metadata = {
  title: "Verify Insurance | Rize OC — Orange County Addiction Treatment",
  description:
    "Check your behavioral health insurance benefits for free. Rize OC's admissions team verifies your coverage, deductibles, and co-pays with most major PPO plans — same-day response, no obligation.",
  alternates: { canonical: "/verify-insurance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/verify-insurance", fallbackMetadata);
}

export default VerifyInsurancePage;
