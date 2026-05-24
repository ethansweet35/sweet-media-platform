import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IopTreatmentMissionViejoPage from "@/views/iop-treatment-mission-viejo/page";

const fallbackMetadata: Metadata = {
  title: "IOP Treatment Mission Viejo | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/iop-treatment-mission-viejo", fallbackMetadata);
}

export default function Page() {
  return <IopTreatmentMissionViejoPage />;
}
