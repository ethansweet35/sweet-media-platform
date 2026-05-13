import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CostaMesaServiceAreaPage from "@/views/service-areas/costa-mesa/CostaMesaServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Costa Mesa, CA | Rize OC",
  description:
    "Rize OC provides Costa Mesa residents with evidence-based addiction and mental health treatment — minutes away. Flexible IOP, full continuum of care, most PPOs accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/costa-mesa" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/costa-mesa", fallbackMetadata);
}

export default CostaMesaServiceAreaPage;
