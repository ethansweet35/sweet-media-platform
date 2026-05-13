import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { PricingPage } from "@/views/pricing/page";

const fallback: Metadata = {
  title: "Pricing | Get Simple Health",
  description:
    "Transparent pricing for all Get Simple Health treatments — GLP-1 weight loss, peptides, skin & hair. No hidden fees, no insurance complexity.",
  alternates: { canonical: "/pricing" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/pricing", fallback);
}

export default function Page() {
  return <PricingPage />;
}
