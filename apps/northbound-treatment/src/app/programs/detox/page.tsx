import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DetoxPage from "@/views/programs/detox/DetoxPage";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Medical Detox Program in Orange County | Northbound Treatment",
  description:
    "Northbound offers a fully licensed medical detox center in Orange County, CA. Safe, 24/7 supervised withdrawal management, IMS certified, dual-diagnosis screening, and seamless transition to residential care. Insurance accepted.",
  alternates: { canonical: "/programs/detox" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox", fallbackMetadata);
}

export default function Page() {
  return <DetoxPage />;
}
