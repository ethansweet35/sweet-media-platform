import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BehavioralHealthRcmLpPage from "@/views/behavioral-health-rcm-lp/page";

const fallbackMetadata: Metadata = {
  title: "Behavioral Health RCM (LP) | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/behavioral-health-rcm-lp", fallbackMetadata);
}

export default function Page() {
  return <BehavioralHealthRcmLpPage />;
}
