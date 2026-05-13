import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "AOD-9604 Anti-Obesity Peptide Fragment | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/aod-9604" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/aod-9604", fallback);
}

export default function Page() {
  return <CatalogPage slug="aod-9604" />;
}
