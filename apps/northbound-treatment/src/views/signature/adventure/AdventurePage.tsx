import Image from "next/image";
import { heroBottomPad, heroCinematicSection, heroTopPad } from "@/lib/heroSpacing";
import Link from "next/link";
import {
  SIGNATURE_PAGE_IMAGES,
} from "@/views/home/assets";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const IMAGES = {
  hero: SIGNATURE_PAGE_IMAGES.adventureHero,
  canyon: SIGNATURE_PAGE_IMAGES.adventureCanyon,
  garden: SIGNATURE_PAGE_IMAGES.adventureGarden,
  art: SIGNATURE_PAGE_IMAGES.adventureArt,
};

/* ─── Types ────────────────────────────────────────────────────────────── */
type Experience = {
  title: string;
  focus: string;
  description: string;
  image: string | null;
  imageAlt?: string;
  tag: string;
  tagIcon: string;
  accent?: string;
  dark?: boolean;
};

/* ─── Experience data ──────────────────────────────────────────────────── */
const EXPERIENCES: Experience[] = [
  {
    title: "OC Modern Art Museum",
    focus: "Creativity & Expression",
    description:
      "Engage with contemporary art to explore authenticity, self-expression, and the creative voice that addiction often silences.",
    image: IMAGES.art,
    imageAlt: "Commons area at The Grove with GROVE marquee sign",
    tag: "Art & Identity",
    tagIcon: "ri-palette-line",
    dark: false,
  },
  {
    title: "Peters Canyon",
    focus: "Mindfulness & Presence",
    description:
      "Navigate intrusive thoughts amidst the open trails of Peters Canyon — learning to anchor in the present moment.",
    image: IMAGES.canyon,
    imageAlt: "Outdoor reflection space at The Grove at dusk",
    tag: "Nature & Grounding",
    tagIcon: "ri-leaf-line",
    dark: false,
  },
  {
    title: "Earl Burns Miller Japanese Garden",
    focus: "Tranquility & Meditation",
    description:
      "Embrace meditation techniques in the serene, intentional beauty of a Japanese garden — quieting the mind and building emotional resilience.",
    image: IMAGES.garden,
    imageAlt: "Clients in guided outdoor meditation on the lawn at The Grove",
    tag: "Stillness & Breath",
    tagIcon: "ri-mental-health-line",
    dark: false,
  },
  {
    title: "Fullerton Arboretum",
    focus: "Reflection & Legacy",
    description:
      "Amidst nature's steady rhythms, ponder the life you want to build — your aspirations, your legacy, and your power to choose differently.",
    image: null,
    tag: "Purpose & Meaning",
    tagIcon: "ri-seedling-line",
    accent: "terracotta",
    dark: true,
  },
  {
    title: "Irvine Farm + Food Lab",
    focus: "Community & Interdependence",
    description:
      "Reconnect with the strength that emerges through cooperation — harvesting more than food, harvesting trust.",
    image: null,
    tag: "Connection & Trust",
    tagIcon: "ri-group-line",
    accent: "navy",
    dark: true,
  },
  {
    title: "Orange County Zoo",
    focus: "Empathy & Connection",
    description:
      "Reflect on the reciprocal nature of compassion — how empathy for living creatures deepens empathy for yourself and others in recovery.",
    image: null,
    tag: "Empathy & Growth",
    tagIcon: "ri-heart-line",
    accent: "agave",
    dark: true,
  },
  {
    title: "Crystal Cove & Bolsa Chica",
    focus: "Conservation & Mindfulness",
    description:
      "Stand at the ocean's edge and understand preservation — of ecosystems, of communities, and of the self.",
    image: null,
    tag: "Ocean & Renewal",
    tagIcon: "ri-water-flash-line",
    accent: "navy",
    dark: true,
  },
];

