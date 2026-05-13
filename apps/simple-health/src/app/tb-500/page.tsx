import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "TB-500 Thymosin Beta-4 Recovery Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/tb-500" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/tb-500", fallback);
}

export default function Page() {
  return <CatalogPage slug="tb-500" />;
}
