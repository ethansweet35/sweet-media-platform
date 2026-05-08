import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

const stats = [
  { value: "1,500+", label: "Families Helped" },
  { value: "24/7", label: "Always Available" },
  { value: "50", label: "States Served" },
  { value: "100%", label: "Confidential" },
];

const services = [
  {
    icon: "ri-goblet-line",
    label: "Alcohol Addiction",
    path: "/alcohol-abuse-interventions",
    desc: "Our intervention team has helped over 1,000 families struggling with alcohol take the next step toward recovery.",
  },
  {
    icon: "ri-capsule-line",
    label: "Drug Addiction",
    path: "/drug-abuse-interventions",
    desc: "We help break the cycle of drug dependence, guiding loved ones and families toward lasting recovery with compassion.",
  },
  {
    icon: "ri-mental-health-line",
    label: "Mental Health",
    path: "/mental-health-interventions",
    desc: "Depression, anxiety, PTSD — we guide loved ones toward treatment that fits their unique mental health needs.",
  },
  {
    icon: "ri-brain-line",
    label: "Dual Diagnosis",
    path: "/dual-diagnosis-interventions",
    desc: "Specialized care for co-occurring mental health and substance use disorders, with integrated treatment support.",
  },
  {
    icon: "ri-alarm-warning-line",
    label: "Crisis Interventions",
    path: "/crisis-interventions",
    desc: "When every hour matters, our crisis team responds with urgency, guiding families through the most difficult moments.",
  },
  {
    icon: "ri-user-heart-line",
    label: "Teen Interventions",
    path: "/interventions-for-teens",
    desc: "Gentle, evidence-based approaches designed for families navigating addiction or mental health with a teenager.",
  },
  {
    icon: "ri-briefcase-4-line",
    label: "Executive Interventions",
    path: "/interventions-for-executives",
    desc: "Discreet, professional support for executives and high-profile individuals impacted by addiction or mental health.",
  },
  {
    icon: "ri-group-line",
    label: "Family Interventions",
    path: "/family-interventions",
    desc: "Empowering families to build a supportive environment and encourage lasting, meaningful change together.",
  },
];

