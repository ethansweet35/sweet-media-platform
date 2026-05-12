import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/addiction/inhalant";

const fallback: Metadata = {
  title: "Inhalant Use Disorder Treatment | Rize OC Orange County",
  description: "Medical and psychiatric treatment for inhalant use disorder at Rize OC in Orange County. Neurological assessment, stabilization, and evidence-based behavioral therapy.",
  alternates: { canonical: "/addiction/inhalant" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction/inhalant", fallback);
}

export default SubPage;
