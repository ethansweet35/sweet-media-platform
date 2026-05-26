import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONDITION_TREATMENT_PAGES } from "@/lib/condition-treatment-pages";
import { buildFaqSchema } from "@/lib/treatment-landing-pages";
import SelfHarmTreatmentPage from "@/views/treatment/SelfHarmTreatmentPage";

const config = CONDITION_TREATMENT_PAGES["/conditions/self-harm"];

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
      <SelfHarmTreatmentPage config={config} />
    </>
  );
}
