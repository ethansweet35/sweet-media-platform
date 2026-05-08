import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ResourcesPage from "@/views/resources/page";

const fallbackMetadata: Metadata = {
  title: "Family Resources | Addiction Interventions",
  description:
    "Free assessments, planning guides, and crisis resources for families dealing with addiction and mental health crises. Built by certified interventionists.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/resources", fallbackMetadata);
}

export default function Page() {
  return <ResourcesPage />;
}
