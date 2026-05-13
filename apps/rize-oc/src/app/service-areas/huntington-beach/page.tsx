import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HuntingtonBeachServiceAreaPage from "@/views/service-areas/huntington-beach/HuntingtonBeachServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Huntington Beach, CA | Rize OC",
  description:
    "Rize OC provides evidence-based addiction and mental health treatment minutes from Huntington Beach, California. Programs include detox, PHP, IOP, outpatient, and virtual IOP. Most insurance accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/huntington-beach" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/huntington-beach", fallbackMetadata);
}

export default HuntingtonBeachServiceAreaPage;
