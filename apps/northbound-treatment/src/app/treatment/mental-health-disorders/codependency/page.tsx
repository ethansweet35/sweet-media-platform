import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CodependencyPage from "@/views/dualdiagnosis/codependency/CodependencyPage";

const fallback: Metadata = {
  title: "Codependency & Addiction Treatment Services",
  description:
    "Northbound treats codependency alongside addiction through integrated dual diagnosis care, family therapy, CBT, and boundary-building programs in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/codependency' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/codependency", fallback);
}

export default function Page() {
  return <CodependencyPage />;
}
