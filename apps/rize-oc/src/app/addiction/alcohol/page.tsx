import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/alcohol";

const fallback: Metadata = {
  title: "Alcohol Addiction Treatment in Orange County | Rize OC",
  description: "Medically supervised alcohol detox, medication-assisted treatment with Naltrexone, and integrated dual-diagnosis care for alcohol use disorder at Rize OC in Orange County, CA.",
  alternates: { canonical: "/addiction/alcohol" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/alcohol", fallback);
}

export default SubPage;
