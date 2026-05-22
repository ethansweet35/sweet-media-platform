import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import ResidentialTreatmentBillingServicesPage from "@/views/services/residential-treatment-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "Residential Treatment Billing Services | Mental Health & Addiction | Cipher Billing",
  description:
    "Residential treatment billing services for mental health and addiction treatment centers—H0017/H0018/H0019 HCPCS, ASAM documentation, place of service 55, authorization, and revenue cycle management.",
  alternates: { canonical: "/residential-treatment-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata(
    "/residential-treatment-billing-services",
    fallbackMetadata,
  );
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <ResidentialTreatmentBillingServicesPage />;
}
