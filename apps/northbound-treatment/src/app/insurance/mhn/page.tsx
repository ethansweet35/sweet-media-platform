import { type Metadata } from "next";
import MhnPage from "@/views/insurance/mhn/MhnPage";

export const metadata: Metadata = {
  title: "MHN (Mental Health Network) Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound is an in-network provider with MHN (Mental Health Network) — Health Net's behavioral health subsidiary. Verify your MHN benefits for detox, residential, PHP, and IOP.",
};

export default function Page() {
  return <MhnPage />;
}
