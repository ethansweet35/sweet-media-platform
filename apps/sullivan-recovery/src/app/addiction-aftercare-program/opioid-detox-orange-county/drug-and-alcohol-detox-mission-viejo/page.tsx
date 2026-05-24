import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DrugAndAlcoholDetoxMissionViejoPage from "@/views/drug-and-alcohol-detox-mission-viejo/page";

const fallbackMetadata: Metadata = {
  title: "Drug And Alcohol Detox Mission Viejo | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-and-alcohol-detox-mission-viejo", fallbackMetadata);
}

export default function Page() {
  return <DrugAndAlcoholDetoxMissionViejoPage />;
}
