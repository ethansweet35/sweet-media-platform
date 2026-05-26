import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutPage from "@/views/about/AboutPage";

const fallbackMetadata: Metadata = {
  title: "About Us | Adolescent Mental Health",
  description:
    "Learn about Adolescent Mental Health — evidence-based Virtual IOP and teen therapy for ages 12–17. Family-centered, insurance-accepted, HIPAA-compliant care from home.",
  alternates: { canonical: "/about" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <OptimizationStatusBanner trackedPagePath="/about" brandName="Adolescent Mental Health" />
      <AboutPage />
    </>
  );
}
