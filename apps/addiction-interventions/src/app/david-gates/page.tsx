import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DavidGatesPage from "@/views/david-gates/page";

const fallbackMetadata: Metadata = {
  title: "David Gates, CIP — Lead Interventionist | Addiction Interventions",
  description:
    "David Allen Gates has personally led more than 1,500 interventions across 20+ years. CIP-certified, in long-term recovery himself, and trained in ARISE® and the Johnson Model.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/david-gates", fallbackMetadata);
}

export default function Page() {
  return <DavidGatesPage />;
}
