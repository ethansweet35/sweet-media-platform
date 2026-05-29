import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyPageLayout from "@/components/therapy/TherapyPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const fallback: Metadata = {
  title: "Group Therapy for Addiction in Springfield, MO | Missouri Behavioral Health",
  description:
    "Group therapy at Missouri Behavioral Health — structured peer groups that build accountability, reduce isolation, and create the lived experience of being understood. Springfield, MO.",
  alternates: { canonical: "/group-therapy-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/group-therapy-springfield-mo", fallback);
}

const GROUP_TYPES = [
  {
    icon: "ri-discuss-line",
    label: "Process Groups",
    desc: "Facilitated peer-led sessions where members share personal experiences, receive feedback, and explore interpersonal patterns in a structured, safe environment. Process groups are the emotional core of addiction treatment — where clients experience genuine human connection with others who truly understand.",
  },
  {
    icon: "ri-book-open-line",
    label: "Psychoeducation Groups",
    desc: "Structured, curriculum-based sessions covering the neuroscience of addiction, relapse triggers, emotional regulation, sleep, communication, and other recovery-relevant topics. These groups provide the cognitive foundation that makes other clinical work more effective.",
  },
  {
    icon: "ri-heart-pulse-line",
    label: "DBT Skills Groups",
    desc: "Classroom-style groups where DBT's four skill modules are taught systematically — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness. Skills are practiced in-group and reinforced through between-session homework assignments.",
  },
  {
    icon: "ri-shield-check-line",
    label: "Relapse Prevention Groups",
    desc: "Focused sessions dedicated to mapping personal relapse triggers, developing individualized coping strategies, building emergency action plans, and practicing the real-world application of sobriety maintenance skills.",
  },
];

const MECHANISMS = [
  {
    icon: "ri-earth-line",
    label: "Universality",
    desc: "The relief of discovering that others share your struggles, shame, and fears — reducing isolation and the distorted belief that your situation is uniquely hopeless.",
  },
  {
    icon: "ri-hand-heart-line",
    label: "Altruism",
    desc: "The therapeutic benefit of being helpful to others — which restores a sense of worth and purpose that addiction systematically destroys.",
  },
  {
    icon: "ri-team-line",
    label: "Group cohesion",
    desc: "The experience of belonging to a group that accepts you fully — which provides the sense of connection that is fundamentally incompatible with active addiction.",
  },
  {
    icon: "ri-user-star-line",
    label: "Interpersonal learning",
    desc: "Receiving honest feedback from peers — in a safe, facilitated environment — in ways that reveal blind spots and relational patterns that individual therapy alone cannot surface.",
  },
];

const FIRST_SESSION = [
  {
    icon: "ri-user-smile-line",
    label: "Introduction protocol",
    desc: "New members are introduced to the group by the facilitator before the session begins. You share only what you're comfortable sharing — there is no pressure to disclose anything in your first session.",
  },
  {
    icon: "ri-lock-2-line",
    label: "Confidentiality rules",
    desc: "All group members agree to strict confidentiality at the start of each session. What is shared in group stays in group — this is the foundation that makes honest sharing possible.",
  },
  {
    icon: "ri-user-settings-line",
    label: "Facilitator role",
    desc: "A licensed MBH clinician facilitates every group — directing the process, ensuring safety, managing conflict, and keeping the group therapeutically productive rather than just socially supportive.",
  },
  {
    icon: "ri-walk-line",
    label: "Participate at your own pace",
    desc: "There is no requirement to share in your first (or any) session. Many clients find that listening to others is therapeutic in itself during early group participation — you engage at the level you're ready for.",
  },
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
    q: "Is group therapy as effective as individual therapy?",
    a: "For addiction treatment specifically, group therapy is not a lesser alternative to individual therapy — it is a clinically distinct modality with unique therapeutic factors that individual therapy cannot replicate. Research shows that group therapy produces comparable or superior outcomes to individual therapy for substance use disorders, with the peer accountability, universality, and social learning factors driving outcomes that individual work simply cannot create. At MBH, group and individual therapy work together as a unified clinical system.",
  },
  {
    q: "What if I'm not comfortable sharing in a group?",
    a: "This is one of the most common concerns people have before starting group therapy — and one of the most common things that changes after a few sessions. You are never required to share anything in group. Many clients begin by listening, and find that the experience of being in the room with others who understand addiction is therapeutic long before they feel ready to speak. The facilitator creates safety and never pressures anyone to disclose before they're ready.",
  },
  {
    q: "Who leads group therapy sessions?",
    a: "Every group therapy session at Missouri Behavioral Health is led by a licensed clinical professional — not a peer recovery coach or paraprofessional, though we value those roles elsewhere in our programming. Group facilitators are specifically trained in group therapy dynamics, conflict management, trauma-informed facilitation, and evidence-based group modalities. The quality of facilitation is a significant factor in group therapy outcomes.",
  },
  {
    q: "Is what I share in group therapy confidential?",
    a: "All group members agree to confidentiality at the start of every session — what is shared in the group stays within the group. The facilitator reinforces this norm throughout. No information shared in group is documented in individual clinical records without your knowledge. As with all clinical care, there are standard legal exceptions to confidentiality (imminent harm to self or others, abuse of a minor, etc.), which all group members are informed of at the beginning of treatment.",
  },
  {
    q: "How is group therapy different in PHP vs IOP?",
    a: "In PHP, group therapy runs daily (or near-daily) and forms the backbone of the treatment day — clients may attend 2–3 different group types per day, including process groups, psychoeducation groups, and skills groups. In IOP, group meets 3x per week with each session typically including 1–2 group formats. The clinical content is similar, but the intensity and frequency reflect the different levels of care. Some clients find that the daily group structure of PHP is transformative in ways they couldn't have anticipated — the depth of connection that develops over repeated daily contact is qualitatively different from what weekly group can produce.",
  },
];

