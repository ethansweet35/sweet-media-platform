import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { buildFaqSchema } from "@/lib/treatment-landing-pages";
import { LGBTQ_TREATMENT_PAGE } from "@/lib/lgbtq-treatment-page";
import LgbtqTeenMentalHealthPage from "@/views/treatment/LgbtqTeenMentalHealthPage";

const config = LGBTQ_TREATMENT_PAGE;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(config.faqs)) }}
      />
      <OptimizationStatusBanner trackedPagePath={config.path} brandName="Adolescent Mental Health" />
      <LgbtqTeenMentalHealthPage config={config} />
    </>
  );
}
