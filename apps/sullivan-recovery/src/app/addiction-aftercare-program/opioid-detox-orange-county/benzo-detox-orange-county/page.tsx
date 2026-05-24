import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BenzoDetoxOrangeCountyPage from "@/views/benzo-detox-orange-county/page";

const fallbackMetadata: Metadata = {
  title: "Benzo Detox Orange County | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/benzo-detox-orange-county", fallbackMetadata);
}

export default function Page() {
  return <BenzoDetoxOrangeCountyPage />;
}
