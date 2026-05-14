import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import AboutHero from "@/views/about/AboutHero";
import GuidedByPurpose from "@/views/about/GuidedByPurpose";
import HealingPhilosophy from "@/views/about/HealingPhilosophy";
import WhatSetsUsApart from "@/views/about/WhatSetsUsApart";
import LedByExperts from "@/views/about/LedByExperts";

const fallbackMetadata: Metadata = {
  title: "About Mountain View Treatment | Seattle Addiction Treatment",
  description:
    "Founded in 2021, Mountain View Treatment combines evidence-based clinical care with the restorative power of the Pacific Northwest. Discover our mission, philosophy, and team.",
  alternates: { canonical: "/about-us/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about-us/", fallbackMetadata);
}

export default function Page() {
  return (
    <>
      <AboutHero />
      <GuidedByPurpose />
      <HealingPhilosophy />
      <WhatSetsUsApart />
      <LedByExperts />
      <FinancialConcierge />
    </>
  );
}
