import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/humana/page";

const fallbackMetadata: Metadata = {
  title: "Humana Rehab Insurance | Sullivan Recovery",
  description: "Humana Medicare and commercial plan verification for detox and residential rehab in Orange County.",
  alternates: { canonical: "/insurance/humana/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/humana/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
