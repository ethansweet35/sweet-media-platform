import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const DAVID_PHOTO =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/team_david-gates.png";
const JENNIFER_PHOTO =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/team_jennifer-mcdaniel.png";
const HERO_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_home_hero01.jpg";
const ABOUT_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_home_about01.jpg";
const MAP_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/home_map01.png";
const JOINT_COMMISSION_LOGO =
  "https://addictioninterventions.com/wp-content/uploads/2025/06/Untitled-design-2025-06-19T224652.113.png";

const PHONE_DISPLAY = "949-776-7093";
const PHONE_HREF = "tel:9497767093";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const heroBullets = [
  { icon: "ri-shield-check-line", text: "100% Confidential" },
  { icon: "ri-map-pin-2-line", text: "All 50 States" },
  { icon: "ri-award-line", text: "Joint Commission Accredited" },
  { icon: "ri-time-line", text: "Available 24 / 7" },
];

const whyUs = [
  {
    icon: "ri-heart-pulse-line",
    title: "Compassionate Approach",
    desc: "We lead with empathy, not confrontation. Every intervention is built around love, respect, and the genuine desire for your loved one to heal.",
  },
  {
    icon: "ri-medal-2-line",
    title: "Certified Specialists",
    desc: "Our interventionists are formally trained and certified — bringing structure, experience, and calm confidence to the most difficult moments.",
  },
  {
    icon: "ri-family-line",
    title: "Whole-Family Focus",
    desc: "Recovery doesn't happen in isolation. We work with the entire family system to rebuild healthy dynamics that support lasting change.",
  },
];

const steps = [
  {
    num: "01",
    icon: "ri-phone-line",
    title: "Free Confidential Call",
    desc: "Tell us what's happening. We listen without judgment and help you understand your options — no commitment required.",
  },
  {
    num: "02",
    icon: "ri-group-3-line",
    title: "Family Preparation",
    desc: "We guide your family through what to say, what to expect, and how to hold loving, firm boundaries.",
  },
  {
    num: "03",
    icon: "ri-discuss-line",
    title: "The Intervention",
    desc: "Our certified interventionist leads a structured, compassionate conversation — opening the door to treatment.",
  },
  {
    num: "04",
    icon: "ri-seedling-line",
    title: "Ongoing Support",
    desc: "We don't disappear after the intervention. We stay with your family through placement, treatment, and beyond.",
  },
];

const services = [
  {
    icon: "ri-goblet-line",
    label: "Alcohol Addiction",
    path: "/alcohol-abuse-interventions",
    desc: "Our team has helped over 1,000 families struggling with alcohol take the next step toward recovery.",
  },
  {
    icon: "ri-capsule-line",
    label: "Drug Addiction",
    path: "/drug-abuse-interventions",
    desc: "We help break the cycle of drug dependence with compassion, guiding loved ones toward lasting recovery.",
  },
  {
    icon: "ri-mental-health-line",
    label: "Mental Health",
    path: "/mental-health-interventions",
    desc: "Depression, anxiety, PTSD — we guide loved ones toward treatment that fits their unique needs.",
  },
  {
    icon: "ri-brain-line",
    label: "Dual Diagnosis",
    path: "/dual-diagnosis-interventions",
    desc: "Specialized care for co-occurring mental health and substance use disorders with integrated support.",
  },
  {
    icon: "ri-alarm-warning-line",
    label: "Crisis Interventions",
    path: "/crisis-interventions",
    desc: "When every hour matters, our crisis team responds with urgency, guiding families through the hardest moments.",
  },
  {
    icon: "ri-user-heart-line",
    label: "Teen Interventions",
    path: "/interventions-for-teens",
    desc: "Gentle, evidence-based approaches for families navigating addiction or mental health with a teenager.",
  },
  {
    icon: "ri-briefcase-4-line",
    label: "Executive Interventions",
    path: "/interventions-for-executives",
    desc: "Discreet, professional support for executives impacted by addiction or mental health challenges.",
  },
  {
    icon: "ri-group-line",
    label: "Family Interventions",
    path: "/family-interventions",
    desc: "Empowering families to build a supportive environment that encourages meaningful, lasting change.",
  },
];

