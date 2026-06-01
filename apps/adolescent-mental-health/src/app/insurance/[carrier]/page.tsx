import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { buildFaqSchema } from "@/lib/treatment-landing-pages";
import {
  getInsuranceCarrierPage,
  INSURANCE_CARRIER_SLUGS,
  type InsuranceCarrierSlug,
} from "@/lib/insurance-carrier-pages";
import InsuranceCarrierPage from "@/views/insurance/InsuranceCarrierPage";

type PageProps = {
  params: Promise<{ carrier: string }>;
};

export function generateStaticParams() {
  return INSURANCE_CARRIER_SLUGS.map((carrier) => ({ carrier }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { carrier } = await params;
  const config = getInsuranceCarrierPage(carrier);
  if (!config) return {};

  const fallbackMetadata: Metadata = {
    title: `${config.metadata.title} | Adolescent Mental Health`,
    description: config.metadata.description,
    alternates: { canonical: config.path },
  };

  return resolveTrackedPageMetadata(config.path, fallbackMetadata);
}

export default async function Page({ params }: PageProps) {
  const { carrier } = await params;
  const config = getInsuranceCarrierPage(carrier);

  if (!config) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(config.faqs)) }}
      />
      <OptimizationStatusBanner trackedPagePath={config.path} brandName="Adolescent Mental Health" />
      <InsuranceCarrierPage config={config} />
    </>
  );
}

export type { InsuranceCarrierSlug };
