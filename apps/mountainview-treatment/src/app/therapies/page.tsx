import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapiesIndexPage from "@/views/therapies/TherapiesIndexPage";

const fallbackMetadata: Metadata = {
  title: "Therapies | Mountain View Treatment Seattle",
  description: "Evidence-based therapies for trauma, addiction, and mental health in Seattle — EMDR, CBT, DBT, Somatic Experiencing, Neurofeedback, MAT, and Holistic Integration.",
  alternates: { canonical: "/therapies/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/", fallbackMetadata);
}

export default function Page() {
  return <TherapiesIndexPage />;
}
