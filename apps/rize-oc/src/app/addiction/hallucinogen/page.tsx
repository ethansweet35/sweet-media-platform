import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/hallucinogen";

const fallback: Metadata = {
  title: "Hallucinogen Use Disorder Treatment | Rize OC Orange County",
  description: "Specialized treatment for hallucinogen use disorder, HPPD, and MDMA dependence — psychiatric evaluation, CBT, and trauma-informed care at Rize OC in Orange County.",
  alternates: { canonical: "/addiction/hallucinogen" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/hallucinogen", fallback);
}

export default SubPage;
