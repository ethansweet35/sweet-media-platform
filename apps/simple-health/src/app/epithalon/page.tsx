import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Epithalon — Telomere Extension & Longevity | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/epithalon" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/epithalon", fallback);
}

export default function Page() {
  return <CatalogPage slug="epithalon" />;
}
