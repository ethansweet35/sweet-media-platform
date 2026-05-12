import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPage from "@/views/what-we-treat/MentalHealthPage";

const fallback: Metadata = {
  title: "Mental Health Treatment in Orange County | Rize OC",
  description:
    "Integrated mental health treatment for depression, anxiety, PTSD, bipolar disorder, and dual-diagnosis conditions. Psychiatrists on-site, EMDR-certified therapists, and evidence-based care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/mental-health" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health", fallback);
}

export default function Page() {
  return <MentalHealthPage />;
}
