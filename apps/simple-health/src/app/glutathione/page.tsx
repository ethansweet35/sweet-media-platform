import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "Glutathione — Master Antioxidant Injectable | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/glutathione" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/glutathione", fallback);
}

export default function Page() {
  return <CatalogPage slug="glutathione" />;
}
