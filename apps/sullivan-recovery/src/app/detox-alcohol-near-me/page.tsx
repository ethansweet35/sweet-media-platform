import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxAlcoholNearMePage from "@/views/detox-alcohol-near-me/page";

const fallbackMetadata: Metadata = {
  title: "Detox Alcohol Near Me | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/detox-alcohol-near-me", fallbackMetadata);
}

export default function Page() {
  return <DetoxAlcoholNearMePage />;
}
