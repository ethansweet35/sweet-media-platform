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

/* ─── Section width / padding shared across every section ─────────────────── */
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
    desc: "Our intervention team has helped over 1,000 people struggling with alcohol and their families take the next step in the recovery process.",
  },
  {
    icon: "ri-capsule-line",
    label: "Drug Addiction",
    path: "/drug-abuse-interventions",
    desc: "Drug dependence can create a cycle of enabling and codependency. Learn how an intervention specialist would respond to drug abuse and help break the cycle.",
  },
  {
    icon: "ri-mental-health-line",
    label: "Mental Health",
    path: "/mental-health-interventions",
    desc: "We help loved ones struggling with mental health issues such as depression, anxiety, and PTSD, guiding them toward treatment that fits their unique needs.",
  },
  {
    icon: "ri-brain-line",
    label: "Dual Diagnosis",
    path: "/dual-diagnosis-interventions",
    desc: "Our interventionists specialize in co-occurring mental health and substance use disorders, helping loved ones find integrated treatment.",
  },
  {
    icon: "ri-alarm-warning-line",
    label: "Crisis Interventions",
    path: "/crisis-interventions",
    desc: "When immediate action is needed, our crisis intervention team provides urgent support, guiding individuals to access the help they need right away.",
  },
  {
    icon: "ri-user-heart-line",
    label: "Teen Interventions",
    path: "/interventions-for-teens",
    desc: "Navigating addiction or mental health struggles with a teenager requires a sensitive approach. Our specialists work with families to gently guide teens toward help.",
  },
  {
    icon: "ri-briefcase-4-line",
    label: "Executive Interventions",
    path: "/interventions-for-executives",
    desc: "For professionals impacted by addiction or mental health challenges, our executive intervention offers discreet and effective support.",
  },
  {
    icon: "ri-group-line",
    label: "Family Interventions",
    path: "/family-interventions",
    desc: "Family dynamics are crucial in recovery. Family interventions empower members to create a supportive environment and encourage lasting change.",
  },
  {
    icon: "ri-award-line",
    label: "ARISE® Method",
    path: "/intervention-types/arise",
    desc: "The ARISE® approach prioritizes an invitational, non-confrontational process — involving the person of concern and their support network from the outset.",
  },
];

