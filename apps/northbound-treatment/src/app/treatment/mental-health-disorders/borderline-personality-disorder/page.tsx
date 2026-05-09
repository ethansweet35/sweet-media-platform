import { type Metadata } from "next";
import BpdPage from "@/views/dualdiagnosis/bpd/BpdPage";

export const metadata: Metadata = {
  title: "Borderline Personality Disorder & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound treats BPD and co-occurring addiction with DBT, trauma-informed care, and integrated dual diagnosis programming in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/borderline-personality-disorder' },
};

export default function Page() {
  return <BpdPage />;
}