const EVIDENCE = [
  {
    icon: "ri-brain-line",
    title: "Cognitive Behavioral Principles",
    body: "Each outdoor challenge creates a real-time opportunity to identify and reframe negative thought patterns — skills that transfer directly to recovery.",
  },
  {
    icon: "ri-focus-3-line",
    title: "Mindfulness & Present-Moment Awareness",
    body: "Nature demands presence. Through structured reflection during each activity, clients build the mindfulness muscle central to sustained sobriety.",
  },
  {
    icon: "ri-group-line",
    title: "Experiential Learning",
    body: "Insight gained through doing is deeper and more durable than insight gained through talking. Adventure creates lived experience — not just understanding.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Nervous System Regulation",
    body: "Exposure to natural environments measurably reduces cortisol levels, supporting emotional regulation and reducing the physiological pull of cravings.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Resilience Building",
    body: "Completing a physical or creative challenge in a safe environment builds authentic self-efficacy — the belief that you can face difficulty and succeed.",
  },
  {
    icon: "ri-compass-3-line",
    title: "Identity Reformation",
    body: "Adventure therapy disrupts the 'addict identity' by placing clients in new contexts where new behaviors and a new self-concept can emerge.",
  },
];

const RELATED = [
  { name: "Wolf-Assisted Therapy", href: "/wolf-assisted-therapy/", tag: "Signature Service", icon: "ri-leaf-line" },
  { name: "Dual-Diagnosis Treatment", href: "/treatment/dual-diagnosis/", tag: "Specialty Program", icon: "ri-brain-line" },
  { name: "Family Therapy Services", href: "/programs/family-therapy/", tag: "Signature Service", icon: "ri-family-line" },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function AdventurePage() {
  return (
    <>
      {/* ══ 1. CINEMATIC HERO ══════════════════════════════════════════════ */}
      <section className={heroCinematicSection}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="Outdoor meditation circle with Adirondack seating at The Grove during adventure therapy"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Strong base overlay + directional gradient for text legibility */}
          <div className="absolute inset-0 bg-navy/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/80" />
        </div>

        {/* Eyebrow — top left */}
        <div className={`relative z-10 ${heroTopPad}`}>
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              <AutoLinkedText>{"Signature Services — Northbound Treatment"}</AutoLinkedText>
            </p>
          </div>
        </div>

        {/* Main content — bottom-anchored */}
        <div className={`relative z-10 flex flex-1 flex-col justify-end ${heroBottomPad}`}>
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              {/* Thin horizontal rule above title — editorial detail */}
              <div className="mb-8 h-px w-16 bg-terracotta" />

              <h1 className="font-heading text-6xl font-bold leading-none text-white md:text-7xl lg:text-8xl">
                Adventure<br />
                <span className="italic text-terracotta-light">Therapy</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                <AutoLinkedText>{"Recovery doesn't only happen inside four walls. Our Adventure Therapy Program takes\n                healing into the world — building resilience, self-discovery, and purpose through the\n                transformative power of nature and experience."}</AutoLinkedText>
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/admissions/"
                  className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-terracotta-light"
                >
                  Begin Your Journey
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  <i className="ri-phone-line" />
                  (866) 311-0003
                </Link>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-8 bg-white/30" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. PULL QUOTE ═════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-36">
        <div className="mx-auto w-full max-w-5xl px-6 text-center lg:px-10">
          <div className="mx-auto mb-6 h-px w-12 bg-terracotta" />
          <blockquote className="font-heading text-3xl font-bold leading-snug text-navy md:text-4xl lg:text-5xl">
            &ldquo;Adventure is not an escape from life.
            <br />
            <span className="italic text-terracotta">It&apos;s how you return to it.</span>&rdquo;
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-espresso/70">
            <AutoLinkedText>{"At Northbound, our Adventure Therapy Program is not recreation — it is precision-designed\n            experiential treatment. Each outing is mapped to specific therapeutic goals: resilience,\n            mindfulness, identity, community, and purpose. What feels like adventure is, in fact,\n            profound clinical work."}</AutoLinkedText>
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-terracotta" />
        </div>
      </section>

      {/* ══ 3. WHAT IS ADVENTURE THERAPY ═════════════════════════════════ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={IMAGES.canyon}
                  alt="Outdoor reflection space at The Grove — shaded lawn with group seating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating caption card */}
              <div className="absolute -bottom-6 -right-4 bg-navy px-6 py-5 shadow-xl lg:-right-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                  Evidence-Based
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-white">
                  Rooted in Science,<br />Felt in Nature
                </p>
              </div>
              {/* Decorative corner rule */}
              <div className="absolute -left-4 -top-4 h-20 w-20 border-l-2 border-t-2 border-terracotta/40" />
            </div>

            {/* Text side */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                The Approach
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
                Where Therapy
                <br />
                <span className="italic text-terracotta">Meets the World</span>
              </h2>
              <p className="mt-6 leading-relaxed text-espresso/80">
                <AutoLinkedText>{"Traditional therapy builds insight within the safety of a clinical setting. Adventure\n                Therapy takes that insight and tests it — in trails, galleries, gardens, and farms —\n                where the unpredictability of real life creates real healing."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-espresso/80">
                <AutoLinkedText>{"Each outing integrates cognitive-behavioral principles, mindfulness techniques, and\n                structured group reflection. The outdoors is not the backdrop. It is the treatment\n                modality — proven to reduce cortisol, build self-efficacy, and accelerate the\n                identity reformation that recovery demands."}</AutoLinkedText>
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Complements individual and group therapy sessions",
                  "Evidence-based CBT & mindfulness integration",
                  "Structured therapeutic debrief after each experience",
                  "Builds community and interdependence within the peer group",
                  "Develops resilience through guided real-world challenges",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta text-white">
                      <i className="ri-check-line text-xs" />
                    </span>
                    <span className="text-sm leading-relaxed text-espresso/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. THE EXPERIENCES — MAGAZINE GRID ═══════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              Seven Destinations
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
              The <span className="italic text-terracotta">Experiences</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-espresso/70">
              <AutoLinkedText>{"Every location is chosen for its unique therapeutic value. Each adventure is purposeful —\n              designed to surface specific insights, build targeted skills, and deepen recovery."}</AutoLinkedText>
            </p>
          </div>

          {/* Row 1: Two large feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERIENCES.slice(0, 2).map((exp) => (
              <ExperienceCard key={exp.title} exp={exp} tall />
            ))}
          </div>

          {/* Row 2: One wide + two small */}
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ExperienceCard exp={EXPERIENCES[2]} tall={false} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
              {EXPERIENCES.slice(3, 5).map((exp) => (
                <ExperienceCard key={exp.title} exp={exp} tall={false} />
              ))}
            </div>
          </div>

          {/* Row 3: Two remaining */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EXPERIENCES.slice(5).map((exp) => (
              <ExperienceCard key={exp.title} exp={exp} tall={false} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. THE SCIENCE — NAVY DARK SECTION ═══════════════════════════ */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              <AutoLinkedText>{"Evidence-Based Methodology"}</AutoLinkedText>
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
              Why It <span className="italic text-terracotta-light">Works</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
              <AutoLinkedText>{"Adventure Therapy is grounded in decades of clinical research showing that\n              experiential learning accelerates lasting behavioral change."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EVIDENCE.map((item) => (
              <div key={item.title} className="border border-white/10 p-8">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-terracotta/20">
                  <i className={`${item.icon} text-lg text-terracotta`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>

          {/* Outcome stat strip */}
          <div className="mt-16 border-t border-white/10 pt-16">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {[
                { value: "38+", label: "Years pioneering holistic care" },
                { value: ">97%", label: "Abstinence rate in 2015 outcomes study" },
                { value: "2:1", label: "Staff-to-client ratio during every outing" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-5xl font-bold text-terracotta"><AutoLinkedText>{stat.value}</AutoLinkedText></p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedText>{stat.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. GALLERY STRIP ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedText>{"A Program Unlike Any Other"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-navy md:text-5xl">
                Healing <span className="italic text-terracotta">Beyond</span>
                <br />
                the Therapy Room
              </h2>
              <p className="mt-6 leading-relaxed text-espresso/80">
                <AutoLinkedText>{"At Northbound, the path to recovery doesn't begin and end in a clinical office.\n                Our Adventure Therapy Program extends treatment into the living world — where\n                insights become experiences and experiences become transformation."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-espresso/80">
                <AutoLinkedText>{"Led by experienced therapists at every outing, each adventure is paired with\n                structured pre-activity intention-setting and post-activity group processing.\n                What happens outdoors is brought back indoors — woven into your individual\n                treatment plan with intention and clinical rigor."}</AutoLinkedText>
              </p>
              <div className="mt-8 border-l-2 border-terracotta pl-5">
                <p className="font-heading text-lg font-bold italic text-navy">
                  <AutoLinkedText>{"\"Step into the expansive and healing embrace of the great outdoors. Discover\n                  the restorative power of adventure — and the boundless potential within you.\""}</AutoLinkedText>
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50">
                  <AutoLinkedText>{"— Northbound Treatment Services"}</AutoLinkedText>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/admissions/"
                  className="inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-light"
                >
                  Start the Admissions Process
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  href="/locations/"
                  className="inline-flex items-center gap-2 border border-terracotta/30 px-7 py-3.5 text-sm font-semibold text-terracotta transition hover:border-terracotta hover:bg-terracotta/5"
                >
                  <i className="ri-image-2-line" />
                  View Gallery
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={IMAGES.garden}
                  alt="Clients in guided outdoor meditation on the lawn at The Grove"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b-2 border-l-2 border-terracotta/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. RELATED SIGNATURE SERVICES ════════════════════════════════ */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              Continue Exploring
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold text-navy md:text-4xl">
              Other <span className="italic text-terracotta">Signature Services</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group block border border-sand-dark bg-white p-8 transition hover:border-terracotta/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-terracotta/10 transition group-hover:bg-terracotta/20">
                  <i className={`${svc.icon} text-lg text-terracotta`} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/40"><AutoLinkedText>{svc.tag}</AutoLinkedText></p>
                <h3 className="font-heading mt-2 text-lg font-bold text-navy">{svc.name}</h3>
                <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-terracotta">
                  Learn more <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. CTA BANNER ════════════════════════════════════════════════ */}
      <CtaBanner
        headline="Ready to Step Outside and Heal?"
        body="Northbound's admissions team is available 24/7 to answer your questions and verify your insurance — at no cost to you."
        primaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
        secondaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
      />
    </>
  );
}

/* ─── Experience Card sub-component ───────────────────────────────────── */
function ExperienceCard({ exp, tall }: { exp: Experience; tall: boolean }) {
  const height = tall ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3]";

  if (exp.image) {
    /* Image card */
    return (
      <div className={`group relative overflow-hidden bg-navy-light ${height}`}>
        <Image
          src={exp.image}
          alt={exp.imageAlt ?? exp.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
          <div className="mb-2 inline-flex items-center gap-1.5 self-start bg-terracotta/90 px-3 py-1">
            <i className={`${exp.tagIcon} text-xs text-white`} />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {exp.tag}
            </span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white lg:text-2xl">{exp.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-terracotta-light"><AutoLinkedText>{exp.focus}</AutoLinkedText></p>
          <p className="mt-2 text-sm leading-relaxed text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><AutoLinkedText>{exp.description}</AutoLinkedText></p>
        </div>
      </div>
    );
  }

  /* Solid-color card */
  const bgMap: Record<string, string> = {
    terracotta: "bg-terracotta",
    navy: "bg-navy",
    agave: "bg-agave",
  };
  const bg = bgMap[exp.accent ?? "navy"] ?? "bg-navy";

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden ${height} ${bg} p-6 lg:p-8`}>
      {/* Decorative large icon watermark */}
      <i
        className={`${exp.tagIcon} pointer-events-none absolute -right-4 -top-4 text-9xl text-white/5`}
      />
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 bg-white/15 px-3 py-1">
          <i className={`${exp.tagIcon} text-xs text-white`} />
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
            {exp.tag}
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-heading text-xl font-bold text-white lg:text-2xl">{exp.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/60"><AutoLinkedText>{exp.focus}</AutoLinkedText></p>
        <p className="mt-3 text-sm leading-relaxed text-white/75"><AutoLinkedText>{exp.description}</AutoLinkedText></p>
      </div>
    </div>
  );
}
