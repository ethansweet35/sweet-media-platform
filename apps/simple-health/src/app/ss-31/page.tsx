import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "SS-31 Elamipretide Mitochondrial Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/ss-31" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ss-31", fallback);
}

export default function Page() {
  return <CatalogPage slug="ss-31" />;
}
