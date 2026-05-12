import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/adhd";

const fallback: Metadata = {
  title: "ADHD Treatment in Orange County | Rize OC",
  description: "Evidence-based ADHD treatment for adults — non-stimulant medication options for clients in recovery, CBT for ADHD, and integrated dual-diagnosis care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/mental-health/adhd" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/adhd", fallback);
}

export default SubPage;
