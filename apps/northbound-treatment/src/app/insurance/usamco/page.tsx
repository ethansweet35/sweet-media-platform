import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import UsamcoPage from "@/views/insurance/usamco/UsamcoPage";

const fallback: Metadata = {
  title: "USAMCO Managed Care Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts USAMCO managed care coverage for addiction treatment. Verify your USAMCO benefits for detox, residential, PHP, and IOP programs — no cost to verify.",
  alternates: { canonical: '/insurance/usamco' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/usamco", fallback);
}

export default function Page() {
  return <UsamcoPage />;
}
