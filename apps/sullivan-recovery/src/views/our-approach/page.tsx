import AboutApproachGrid from "@/components/pages/about/AboutApproachGrid";
import AboutClosingCta from "@/components/pages/about/AboutClosingCta";
import AboutHolistic from "@/components/pages/about/AboutHolistic";
import AboutJourney from "@/components/pages/about/AboutJourney";
import AboutOrigin from "@/components/pages/about/AboutOrigin";
import AboutPageHero from "@/components/pages/about/AboutPageHero";

export default function OurApproachPage() {
  return (
    <main className="min-h-screen bg-[var(--sr-parchment)]">
      <AboutPageHero />
      <AboutOrigin />
      <AboutApproachGrid />
      <AboutHolistic />
      <AboutJourney />
      <AboutClosingCta />
    </main>
  );
}
