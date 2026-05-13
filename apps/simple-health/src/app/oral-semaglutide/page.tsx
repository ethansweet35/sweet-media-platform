import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { OralSemaglutidePage } from "@/views/oral-semaglutide/page";

const fallback: Metadata = {
  title: "Oral Semaglutide (Rybelsus) | Get Simple Health",
  description:
    "Oral semaglutide — the same proven GLP-1 molecule as Wegovy and Ozempic in a once-daily pill. No needles, FDA-approved for diabetes, used off-label for weight management.",
  alternates: { canonical: "/oral-semaglutide" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/oral-semaglutide", fallback);
}

export default function Page() {
  return <OralSemaglutidePage />;
}
