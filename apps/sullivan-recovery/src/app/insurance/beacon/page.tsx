import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/beacon/page";

const fallbackMetadata: Metadata = {
  title: "Beacon Health Rehab Insurance | Sullivan Recovery",
  description:
    "Beacon Health Options in-network coverage for detox and residential treatment at Sullivan Recovery in Mission Viejo.",
  alternates: { canonical: "/insurance/beacon/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/beacon/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
