import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_BASE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const ABOUT_BG = `${SUPABASE_BASE}/ai_home_about01.jpg`;
const DAVID_YOUTUBE_ID = "11LeXgEP-II";

const JOINT_COMMISSION_LOGO =
  "https://addictioninterventions.com/wp-content/uploads/2025/06/Untitled-design-2025-06-19T224652.113.png";

const PILLARS = [
  {
    icon: "ri-heart-line",
    title: "Compassion First",
    body: "Every intervention starts with empathy — for the person struggling and for the family that has carried the weight for too long. Shame and confrontation rarely work; understanding and structure do.",
  },
  {
    icon: "ri-group-line",
    title: "The Whole Family",
    body: "Addiction is a family disease. Our process resets the entire family system, not just the person who is using. Real recovery happens when everyone heals together.",
  },
  {
    icon: "ri-route-line",
    title: "Beyond Day One",
    body: "Most intervention services end the moment your loved one accepts treatment. We stay engaged through detox, residential, outpatient, and long after — because that's where lasting recovery is built.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Honest Recommendations",
    body: "We only place loved ones in treatment programs we'd send our own family to. We have no financial relationships that compromise our recommendations — period.",
  },
];

const TEAM = [
  {
    name: "David Allen Gates",
    photo: `${SUPABASE_BASE}/team_david-gates.png`,
    role: "Co-Founder · Lead Interventionist",
    credentials: "CIP · ICAADC",
    tags: ["Co-Founder"],
    youTubeId: DAVID_YOUTUBE_ID,
    bio: [
      "David has more than 20 years of experience managing and directing nationally recognized addiction treatment programs. He has trained intervention specialists, treatment center clinicians, and family coaches across the United States — and has personally led over 1,500 interventions for families in crisis.",
      "As someone in long-term recovery himself, David brings a perspective few interventionists can offer. He knows what it is to be on the other side of the conversation — and what it truly takes to choose recovery and rebuild a life worth living.",
      "His approach centers on the entire family system. He believes interventions fail not because the addicted person refuses help, but because the family hasn't done the parallel work needed to support real change.",
    ],
    credentials_list: [
      "Certified Intervention Professional (CIP)",
      "Internationally Certified Advanced Alcohol & Drug Counselor (ICAADC)",
      "Trained in ARISE®, Johnson Model & Systemic Family Intervention",
      "Person in long-term recovery — over two decades",
    ],
    link: { label: "Read David's full bio", href: "/david-gates" },
  },
  {
    name: "Jennifer Miela-McDaniel",
    photo: `${SUPABASE_BASE}/team_jennifer-mcdaniel.png`,
    role: "Co-Founder · Clinical Director · Lead Interventionist",
    credentials: "CADC II · BRI · CTP · CFMI · ICADC",
    tags: ["Co-Founder"],
    bio: [
      "Jennifer is a seasoned veteran of intervention with over 20 years of experience. Her career began in 1993 as a drug and alcohol counselor and has expanded considerably since then — today she tackles the toughest of interventions.",
      "Trained in five different models of intervention and a certified trauma specialist, Jennifer uses each intervention as an opportunity to interrupt destructive life patterns. Her goal is always to heal the family system and help the loved one accept treatment.",
      "Jennifer specializes in drug, alcohol, gambling, eating disorders, adolescent, geriatric, and generational wealth interventions. She is a Certified ARISE® Interventionist and works with each loved one's treatment team to ensure a continuity of care that extends well beyond the intervention itself.",
    ],
    credentials_list: [
      "Certified Alcohol & Drug Counselor II (CADC II)",
      "Board Registered Interventionist (BRI)",
      "Certified Trauma Professional (CTP) · CFMI · ICADC",
      "Certified ARISE® Interventionist",
      "Trained in 5 intervention models — trauma specialist",
    ],
    link: { label: "Contact Jennifer", href: "/contact" },
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero — background image left, YouTube video right */}
      <section className="relative overflow-hidden bg-[#F5F3E7]">
        {/* Background image fills the whole section, fades out on the right */}
        <Image
          src={ABOUT_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#1A1A17]/70" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
            {/* Left: headline + trust bullets */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"About Addiction Interventions"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Walking beside families through the{" "}
                <span className="italic text-[#8FAC87]">hardest moment</span>{" "}
                of their lives.
              </h1>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Built by people who have lived this. Trusted by more than 1,500 families nationwide."}</AutoLinkedText>
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill text-base"></i>
                  Call {PHONE_DISPLAY}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Request a Consultation
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { icon: "ri-shield-check-line", text: "100% Confidential" },
                  { icon: "ri-time-line", text: "Available 24 / 7" },
                  { icon: "ri-map-pin-2-line", text: "All 50 States" },
                  { icon: "ri-award-line", text: "Joint Commission Accredited" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/30 text-[#8FAC87]">
                      <i className={`${b.icon} text-xs`}></i>
                    </span>
                    <span className="text-sm font-medium text-white/80">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: YouTube embed */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8FAC87]">
                <i className="ri-play-circle-line mr-1.5 text-sm"></i>
                Hear From Our Founder
              </p>
              <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <div className="relative aspect-video w-full">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${DAVID_YOUTUBE_ID}?rel=0&modestbranding=1`}
                    title="David Gates — Intervention Expert"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/60">
                <AutoLinkedText>{"David shares his personal story of recovery and what drives his commitment to helping families in crisis."}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Mission */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            {/* Pull quote */}
            <div className="relative">
              <span className="font-heading pointer-events-none absolute -top-6 -left-4 select-none text-[9rem] leading-none text-[#8FAC87]/20">&ldquo;</span>
              <blockquote className="relative font-heading text-2xl font-medium italic leading-relaxed text-[#3E5B50] md:text-3xl">
                We exist for the families who have tried everything and are done waiting.
              </blockquote>
              <div className="mt-6 h-px w-12 bg-[#8FAC87]" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#8FAC87]">
                <AutoLinkedText>{"David & Jennifer Gates — Co-Founders"}</AutoLinkedText>
              </p>
            </div>
            {/* Text */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Our Mission</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Providing trusted intervention support for{" "}
                <span className="italic text-[#507969]">25+ years</span>
              </h2>
              <p className="mb-4 leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"You&rsquo;ve read the books. You&rsquo;ve tried tough love. You&rsquo;ve tried unconditional\n                support. You&rsquo;ve waited for rock bottom — and watched it move further out of reach.\n                We are here for the moment you decide you are done waiting."}</AutoLinkedText>
              </p>
              <p className="leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Our job is not to fix your loved one. Our job is to give your family a clear path\n                forward — and to walk it with you, every step of the way."}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team — David & Jennifer */}
      <section className="bg-[#F5F3E7] py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]"><AutoLinkedText>{"Intervention Leaders"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Meet the{" "}
              <span className="italic text-[#507969]">Co-Founders</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#4B4B4B]">
              <AutoLinkedText>{"When you call Addiction Interventions, you speak directly with David or Jennifer — never a call center or intake coordinator."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid gap-12">
            {TEAM.map((person) => (
              <div
                key={person.name}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#EFEFEF]"
              >
                <div className="grid lg:grid-cols-[280px_1fr]">
                  {/* Photo */}
                  <div className="relative min-h-[300px] lg:min-h-0">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 260px"
                    />
                    {/* Credential badge */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#3E5B50]/90 px-4 py-3 backdrop-blur-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#8FAC87]"><AutoLinkedText>{person.credentials}</AutoLinkedText></p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="p-8 lg:py-10 lg:px-10">
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <h3 className="font-heading text-3xl font-bold text-[#1A1A17]">
                        {person.name}
                      </h3>
                      {person.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#8FAC87]/20 px-3 py-0.5 text-xs font-semibold text-[#507969]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mb-6 text-sm font-semibold uppercase tracking-[0.12em] text-[#8FAC87]"><AutoLinkedText>{person.role}</AutoLinkedText></p>

                    <div className="mb-7 grid gap-3">
                      {person.bio.map((para, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{para}</AutoLinkedText></p>
                      ))}
                    </div>

                    {/* Credential checklist */}
                    <ul className="mb-8 grid gap-2">
                      {person.credentials_list.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                            <i className="ri-check-line text-[10px]"></i>
                          </span>
                          <span className="text-xs leading-relaxed text-[#4B4B4B]">{c}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={person.link.href}
                      className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                    >
                      {person.link.label} <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">How We Work</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              Four principles that shape{" "}
              <span className="italic text-[#507969]">every intervention</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex gap-6 rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`text-2xl ${p.icon}`}></i>
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#1A1A17]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{p.body}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="bg-[#3E5B50] py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Accredited & Trusted"}</AutoLinkedText></p>
              <h2 className="font-heading mb-5 text-3xl font-bold md:text-4xl">
                Held to the highest standards of{" "}
                <span className="italic text-[#8FAC87]">clinical care</span>
              </h2>
              <p className="max-w-2xl leading-relaxed text-white/75">
                <AutoLinkedText>{"Addiction Interventions is accredited by The Joint Commission — the nation&rsquo;s oldest and most\n                prestigious healthcare accreditor. The Joint Commission Gold Seal is awarded only to organizations\n                that meet rigorous standards of safety, quality, and continuous improvement."}</AutoLinkedText>
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8">
              <Image
                src={JOINT_COMMISSION_LOGO}
                alt="Accredited by The Joint Commission"
                width={180}
                height={46}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
                <AutoLinkedText>{"Joint Commission Accredited"}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomCta
        title="Ready to talk?"
        italicWord="talk?"
        body="Your first call is free, confidential, and judgment-free. Whether you call today or six months from now — we'll be here when you're ready."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}
