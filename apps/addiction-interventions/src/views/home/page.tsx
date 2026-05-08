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

const stats = [
  { value: "1,500+", label: "Families Helped" },
  { value: "24/7", label: "Always Available" },
  { value: "50", label: "States Served" },
  { value: "100%", label: "Confidential" },
];

const services = [
  { icon: "ri-heart-pulse-line", label: "Alcohol Abuse", path: "/alcohol-abuse-interventions" },
  { icon: "ri-capsule-line", label: "Drug Abuse", path: "/drug-abuse-interventions" },
  { icon: "ri-mental-health-line", label: "Mental Health", path: "/mental-health-interventions" },
  { icon: "ri-group-line", label: "Family", path: "/family-interventions" },
  { icon: "ri-user-heart-line", label: "Teens", path: "/interventions-for-teens" },
  { icon: "ri-briefcase-4-line", label: "Executives", path: "/interventions-for-executives" },
  { icon: "ri-alarm-warning-line", label: "Crisis", path: "/crisis-interventions" },
  { icon: "ri-brain-line", label: "Dual Diagnosis", path: "/dual-diagnosis-interventions" },
  { icon: "ri-award-line", label: "ARISE® Method", path: "/intervention-types/arise" },
];

const testimonials = [
  {
    quote:
      "David and his team walked our family through the most difficult moment of our lives with grace and expertise. Our son is now 18 months sober.",
    author: "Sarah M.",
    location: "California",
  },
  {
    quote:
      "I had no idea where to turn. Within 24 hours of calling, we had a plan and a certified interventionist at our door. I can't thank them enough.",
    author: "James T.",
    location: "Texas",
  },
  {
    quote:
      "Professional, compassionate, and effective. They respected our family's privacy throughout the entire process. Truly life-changing.",
    author: "Linda R.",
    location: "New York",
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
      <section className="relative min-h-[90vh] flex items-center">
        <Image
          src={HERO_IMAGE}
          alt="A compassionate interventionist meeting with a family"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Forest green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3520]/90 via-[#2C4A2E]/75 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-5 text-[#8FAC87]">Certified Intervention Specialists</p>
            <h1 className="mb-6 text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              Hope Begins With <br className="hidden sm:block" />
              One Conversation
            </h1>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/80">
              When addiction or mental health takes hold of someone you love, you don't have to face
              it alone. Our certified interventionists guide families through crisis with compassion,
              expertise, and proven results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#F5F0E4] px-8 py-4 text-sm font-semibold text-[#2C4A2E] shadow-lg transition hover:bg-white"
              >
                <i className="ri-phone-fill text-base"></i>
                Call {PHONE_DISPLAY}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10"
              >
                Request a Consultation
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/50">
              Available 24 hours a day, 7 days a week
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#2C4A2E] py-10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-4xl font-semibold text-[#F5F0E4]">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8FAC87]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">How We Help</p>
            <h2 className="font-heading text-4xl font-semibold text-[#2C4A2E] md:text-5xl">
              Intervention Services
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#5C5A52]">
              Every situation is different. We offer a full range of specialized interventions
              tailored to the specific needs of your family.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.label}
                href={s.path}
                className="group flex items-center gap-4 rounded-2xl border border-[#E8E3D8] bg-[#F5F0E4]/40 px-6 py-5 transition hover:border-[#2C4A2E]/30 hover:bg-[#F5F0E4] hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2C4A2E]/10 text-[#2C4A2E] transition group-hover:bg-[#2C4A2E] group-hover:text-white">
                  <i className={`${s.icon} text-xl`}></i>
                </span>
                <span className="font-semibold text-[#1A1A17]">{s.label} Interventions</span>
                <i className="ri-arrow-right-line ml-auto text-[#8FAC87] opacity-0 transition group-hover:opacity-100"></i>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/intervention-services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C4A2E] underline-offset-4 hover:underline"
            >
              View all intervention services <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Walking Beside You ───────────────────────────────────── */}
      <section className="bg-[#EDE8D8] py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={ABOUT_IMAGE}
              alt="A family having a sincere supportive conversation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Commitment</p>
            <h2 className="font-heading text-4xl font-semibold leading-tight text-[#2C4A2E] md:text-5xl">
              Walking Beside You On This Healing Journey
            </h2>
            <p className="mt-6 leading-relaxed text-[#5C5A52]">
              At the core of our mission is a deep commitment to helping individuals and families
              navigate the path to recovery. With every intervention, we provide the guidance,
              structure, and support needed to break through denial and take meaningful steps toward
              healing.
            </p>
            <p className="mt-4 leading-relaxed text-[#5C5A52]">
              Our approach is rooted in empathy, professionalism, and proven success — helping
              people not only access treatment but build the foundation for lasting recovery.
              Accredited by The Joint Commission, we hold ourselves to the highest standards of
              quality and care.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#2C4A2E] px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:bg-[#3D6640]"
              >
                Get Help Now
              </a>
              <Image
                src={JOINT_COMMISSION_LOGO}
                alt="Accredited by The Joint Commission"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Nationwide coverage ──────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="brand-eyebrow mb-3 text-[#8FAC87]">We Come to You</p>
          <h2 className="font-heading mb-4 text-4xl font-semibold text-[#2C4A2E] md:text-5xl">
            Serving All 50 States
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-[#5C5A52]">
            Whether your loved one is in a major city, a small town, or a rural community, our
            nationwide network of certified interventionists is ready to help — wherever you are.
          </p>
          <div className="overflow-hidden rounded-2xl border border-[#E8E3D8] shadow-sm">
            <Image
              src={MAP_IMAGE}
              alt="Addiction Interventions serves all 50 states nationwide"
              width={980}
              height={551}
              className="h-auto w-full"
            />
          </div>
          <Link
            href="/service-areas"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2C4A2E] underline-offset-4 hover:underline"
          >
            View all service areas <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-[#2C4A2E] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Family Stories</p>
            <h2 className="font-heading text-4xl font-semibold text-[#F5F0E4] md:text-5xl">
              1,500+ Families Helped
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="flex flex-col justify-between rounded-2xl bg-white/8 px-8 py-8 backdrop-blur-sm border border-white/10"
              >
                <p className="font-heading text-xl leading-relaxed text-white/90 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/15" />
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#F5F0E4]">{t.author}</p>
                    <p className="text-xs text-[#8FAC87]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="bg-[#F5F0E4] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 text-center">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Blog Posts</p>
              <h2 className="font-heading text-4xl font-semibold text-[#2C4A2E] md:text-5xl">
                Mental Health &amp; Addiction Resources
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E3D8] bg-white shadow-sm transition hover:shadow-lg"
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
                    <h3 className="font-heading text-xl font-semibold text-[#1A1A17] group-hover:text-[#2C4A2E]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5C5A52]">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="mt-auto pt-4 text-sm font-semibold text-[#2C4A2E] group-hover:underline underline-offset-4">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[#2C4A2E] px-7 py-3 text-sm font-semibold text-[#2C4A2E] transition hover:bg-[#2C4A2E] hover:text-white"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#1e3520] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-4xl font-semibold text-[#F5F0E4] md:text-5xl lg:text-6xl">
            Ready to Take the First Step?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            A certified interventionist is standing by, ready to help your family find a path
            forward. The call is free and completely confidential.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#F5F0E4] px-9 py-4 text-base font-semibold text-[#2C4A2E] shadow-lg transition hover:bg-white"
            >
              <i className="ri-phone-fill"></i>
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Send a Message
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/40">
            Available 24 hours a day — nationwide
          </p>
        </div>
      </section>

    </div>
  );
}
