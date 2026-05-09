import type { Metadata } from "next";
import AetnaPage from "@/views/insurance/aetna/AetnaPage";

export const metadata: Metadata = {
  title: "Aetna Insurance for Drug & Alcohol Treatment | Northbound Treatment",
  description:
    "Northbound Treatment is an in-network preferred provider with Aetna. Aetna covers detox, residential, PHP, and IOP for most members — verify your benefits for free today at (866) 311-0003.",
  alternates: { canonical: '/insurance/aetna' },
};

export default function Page() {
  return <AetnaPage />;
}
