import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Oxytocin — Bonding & Intimacy Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/oxytocin" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/oxytocin", fallback);
}

export default function Page() {
  return <CatalogPage slug="oxytocin" />;
}
