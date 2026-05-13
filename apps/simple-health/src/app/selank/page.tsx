import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Selank — Anxiolytic Neuropeptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/selank" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/selank", fallback);
}

export default function Page() {
  return <CatalogPage slug="selank" />;
}
