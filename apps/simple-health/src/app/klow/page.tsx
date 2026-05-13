import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "KLOW Advanced Aesthetic Peptide Stack | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/klow" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/klow", fallback);
}

export default function Page() {
  return <CatalogPage slug="klow" />;
}
