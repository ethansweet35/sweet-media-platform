import { type Metadata } from "next";
import TraumaPage from "@/views/dualdiagnosis/trauma/TraumaPage";

export const metadata: Metadata = {
  title: "Trauma Therapy & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound's trauma-informed dual diagnosis program treats PTSD, childhood trauma, sexual trauma, and co-occurring addiction through EMDR, CBT, and integrated care in Orange County.",
  alternates: { canonical: '/treatment/mental-health-disorders/trauma-therapy' },
};

export default function Page() {
  return <TraumaPage />;
}
