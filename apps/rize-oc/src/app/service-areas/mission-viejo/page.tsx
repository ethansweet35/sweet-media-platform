import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MissionViejoServiceAreaPage from "@/views/service-areas/mission-viejo/MissionViejoServiceAreaPage";

const fallbackMetadata: Metadata = {
  title: "Addiction Treatment Near Mission Viejo, CA | Rize OC",
  description:
    "Rize OC provides Mission Viejo families with compassionate, evidence-based addiction and mental health treatment. Confidential, family-centered care — most PPOs accepted. Call (949) 461-2620.",
  alternates: { canonical: "/service-areas/mission-viejo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/mission-viejo", fallbackMetadata);
}

export default MissionViejoServiceAreaPage;
