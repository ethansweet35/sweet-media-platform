import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MhnPage from "@/views/insurance/mhn/MhnPage";

const fallback: Metadata = {
  title: "MHN (Mental Health Network) Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an in-network provider with MHN (Mental Health Network) — Health Net's behavioral health subsidiary. Verify your MHN benefits for detox, residential, PHP, and IOP.",
  alternates: { canonical: '/insurance/mhn' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/mhn", fallback);
}

export default function Page() {
  return <MhnPage />;
}
