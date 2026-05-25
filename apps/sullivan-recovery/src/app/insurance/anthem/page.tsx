import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/anthem/page";

const fallbackMetadata: Metadata = {
  title: "Anthem Blue Cross Rehab Insurance | Sullivan Recovery",
  description:
    "In-network Anthem Blue Cross benefits for detox and residential rehab at Sullivan Recovery in Orange County. Verify coverage today.",
  alternates: { canonical: "/insurance/anthem/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/anthem/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
