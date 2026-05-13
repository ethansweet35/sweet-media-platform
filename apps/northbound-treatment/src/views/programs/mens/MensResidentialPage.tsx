import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const WHY_GENDER = [
  {
    icon: "ri-shield-check-line",
    title: "Breaking Masculine Barriers",
    body: "Cultural conditioning teaches men to suppress vulnerability and deny struggle. A men's program specifically validates these challenges and creates the psychological safety for authentic therapeutic work — without the performance pressure of mixed settings.",
  },
  {
    icon: "ri-group-line",
    title: "Brotherhood & Accountability",
    body: "Men respond powerfully to peer accountability and shared identity. The brotherhood forged in men's residential treatment is a proven factor in long-term sobriety — men holding each other responsible in ways they won't accept from other sources.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Men's Trauma",
    body: "Men experience high rates of trauma — combat, childhood abuse, workplace accidents, and loss — but are significantly less likely to seek help for it. Men's programs address trauma through lenses and approaches that resonate with male identity.",
  },
  {
    icon: "ri-briefcase-line",
    title: "Identity, Purpose, and Work",
    body: "Addiction often strips men of their sense of purpose and identity — especially when careers collapse. Men's treatment at Northbound rebuilds these foundations through Careerbound® vocational support and identity-based therapeutic work.",
  },
];

const WHAT_WE_ADDRESS = [
  "Combat and work-related trauma",
  "Anger, emotional suppression, and shame",
  "Fatherhood, responsibility, and family repair",
  "Career collapse and purpose reconstruction",
  "Sexual and physical abuse history",
  "Co-occurring depression and suicidal ideation",
  "High-risk behaviors and consequence avoidance",
  "Accountability and follow-through patterns",
];

export default function MensResidentialPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3a6697]">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/nbt_mens_hero01.jpg`}
            alt="Men's recovery community at Northbound Treatment — brotherhood, accountability, and healing"
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a6697]/95 via-[#3a6697]/80 to-[#3a6697]/40" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 lg:px-10 lg:pb-20 lg:pt-36">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e97a52]">
              <AutoLinkedText>{"Residential Programs — Northbound Treatment Services"}</AutoLinkedText>
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Men&apos;s <span className="italic text-[#e97a52]">Residential</span> Treatment
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              <AutoLinkedText>{"Men face unique challenges in addiction — from the cultural barriers to seeking help, to the specific trauma patterns that drive use, to the identity and purpose disruption that addiction creates. Northbound's men's residential program is designed for exactly this."}</AutoLinkedText>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#f09068]"
              >
                <i className="ri-phone-fill text-base" />
                Call (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
              >
                Verify Insurance — Free <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MEN'S TREATMENT ───────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Why Men&apos;s-Specific Treatment"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                Men Don&apos;t Ask for Help — <span className="italic text-[#e97a52]">Until They Do</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Men are three times more likely than women to develop a substance use disorder — and far less likely to seek treatment for it. The reasons are cultural, psychological, and relational: admitting struggle conflicts with masculine identity; asking for help feels like weakness; the consequences often have to become catastrophic before the wall comes down."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"When men do seek help, they need an environment that meets them where they are — that doesn't require immediate emotional fluency, that acknowledges the real barriers to vulnerability, and that builds trust through structure, accountability, and shared experience with other men who understand."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's men's residential program has been built around this clinical reality for nearly four decades. Brotherhood isn't a marketing word here — it's the mechanism of recovery."}</AutoLinkedText>
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`${BASE}/nbt_mens_hero01.jpg`}
                  alt="Men's recovery community at Northbound Treatment — accountability, trust, and shared healing"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE ADDRESS ───────────────────────────────────────────── */}
      <section className="bg-[#eef2f7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Men-Specific Clinical Focus"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                What Our Men&apos;s Program <span className="italic text-[#e97a52]">Addresses</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's men's program addresses the clinical issues that drive addiction in men — not generic recovery content, but the specific patterns that research and experience show are most relevant to male addiction and recovery."}</AutoLinkedText>
              </p>
              <ul className="mt-6 space-y-3">
                {WHAT_WE_ADDRESS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-[#e97a52] text-white">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <span className="text-sm leading-relaxed text-[#64748b]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-5">
              {WHY_GENDER.map((item) => (
                <div key={item.title} className="flex gap-5 border border-[#cdd8e8] bg-white p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#e97a52]/10">
                    <i className={`${item.icon} text-xl text-[#e97a52]`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#3a6697]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#64748b]"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK SECTION ──────────────────────────────────────────────── */}
      <section className="bg-[#3a6697] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Specialized Programs for Men"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
                Veterans Track &amp; <span className="italic text-[#e97a52]">Careerbound®</span>
              </h2>
              <p className="mt-5 leading-relaxed text-white/65">
                <AutoLinkedText>{"Two of Northbound's most specialized programs are built around men's most common recovery trajectories. The Veterans Track program provides culturally competent care for active military and veterans — honoring service, addressing combat trauma, and building recovery within the context of military identity. The Careerbound® program supports men in rebuilding professional lives disrupted by addiction."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                <AutoLinkedText>{"Both programs integrate into Northbound's residential and outpatient continuum — providing the vocational, identity, and community-level support that sustains sobriety beyond the clinical setting."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/veterans-track-program/"
                  className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
                >
                  Veterans Track Program <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
            <div className="space-y-8">
              {[
                { value: "38+", label: "Years serving men in recovery" },
                { value: ">97%", label: "Drug abstinence rate (USC study)" },
                { value: "24/7", label: "Clinical support" },
              ].map((s) => (
                <div key={s.label} className="border-l-4 border-[#e97a52] pl-5">
                  <p className="font-heading text-4xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#e97a52] py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Asking for Help Is the Strongest Thing You Can Do.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                <AutoLinkedText>{"Our admissions team is available 24/7. The call is confidential and costs nothing. Let us handle the insurance, answer your questions, and help you take the next step."}</AutoLinkedText>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-bold text-[#e97a52] shadow-sm transition hover:bg-white/90"
              >
                <i className="ri-phone-fill" /> (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                Begin Admissions <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
