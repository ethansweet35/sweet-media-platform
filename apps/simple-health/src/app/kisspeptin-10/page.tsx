import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Kisspeptin-10 Hormonal Regulator | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/kisspeptin-10" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/kisspeptin-10", fallback);
}

export default function Page() {
  return <CatalogPage slug="kisspeptin-10" />;
}
