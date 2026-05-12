import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/depression";

const fallback: Metadata = {
  title: "Depression Treatment in Orange County | Rize OC",
  description: "Major depressive disorder treatment in Orange County — CBT, behavioral activation, EMDR for trauma-driven depression, and psychiatric medication management at Rize OC.",
  alternates: { canonical: "/mental-health/depression" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/depression", fallback);
}

export default SubPage;
