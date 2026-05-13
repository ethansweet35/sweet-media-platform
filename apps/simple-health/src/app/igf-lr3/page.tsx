import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "IGF-LR3 — Anabolic Growth Factor | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/igf-lr3" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/igf-lr3", fallback);
}

export default function Page() {
  return <CatalogPage slug="igf-lr3" />;
}
