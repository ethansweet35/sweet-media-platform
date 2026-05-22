import Image from "next/image";
import { heroContentPad } from "@/lib/heroSpacing";
import Link from "next/link";
import { GARDEN_GROVE_IMAGES, SERVICE_IMAGES } from "@/views/home/assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const WHY_GENDER = [
  {
    icon: "ri-shield-check-line",
    title: "Psychological Safety",
    body: "Women are significantly more likely to have experienced sexual trauma. A women-only environment removes a major barrier to openness, vulnerability, and authentic therapeutic engagement.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Women's Health Factors",
    body: "Hormonal cycles, reproductive health, pregnancy, and postpartum experiences all intersect with addiction and mental health in ways that are best addressed by clinicians specializing in women's care.",
  },
  {
    icon: "ri-group-line",
    title: "Women-Specific Group Therapy",
    body: "Group therapy is most powerful when the experiences being discussed feel genuinely shared. Women's groups allow deeper exploration of trauma, relationships, body image, and identity.",
  },
  {
    icon: "ri-family-line",
    title: "Relational Recovery",
    body: "Women's addiction often has stronger relational dimensions — codependency, enabling relationships, parenting guilt. Gender-specific treatment gives these factors the clinical attention they deserve.",
  },
];

const WHAT_WE_ADDRESS = [
  "Sexual and domestic trauma",
  "Co-occurring eating disorders",
  "Postpartum depression and substance use",
  "Codependency and enabling relationship patterns",
  "Body image and self-worth",
  "Anxiety, depression, and PTSD",
  "Guilt and shame around parenting",
  "Career and identity disruption",
];

export default function WomensResidentialPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3a6697]">
        <div className="absolute inset-0">
          <Image
            src={GARDEN_GROVE_IMAGES.bedroom}
            alt="Residential bedroom at The Grove — women's residential treatment at Northbound"
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a6697]/95 via-[#3a6697]/80 to-[#3a6697]/40" />
        </div>
        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e97a52]">
              <AutoLinkedText>{"Residential Programs — Northbound Treatment Services"}</AutoLinkedText>
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Women&apos;s <span className="italic text-[#e97a52]">Residential</span> Treatment
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              <AutoLinkedText>{"Women face unique challenges in addiction and recovery — from trauma history to hormonal health to relational patterns. Northbound's women's residential program provides a safe, clinically sophisticated environment designed specifically for women's healing."}</AutoLinkedText>
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

      {/* ── WHY GENDER-SPECIFIC ───────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Why Gender-Specific Care Matters"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                Women&apos;s Addiction Is <span className="italic text-[#e97a52]">Different</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Research consistently shows that women develop substance use disorders differently from men — progressing from first use to dependency faster (a phenomenon called \"telescoping\"), experiencing different biological responses to substances, and carrying distinctly different trauma histories and social pressures."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Women in treatment report higher rates of sexual trauma, more complex relational dynamics, and greater co-occurrence of eating disorders, anxiety, and depression. They face unique barriers to seeking help — including concern for children, stigma, and shame — that gender-specific treatment directly addresses."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's women's residential program creates an environment of profound psychological safety — allowing the kind of authentic, vulnerable therapeutic work that produces lasting healing."}</AutoLinkedText>
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={SERVICE_IMAGES.outdoorMeditation}
                  alt="Guided outdoor meditation at The Grove — women's residential wellness at Northbound"
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
                <AutoLinkedText>{"Women-Specific Clinical Focus"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                What Our Women&apos;s Program <span className="italic text-[#e97a52]">Addresses</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's women's residential program integrates women-specific clinical content into every aspect of treatment — from the group therapy topics to the trauma modalities to the discharge planning."}</AutoLinkedText>
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
                <AutoLinkedText>{"Full Clinical Continuum"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
                From Residential to <span className="italic text-[#e97a52]">Long-Term Recovery</span>
              </h2>
              <p className="mt-5 leading-relaxed text-white/65">
                <AutoLinkedText>{"Women's residential treatment at Northbound is the beginning of a continuum — not a destination. Following residential, women can continue with Northbound's PHP, IOP, sober living, and alumni programs, with clinical support maintained throughout the transition to independent life."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                <AutoLinkedText>{"Our DHCS-licensed, JCAHO-accredited program provides the clinical rigor that women's complex presentations demand — and the warmth and community that healing requires."}</AutoLinkedText>
              </p>
            </div>
            <div className="space-y-8">
              {[
                { value: "38+", label: "Years serving women in recovery" },
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
                You Deserve Care That Truly Understands You.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                <AutoLinkedText>{"Our admissions team is available 24 hours a day — confidential, compassionate, and ready to help. Call now or verify your insurance for free."}</AutoLinkedText>
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
