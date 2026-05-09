import { type Metadata } from "next";
import CignaPage from "@/views/insurance/cigna/CignaPage";

export const metadata: Metadata = {
  title: "Cigna Insurance Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound is an in-network preferred provider with Cigna. Verify your Cigna coverage for detox, residential, PHP, and IOP addiction treatment. Most clients pay little to nothing out-of-pocket.",
  alternates: { canonical: '/insurance/cigna' },
};

export default function Page() {
  return <CignaPage />;
}
