import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "PE-22-28 Spadin Analogue Antidepressant Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/pe-22-28" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/pe-22-28", fallback);
}

export default function Page() {
  return <CatalogPage slug="pe-22-28" />;
}
