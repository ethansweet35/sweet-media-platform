import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/benzodiazepine";

const fallback: Metadata = {
  title: "Benzodiazepine Dependence Treatment | Rize OC Orange County",
  description: "Physician-supervised benzodiazepine tapering, psychiatric assessment, and CBT for anxiety at Rize OC in Orange County, CA. Safe, individualized taper protocols for Xanax, Klonopin, Ativan, and Valium dependence.",
  alternates: { canonical: "/addiction/benzodiazepine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/benzodiazepine", fallback);
}

export default SubPage;
