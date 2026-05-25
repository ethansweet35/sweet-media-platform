import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/blue-cross-blue-shield/page";

const fallbackMetadata: Metadata = {
  title: "Blue Cross Blue Shield Rehab | Sullivan Recovery",
  description: "BCBS benefits verification for drug and alcohol detox and residential treatment in California.",
  alternates: { canonical: "/insurance/blue-cross-blue-shield/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/blue-cross-blue-shield/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
