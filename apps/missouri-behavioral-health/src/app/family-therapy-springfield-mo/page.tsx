import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Family Therapy for Addiction | Missouri Behavioral Health — Springfield, MO",
  description:
    "Family therapy at Missouri Behavioral Health — rebuild communication, set healthy boundaries, and transform the family environment into one that actively supports recovery. Springfield, MO.",
  alternates: { canonical: "/family-therapy-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/family-therapy-springfield-mo", fallback);
}

const ADDRESSES = [
  {
    icon: "ri-chat-3-line",
    label: "Communication breakdown",
    desc: "Addiction damages the communication patterns within families — creating cycles of accusation, defensiveness, and withdrawal. Family therapy restores honest, productive dialogue.",
  },
  {
    icon: "ri-links-line",
    label: "Codependency patterns",
    desc: "Family members often develop their own dysfunctional coping patterns in response to a loved one's addiction — therapy identifies these patterns and builds healthier relational dynamics.",
  },
  {
    icon: "ri-hand-heart-line",
    label: "Enabling behaviors",
    desc: "Well-intentioned actions by family members can inadvertently protect an addicted person from the natural consequences of their use. Therapy helps families distinguish support from enabling.",
  },
  {
    icon: "ri-separator",
    label: "Boundary setting",
    desc: "Clear, consistent, and compassionate boundaries are essential for both the client's recovery and the family's wellbeing. Family therapy provides a structured space to establish and practice these.",
  },
  {
    icon: "ri-heart-3-line",
    label: "Processing family trauma",
    desc: "Addiction is often accompanied by family trauma — including abuse, neglect, or the secondary trauma family members experience from watching a loved one destroy their life. Therapy provides a safe container for this.",
  },
  {
    icon: "ri-home-heart-line",
    label: "Building a recovery-supportive home",
    desc: "The home environment has a profound impact on relapse risk. Family therapy works toward creating a home that actively supports sobriety — practically, emotionally, and structurally.",
  },
];

const STEPS = [
  {
    num: "01",
    label: "Initial family assessment",
    desc: "Your therapist meets with the client and available family members to understand the family system, identify the most pressing relational issues, and establish shared goals for family treatment.",
  },
  {
    num: "02",
    label: "Joint therapy sessions",
    desc: "Structured family sessions bring the client and designated family members together with a trained family therapist to work through communication patterns, old resentments, and new boundaries.",
  },
  {
    num: "03",
    label: "Family education workshop",
    desc: "MBH offers psychoeducation for family members on the neuroscience of addiction, enabling behaviors, healthy communication, and how to support recovery without sacrificing their own wellbeing.",
  },
  {
    num: "04",
    label: "Ongoing family support plan",
    desc: "By the end of the program, families leave with a concrete plan — agreed-upon boundaries, communication agreements, emergency protocols, and resources for continued family support.",
  },
];

const WHY_ITEMS = [
  "Family involvement consistently doubles long-term sobriety rates in research studies",
  "Clients with strong family support systems are significantly less likely to relapse in the first year",
  "Family therapy reduces the mental health burden on family members themselves",
  "Addressing enabling and codependency removes hidden barriers to sustained recovery",
];

const INSURERS = [
  "Aetna",
  "Anthem Blue Cross",
  "Blue Cross Blue Shield",
  "Cigna",
  "Beacon Health",
  "Carelon",
  "GEHA",
  "Cox Health",
];

