import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "LL-37 Cathelicidin Antimicrobial Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/ll-37" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ll-37", fallback);
}

export default function Page() {
  return <CatalogPage slug="ll-37" />;
}
