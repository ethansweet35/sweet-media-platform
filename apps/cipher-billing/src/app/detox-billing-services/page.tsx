import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import DetoxBillingServicesPage from "@/views/services/detox-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "Detox Billing Services | Addiction Detox RCM | Cipher Billing",
  description:
    "Detox billing services for addiction treatment centers—H0008–H0014 HCPCS codes, revenue code 0116, medical necessity documentation, prior auth, denial management, and HIPAA-compliant revenue cycle management.",
  alternates: { canonical: "/detox-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata("/detox-billing-services", fallbackMetadata);
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <DetoxBillingServicesPage />;
}
