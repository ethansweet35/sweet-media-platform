import { PeptideLandingPage } from "@/components/pages/medication/PeptideLandingPage";
import { PEPTIDE_CATALOG } from "@/lib/peptide-catalog";

export function CatalogPage({ slug }: { slug: string }) {
  const data = PEPTIDE_CATALOG[slug];
  if (!data) return null;
  return <PeptideLandingPage data={data} />;
}
