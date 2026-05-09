import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";

import HomeFooter from "@/views/home/chrome/HomeFooter";
import HomeNavigation from "@/views/home/chrome/HomeNavigation";
import HomeTopBar from "@/views/home/chrome/HomeTopBar";
import AboutUs from "@/views/home/sections/AboutUs";
import ClinicalModalities from "@/views/home/sections/ClinicalModalities";
import Hero from "@/views/home/sections/Hero";
import InsuranceMarquee from "@/views/home/sections/InsuranceMarquee";
import Locations from "@/views/home/sections/Locations";
import WhyUsApart from "@/views/home/sections/WhyUsApart";
import Process from "@/views/home/sections/Process";
import InsuranceProviders from "@/views/home/sections/InsuranceProviders";
import SignatureServices from "@/views/home/sections/SignatureServices";
import Testimonial from "@/views/home/sections/Testimonial";
import TreatmentServices from "@/views/home/sections/TreatmentServices";
import WhatWeTreat from "@/views/home/sections/WhatWeTreat";

const fallbackMetadata: Metadata = {
  title: "Northbound Treatment | Addiction Treatment Center in Orange County",
  description:
    "For 30+ years, Northbound Treatment Services has provided lifesaving, evidence-based addiction and mental-health treatment across Southern California and the Pacific Northwest. Drug & alcohol detox, residential, PHP, IOP, and aftercare.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default function Page() {
  return (
    <div className="min-h-screen bg-sand-light">
      <HomeTopBar />
      <HomeNavigation />
      <main>
        <Hero />
        <InsuranceMarquee />
        <AboutUs />
        <TreatmentServices />
        <SignatureServices />
        <Process />
        <WhatWeTreat />
        <ClinicalModalities />
        <Locations />
        <WhyUsApart />
        <InsuranceProviders />
        <Testimonial />
      </main>
      <HomeFooter />
    </div>
  );
}
