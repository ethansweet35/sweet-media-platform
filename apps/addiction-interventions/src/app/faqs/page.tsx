import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FaqsPage from "@/views/faqs/page";

const fallbackMetadata: Metadata = {
  title: "FAQs | Addiction Interventions",
  description:
    "Common questions about interventions, treatment, cost, timing, and what happens if your loved one says no. Honest answers from certified interventionists.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/faqs", fallbackMetadata);
}

export default function Page() {
  return <FaqsPage />;
}
