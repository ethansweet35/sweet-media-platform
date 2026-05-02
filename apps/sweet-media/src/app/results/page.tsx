import type { Metadata } from "next";
import ResultsPage from "@/pages/results/page";

export const metadata: Metadata = {
  title: "Results & Case Studies | Sweet Media | Behavioral Health Marketing",
  description:
    "See real results from Sweet Media's behavioral health marketing campaigns. Case studies, testimonials, and performance data from treatment centers across the US.",
  alternates: { canonical: "/results" },
};

export default function Page() {
  return <ResultsPage />;
}
