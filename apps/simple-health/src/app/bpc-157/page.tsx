import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "BPC-157 Body Protective Compound | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/bpc-157" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/bpc-157", fallback);
}

export default function Page() {
  return <CatalogPage slug="bpc-157" />;
}
