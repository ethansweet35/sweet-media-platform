import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CignaPage from "@/views/insurance/cigna/CignaPage";

const fallback: Metadata = {
  title: "Cigna Insurance Coverage for Addiction Treatment",
  description:
    "Northbound is an in-network preferred provider with Cigna. Verify your Cigna coverage for detox, residential, PHP, and IOP addiction treatment. Most clients pay little to nothing out-of-pocket.",
  alternates: { canonical: '/insurance/cigna' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/cigna", fallback);
}

export default function Page() {
  return <CignaPage />;
}
