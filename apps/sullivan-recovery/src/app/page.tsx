import type { Metadata } from "next";
import { resolveTrackedPageMetadata, OptimizationStatusBanner } from "@sweetmedia/admin-core";
import HomeHero from "@/components/home/HomeHero";
import { HERO_POSTER_URL } from "@/lib/heroVideo";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeAbout from "@/components/home/HomeAbout";
import HomeSubstances from "@/components/home/HomeSubstances";
import HomePrograms from "@/components/home/HomePrograms";
import HomeSurfTherapy from "@/components/home/HomeSurfTherapy";
import HomeMusicTherapy from "@/components/home/HomeMusicTherapy";
import HomeActivities from "@/components/home/HomeActivities";
import HomeInsurance from "@/components/home/HomeInsurance";
import HomeWhatSetsUsApart from "@/components/home/HomeWhatSetsUsApart";
import HomeFacility from "@/components/home/HomeFacility";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";
import HomeLocation from "@/components/home/HomeLocation";

const fallbackMetadata: Metadata = {
  title: "Sullivan Recovery | Drug & Alcohol Detox in Orange County",
  description:
    "Sullivan Recovery is a medical detox and residential treatment center in Mission Viejo, California. Compassionate, evidence-based care for drug and alcohol addiction.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_POSTER_URL} fetchPriority="high" />
      <main data-full-bleed-hero>
        <OptimizationStatusBanner trackedPagePath="/" brandName="Sullivan Recovery" />
        <HomeHero />
        <HomeFeatures />
        <HomeAbout />
        <HomeSubstances />
        <HomePrograms />
        <HomeSurfTherapy />
        <HomeMusicTherapy />
        <HomeActivities />
        <HomeInsurance />
        <HomeWhatSetsUsApart />
        <HomeFacility />
        <HomeHowItWorks />
        <HomeLocation />
      </main>
    </>
  );
}
