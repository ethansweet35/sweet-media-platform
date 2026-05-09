import { type Metadata } from "next";
import BcbsPage from "@/views/insurance/bcbs/BcbsPage";

export const metadata: Metadata = {
  title: "Blue Cross Blue Shield Addiction Treatment Coverage | Northbound Treatment",
  description:
    "Northbound is an in-network preferred provider with Blue Cross Blue Shield. Verify your BCBS coverage for detox, residential, PHP, and IOP addiction treatment across all 50 states.",
};

export default function Page() {
  return <BcbsPage />;
}
