import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import SubstanceAbuseBillingServicesPage from "@/views/services/substance-abuse-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "Substance Abuse Billing Services | SUD Treatment Center Billing | Cipher Billing",
  description:
    "Substance abuse billing services for addiction treatment and co-occurring mental health programs—HCPCS codes, insurance verification, HIPAA-compliant revenue cycle management, and denial prevention.",
  alternates: { canonical: "/substance-abuse-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata(
    "/substance-abuse-billing-services",
    fallbackMetadata,
  );
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <SubstanceAbuseBillingServicesPage />;
}
