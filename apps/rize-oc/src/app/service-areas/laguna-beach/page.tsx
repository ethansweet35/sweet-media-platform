import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LagunaBeachServiceAreaPage from "@/views/service-areas/laguna-beach/LagunaBeachServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Laguna Beach, CA | Rize OC",
  description:
    "Rize OC provides discreet, premium addiction and mental health treatment for Laguna Beach residents. Evidence-based programs, physician-led care, most PPOs accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/laguna-beach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/laguna-beach", fallbackMetadata);
}

export default LagunaBeachServiceAreaPage;
