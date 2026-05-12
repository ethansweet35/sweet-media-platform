import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/borderline-personality-disorder";

const fallback: Metadata = {
  title: "Borderline Personality Disorder Treatment | Rize OC",
  description: "Comprehensive DBT treatment for borderline personality disorder at Rize OC in Orange County — ERP hierarchy, psychoeducation, and integrated trauma care.",
  alternates: { canonical: "/mental-health/borderline-personality-disorder" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/borderline-personality-disorder", fallback);
}

export default SubPage;
