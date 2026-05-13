import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Semax — Cognitive Enhancement Neuropeptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/semax" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/semax", fallback);
}

export default function Page() {
  return <CatalogPage slug="semax" />;
}
