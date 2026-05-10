import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthHubPage from "@/views/dualdiagnosis/mh-hub/MentalHealthHubPage";

const fallback: Metadata = {
  title: "Mental Health Disorder Treatment | Northbound Treatment",
  description:
    "Northbound Treatment provides integrated dual-diagnosis care for mental health disorders co-occurring with addiction — anxiety, depression, PTSD, bipolar, BPD, trauma, OCD, and eating disorders. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/mental-health-disorders" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders", fallback);
}

export default function Page() {
  return <MentalHealthHubPage />;
}
