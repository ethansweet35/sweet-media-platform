import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { HERO_POSTER_URL } from "@/lib/heroVideo";
import GeneralDetoxLandingPage from "@/views/general-detox/page";

const fallbackMetadata: Metadata = {
  title: "California Drug & Alcohol Detox | Sullivan Recovery",
  description:
    "Say goodbye to the agony of withdrawal. Our serene, healing environment blends holistic care with medically supervised detox, ensuring your comfort and safety in Mission Viejo.",
  alternates: { canonical: "/general-detox/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/general-detox/", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_POSTER_URL} fetchPriority="high" />
      <OptimizationStatusBanner
        trackedPagePath="/general-detox/"
        brandName="Sullivan Recovery"
      />
      <GeneralDetoxLandingPage />
    </>
  );
}
