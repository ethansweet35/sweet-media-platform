import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ResultsPage from "@/views/results/page";

const fallbackMetadata: Metadata = {
  title: "Results & Case Studies | Sweet Media | Behavioral Health Marketing",
  description:
    "See real results from Sweet Media's behavioral health marketing campaigns. Case studies, testimonials, and performance data from treatment centers across the US.",
  alternates: { canonical: "/results" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/results", fallbackMetadata);
}

export default function Page() {
  return <ResultsPage />;
}
