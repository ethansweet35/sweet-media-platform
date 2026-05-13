import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "KPV Anti-Inflammatory Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/kvp" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/kvp", fallback);
}

export default function Page() {
  return <CatalogPage slug="kvp" />;
}
