import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "PT-141 Bremelanotide Sexual Health Peptide | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/pt-141" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/pt-141", fallback);
}

export default function Page() {
  return <CatalogPage slug="pt-141" />;
}
