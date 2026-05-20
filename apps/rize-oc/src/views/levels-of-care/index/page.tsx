import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import PageHeroShell, { HERO_LEAD, HERO_SPLIT_LEFT } from "@/components/ui/PageHeroShell";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_BOTTOM_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { cn } from "@/lib/cn";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const levels = [
  {
    num: "1",
    label: "Most Intensive",
    title: "Drug & Alcohol Detox",
    duration: "3–10 Days",
    commitment: "24/7 Medical Care",
    desc: "Medically supervised withdrawal in a private, comfort-focused environment. Our licensed medical team monitors you around the clock to ensure safety and minimize discomfort.",
    href: "/drug-alcohol-detox",
    icon: "ri-first-aid-kit-line",
    accent: true,
  },
  {
    num: "2",
    label: "High Intensity",
    title: "Partial Hospitalization (PHP)",
    duration: "2–4 Weeks",
    commitment: "6 Hours Daily, 5–7 Days/Week",
    desc: "Hospital-level clinical programming delivered Monday through Saturday. Deep individual and group therapy, psychiatric oversight, and holistic modalities in a structured daytime format.",
    href: "/partial-hospitalization-program-orange-county",
    icon: "ri-building-4-line",
    accent: true,
  },
  {
    num: "3",
    label: "Medium Intensity",
    title: "Intensive Outpatient (IOP)",
    duration: "8–12 Weeks",
    commitment: "3–9 Hours Per Week",
    desc: "Structured group and individual therapy several evenings or mornings per week, designed to integrate recovery support with daily professional and family life.",
    href: "/iop-program-orange-county",
    icon: "ri-home-2-line",
    accent: false,
  },
  {
    num: "4",
    label: "Low Intensity",
    title: "Outpatient Program (OP)",
    duration: "Open Ended",
    commitment: "1–2 Sessions Per Week",
    desc: "Ongoing therapeutic partnership for individuals who have achieved meaningful stability and are building the habits and connections that sustain long-term recovery.",
    href: "/outpatient-program",
    icon: "ri-leaf-line",
    accent: false,
  },
  {
    num: "5",
    label: "Telehealth",
    title: "Virtual Outpatient Program",
    duration: "IOP + OP Levels",
    commitment: "Flexible, Remote",
    desc: "All the clinical depth of in-person care delivered via our secure HIPAA-compliant telehealth platform — available to clients throughout California.",
    href: "/virtual-outpatient-program",
    icon: "ri-video-line",
    accent: false,
  },
];

const criteria = [
  { icon: "ri-stethoscope-line",  q: "Is medical supervision needed?",    a: "If yes — start with Medical Detox. Safety first." },
  { icon: "ri-home-2-line",       q: "Are you newly in recovery?",         a: "PHP or Residential provides the structure needed to build a strong foundation." },
  { icon: "ri-briefcase-2-line",  q: "Do you have work or family duties?", a: "IOP or Virtual OP allows recovery alongside daily responsibilities." },
  { icon: "ri-map-pin-line",      q: "Are you outside Orange County?",     a: "Virtual Outpatient brings our full clinical team to you, anywhere in California." },
];

