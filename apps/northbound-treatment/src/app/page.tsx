import type { Metadata } from "next";
import { initPageAutoLinks } from "@sweetmedia/blog-core";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core/seo";
import { buildMedicalOrganizationSchema, buildFAQPageSchema, type FaqItem } from "@sweetmedia/seo-schema";

import HomeFooter from "@/views/home/chrome/HomeFooter";
import HomeNavigation from "@/views/home/chrome/HomeNavigation";
import HomeTopBar from "@/views/home/chrome/HomeTopBar";
import AboutUs from "@/views/home/sections/AboutUs";
import ClinicalModalities from "@/views/home/sections/ClinicalModalities";
import Hero from "@/views/home/sections/Hero";
import { HERO_BG } from "@/views/home/assets";
import InsuranceMarquee from "@/views/home/sections/InsuranceMarquee";
import Locations from "@/views/home/sections/Locations";
import WhyUsApart from "@/views/home/sections/WhyUsApart";
import Process from "@/views/home/sections/Process";
import InsuranceProviders from "@/views/home/sections/InsuranceProviders";
import SignatureServices from "@/views/home/sections/SignatureServices";
import Testimonial from "@/views/home/sections/Testimonial";
import TreatmentServices from "@/views/home/sections/TreatmentServices";
import WhatWeTreat from "@/views/home/sections/WhatWeTreat";
import { fetchBrandSettingsForServer } from "@/lib/fetchBrandSettings";

// General-purpose FAQs used for the homepage FAQPage schema.
// Source content mirrors FaqAccordion.tsx (admissions page) — kept as a
// plain server-side constant to avoid importing a "use client" component.
const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "How do I start the admissions process?",
    answer:
      "Simply call our 24/7 admissions line at (866) 311-0003. You'll be connected with an Admissions Representative who will conduct a confidential pre-admission assessment to understand your history, needs, and any co-occurring disorders that need to be addressed in your treatment plan.",
  },
  {
    question: "Does Northbound accept my insurance?",
    answer:
      "Northbound is a preferred in-network provider with over 15 major insurance companies, including Aetna, Anthem, BCBS, Cigna, Health Net, TriCare, and more. Our team will verify your benefits at no cost to you and walk you through your coverage before you arrive.",
  },
  {
    question: "What if I'm traveling from out of state?",
    answer:
      "More than half of our patients travel to our Southern California facilities from other states. Our travel coordination team will assist you in making all necessary arrangements to get to our facilities comfortably and safely.",
  },
  {
    question: "How long does treatment last?",
    answer:
      "Treatment length varies based on individual need and the level of care required. We offer a full continuum — from medical detox through residential, PHP, virtual IOP, and aftercare — allowing us to step you up or down based on progress. Many clients complete a 30, 60, or 90-day program.",
  },
  {
    question: "What does treatment at Northbound cost?",
    answer:
      "We work with most major insurance plans to minimize or eliminate out-of-pocket costs. For those without insurance, we offer affordable self-pay and financing options. Our team will build a financial plan before you arrive so there are no surprises.",
  },
  {
    question: "Will I have access to my family during treatment?",
    answer:
      "Family involvement is a cornerstone of our program. We offer structured family therapy sessions, family education workshops, and regular communication to keep your loved ones informed and supportive throughout your recovery.",
  },
  {
    question: "Is Northbound accredited and licensed?",
    answer:
      "Yes. Northbound is licensed by the California Department of Health Care Services (DHCS License #300661CP) and is a proud member of NAATP (National Association of Addiction Treatment Providers), adhering to the highest standards of ethics and quality care.",
  },
];

const fallbackMetadata: Metadata = {
  title: "Northbound Treatment | Addiction Treatment Center in Orange County",
  description:
    "For 30+ years, Northbound Treatment Services has provided lifesaving, evidence-based addiction and mental-health treatment across Southern California and the Pacific Northwest. Drug & alcohol detox, residential, PHP, IOP, and aftercare.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

export default async function Page() {
  initPageAutoLinks("/");
  const settings = await fetchBrandSettingsForServer();

  const orgSchema = settings ? buildMedicalOrganizationSchema(settings) : null;
  const faqSchema = buildFAQPageSchema(HOMEPAGE_FAQS);

  return (
    <div className="min-h-screen bg-sand-light">
      <link rel="preload" as="image" href={HERO_BG} fetchPriority="high" />
      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
