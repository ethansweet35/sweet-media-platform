import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { buildFaqSchema, TREATMENT_LANDING_PAGES } from "@/lib/treatment-landing-pages";
import PsychiatristTreatmentPage from "@/views/treatment/PsychiatristTreatmentPage";

const config = TREATMENT_LANDING_PAGES["/psychiatrist-for-teens"];

const fallbackMetadata: Metadata = {
  title: `${config.metadata.title} | Adolescent Mental Health`,
  description: config.metadata.description,
  alternates: { canonical: config.path },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(config.path, fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(config.faqs)) }} />
      <OptimizationStatusBanner trackedPagePath={config.path} brandName="Adolescent Mental Health" />
      <PsychiatristTreatmentPage config={config} />
    </>
  );
}
