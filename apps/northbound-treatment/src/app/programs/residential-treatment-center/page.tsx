import type { Metadata } from "next";
import ResidentialPage from "@/views/programs/residential/ResidentialPage";

export const metadata: Metadata = {
  title: "Residential Inpatient Treatment | Northbound Treatment Services",
  description:
    "Northbound's residential inpatient program in Orange County provides 24/7 immersive addiction treatment through the InVivo® model, gender-responsive programming, and a multidisciplinary clinical team. Verify your insurance today.",
};

export default function Page() {
  return <ResidentialPage />;
}
