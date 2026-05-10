import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AetnaPage from "@/views/insurance/aetna/AetnaPage";

const fallback: Metadata = {
  title: "Aetna Insurance for Drug & Alcohol Treatment | Northbound Treatment",
  description:
    "Northbound Treatment is an in-network preferred provider with Aetna. Aetna covers detox, residential, PHP, and IOP for most members — verify your benefits for free today at (866) 311-0003.",
  alternates: { canonical: '/insurance/aetna' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/aetna", fallback);
}

export default function Page() {
  return <AetnaPage />;
}