const testimonials = [
  {
    quote:
      "David Gates is an exceptional interventionist! He responded immediately to the crisis with our son, who was struggling with addiction. David spent hours on the phone with our family, providing guidance and working out a step-by-step plan. The plan worked beautifully.",
    author: "Verified Google Review",
  },
  {
    quote:
      "At Addiction Interventions, we approach each intervention with care, respect, and understanding. We focus on the entire family dynamic, helping each member understand their role and how to best support their loved one's journey to recovery.",
    author: "Family Client",
  },
  {
    quote:
      "I had no idea where to turn. Within 24 hours of calling, we had a plan and a certified interventionist ready to help. Professional, compassionate, and completely confidential from start to finish.",
    author: "Verified Review",
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
      <section className="relative flex min-h-screen items-center">
        <Image
          src={HERO_IMAGE}
          alt="A compassionate interventionist meeting with a family"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Brand sage overlay matching original color palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#507969]/90 via-[#507969]/70 to-[#507969]/30" />

        <div className={`relative z-10 ${CONTAINER} py-36`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-5 text-[#8FAC87]">
              Certified Intervention Specialists
            </p>
            <h1 className="font-heading mb-6 text-5xl font-semibold leading-[1.1] text-white md:text-6xl lg:text-7xl">
              Mental Health, Addiction, &amp; Family Interventions
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/85">
              You&rsquo;ve tried everything to help your loved one, and nothing has worked. At Addiction
              Interventions, we know it&rsquo;s devastating to wait for someone you love to hit bottom,
              and we&rsquo;re here to help you break the cycle.
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
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20"
              >
                Request a Consultation
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/50">
              Available 24 hours a day, 7 days a week — nationwide
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-12 border-b border-[#EFEFEF]">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-4xl font-semibold text-[#6F8E68] md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4B4B]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">How We Help</p>
            <h2 className="font-heading text-4xl font-semibold text-[#1A1A17] md:text-5xl">
              Interventions For Any Situation
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              No two situations are the same, which is why we offer customized interventions for any
              circumstance. Our trained specialists guide families through a structured process
              designed to break through denial, encourage acceptance, and open the door to treatment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.label}
                href={s.path}
                className="group flex flex-col gap-3 rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-6 transition hover:border-[#8FAC87]/50 hover:bg-[#F5F3E7] hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#6F8E68] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading text-xl font-semibold text-[#1A1A17]">
                  {s.label} Interventions
                </h3>
                <p className="text-sm leading-relaxed text-[#4B4B4B]">{s.desc}</p>
                <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#6F8E68]">
                  Learn more <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill"></i>
              Call Now | {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={`${CONTAINER} grid gap-16 lg:grid-cols-2 lg:items-center`}>
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={ABOUT_IMAGE}
              alt="Family having a supportive conversation about recovery"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Commitment</p>
            <h2 className="font-heading text-4xl font-semibold leading-tight text-[#1A1A17] md:text-5xl">
              Walking Beside You On This Healing Journey
            </h2>
            <p className="mt-6 leading-relaxed text-[#4B4B4B]">
              At the core of our mission is a deep commitment to helping individuals and families
              navigate the path to recovery. With every intervention, we provide the guidance,
              structure, and support needed to break through denial and take meaningful steps toward
              healing. Our approach is rooted in empathy, professionalism, and proven success —
              helping people not only access treatment but build the foundation for lasting recovery.
            </p>
            <p className="mt-4 leading-relaxed text-[#4B4B4B]">
              Accredited by The Joint Commission, we hold ourselves to the highest standards of
              quality and care.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:bg-[#6F8E68]"
              >
                Get Help Now
              </a>
              <Image
                src={JOINT_COMMISSION_LOGO}
                alt="Accredited by The Joint Commission"
                width={180}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Nationwide ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-12 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">We Come to You</p>
            <h2 className="font-heading mb-4 text-4xl font-semibold text-[#1A1A17] md:text-5xl">
              Our Intervention Services Are Offered Nationwide
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              At Addiction Interventions, we proudly provide professional intervention services in
              every corner of the United States. Whether your loved one is in a major city, a small
              town, or a rural community, our nationwide network of experienced interventionists is
              ready to help guide your family through the process of recovery — no matter where you
              are located.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#EFEFEF] shadow-sm">
            <Image
              src={MAP_IMAGE}
              alt="Addiction Interventions serves all 50 states nationwide"
              width={1200}
              height={675}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6F8E68] underline-offset-4 hover:underline"
            >
              View all service areas <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-24">
        <div className={CONTAINER}>
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Family Stories</p>
            <h2 className="font-heading text-4xl font-semibold text-[#1A1A17] md:text-5xl">
              Trusted by More Than 1,500 Families Nationwide
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-[#EFEFEF] bg-white p-8 shadow-sm"
              >
                <p className="font-heading text-xl italic leading-relaxed text-[#1A1A17]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#EFEFEF]">
                  <i className="ri-double-quotes-l text-2xl text-[#8FAC87]"></i>
                  <p className="text-sm font-semibold text-[#4B4B4B]">{t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-white py-24">
          <div className={CONTAINER}>
            <div className="mb-14 text-center">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Blog Posts</p>
              <h2 className="font-heading text-4xl font-semibold text-[#1A1A17] md:text-5xl">
                Mental Health &amp; Addiction Resources
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#EFEFEF] bg-white shadow-sm transition hover:shadow-lg"
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
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-xl font-semibold text-[#1A1A17] transition group-hover:text-[#6F8E68]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#4B4B4B]">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-4 text-sm font-semibold text-[#6F8E68] underline-offset-4 group-hover:underline">
                      Read More »
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[#8FAC87] px-7 py-3 text-sm font-semibold text-[#6F8E68] transition hover:bg-[#8FAC87] hover:text-white"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section
        className="relative py-28"
        style={{
          background: "linear-gradient(135deg, #5a7a5c 0%, #8FAC87 100%)",
        }}
      >
        <div className={`${CONTAINER} text-center`}>
          <h2 className="font-heading text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
            Speak to a Certified Interventionist
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Get help right now. Our goal is to ensure that you are fully informed and empowered to
            make the best decisions for your family. Call us 24/7 — we&rsquo;re here to answer all of
            your questions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-base font-semibold text-[#6F8E68] shadow-lg transition hover:bg-[#F5F3E7]"
            >
              <i className="ri-phone-fill"></i>
              Call Now | {PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-9 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Request a Consultation
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/50">
            Confidential · Available 24/7 · All 50 States
          </p>
        </div>
      </section>

    </div>
  );
}
