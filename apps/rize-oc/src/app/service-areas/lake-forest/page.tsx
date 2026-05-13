import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LakeForestServiceAreaPage from "@/views/service-areas/lake-forest/LakeForestServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Lake Forest, CA | Rize OC",
  description:
    "Rize OC provides South Orange County residents in Lake Forest with evidence-based addiction and mental health treatment. Full continuum of care, family-focused. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/lake-forest" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/lake-forest", fallbackMetadata);
}

export default LakeForestServiceAreaPage;
