import GeneralDetoxHero from "@/components/landing/GeneralDetoxHero";
import { LandingPageProvider } from "@/components/landing/LandingPageContext";
import { GENERAL_DETOX_SECTIONS } from "@/lib/generalDetoxLanding";
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

function SectionWrap({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      {children}
    </div>
  );
}

/**
 * PPC landing — same video hero + section flow as live /general-detox/, no outbound nav.
 */
export default function GeneralDetoxLandingPage() {
  return (
    <LandingPageProvider>
      <main>
        <GeneralDetoxHero />
        <SectionWrap id={GENERAL_DETOX_SECTIONS.treatment}>
          <HomeFeatures />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.about}>
          <HomeAbout />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.substances}>
          <HomeSubstances />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.programs}>
          <HomePrograms />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.surfTherapy}>
          <HomeSurfTherapy />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.musicTherapy}>
          <HomeMusicTherapy />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.activities}>
          <HomeActivities />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.insurance}>
          <HomeInsurance />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.whyUs}>
          <HomeWhatSetsUsApart />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.facility}>
          <HomeFacility />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.howItWorks}>
          <HomeHowItWorks />
        </SectionWrap>
        <SectionWrap id={GENERAL_DETOX_SECTIONS.location}>
          <HomeLocation />
        </SectionWrap>
      </main>
    </LandingPageProvider>
  );
}
