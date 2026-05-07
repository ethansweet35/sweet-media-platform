import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BehavioralHealthRevenueCycleManagementPage from "@/views/behavioral-health-revenue-cycle-management/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health Revenue Cycle Management | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/behavioral-health-revenue-cycle-management", fallbackMetadata);
}

export default function Page() {
  return <BehavioralHealthRevenueCycleManagementPage />;
}
