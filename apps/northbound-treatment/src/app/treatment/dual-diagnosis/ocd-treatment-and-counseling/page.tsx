import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OcdPage from "@/views/dualdiagnosis/ocd/OcdPage";

const fallback: Metadata = {
  title: "OCD Treatment & Addiction Counseling Services",
  description:
    "Northbound treats OCD and co-occurring addiction through Exposure and Response Prevention (ERP), CBT, and integrated dual diagnosis care in Orange County, California.",
  alternates: { canonical: '/treatment/dual-diagnosis/ocd-treatment-and-counseling' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/dual-diagnosis/ocd-treatment-and-counseling", fallback);
}

export default function Page() {
  return <OcdPage />;
}
