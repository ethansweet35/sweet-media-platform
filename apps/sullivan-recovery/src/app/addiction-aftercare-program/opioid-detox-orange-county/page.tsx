import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OpioidDetoxOrangeCountyPage from "@/views/opioid-detox-orange-county/page";

const fallbackMetadata: Metadata = {
  title: "Opioid Treatment Orange County | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/opioid-detox-orange-county", fallbackMetadata);
}

export default function Page() {
  return <OpioidDetoxOrangeCountyPage />;
}
