import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/anxiety";

const fallback: Metadata = {
  title: "Anxiety Disorder Treatment in Orange County | Rize OC",
  description: "CBT, exposure therapy, and psychiatric medication management for generalized anxiety, panic disorder, and social anxiety at Rize OC in Orange County, CA.",
  alternates: { canonical: "/mental-health/anxiety" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/anxiety", fallback);
}

export default SubPage;
