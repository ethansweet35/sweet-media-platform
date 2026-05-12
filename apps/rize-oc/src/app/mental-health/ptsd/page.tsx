import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/ptsd";

const fallback: Metadata = {
  title: "PTSD & Trauma Treatment in Orange County | Rize OC",
  description: "PTSD and trauma treatment at Rize OC in Orange County — EMDR-certified therapists, trauma-focused CBT, and integrated dual-diagnosis care. Treating complex trauma and PTSD.",
  alternates: { canonical: "/mental-health/ptsd" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/ptsd", fallback);
}

export default SubPage;
