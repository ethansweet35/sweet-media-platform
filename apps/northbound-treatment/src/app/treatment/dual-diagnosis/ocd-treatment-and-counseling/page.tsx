import { type Metadata } from "next";
import OcdPage from "@/views/dualdiagnosis/ocd/OcdPage";

export const metadata: Metadata = {
  title: "OCD Treatment & Addiction Counseling | Northbound Treatment Services",
  description:
    "Northbound treats OCD and co-occurring addiction through Exposure and Response Prevention (ERP), CBT, and integrated dual diagnosis care in Orange County, California.",
  alternates: { canonical: '/treatment/dual-diagnosis/ocd-treatment-and-counseling' },
};

export default function Page() {
  return <OcdPage />;
}
