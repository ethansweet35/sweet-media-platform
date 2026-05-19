import Image from "next/image";
import { heroContentPad } from "@/lib/heroSpacing";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const LEVELS = [
  {
    title: "Sober Living",
    icon: "ri-home-heart-line",
    description:
      "Northbound's structured sober living homes provide a safe, substance-free living environment for clients transitioning out of residential treatment or PHP. Rules, accountability, and peer community are built in — so independence is built on a solid foundation.",
    features: ["Structured house rules and accountability", "Drug testing and curfews", "Peer recovery community", "Case management support", "Proximity to Northbound's outpatient programs"],
  },
  {
    title: "Outpatient Day Treatment (PHP/IOP)",
    icon: "ri-sun-line",
    description:
      "For clients who need structured daily support while living in a transitional environment, Northbound's PHP (5 days per week) and IOP (3 days per week) programs provide clinical programming alongside growing personal independence.",
    features: ["10–30 hours per week of clinical programming", "Individual and group therapy", "Psychiatric care and medication management", "Life skills and vocational support", "Gradual step-down toward full independence"],
  },
  {
    title: "Collegebound® Program",
    icon: "ri-graduation-cap-line",
    description:
      "Northbound's Collegebound® program supports young adults in maintaining sobriety while returning to higher education. Academic coaching, campus navigation, peer accountability, and clinical support are integrated to protect and promote academic recovery.",
    features: ["Academic planning and scheduling support", "Campus mental health coordination", "Peer accountability structures", "Flexible clinical programming around class schedules", "Alumni mentorship from successful graduates"],
  },
  {
    title: "Careerbound® Program",
    icon: "ri-briefcase-line",
    description:
      "Careerbound® helps adults in recovery rebuild professional lives — returning to work, rebuilding resumes, or pursuing new career paths. Employment coaching, professional skills development, and clinical support work in tandem.",
    features: ["Vocational assessment and career planning", "Resume and interview preparation", "Workplace re-entry support", "Professional accountability structures", "Integration with IOP clinical programming"],
  },
];

const STATS = [
  { value: "38+", label: "Years of experience" },
  { value: ">97%", label: "Abstinence rate (USC study)" },
  { value: "24/7", label: "Support available" },
];

export default function TransitionalLivingPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3a6697]">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/nbt_transitional_hero01.jpg`}
            alt="Northbound sober living house exterior at golden hour — safe, welcoming transitional living"
            fill
            className="object-cover object-center opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a6697]/95 via-[#3a6697]/80 to-[#3a6697]/40" />
        </div>
        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e97a52]">
              <AutoLinkedText>{"Programs — Northbound Treatment Services"}</AutoLinkedText>
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Transitional <span className="italic text-[#e97a52]">Living</span> Programs
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              <AutoLinkedText>{"The bridge between intensive treatment and independent life is often where recovery is won or lost. Northbound's continuum of transitional programs — sober living, outpatient care, Collegebound®, and Careerbound® — provides the structure, accountability, and support needed to make that bridge strong."}</AutoLinkedText>
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

      {/* ── WHY TRANSITIONAL LIVING ───────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Why Transitional Living Matters"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                The Bridge Between Treatment and <span className="italic text-[#e97a52]">Real Life</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Research is clear: longer periods of structured support in recovery produce significantly better long-term outcomes. The transition from intensive residential treatment back to independent living is statistically one of the highest-risk periods in the recovery process — stress, isolation, familiar environments, and the absence of round-the-clock clinical structure all increase relapse risk."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's transitional living programs don't end recovery — they extend and deepen it. By providing structured environments, clinical oversight, and peer accountability during the critical 3–12 months after inpatient treatment, transitional programs dramatically improve the probability of sustained sobriety."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Whether a client is returning to college, rebuilding a career, or simply learning to live independently again, Northbound has a program designed for exactly that trajectory."}</AutoLinkedText>
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`${BASE}/nbt_transitional_hero01.jpg`}
                  alt="Northbound transitional sober living house — structured recovery housing in Orange County"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#3a6697] px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">2×</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#e97a52]">
                  <AutoLinkedText>{"Better outcomes with 90+ days of structured support"}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM LEVELS ────────────────────────────────────────────── */}
      <section className="bg-[#eef2f7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
              <AutoLinkedText>{"The Full Transitional Continuum"}</AutoLinkedText>
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
              Programs for Every <span className="italic text-[#e97a52]">Stage of Recovery</span>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {LEVELS.map((level) => (
              <div key={level.title} className="border border-[#cdd8e8] bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-[#e97a52]/10">
                  <i className={`${level.icon} text-2xl text-[#e97a52]`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#3a6697]">{level.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b]"><AutoLinkedText>{level.description}</AutoLinkedText></p>
                <ul className="mt-5 space-y-2">
                  {level.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#64748b]">
                      <i className="ri-check-line mt-0.5 shrink-0 text-[#e97a52]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK STATS ────────────────────────────────────────────────── */}
      <section className="bg-[#3a6697] py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 text-center sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-5xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO BENEFITS ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">Who It&rsquo;s For</p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
              Who Benefits From <span className="italic text-[#e97a52]">Transitional Living</span>
            </h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "ri-user-line", title: "Residential Treatment Graduates", body: "Clients completing Northbound's inpatient program who need continued structure before returning to full independence." },
              { icon: "ri-graduation-cap-line", title: "College Students", body: "Young adults returning to academic life after treatment who need support navigating campus environments and academic pressures in recovery." },
              { icon: "ri-briefcase-line", title: "Professionals in Recovery", body: "Adults rebuilding careers after addiction — returning to high-pressure work environments where relapse risk can be elevated." },
              { icon: "ri-home-line", title: "Those Without Sober Home Environments", body: "Clients whose home environments involve active substance use or lack the structure needed for early recovery." },
              { icon: "ri-family-line", title: "Families Preparing for Loved Ones", body: "Family members seeking structured options for their loved one completing treatment rather than returning directly home." },
              { icon: "ri-map-pin-2-line", title: "Out-of-Area Clients", body: "Clients from outside Southern California completing treatment who prefer an extended supported stay in Orange County before returning home." },
            ].map((item) => (
              <div key={item.title} className="bg-white px-7 py-8">
                <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#e97a52]/10">
                  <i className={`${item.icon} text-xl text-[#e97a52]`} />
                </div>
                <h3 className="font-heading text-base font-bold text-[#3a6697]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#e97a52] py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Ready to Talk About What Comes After Treatment?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                <AutoLinkedText>{"Our admissions team helps plan the full continuum — not just the first step. Call us 24/7 to discuss transitional living options."}</AutoLinkedText>
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
                Learn About Admissions <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
