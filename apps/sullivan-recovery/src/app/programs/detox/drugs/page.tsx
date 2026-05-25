import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/programs/detox/drugs/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Detox Mission Viejo | Sullivan Recovery",
  description:
    "Comprehensive medical detox for drug and alcohol use — polysubstance expertise, 24/7 care, and residential transition on one campus.",
  alternates: { canonical: "/programs/detox/drugs/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/detox/drugs/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
