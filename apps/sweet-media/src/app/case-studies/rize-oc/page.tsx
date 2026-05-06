import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import RizeOcPage from "@/pages/case-studies/rize-oc/page";

const fallbackMetadata: Metadata = {
  title: "Rize OC Case Study | $10K to $300K/Month, 67% CPA Drop | Sweet Media",
  description:
    "How Sweet Media helped Rize OC scale Google Ads from $10K to $300K/month in 4 months while reducing CPA from $350 to $115.",
  alternates: { canonical: "/case-studies/rize-oc" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/case-studies/rize-oc", fallbackMetadata);
}

export default function Page() {
  return <RizeOcPage />;
}
