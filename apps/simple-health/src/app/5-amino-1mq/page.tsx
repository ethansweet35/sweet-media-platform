import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CatalogPage } from "@/views/peptide-catalog/CatalogPage";

const fallback: Metadata = {
  title: "5-Amino-1MQ NNMT Inhibitor | Get Simple Health",
  description: "Physician-prescribed peptide therapy. Schedule a consultation to learn more.",
  alternates: { canonical: "/5-amino-1mq" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/5-amino-1mq", fallback);
}

export default function Page() {
  return <CatalogPage slug="5-amino-1mq" />;
}
