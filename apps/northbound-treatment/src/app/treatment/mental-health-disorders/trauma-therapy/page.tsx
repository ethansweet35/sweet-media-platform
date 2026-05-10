import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TraumaPage from "@/views/dualdiagnosis/trauma/TraumaPage";

const fallback: Metadata = {
  title: "Trauma Therapy & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound's trauma-informed dual diagnosis program treats PTSD, childhood trauma, sexual trauma, and co-occurring addiction through EMDR, CBT, and integrated care in Orange County.",
  alternates: { canonical: '/treatment/mental-health-disorders/trauma-therapy' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/trauma-therapy", fallback);
}

export default function Page() {
  return <TraumaPage />;
}
