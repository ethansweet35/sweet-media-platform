import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SuboxoneDetoxCentersNearMePage from "@/views/suboxone-detox-centers-near-me/page";

const fallbackMetadata: Metadata = {
  title: "Suboxone Detox Centers Near Me | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/suboxone-detox-centers-near-me", fallbackMetadata);
}

export default function Page() {
  return <SuboxoneDetoxCentersNearMePage />;
}
