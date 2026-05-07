import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BehavioralHealthReimbursementRatesByStatePage from "@/views/behavioral-health-reimbursement-rates-by-state/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health Reimbursement Rates by State | Cipher Billing",
  description:
    "Medicare benchmarks, regional market tiers, and state-level behavioral health reimbursement context—with Cipher Billing’s specialists.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/behavioral-health-reimbursement-rates-by-state", fallbackMetadata);
}

export default function Page() {
  return <BehavioralHealthReimbursementRatesByStatePage />;
}
