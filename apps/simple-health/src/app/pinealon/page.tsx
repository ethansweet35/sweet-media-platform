import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Pinealon Neuroprotective Pineal Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/pinealon" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/pinealon", fallback);
}

export default function Page() {
  return <CatalogPage slug="pinealon" />;
}
