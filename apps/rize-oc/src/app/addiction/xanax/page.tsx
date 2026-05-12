import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/xanax";

const fallback: Metadata = {
  title: "Xanax Dependence Treatment in Orange County | Rize OC",
  description: "Xanax dependence treatment at Rize OC in Orange County — physician-supervised tapering, psychiatric support, and CBT for anxiety. Safe discontinuation protocols for alprazolam dependence.",
  alternates: { canonical: "/addiction/xanax" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/xanax", fallback);
}

export default SubPage;
