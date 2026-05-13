import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IrvineServiceAreaPage from "@/views/service-areas/irvine/IrvineServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Irvine, CA | Rize OC",
  description:
    "Rize OC provides evidence-based addiction and mental health treatment minutes from Irvine, California. Programs include detox, PHP, IOP, outpatient, and virtual IOP. Most insurance accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/irvine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/irvine", fallbackMetadata);
}

export default IrvineServiceAreaPage;
