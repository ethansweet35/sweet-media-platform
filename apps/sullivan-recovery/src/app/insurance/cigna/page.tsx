import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/cigna/page";

const fallbackMetadata: Metadata = {
  title: "Cigna Rehab Insurance Coverage | Sullivan Recovery",
  description:
    "Use Cigna insurance for detox and residential treatment at Sullivan Recovery. In-network verification and pre-authorization support.",
  alternates: { canonical: "/insurance/cigna/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/cigna/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
