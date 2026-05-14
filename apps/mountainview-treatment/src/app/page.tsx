import type { Metadata } from "next";
import { resolveTrackedPageMetadata, OptimizationStatusBanner } from "@sweetmedia/admin-core";
import HomePage from "@/views/home/HomePage";

const fallbackMetadata: Metadata = {
  title: "Mountain View Treatment | Seattle Addiction & Mental Health Recovery",
  description:
    "Seattle's premier sanctuary for addiction and mental health recovery — outpatient programs, dual diagnosis care, and evidence-based therapies in the serene Pacific Northwest.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/" brandName="Mountain View Treatment" />
      <HomePage />
    </>
  );
}
