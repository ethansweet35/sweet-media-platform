import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/schizophrenia";

const fallback: Metadata = {
  title: "Schizophrenia Treatment in Orange County | Rize OC",
  description: "Schizophrenia and psychotic disorder treatment in Orange County — antipsychotic medication management, CBTp, psychosocial rehabilitation, and family support at Rize OC.",
  alternates: { canonical: "/mental-health/schizophrenia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/schizophrenia", fallback);
}

export default SubPage;
