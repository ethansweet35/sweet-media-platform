import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurCompanyPage from "@/views/our-company/page";

const fallbackMetadata: Metadata = {
  title: "Our Company | Cipher Billing | Cipher Billing",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-company", fallbackMetadata);
}

export default function Page() {
  return <OurCompanyPage />;
}
