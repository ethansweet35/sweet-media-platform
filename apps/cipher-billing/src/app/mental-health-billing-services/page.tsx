import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import MentalHealthBillingServicesPage from "@/views/services/mental-health-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "Mental Health Billing Services | Therapy & Psychiatric Billing | Cipher Billing",
  description:
    "Mental health billing services for therapists, psychiatrists, and behavioral health practices—CPT codes, insurance credentialing, telehealth claims, denial management, and HIPAA-compliant revenue cycle management.",
  alternates: { canonical: "/mental-health-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata(
    "/mental-health-billing-services",
    fallbackMetadata,
  );
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <MentalHealthBillingServicesPage />;
}
