import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { PeptidesPage } from "@/views/peptides/page";

const fallback: Metadata = {
  title: "Peptide Protocols | Get Simple Health",
  description:
    "Browse physician-prescribed peptides for growth hormone support, recovery, and cellular optimization. Sermorelin, CJC-1295, NAD+, GHK-Cu, and more.",
  alternates: { canonical: "/peptides" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/peptides", fallback);
}

export default function Page() {
  return <PeptidesPage />;
}
