import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxInOrangeCountyPage from "@/views/detox-in-orange-county/page";

const fallbackMetadata: Metadata = {
  title: "Detox in Orange County GALP | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/detox-in-orange-county", fallbackMetadata);
}

export default function Page() {
  return <DetoxInOrangeCountyPage />;
}
