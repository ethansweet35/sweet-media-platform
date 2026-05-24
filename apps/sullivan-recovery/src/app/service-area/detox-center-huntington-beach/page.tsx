import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxCenterHuntingtonBeachPage from "@/views/detox-center-huntington-beach/page";

const fallbackMetadata: Metadata = {
  title: "Detox Center Huntington Beach | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/detox-center-huntington-beach", fallbackMetadata);
}

export default function Page() {
  return <DetoxCenterHuntingtonBeachPage />;
}
