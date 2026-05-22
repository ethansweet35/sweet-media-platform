import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import PhpBillingServicesPage from "@/views/services/php-billing-services/page";

const fallbackMetadata: Metadata = {
  title: "PHP Billing Services | Partial Hospitalization Program Billing | Cipher Billing",
  description:
    "PHP billing services for mental health and substance use partial hospitalization—Medicare coverage, S0201/H0015/H0035 codes, revenue code 0912, recertification, and revenue cycle management.",
  alternates: { canonical: "/php-billing-services" },
};

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await resolveTrackedPageMetadata("/php-billing-services", fallbackMetadata);
  return withDraftPageRobots(metadata);
}

export default function Page() {
  return <PhpBillingServicesPage />;
}
