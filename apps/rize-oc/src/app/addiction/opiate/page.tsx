import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/opiate";

const fallback: Metadata = {
  title: "Opiate & Opioid Addiction Treatment in Orange County | Rize OC",
  description: "Opioid use disorder treatment with medication-assisted treatment (buprenorphine/MAT), medically supervised detox, and integrated dual-diagnosis care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/addiction/opiate" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/opiate", fallback);
}

export default SubPage;