export default function LevelsOfCarePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        media={
          <>
            <Image
          src="https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/loc_hero02.jpg"
          alt="Aerial golden-hour view of a serene behavioral health treatment campus in Orange County California with courtyard fountain and coastal hills"
          fill
          className="object-cover object-center"
          priority
            />
            <div
              className="absolute inset-0"
              style={{ background: CINEMATIC_BOTTOM_HERO_GRADIENT }}
            />
          </>
        }
      >
        <PageHeroShell
          fullBleedBottomBar
          topSlot={<Eyebrow colorClass="text-accent">Treatment Programs</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-5 border-t border-white/10">
              {[
                { label: "Detox",   href: "/drug-alcohol-detox" },
                { label: "PHP",     href: "/partial-hospitalization-program-orange-county" },
                { label: "IOP",     href: "/iop-program-orange-county" },
                { label: "OP",      href: "/outpatient-program" },
                { label: "Virtual", href: "/virtual-outpatient-program" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-6 py-5 border-r border-white/10 last:border-r-0 bg-ink/50 backdrop-blur-sm flex items-center justify-between group hover:bg-white/5 transition-colors"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 group-hover:text-accent transition-colors">{label}</span>
                  <i className="ri-arrow-right-line text-white/20 text-sm group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          }
        >
            <div className={HERO_SPLIT_LEFT}>
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(52px, 6.5vw, 96px)", lineHeight: 0.95 }}
              >
                Levels of<br />
                <em className="italic text-white/60">Care</em>
              </h1>
              <p className={cn(HERO_LEAD, "mt-6")}>
                <AutoLinkedText>{"Recovery is not a single event — it is a continuum. Rize OC offers every level from medically supervised detox to long-term virtual outpatient, ensuring the right support at every stage."}</AutoLinkedText>
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="flex flex-wrap gap-3">
                <Button href="#programs" variant="accent" size="md">View All Programs</Button>
                <Button href="tel:9494612620" variant="outline-white" size="md">
                  <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { icon: "ri-checkbox-circle-line", text: "Joint Commission Accredited" },
                  { icon: "ri-shield-check-line",    text: "DHCS Licensed" },
                  { icon: "ri-time-line",            text: "Same-Day Admissions" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <i className={`${icon} text-accent text-sm`} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
        </PageHeroShell>
      </CinematicHeroSection>

      {/* ── Intro copy ────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">The Continuum</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Moving at the Speed of Your Healing
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"No two journeys to recovery are the same. The appropriate level of care depends on the nature and severity of your condition, your living environment, your support system, and your personal goals."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"At Rize OC, our clinical team conducts a comprehensive assessment before any recommendation is made — ensuring every client begins at the level that gives them the greatest probability of lasting success."}</AutoLinkedText>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {criteria.map(({ icon, q, a }) => (
              <div key={q} className="flex items-start gap-4 border border-warm p-5">
                <IconCircle icon={icon} variant="accent-subtle" size="sm" className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-[15px] font-medium text-ink mb-1"><AutoLinkedText>{q}</AutoLinkedText></p>
                  <p className="text-sm font-light text-ink/60"><AutoLinkedText>{a}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ── All Programs Grid ─────────────────────────────────────────────── */}
      <section id="programs" className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="All Programs"
            heading="The Full Continuum of Care"
            body="From the first medically supervised day to long-term outpatient support — every level, designed around you."
            mb="mb-10"
          />

          <div className="flex flex-col gap-4">
            {levels.map(({ num, label, title, duration, commitment, desc, href, icon, accent }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white border border-warm p-7 flex flex-col sm:flex-row sm:items-start gap-6 hover:border-accent/40 transition-colors"
              >
                {/* Number */}
                <span className="font-[family-name:var(--font-display)] text-[56px] italic font-normal leading-none text-ink/10 hidden sm:block shrink-0 w-12">
                  {num}
                </span>

                {/* Icon */}
                <IconCircle
                  icon={icon}
                  variant={accent ? "accent-subtle" : "muted-subtle"}
                  size="md"
                  className="shrink-0"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-medium px-2.5 py-1 rounded-sm ${accent ? "bg-accent/10 text-accent" : "bg-muted/10 text-muted"}`}>
                      {label}
                    </span>
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-sm bg-ink text-white">
                      {duration}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40 mb-3"><AutoLinkedText>{commitment}</AutoLinkedText></p>
                  <p className="text-[15px] font-light leading-relaxed text-ink/60"><AutoLinkedText>{desc}</AutoLinkedText></p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex items-center">
                  <i className="ri-arrow-right-line text-ink/20 text-xl group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ── How We Assess ─────────────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <Eyebrow colorClass="text-accent" className="mb-5">Our Process</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              How We Determine the Right Level
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-white/60 mb-6">
              <AutoLinkedText>{"No referral, no self-assessment form, and no guesswork. Every placement decision at Rize OC is made by our licensed clinical team based on a thorough, evidence-based evaluation."}</AutoLinkedText>
            </p>
            <div className="flex flex-col gap-3">
              {[
                "ASAM criteria-based clinical assessment",
                "Medical and psychiatric history review",
                "Substance use and withdrawal risk evaluation",
                "Social support and living environment assessment",
                "Personal goals and treatment preference discussion",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-[15px] font-light text-white/70"><AutoLinkedText>{item}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8">
            <div className="flex items-center gap-3 mb-6">
              <IconCircle icon="ri-shield-check-line" variant="ink" size="sm" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">Free Assessment</p>
                <p className="text-xs text-ink/45 mt-0.5"><AutoLinkedText>{"Confidential & no obligation"}</AutoLinkedText></p>
              </div>
            </div>
            <p className="text-[15px] font-light text-ink/65 mb-6">
              <AutoLinkedText>{"Speak with our admissions team today. We'll help you understand your options and determine the level of care that gives you the best foundation for lasting recovery."}</AutoLinkedText>
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:9494612620"
                className="w-full bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-ink/85 transition-colors flex items-center justify-center gap-2"
              >
                <i className="ri-phone-line" /> (949)-461-2620
              </a>
              <a
                href="#"
                className="w-full border border-warm py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink hover:bg-cream transition-colors flex items-center justify-center"
              >
                Verify Insurance Online
              </a>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}