export default function GroupTherapyPage() {
  return (
    <TherapyPageLayout
      therapyName="Group Therapy"
      abbr="Group"
      currentPath="/group-therapy-springfield-mo"
      tagline="Heal in community — the most powerful element of structured treatment."
      heroBody="Group therapy is not a lesser version of individual therapy — it is a distinct and essential clinical modality. At Missouri Behavioral Health, structured group sessions build peer accountability, reduce isolation, and create the lived experience of being understood by people who share your struggle."
      heroImage={`${SUPABASE}/mbh_therapy_group_hero01.jpg`}
      heroImageAlt="Group therapy session at Missouri Behavioral Health in Springfield, MO"
      facts={[
        { icon: "ri-group-line", label: "Format", value: "Structured peer groups" },
        { icon: "ri-user-line", label: "Group size", value: "6–10 clients per group" },
        { icon: "ri-calendar-line", label: "Frequency", value: "Daily in PHP, 3x/week in IOP" },
        { icon: "ri-git-branch-line", label: "Types", value: "Process, psychoeducation, skills-based" },
      ]}
    >
      {/* ── Types of group therapy ─────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Group Formats
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Types of group therapy at MBH.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Group therapy is not a single modality — it is a family of evidence-based formats,
              each targeting a different dimension of addiction and recovery.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {GROUP_TYPES.map((gt) => (
              <div
                key={gt.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${gt.icon} text-2xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-mbh-forest">{gt.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{gt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why group therapy works ────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  The Science
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                What makes group therapy effective.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Yalom's foundational research identified the specific therapeutic mechanisms that
                make group therapy work — factors that are unique to the group context and cannot be
                replicated in individual therapy, no matter how skilled the therapist.
              </p>

              <blockquote className="mt-8 border-l-4 border-mbh-green bg-mbh-green/5 rounded-r-2xl px-6 py-5">
                <p className="font-display text-base font-medium italic text-mbh-forest">
                  &ldquo;The most potent force for change in group therapy is not the technique — it
                  is the experience of genuine connection with others who truly understand.&rdquo;
                </p>
                <cite className="mt-3 block font-body text-xs text-mbh-body/55 not-italic">
                  — Adapted from Irvin D. Yalom, The Theory and Practice of Group Psychotherapy
                </cite>
              </blockquote>
            </div>

            <div className="grid gap-4">
              {MECHANISMS.map((m) => (
                <div
                  key={m.label}
                  className="flex gap-4 rounded-2xl border border-mbh-forest/8 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                    <i className={`${m.icon} text-lg text-mbh-green`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">
                      {m.label}
                    </p>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── First group session ────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What to Expect
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What to expect in your first group session.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Starting group therapy can feel intimidating. Here is exactly what you can expect from
              your first session at Missouri Behavioral Health.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FIRST_SESSION.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7 shadow-sm"
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
                Insurance typically covers group therapy.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Group therapy is covered by most major insurance plans as part of substance use
                disorder and mental health treatment. As part of PHP or IOP at MBH, group sessions
                are included in your overall level-of-care coverage. We verify your benefits before
                treatment begins.
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
