import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/aetna/page";

const fallbackMetadata: Metadata = {
  title: "Aetna Rehab Insurance Coverage | Sullivan Recovery",
  description:
    "In-network Aetna coverage for medical detox and residential treatment at Sullivan Recovery in Mission Viejo. Free benefits verification.",
  alternates: { canonical: "/insurance/aetna/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/aetna/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
