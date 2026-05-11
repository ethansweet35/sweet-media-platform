import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxPage from "@/views/levels-of-care/detox/DetoxPage";

const fallback: Metadata = {
  title: "Drug & Alcohol Detox in Orange County | Rize OC",
  description:
    "Medically supervised drug and alcohol detox in Orange County, CA. 24/7 medical team, private suites, and comfort-focused withdrawal management. Same-day admissions. Call now.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-alcohol-detox", fallback);
}

export default function Page() {
  return <DetoxPage />;
}
