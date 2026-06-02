import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HomeHero from "@/components/home/HomeHero";
import {
  MBH_HERO_POSTER_DESKTOP_URL,
  MBH_HERO_POSTER_MOBILE_AVIF_URL,
} from "@/lib/heroMedia";

const HomeReviews = dynamic(() => import("@/components/home/HomeReviews"));
const HomeAbout = dynamic(() => import("@/components/home/HomeAbout"));
const HomeLevelsOfCare = dynamic(() => import("@/components/home/HomeLevelsOfCare"));
const HomeWhatWeTreat = dynamic(() => import("@/components/home/HomeWhatWeTreat"));
const HomeBenefits = dynamic(() => import("@/components/home/HomeBenefits"));
const HomeTherapy = dynamic(() => import("@/components/home/HomeTherapy"));
const HomeTeam = dynamic(() => import("@/components/home/HomeTeam"));
const HomeFacilityTour = dynamic(() => import("@/components/home/HomeFacilityTour"));
const HomeInsurance = dynamic(() => import("@/components/home/HomeInsurance"));
const HomeFaq = dynamic(() => import("@/components/home/HomeFaq"));
const HomeBottomCta = dynamic(() => import("@/components/home/HomeBottomCta"));

const fallbackMetadata: Metadata = {
  title: "Mental Health & Addiction Treatment in Missouri",
  description:
    "Missouri Behavioral Health offers PHP, IOP, outpatient, and virtual mental health and addiction treatment in Springfield, MO and across the state. Call 24/7 for confidential admissions.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={MBH_HERO_POSTER_MOBILE_AVIF_URL}
        media="(max-width: 767px)"
        fetchPriority="high"
        type="image/avif"
      />
      <link
        rel="preload"
        as="image"
        href={MBH_HERO_POSTER_DESKTOP_URL}
        media="(min-width: 768px)"
        fetchPriority="high"
        type="image/webp"
      />
      <main>
        <HomeHero />
        <HomeReviews />
        <HomeAbout />
        <HomeLevelsOfCare />
        <HomeWhatWeTreat />
        <HomeBenefits />
        <HomeTherapy />
        <HomeTeam />
        <HomeFacilityTour />
        <HomeInsurance />
        <HomeFaq />
        <HomeBottomCta />
      </main>
    </>
  );
}
