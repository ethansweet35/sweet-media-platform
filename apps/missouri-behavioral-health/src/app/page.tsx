import type { Metadata } from "next";
import { resolveTrackedPageMetadata, OptimizationStatusBanner } from "@sweetmedia/admin-core";
import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeLevelsOfCare from "@/components/home/HomeLevelsOfCare";
import HomeWhatWeTraat from "@/components/home/HomeWhatWeTraat";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeTherapy from "@/components/home/HomeTherapy";
import HomeTeam from "@/components/home/HomeTeam";
import HomeInsurance from "@/components/home/HomeInsurance";
import HomeFaq from "@/components/home/HomeFaq";
import HomeBottomCta from "@/components/home/HomeBottomCta";

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
    <main>
      <OptimizationStatusBanner trackedPagePath="/" brandName="Missouri Behavioral Health" />
      <HomeHero />
      <HomeAbout />
      <HomeLevelsOfCare />
      <HomeWhatWeTraat />
      <HomeBenefits />
      <HomeTherapy />
      <HomeTeam />
      <HomeInsurance />
      <HomeFaq />
      <HomeBottomCta />
    </main>
  );
}
