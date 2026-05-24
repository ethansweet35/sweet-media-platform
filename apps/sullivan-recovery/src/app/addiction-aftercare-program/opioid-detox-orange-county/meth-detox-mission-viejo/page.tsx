import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MethDetoxMissionViejoPage from "@/views/meth-detox-mission-viejo/page";

const fallbackMetadata: Metadata = {
  title: "Meth Detox Mission Viejo | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/meth-detox-mission-viejo", fallbackMetadata);
}

export default function Page() {
  return <MethDetoxMissionViejoPage />;
}
