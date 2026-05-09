import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FaqsPage from "@/views/faqs/FaqsPage";

const fallbackMetadata: Metadata = {
  title: "Frequently Asked Questions | Northbound Treatment Services",
  description:
    "Get answers to the most common questions about Northbound's admissions process, treatment programs, insurance coverage, and what to expect during rehab in Orange County, CA.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/faqs", fallbackMetadata);
}

export default function Page() {
  return <FaqsPage />;
}