const FAQS = [
  {
    q: "Does my family have to participate in treatment?",
    a: "Family participation is strongly encouraged but never mandatory. Research consistently shows that clients with involved family members achieve significantly better long-term recovery outcomes. However, we recognize that not every family system is ready or able to participate — and we work with each client based on their specific circumstances. For clients without family support, we emphasize peer community and alumni networks as alternative recovery support systems.",
  },
  {
    q: "What if a family member refuses to come to therapy?",
    a: "It happens frequently, and it doesn't mean family therapy can't help. We can work with the family members who are willing to participate, and the changes those individuals make in how they interact with the client can have a significant impact on the family system. For clients whose family members are resistant, we offer guidance on how to communicate the value of family therapy and what to expect — sometimes skeptical family members change their minds once they understand it's not about blame.",
  },
  {
    q: "What does a family therapy session look like?",
    a: "Family sessions at MBH are structured and facilitated by a licensed therapist trained in family systems approaches. Sessions typically include a check-in on the agreed-upon focus areas, structured communication exercises, work on specific relational issues the family has identified, and a plan for what to practice before the next session. Sessions are not about relitigating the past or assigning blame — they are forward-focused and skills-oriented.",
  },
  {
    q: "Does insurance cover family therapy?",
    a: "Yes — family therapy as part of addiction treatment is covered by most major insurance plans under substance use disorder and mental health benefits. Missouri Behavioral Health verifies your family's specific coverage before any sessions begin so there are no surprises. Coverage specifics vary by plan — our admissions team will walk you through exactly what is covered.",
  },
  {
    q: "How often do family therapy sessions occur?",
    a: "In PHP and IOP, family sessions typically occur weekly or bi-weekly, depending on the clinical plan and the availability of family members. Scheduling is flexible to accommodate work and travel — we also offer family sessions via telehealth, which makes participation significantly easier for family members who live outside of Springfield or cannot attend in person.",
  },
];

export default function FamilyTherapyPage() {
  return (
    <TherapyPageLayout
      therapyName="Family Therapy"
      abbr="Family"
      currentPath="/family-therapy-springfield-mo"
      tagline="Heal the relationships that addiction strains — and build ones that support recovery."
      heroBody="Addiction affects the entire family system. Family therapy at Missouri Behavioral Health brings loved ones into the treatment process — rebuilding communication, establishing healthy boundaries, and transforming the family environment from one that may inadvertently enable addiction into one that actively supports lasting recovery."
      heroImage={`${SUPABASE}/mbh_therapy_family_hero01.jpg`}
      heroImageAlt="Family therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-parent-line", label: "Format", value: "Joint + individual family sessions" },
        { icon: "ri-team-line", label: "Participants", value: "Client + designated family members" },
        { icon: "ri-hospital-line", label: "Used in", value: "PHP · IOP · Outpatient" },
        { icon: "ri-focus-2-line", label: "Focus", value: "Communication, boundaries, recovery support" },
      ]}
    >
      {/* ── Why family involvement matters ─────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Evidence
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Why family involvement matters.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The research on family involvement in addiction treatment is unambiguous: clients
                whose families actively participate in the treatment process have substantially better
                outcomes — higher completion rates, longer sobriety, and lower relapse risk in the
                critical first year after treatment.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                The reason is not simply that families provide practical support. It is that
                addiction is relational — it develops within relationships, it is maintained within
                relationships, and recovery is sustained or undermined within relationships. Family
                therapy addresses the relational context of addiction directly.
              </p>
              <ul className="mt-8 space-y-4">
                {WHY_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mbh-green/10">
                      <i className="ri-check-line text-xs text-mbh-green" aria-hidden />
                    </span>
                    <span className="font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/8 lg:sticky lg:top-28">
              <Image
                src={SITE_IMAGES.facilityInterior}
                alt="Family therapy room at Missouri Behavioral Health"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "center" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(18,46,24,0.4) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">2×</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">
                  Better sobriety outcomes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What family therapy addresses ──────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What We Address
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What family therapy addresses.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Addiction creates a predictable set of relational wounds — and family therapy works
              systematically through each of them.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADDRESSES.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-white p-7 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                    {item.label}
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to expect as a family member ──────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                The Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What to expect as a family member.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Family involvement at MBH follows a structured four-phase process designed to be
              accessible, non-blaming, and practically useful from the first session.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
              >
                <span className="font-display text-4xl font-bold text-mbh-green/20">
                  {step.num}
                </span>
                <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                  {step.label}
                </p>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Coverage
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Insurance typically covers family therapy.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Family therapy as part of addiction treatment is covered by most major insurance
                plans under substance use disorder and mental health benefits. We verify coverage
                before treatment begins — at no cost to you or your family.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white shadow-sm transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-shield-check-line" aria-hidden /> Verify my coverage
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-green/30 hover:bg-mbh-green/5"
                >
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INSURERS.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-2.5 rounded-xl border border-mbh-forest/10 bg-white px-4 py-3"
                >
                  <i className="ri-check-line text-mbh-green text-sm" aria-hidden />
                  <span className="font-body text-sm text-mbh-forest/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>
    </TherapyPageLayout>
  );
}
