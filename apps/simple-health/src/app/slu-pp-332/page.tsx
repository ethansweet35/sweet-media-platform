import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "SLU-PP-332 Exercise Mimetic ERR Agonist | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/slu-pp-332" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/slu-pp-332", fallback);
}

export default function Page() {
  return <CatalogPage slug="slu-pp-332" />;
}
