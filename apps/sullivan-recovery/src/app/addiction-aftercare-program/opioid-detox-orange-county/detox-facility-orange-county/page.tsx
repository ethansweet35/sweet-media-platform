import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxFacilityOrangeCountyPage from "@/views/detox-facility-orange-county/page";

const fallbackMetadata: Metadata = {
  title: "Detox Facility Orange County | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/detox-facility-orange-county", fallbackMetadata);
}

export default function Page() {
  return <DetoxFacilityOrangeCountyPage />;
}
