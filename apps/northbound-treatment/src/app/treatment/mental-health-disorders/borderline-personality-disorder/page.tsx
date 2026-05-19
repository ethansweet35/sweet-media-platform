import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BpdPage from "@/views/dualdiagnosis/bpd/BpdPage";

const fallback: Metadata = {
  title: "Borderline Personality Disorder & Addiction Treatment Services",
  description:
    "Northbound treats BPD and co-occurring addiction with DBT, trauma-informed care, and integrated dual diagnosis programming in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/borderline-personality-disorder' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/borderline-personality-disorder", fallback);
}

export default function Page() {
  return <BpdPage />;
}
