import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ResourcesPage from "@/views/resources/ResourcesPage";

const fallbackMetadata: Metadata = {
  title: "Resources | Adolescent Mental Health",
  description:
    "Parent guides, educational articles, and crisis support resources for families navigating adolescent mental health care.",
  alternates: { canonical: "/resources" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/resources", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/resources" brandName="Adolescent Mental Health" />
      <ResourcesPage />
    </>
  );
}
