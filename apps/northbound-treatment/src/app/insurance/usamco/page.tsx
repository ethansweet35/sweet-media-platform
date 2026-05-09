import { type Metadata } from "next";
import UsamcoPage from "@/views/insurance/usamco/UsamcoPage";

export const metadata: Metadata = {
  title: "USAMCO Managed Care Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts USAMCO managed care coverage for addiction treatment. Verify your USAMCO benefits for detox, residential, PHP, and IOP programs — no cost to verify.",
  alternates: { canonical: '/insurance/usamco' },
};

export default function Page() {
  return <UsamcoPage />;
}
