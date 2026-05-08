import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const fallbackMetadata: Metadata = {
  title: "Substance Abuse Interventions | Addiction Interventions",
  description: "Professional interventions for alcohol, drug, opioid, heroin, cocaine, meth, ketamine and other substance use disorders. Compassionate, structured support for families across the United States.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/substance-abuse-interventions", fallbackMetadata);
}

const SUBSTANCE_SERVICES = [
  { label: "Alcohol Interventions", path: "/substance-abuse-interventions/alcohol", icon: "ri-goblet-line" },
  { label: "Drug Abuse Interventions", path: "/substance-abuse-interventions/drug", icon: "ri-capsule-line" },
  { label: "Heroin Interventions", path: "/substance-abuse-interventions/heroin", icon: "ri-syringe-line" },
  { label: "Cocaine Interventions", path: "/substance-abuse-interventions/cocaine", icon: "ri-cloud-line" },
  { label: "Meth Interventions", path: "/substance-abuse-interventions/meth", icon: "ri-flask-line" },
  { label: "Opioid Interventions", path: "/substance-abuse-interventions/opioid", icon: "ri-medicine-bottle-line" },
  { label: "Ketamine Interventions", path: "/substance-abuse-interventions/ketamine", icon: "ri-test-tube-line" },
];

export default function SubstanceAbuseInterventionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-24 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Substance Abuse Interventions</p>
            <h1 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Targeted interventions for every substance —{" "}
              <span className="italic text-[#8FAC87]">alcohol, drugs, opioids and more</span>
            </h1>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Substance use disorders require specific expertise. We match the intervention model, the treatment recommendation, and the family coaching to the exact substance and the person behind the addiction.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
              <Link href="/intervention-services" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                Browse all services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Grid of substance types */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Specialised by Substance</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Choose the substance your loved one is struggling with
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SUBSTANCE_SERVICES.map((s) => (
              <Link
                key={s.path}
                href={s.path}
                className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-8 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${s.icon} text-2xl`}></i>
                </span>
                <h3 className="font-heading mt-6 text-2xl font-bold text-[#1A1A17]">{s.label}</h3>
                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2.5">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BottomCta
        title="Ready to intervene on substance use?"
        italicWord="substance use"
        body="Your first call is free, confidential, and judgment-free. We listen first."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}
