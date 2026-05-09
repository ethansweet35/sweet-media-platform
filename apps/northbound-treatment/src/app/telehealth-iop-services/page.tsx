import type { Metadata } from "next";
import TelehealthPage from "@/views/programs/telehealth/TelehealthPage";

export const metadata: Metadata = {
  title: "Online IOP & Virtual Substance Abuse Treatment | Northbound Treatment Services",
  description:
    "Northbound's HomeBound virtual IOP program delivers evidence-based individual therapy, group counseling, psychiatry, and case management online — available in California and Washington. Most insurance accepted.",
};

export default function Page() {
  return <TelehealthPage />;
}
