import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsuranceGuidePageTemplate from "@/components/guide/InsuranceGuidePageTemplate";
import { getInsuranceGuidePage } from "@/data/insuranceGuidePages";

export function createInsuranceGuidePage(path: string) {
  const pageData = getInsuranceGuidePage(path);
  if (!pageData) {
    throw new Error(`Missing insurance guide content for path: ${path}`);
  }
  const { metadata } = pageData;

  async function generateMetadata(): Promise<Metadata> {
    return resolveTrackedPageMetadata(path, metadata);
  }

  function Page() {
    const data = getInsuranceGuidePage(path);
    if (!data) notFound();
    return <InsuranceGuidePageTemplate data={data} />;
  }

  return { generateMetadata, Page };
}
