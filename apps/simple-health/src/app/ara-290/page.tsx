import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Ara-290 EPO-Derived Neuroprotective Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/ara-290" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ara-290", fallback);
}

export default function Page() {
  return <CatalogPage slug="ara-290" />;
}