const testimonials = [
  {
    quote:
      "David Gates is an exceptional interventionist! He responded immediately to the crisis with our son, who was struggling with addiction. David spent hours on the phone with our family, providing guidance and working out a step-by-step plan. The plan worked beautifully.",
    author: "J.M.",
    detail: "Mother of a recovering adult son",
  },
  {
    quote:
      "I had no idea where to turn. Within 24 hours of calling, we had a plan and a certified interventionist ready to help. Professional, compassionate, and completely confidential from start to finish.",
    author: "R.T.",
    detail: "Spouse of a client",
  },
  {
    quote:
      "Our family had been stuck in this painful cycle for years. The intervention completely changed the direction of our lives. We finally feel hope again — something we hadn't felt in a very long time.",
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
        {/* Layered overlay — darker on left where text lives */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3E5B50]/85 via-[#3E5B50]/50 to-[#3E5B50]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3E5B50]/80 via-[#3E5B50]/40 to-transparent" />

        <div className={`relative z-10 ${CONTAINER}`}>
          {/* Eyebrow */}
          <p className="brand-eyebrow mb-5 text-[#8FAC87]">
            Certified Intervention Specialists — Nationwide
          </p>

          {/* Display heading with italic emphasis */}
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

          {/* Inline trust signals */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-heading text-2xl font-bold text-[#8FAC87]">{s.value}</span>
                <span className="text-xs uppercase tracking-[0.1em] text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro / What we do ───────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            {/* Left: Big editorial quote */}
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

            {/* Right: Text + accreditation */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Mission</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Interventions For Any Situation
              </h2>
              <p className="mb-5 leading-relaxed text-[#4B4B4B]">
                No two situations are the same, which is why we offer customized interventions for any circumstance.
                Our trained specialists guide families through a structured process designed to break through denial,
                encourage acceptance, and open the door to treatment.
              </p>
              <p className="mb-8 leading-relaxed text-[#4B4B4B]">
                Whether it&rsquo;s alcohol, drug use, mental health challenges, or dual diagnosis — we provide
                compassionate support every step of the way.
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
        </div>
      </section>

      {/* ── Services — editorial asymmetric ──────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-16 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">How We Help</p>
              <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
                Every Family&rsquo;s <span className="italic text-[#507969]">Situation</span> Is Different
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#4B4B4B] lg:text-right">
              We specialize in customized, compassionate interventions — whatever your loved one is facing.
            </p>
          </div>

          <div className="grid gap-px bg-[#EFEFEF] border border-[#EFEFEF] overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.label}
                href={s.path}
                className={`group relative flex flex-col gap-3 p-7 transition hover:z-10 hover:shadow-xl ${
                  i % 2 === 0 ? "bg-white" : "bg-[#F5F3E7]/70"
                } hover:bg-white`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8FAC87]/15 text-[#6F8E68] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${s.icon} text-lg`}></i>
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1A1A17]">
                  {s.label}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{s.desc}</p>
                <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#8FAC87]">
                  Learn more <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About — two-column immersive ─────────────────────────────────── */}
      <section className="bg-[#3E5B50] py-24 text-white">
        <div className={`${CONTAINER} grid gap-16 lg:grid-cols-2 lg:items-center`}>
          {/* Text first on desktop */}
          <div className="order-2 lg:order-1">
            <p className="brand-eyebrow mb-5 text-[#8FAC87]">Our Commitment</p>
            <h2 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Walking Beside You<br />
              <span className="italic text-[#8FAC87]">On This Healing Journey</span>
            </h2>
            <p className="mb-5 leading-relaxed text-white/75">
              At the core of our mission is a deep commitment to helping individuals and families navigate the path to recovery.
              With every intervention, we provide the guidance, structure, and support needed to break through denial and take
              meaningful steps toward healing.
            </p>
            <p className="mb-10 leading-relaxed text-white/75">
              Our approach is rooted in empathy, professionalism, and proven success — helping people not only access
              treatment but build the foundation for lasting recovery. Accredited by The Joint Commission.
            </p>
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
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60"
              >
                Meet Our Team
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={ABOUT_IMAGE}
                alt="A compassionate family conversation about recovery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm">
                <p className="font-heading text-3xl font-bold text-[#3E5B50]">1,500+</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4B4B]">Families Helped Nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials — editorial pull-quote style ─────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
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
                className="relative flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#EFEFEF]"
              >
                {/* Large decorative quote mark */}
                <span className="font-heading absolute -top-4 left-6 text-6xl leading-none text-[#8FAC87]">&ldquo;</span>
                <blockquote className="font-heading mt-4 flex-1 text-lg font-medium italic leading-relaxed text-[#1A1A17]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-[#EFEFEF] pt-5">
                  <p className="font-semibold text-[#1A1A17]">{t.author}</p>
                  <p className="mt-0.5 text-sm text-[#4B4B4B]">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nationwide ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-[#EFEFEF] shadow-sm">
              <Image
                src={MAP_IMAGE}
                alt="Addiction Interventions serves all 50 states nationwide"
                width={1200}
                height={675}
                className="h-auto w-full"
              />
            </div>

            {/* Text */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">We Come to You</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Our Services Are Offered{" "}
                <span className="italic text-[#507969]">Nationwide</span>
              </h2>
              <p className="mb-8 leading-relaxed text-[#4B4B4B]">
                Whether your loved one is in a major city, a small town, or a rural community —
                our nationwide network of certified interventionists is ready to help guide your family
                through the process of recovery, no matter where you are.
              </p>
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
        <section className="bg-[#F5F3E7] py-24">
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
                  className={`group flex flex-col overflow-hidden rounded-3xl transition hover:shadow-lg ${
                    i === 0 ? "border-2 border-[#8FAC87]/30" : "border border-[#EFEFEF]"
                  } bg-white`}
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
                    <span className="mt-auto pt-5 flex items-center gap-1.5 text-sm font-semibold text-[#6F8E68]">
                      Read More <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA — warm, personal ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#3E5B50] py-32">
        {/* Subtle decorative circle */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#507969]/30" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#8FAC87]/15" />

        <div className={`${CONTAINER} relative z-10 text-center`}>
          <p className="brand-eyebrow mb-5 text-[#8FAC87]">You Don&rsquo;t Have to Do This Alone</p>
          <h2 className="font-heading mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Speak to a Certified
          </h2>
          <h2 className="font-heading mb-8 text-4xl font-bold italic text-[#8FAC87] md:text-5xl lg:text-6xl">
            Interventionist
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white/75">
            Our goal is to ensure that you are fully informed and empowered to make the best decisions for your family.
            Call us 24/7 — we&rsquo;re here to answer all of your questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/40">
            Confidential · Available 24/7 · All 50 States
          </p>
        </div>
      </section>

    </div>
  );
}
