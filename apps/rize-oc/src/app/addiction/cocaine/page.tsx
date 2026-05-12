import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/cocaine";

const fallback: Metadata = {
  title: "Cocaine Addiction Treatment in Orange County | Rize OC",
  description: "Evidence-based cocaine addiction treatment — CBT, Contingency Management, psychiatric support, and dual-diagnosis care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/addiction/cocaine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/cocaine", fallback);
}

export default SubPage;
