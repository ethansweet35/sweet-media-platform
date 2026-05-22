import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import IopBillingServicesPage from "@/views/services/iop-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "IOP Billing Services | Intensive Outpatient Program Billing | Cipher Billing",
  description:
    "IOP billing services for mental health and substance use intensive outpatient programs—Medicare coverage, billing requirements, HCPCS and CPT codes, UB-04 claims, and denial prevention.",
  alternates: { canonical: "/iop-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata("/iop-billing-services", fallbackMetadata);
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <IopBillingServicesPage />;
}
