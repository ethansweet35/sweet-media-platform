import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BcbsPage from "@/views/insurance/bcbs/BcbsPage";

const fallback: Metadata = {
  title: "Blue Cross Blue Shield Addiction Treatment Coverage",
  description:
    "Northbound is an in-network preferred provider with Blue Cross Blue Shield. Verify your BCBS coverage for detox, residential, PHP, and IOP addiction treatment across all 50 states.",
  alternates: { canonical: '/insurance/blue-cross-blue-shield' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/blue-cross-blue-shield", fallback);
}

export default function Page() {
  return <BcbsPage />;
}
