import PageHero from "@/components/feature/PageHero";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import TeamGrid from "./TeamGrid";

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Expert Care"
        headline="Meet Our Team"
        body="Our multidisciplinary team of board-certified physicians, licensed therapists, and addiction specialists brings decades of combined experience in treating substance use disorders and co-occurring mental health conditions."
      />
      <TeamGrid />
      <FinancialConcierge />
    </>
  );
}
