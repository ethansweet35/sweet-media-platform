import { type Metadata } from "next";
import CodependencyPage from "@/views/dualdiagnosis/codependency/CodependencyPage";

export const metadata: Metadata = {
  title: "Codependency & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound treats codependency alongside addiction through integrated dual diagnosis care, family therapy, CBT, and boundary-building programs in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/codependency' },
};

export default function Page() {
  return <CodependencyPage />;
}
