import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { AutoLinkPageShell } from "@sweetmedia/blog-core";
import { WeightLossPage } from "@/views/weight-loss/page";

const fallback: Metadata = {
  title: "GLP-1 Weight Loss Support | Get Simple Health",
  description:
    "FDA-approved GLP-1 and dual-agonist medications—Semaglutide, Tirzepatide, Retatrutide—prescribed by metabolic physicians and delivered to your door.",
  alternates: { canonical: "/weight-loss" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/weight-loss", fallback);
}

export default async function Page() {
  return (
    <AutoLinkPageShell routePath="/weight-loss">
      <WeightLossPage />
    </AutoLinkPageShell>
  );
}