const aboutChecklist = [
  "Fully customized intervention plan for your situation",
  "Certified interventionist present throughout the process",
  "Pre-intervention coaching and family preparation",
  "Treatment placement coordination and follow-through",
  "Accredited by The Joint Commission",
];

const testimonials = [
  {
    stars: 5,
    quote:
      "David Gates is an exceptional interventionist! He responded immediately to the crisis with our son. David spent hours on the phone with our family, working out a step-by-step plan. The plan worked beautifully.",
    author: "J.M.",
    detail: "Mother of a recovering adult son",
  },
  {
    stars: 5,
    quote:
      "Within 24 hours of calling, we had a plan and a certified interventionist ready to help. Professional, compassionate, and completely confidential from start to finish.",
    author: "R.T.",
    detail: "Spouse of a client",
  },
  {
    stars: 5,
    quote:
      "Our family had been stuck in this painful cycle for years. The intervention completely changed the direction of our lives. We finally feel hope again.",
    author: "K.L.",
    detail: "Parent of two adult children",
  },
];

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  hero_image_url: string | null;
  published_at: string | null;
};

async function getRecentPosts(): Promise<BlogPost[]> {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, hero_image_url, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);
  return (data as BlogPost[]) ?? [];
}

export default async function HomePage() {
  const posts = await getRecentPosts();

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center py-32">
        <Image
          src={HERO_IMAGE}
          alt="A family finding hope through compassionate intervention"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E5B50]/85 via-[#3E5B50]/50 to-[#3E5B50]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3E5B50]/80 via-[#3E5B50]/40 to-transparent" />

        <div className={`relative z-10 ${CONTAINER}`}>
          <p className="brand-eyebrow mb-5 text-[#8FAC87]">
            Certified Intervention Specialists — Nationwide
          </p>

          <h1 className="font-heading mb-2 max-w-3xl text-5xl font-bold leading-[1.08] text-white md:text-6xl lg:text-7xl">
            Mental Health,
          </h1>
          <h1 className="font-heading mb-2 max-w-3xl text-5xl font-bold italic leading-[1.08] text-[#8FAC87] md:text-6xl lg:text-7xl">
            Addiction,
          </h1>
          <h1 className="font-heading mb-8 max-w-3xl text-5xl font-bold leading-[1.08] text-white md:text-6xl lg:text-7xl">
            &amp; Family Interventions
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/85">
            You&rsquo;ve tried everything to help your loved one, and nothing has worked.
            We&rsquo;re here to help you break the cycle — with compassion, structure, and proven results.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#8FAC87] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill text-base"></i>
              Call Now | {PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/20"
            >
              Request a Consultation
            </Link>
          </div>

          {/* Icon trust bullets */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {heroBullets.map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/30 text-[#8FAC87]">
                  <i className={`${b.icon} text-xs`}></i>
                </span>
                <span className="text-sm font-medium text-white/80">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro — pull-quote + Why Us ──────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          {/* Pull-quote row */}
          <div className="mb-20 grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="relative">
              <span className="font-heading pointer-events-none absolute -top-8 -left-4 select-none text-[10rem] leading-none text-[#8FAC87]/20 md:text-[14rem]">&ldquo;</span>
              <blockquote className="relative font-heading text-2xl font-medium italic leading-relaxed text-[#3E5B50] md:text-3xl">
                Waiting for someone you love to hit bottom is devastating. You don&rsquo;t have to wait any longer.
              </blockquote>
              <div className="mt-8 h-px w-16 bg-[#8FAC87]"></div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#8FAC87]">
                David Gates — Lead Interventionist
              </p>
            </div>
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Mission</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Interventions For <span className="italic text-[#507969]">Any Situation</span>
              </h2>
              <p className="mb-8 leading-relaxed text-[#4B4B4B]">
                No two situations are the same. Our trained specialists guide families through a structured
                process designed to break through denial, encourage acceptance, and open the door to
                treatment — whether it&rsquo;s alcohol, drugs, mental health, or dual diagnosis.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i>
                  Call Now | {PHONE_DISPLAY}
                </a>
                <Image
                  src={JOINT_COMMISSION_LOGO}
                  alt="Accredited by The Joint Commission"
                  width={140}
                  height={36}
                  className="h-9 w-auto object-contain opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Why Us — 3-up icon cards */}
          <div className="grid gap-6 sm:grid-cols-3">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF]"
              >
                {/* Decorative circle */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#8FAC87]/10" />
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`${w.icon} text-2xl`}></i>
                </span>
                <h3 className="font-heading mb-3 text-xl font-bold text-[#1A1A17]">{w.title}</h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works — numbered steps ────────────────────────────────── */}
      <section className="bg-[#3E5B50] py-24 text-white">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The Process</p>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">
              What Happens When You Call
            </h2>
          </div>

          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line on desktop */}
            <div className="pointer-events-none absolute top-10 left-0 right-0 hidden h-px lg:block"
              style={{ background: "linear-gradient(to right, transparent, #8FAC87 20%, #8FAC87 80%, transparent)" }}
            />

            {steps.map((s, i) => (
              <div key={s.num} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#8FAC87]/40 bg-[#507969]">
                  <i className={`${s.icon} text-2xl text-[#8FAC87]`}></i>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading mb-3 text-lg font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#8FAC87] px-9 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill"></i>
              Start with a Free Call — {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── Services — tiled grid ─────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-16 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">How We Help</p>
              <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
                Every Family&rsquo;s <span className="italic text-[#507969]">Situation</span> Is Different
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#4B4B4B] lg:text-right">
              We specialize in customized, compassionate interventions — whatever your loved one is facing.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#EFEFEF] bg-[#EFEFEF] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.label}
                href={s.path}
                className={`group relative flex flex-col gap-3 p-7 transition hover:z-10 hover:shadow-xl ${
                  i % 2 === 0 ? "bg-white" : "bg-[#F5F3E7]/70"
                } hover:bg-white`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${s.icon} text-lg`}></i>
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1A1A17]">{s.label}</h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{s.desc}</p>
                <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#8FAC87]">
                  Learn more <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About — immersive dark sage with checklist ───────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={`${CONTAINER} grid gap-16 lg:grid-cols-2 lg:items-center`}>
          {/* Image with floating card */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={ABOUT_IMAGE}
                alt="A compassionate family conversation about recovery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-[#3E5B50] px-6 py-5 shadow-xl">
              <p className="font-heading text-4xl font-bold text-white">1,500+</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#8FAC87]">Families Helped</p>
            </div>
          </div>

          {/* Text + checklist */}
          <div>
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Commitment</p>
            <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
              Walking Beside You<br />
              <span className="italic text-[#507969]">On This Healing Journey</span>
            </h2>
            <p className="mb-8 leading-relaxed text-[#4B4B4B]">
              At the core of our mission is a deep commitment to helping individuals and families navigate
              the path to recovery. Our approach is rooted in empathy, professionalism, and proven success.
            </p>

            {/* Icon checklist */}
            <ul className="mb-10 grid gap-3">
              {aboutChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                    <i className="ri-check-line text-xs"></i>
                  </span>
                  <span className="text-sm leading-relaxed text-[#4B4B4B]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i>
                Get Help Now
              </a>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 rounded-full border border-[#8FAC87]/40 px-7 py-3.5 text-sm font-semibold text-[#507969] transition hover:border-[#8FAC87] hover:bg-[#8FAC87]/10"
              >
                Meet Our Team <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet the Team ────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-16 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Who You&rsquo;ll Work With</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Meet the{" "}
              <span className="italic text-[#507969]">Co-Founders</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              David and Jennifer Gates founded Addiction Interventions with a single purpose: to give families the
              professional structure and compassionate guidance they need to break through denial and begin real healing.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* David */}
            <div className="relative overflow-hidden rounded-3xl bg-[#F5F3E7] p-10">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#8FAC87]/10" />
              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Headshot */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                  <Image src={DAVID_PHOTO} alt="David Allen Gates" fill className="object-cover object-top" sizes="96px" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-2xl font-bold text-[#1A1A17]">David Allen Gates</h3>
                    <span className="rounded-full bg-[#8FAC87]/20 px-3 py-0.5 text-xs font-semibold text-[#507969]">
                      Co-Founder
                    </span>
                  </div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#8FAC87]">
                    Lead Interventionist · CIP · ICAADC
                  </p>
                  <p className="text-sm leading-relaxed text-[#4B4B4B]">
                    David has more than 20 years of experience directing nationally recognized addiction treatment programs.
                    He has personally led over 1,500 interventions for families in crisis — and as someone in long-term
                    recovery himself, he brings a rare perspective to every family he serves.
                  </p>
                  <ul className="mt-5 grid gap-2">
                    {[
                      "Certified Intervention Professional (CIP)",
                      "Internationally Certified Alcohol & Drug Counselor (ICAADC)",
                      "Trained in ARISE®, Johnson Model & Family Systems Intervention",
                    ].map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                          <i className="ri-check-line text-[10px]"></i>
                        </span>
                        <span className="text-xs leading-relaxed text-[#4B4B4B]">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/david-gates"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] underline-offset-4 hover:underline"
                  >
                    Read David&rsquo;s full bio <i className="ri-arrow-right-line"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Jennifer */}
            <div className="relative overflow-hidden rounded-3xl bg-[#F5F3E7] p-10">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#8FAC87]/10" />
              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Headshot */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                  <Image src={JENNIFER_PHOTO} alt="Jennifer Miela-McDaniel" fill className="object-cover object-top" sizes="96px" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-2xl font-bold text-[#1A1A17]">Jennifer Miela-McDaniel</h3>
                    <span className="rounded-full bg-[#8FAC87]/20 px-3 py-0.5 text-xs font-semibold text-[#507969]">
                      Co-Founder
                    </span>
                  </div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#8FAC87]">
                    Clinical Director · Lead Interventionist · CADC II · BRI · CTP · CFMI · ICADC
                  </p>
                  <p className="text-sm leading-relaxed text-[#4B4B4B]">
                    Jennifer has over 20 years of experience beginning in 1993 as a drug and alcohol counselor. A trauma
                    specialist trained in five different intervention models, she uses each intervention as an opportunity
                    to interrupt destructive life patterns — healing the entire family system, not just the individual.
                    She specializes in drug, alcohol, gambling, eating disorders, adolescence, and geriatric interventions.
                  </p>
                  <ul className="mt-5 grid gap-2">
                    {[
                      "Certified ARISE® Interventionist — invitational, non-confrontational approach",
                      "Trauma specialist trained in 5 intervention models",
                      "Specializes in adolescent, geriatric & eating disorder interventions",
                    ].map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                          <i className="ri-check-line text-[10px]"></i>
                        </span>
                        <span className="text-xs leading-relaxed text-[#4B4B4B]">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/about-us"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] underline-offset-4 hover:underline"
                  >
                    Read Jennifer&rsquo;s full bio <i className="ri-arrow-right-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <p className="mt-10 text-center text-sm text-[#4B4B4B]">
            <i className="ri-phone-line mr-1.5 text-[#8FAC87]"></i>
            When you call, you speak directly with David or Jennifer — never a call center.{" "}
            <a href={PHONE_HREF} className="font-semibold text-[#507969] underline-offset-4 hover:underline">
              Call {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-16 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Family Stories</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Trusted by More Than{" "}
              <span className="italic text-[#507969]">1,500 Families</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative flex flex-col rounded-3xl bg-[#F5F3E7] p-8 ring-1 ring-[#EFEFEF]"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <i key={si} className="ri-star-fill text-[#8FAC87] text-sm"></i>
                  ))}
                </div>
                {/* Decorative quote mark */}
                <span className="font-heading absolute top-4 right-6 text-5xl leading-none text-[#8FAC87]/25">&rdquo;</span>
                <blockquote className="font-heading flex-1 text-lg font-medium italic leading-relaxed text-[#1A1A17]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#EFEFEF] pt-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                    <i className="ri-user-line text-sm"></i>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#1A1A17]">{t.author}</p>
                    <p className="text-xs text-[#4B4B4B]">{t.detail}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Google review callout */}
          <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7] px-8 py-5">
            <i className="ri-google-fill text-2xl text-[#507969]"></i>
            <p className="text-sm text-[#4B4B4B]">
              <span className="font-bold text-[#1A1A17]">5.0 stars</span> based on verified Google reviews —{" "}
              <span className="font-medium">families trust Addiction Interventions nationwide.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Nationwide ───────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-[#EFEFEF] shadow-sm">
              <Image
                src={MAP_IMAGE}
                alt="Addiction Interventions serves all 50 states nationwide"
                width={1200}
                height={675}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">We Come to You</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Available in <span className="italic text-[#507969]">Every State</span>
              </h2>
              <p className="mb-8 leading-relaxed text-[#4B4B4B]">
                Our nationwide network of certified interventionists is ready to help guide your
                family through the process of recovery — no matter where you are located.
              </p>
              {/* Icon list */}
              <ul className="mb-8 grid gap-3">
                {[
                  { icon: "ri-plane-line", text: "Interventionists travel to you — no matter the location" },
                  { icon: "ri-user-star-line", text: "Local knowledge, national standards of care" },
                  { icon: "ri-home-heart-line", text: "In-home or facility-based interventions available" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#8FAC87]/15 text-[#507969]">
                      <i className={`${item.icon} text-sm`}></i>
                    </span>
                    <span className="text-sm leading-relaxed text-[#4B4B4B]">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i>
                  Call Now | {PHONE_DISPLAY}
                </a>
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#507969] underline-offset-4 hover:underline"
                >
                  View all service areas <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-white py-24">
          <div className={CONTAINER}>
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="brand-eyebrow mb-3 text-[#8FAC87]">From the Blog</p>
                <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
                  Mental Health &amp;{" "}
                  <span className="italic text-[#507969]">Addiction Resources</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#507969] underline-offset-4 hover:underline"
              >
                View all articles <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition hover:shadow-lg ${
                    i === 0 ? "border-2 border-[#8FAC87]/30" : "border border-[#EFEFEF]"
                  }`}
                >
                  {post.hero_image_url && (
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.hero_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-heading text-xl font-bold leading-snug text-[#1A1A17] transition group-hover:text-[#507969]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4B4B4B]">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#6F8E68]">
                      Read More <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />
        <div className="pointer-events-none absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-[#8FAC87]/10" />

        <div className={`${CONTAINER} relative z-10`}>
          <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Left: text */}
            <div>
              <p className="brand-eyebrow mb-5 text-[#8FAC87]">You Don&rsquo;t Have to Do This Alone</p>
              <h2 className="font-heading mb-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                Speak to a Certified
              </h2>
              <h2 className="font-heading mb-8 text-4xl font-bold italic text-[#8FAC87] md:text-5xl lg:text-6xl">
                Interventionist
              </h2>
              <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/75">
                Call us 24/7 — we&rsquo;re here to ensure you are fully informed and empowered to make
                the best decisions for your family.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-10 py-4 text-base font-semibold text-[#3E5B50] shadow-xl transition hover:bg-[#F5F3E7]"
                >
                  <i className="ri-phone-fill"></i>
                  Call Now | {PHONE_DISPLAY}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-10 py-4 text-base font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
                >
                  Request a Consultation
                </Link>
              </div>
            </div>

            {/* Right: icon feature list */}
            <div className="flex flex-col gap-4 lg:min-w-[280px]">
              {[
                { icon: "ri-lock-line", label: "100% Confidential" },
                { icon: "ri-time-line", label: "Available 24 / 7" },
                { icon: "ri-map-pin-2-line", label: "Nationwide Coverage" },
                { icon: "ri-award-line", label: "Joint Commission Accredited" },
                { icon: "ri-heart-line", label: "Compassionate Specialists" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/20 text-[#8FAC87]">
                    <i className={`${item.icon} text-lg`}></i>
                  </span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-xs uppercase tracking-[0.18em] text-white/30">
            Confidential · Available 24/7 · All 50 States
          </p>
        </div>
      </section>

    </div>
  );
}
