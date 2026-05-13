import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { SERVICES, type ServiceConfig } from "@/data/services";
import { DEFAULT_FAQS } from "@/data/faqs";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const HERO_BG =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_home_hero01.jpg";

type CategoryGroup = {
  key: ServiceConfig["category"];
  label: string;
  description: string;
  icon: string;
  services: ServiceConfig[];
};

const CATEGORY_ORDER: {
  key: ServiceConfig["category"];
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    key: "substance",
    label: "Substance Use Interventions",
    icon: "ri-drop-line",
    description:
      "Targeted, substance-specific interventions for alcohol and drug dependence — from prescription opioids to street drugs. We identify the substance, the severity, and the right level of care before we ever sit down with your family.",
  },
  {
    key: "mental-health",
    label: "Mental Health Interventions",
    icon: "ri-mental-health-line",
    description:
      "When the crisis is depression, anxiety, OCD, or another psychiatric condition — interventions that lead with compassion, not consequences. We have specialised experience with dual-diagnosis cases where mental health and substance use intersect.",
  },
  {
    key: "specialty",
    label: "Specialty Interventions",
    icon: "ri-focus-3-line",
    description:
      "Specific situations require specific approaches. Crisis cases, executives, teens, and dual diagnosis each get a tailored plan built around the person — not a generic script.",
  },
  {
    key: "family",
    label: "Family-Centred Interventions",
    icon: "ri-home-heart-line",
    description:
      "Reset the entire family system — not just the person who is using. Stop enabling, set boundaries, and restore healthy roles. We prepare every family member before the intervention so everyone walks in aligned.",
  },
  {
    key: "method",
    label: "Intervention Methodologies",
    icon: "ri-route-line",
    description:
      "We are trained in multiple intervention models. Your interventionist will recommend the one that fits your loved one and your family — ARISE®, Johnson, Systemic, and more.",
  },
];

const CATEGORY_CAP: Partial<Record<ServiceConfig["category"], number>> = {
  substance: 6,
  "mental-health": 6,
};

function groupServices(): CategoryGroup[] {
  return CATEGORY_ORDER.map((cat) => {
    const all = SERVICES.filter((s) => s.category === cat.key);
    const cap = CATEGORY_CAP[cat.key];
    return { ...cat, services: cap ? all.slice(0, cap) : all };
  }).filter((g) => g.services.length > 0);
}

const HOW_IT_WORKS = [
  {
    icon: "ri-phone-line",
    title: "You call us",
    body: "A certified interventionist answers — not an intake coordinator. We listen, assess the situation, and recommend a path forward at no charge.",
  },
  {
    icon: "ri-team-line",
    title: "We prepare your family",
    body: "Together we choose the right model, coach each participant, and rehearse the conversation so everyone walks in calm, aligned, and ready.",
  },
  {
    icon: "ri-heart-line",
    title: "The intervention takes place",
    body: "We facilitate the structured conversation. Your loved one hears the impact, the love, and the clear expectation — and is guided toward accepting help.",
  },
  {
    icon: "ri-hospital-line",
    title: "We escort them to treatment",
    body: "We arrange placement at a vetted programme and often travel with your loved one to ensure they arrive safely and don't change their mind.",
  },
  {
    icon: "ri-seedling-line",
    title: "We stay with you",
    body: "Our support continues through detox, residential, and outpatient care — because lasting recovery happens long after the first 'yes'.",
  },
];

export default function InterventionServicesPage() {
  const groups = groupServices();

  return (
    <main className="min-h-screen">
      {/* ── Hero with form ── */}
      <section className="relative overflow-hidden">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient: dark on left, slightly lighter on right to frame form */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/85 via-[#1A1A17]/70 to-[#1A1A17]/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            {/* Left */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Addiction Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Professional intervention services —{" "}
                <span className="italic text-[#8FAC87]">nationwide</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"For more than two decades we have helped families confront addiction and mental health crises with skill, compassion, and a clear plan. We are available 24 / 7 — because crises don't keep business hours."}</AutoLinkedText>
              </p>

              {/* Stats row */}
              <div className="mb-8 grid grid-cols-3 gap-4">
                {[
                  { number: "1,500+", label: "Families helped" },
                  { number: "25+", label: "Years of experience" },
                  { number: "50", label: "States served" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#8FAC87]"><AutoLinkedText>{s.number}</AutoLinkedText></p>
                    <p className="mt-1 text-xs font-medium text-white/60"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Browse services
                  <i className="ri-arrow-down-line"></i>
                </a>
              </div>
            </div>

            {/* Right: contact form */}
            <HeroContactForm />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ── How it works ── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Process</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                How family interventions{" "}
                <span className="italic text-[#507969]">actually work</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              <AutoLinkedText>{"Most families come to us after years of trying to help in ways that quietly enabled the problem. We help you see those patterns clearly, set boundaries that hold, and move your loved one into the right level of care — quickly and without breaking the relationship."}</AutoLinkedText>
            </p>
          </div>

          {/* 5-step timeline */}
          <div className="grid gap-6 md:grid-cols-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative flex flex-col">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+24px)] hidden h-px w-[calc(100%-32px)] border-t-2 border-dashed border-[#8FAC87]/30 md:block" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#3E5B50] text-white shadow-md">
                    <i className={`text-xl ${step.icon}`}></i>
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#8FAC87] text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading mt-5 text-lg font-bold text-[#1A1A17]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{step.body}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service categories ── */}
      <div id="services">
        {groups.map((group, gi) => {
          const isEven = gi % 2 === 0;
          return (
            <section
              key={group.key}
              className={isEven ? "bg-white py-20" : "bg-[#F5F3E7] py-20"}
            >
              <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
                {/* Section header */}
                <div className="mb-12 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#3E5B50] text-white shadow-md">
                    <i className={`text-3xl ${group.icon}`}></i>
                  </div>
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
                      {group.label}
                    </h2>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#4B4B4B] md:text-lg"><AutoLinkedText>{group.description}</AutoLinkedText></p>
                  </div>
                </div>

                {/* Service cards */}
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/${svc.slug}`}
                      className="group flex flex-col rounded-2xl border border-[#EFEFEF] bg-white p-7 shadow-sm transition hover:border-[#8FAC87] hover:shadow-md"
                    >
                      {svc.navIcon && (
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                          <i className={`text-xl ${svc.navIcon}`}></i>
                        </span>
                      )}
                      <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">
                        {svc.displayName}
                      </h3>
                      <p className="mt-2.5 flex-1 text-sm leading-6 text-[#4B4B4B]">
                        {svc.heroBody.split(".")[0]}.
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition-all group-hover:gap-2.5">
                        Learn more <i className="ri-arrow-right-line"></i>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <FaqAccordion
        title="Common questions about our intervention services"
        faqs={DEFAULT_FAQS}
      />

      <BottomCta />
    </main>
  );
}
