import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

const GUIDES = [
  {
    href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
    title: "The Complete Guide to Drug and Alcohol Detox",
    excerpt:
      "What to expect from medically supervised detox, why it's essential, and how to access safe detox in Seattle.",
    image: `${BASE}/mvt_guide_detox.jpg`,
    alt: "Medical wellness room with forest view — detox guide",
    tag: "Detox",
    readTime: "12 min",
  },
  {
    href: "/guide/what-to-expect-and-pack-for-treatment/",
    title: "What to Expect and Pack for Treatment",
    excerpt:
      "A practical checklist and day-by-day overview of what your first weeks in treatment look and feel like.",
    image: `${BASE}/mvt_guide_packing.jpg`,
    alt: "Packed bag on a bed with Pacific Northwest view — treatment preparation guide",
    tag: "Admissions",
    readTime: "9 min",
  },
  {
    href: "/guide/seattle-sober-living-and-aftercare-guide/",
    title: "Seattle Sober Living and Aftercare Guide",
    excerpt:
      "Sober living homes, step-down programming, peer support networks, and digital tools for life after treatment.",
    image: `${BASE}/mvt_guide_aftercare.jpg`,
    alt: "Group silhouetted against Seattle sunset — aftercare and sober living guide",
    tag: "Aftercare",
    readTime: "10 min",
  },
  {
    href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
    title: "Understanding Dual Diagnosis: Addiction & Mental Health",
    excerpt:
      "Over half of people with addiction also have a co-occurring mental health condition. Here's why integrated treatment matters.",
    image: `${BASE}/mvt_guide_dual_diagnosis.jpg`,
    alt: "Serene therapy room with overlapping light circles — dual diagnosis guide",
    tag: "Clinical",
    readTime: "11 min",
  },
  {
    href: "/guide/resources-for-families-of-addicts-in-king-county/",
    title: "Resources for Families in King County",
    excerpt:
      "Support groups, intervention guidance, treatment resources, and self-care for families navigating a loved one's addiction.",
    image: `${BASE}/mvt_guide_intervention.jpg`,
    alt: "Chairs arranged in a circle in a warm living room — family support guide",
    tag: "Family",
    readTime: "10 min",
  },
  {
    href: "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
    title: "The Seattle Professional's Guide to Outpatient Treatment",
    excerpt:
      "Confidential, schedule-flexible treatment options for executives, healthcare workers, and working professionals.",
    image: `${BASE}/mvt_guide_insurance.jpg`,
    alt: "Professional desk with Pacific Northwest mountain view — professional's guide to treatment",
    tag: "Professionals",
    readTime: "10 min",
  },
  {
    href: "/guide/how-to-stage-an-intervention-in-seattle/",
    title: "How to Stage an Intervention in Seattle",
    excerpt:
      "Evidence-based approaches, step-by-step preparation, and professional resources for organizing a compassionate intervention.",
    image: `${BASE}/mvt_guide_intervention.jpg`,
    alt: "Warm living room with empty chairs in a circle — intervention guide",
    tag: "Family",
    readTime: "9 min",
  },
  {
    href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
    title: "How to Pay for Drug Rehab in Washington State",
    excerpt:
      "Insurance coverage, Medicaid, EAPs, financing options, and how to appeal a denial — a complete financial guide.",
    image: `${BASE}/mvt_guide_insurance.jpg`,
    alt: "Professional workspace — guide to paying for addiction treatment in Washington",
    tag: "Insurance",
    readTime: "11 min",
  },
  {
    href: "/guide/a-guide-to-seattle-aa-na-and-smart-recovery-meetings/",
    title: "A Guide to Seattle AA, NA, and SMART Recovery Meetings",
    excerpt:
      "Where to find peer support meetings across King County — AA, NA, SMART Recovery, and how to choose the right one.",
    image: `${BASE}/mvt_guide_meetings.jpg`,
    alt: "Chairs in a circle in a sunlit community room — meetings guide",
    tag: "Peer Support",
    readTime: "8 min",
  },
  {
    href: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
    title: "Taking Leave for Rehab: WA PFML & FMLA Guide",
    excerpt:
      "Your legal rights under federal FMLA and Washington PFML — protecting your job and income while seeking treatment.",
    image: `${BASE}/mvt_guide_insurance.jpg`,
    alt: "Professional desk — guide to PFML and FMLA leave for addiction treatment",
    tag: "Legal Rights",
    readTime: "10 min",
  },
];

export default function GuideIndexPage() {
  const [featured, ...rest] = GUIDES;

  return (
    <div className="flex flex-col bg-white text-[var(--mvt-text)]">
      {/* Hero */}
      <section className="bg-[var(--mvt-ink)] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <p className="mvt-eyebrow-light mb-4 text-xs tracking-[0.2em]">MOUNTAIN VIEW GUIDES</p>
          <h1 className="font-heading max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white lg:text-7xl">
            The Recovery Resource Library
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
            Clinician-reviewed guides for every stage of the recovery journey — from understanding
            addiction to navigating insurance, planning aftercare, and supporting a loved one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-6 py-3 text-sm font-semibold text-[var(--mvt-ink)] transition hover:opacity-90"
            >
              <i className="ri-phone-fill" />
              Speak to Admissions
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Verify Insurance
            </Link>
          </div>
        </div>
      </section>

      {/* Featured guide */}
      <section className="bg-[var(--mvt-cream)] py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <Link
            href={featured.href}
            className="group grid overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-lg lg:grid-cols-2"
          >
            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src={featured.image}
                alt={featured.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14">
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-[var(--mvt-teal)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--mvt-teal)]">
                {featured.tag}
              </span>
              <h2 className="font-heading text-3xl font-bold leading-snug text-[var(--mvt-ink)] transition group-hover:text-[var(--mvt-forest)] lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--mvt-muted)]">
                {featured.excerpt}
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--mvt-teal)] transition group-hover:gap-2.5">
                  Read guide <i className="ri-arrow-right-line" />
                </span>
                <span className="text-xs text-[var(--mvt-muted)]">{featured.readTime} read</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All guides grid */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <h2 className="font-heading mb-10 text-3xl font-bold text-[var(--mvt-ink)] lg:text-4xl">
            All Guides
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[var(--mvt-ink)]/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--mvt-teal-light)] backdrop-blur-sm">
                    {g.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold leading-snug text-[var(--mvt-ink)]">
                    {g.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--mvt-muted)]">
                    {g.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--mvt-teal)] transition group-hover:gap-1.5">
                      Read guide <i className="ri-arrow-right-line" />
                    </span>
                    <span className="text-xs text-[var(--mvt-stone)]">{g.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--mvt-forest)] py-16 text-white">
        <div className="mx-auto max-w-[1280px] px-6 text-center lg:px-12">
          <p className="mvt-eyebrow-light mb-3 text-xs tracking-[0.2em]">READY TO START?</p>
          <h2 className="font-heading mb-4 text-3xl font-bold text-white lg:text-4xl">
            Every question deserves a real answer.
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/70">
            Our admissions concierge is available 24/7 for a confidential, no-pressure conversation
            about your situation and your options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-7 py-3.5 text-sm font-semibold text-[var(--mvt-ink)] transition hover:opacity-90"
            >
              <i className="ri-phone-fill" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Verify Your Benefits
            </Link>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </div>
  );
}
