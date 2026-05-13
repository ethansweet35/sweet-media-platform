import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Thymosin Alpha-1 Immune Optimization Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/thymosin-alpha-1" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/thymosin-alpha-1", fallback);
}

export default function Page() {
  return <CatalogPage slug="thymosin-alpha-1" />;
}
