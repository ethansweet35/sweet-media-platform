import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Melanotan II Tanning & Sexual Health Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/melanotan-ii" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/melanotan-ii", fallback);
}

export default function Page() {
  return <CatalogPage slug="melanotan-ii" />;
}
