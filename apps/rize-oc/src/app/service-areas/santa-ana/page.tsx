import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SantaAnaServiceAreaPage from "@/views/service-areas/santa-ana/SantaAnaServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Santa Ana, CA | Rize OC",
  description:
    "Rize OC provides evidence-based addiction and mental health treatment minutes from Santa Ana, California. Full continuum of care — detox, PHP, IOP, outpatient. Most PPOs accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/santa-ana" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/santa-ana", fallbackMetadata);
}

export default SantaAnaServiceAreaPage;
