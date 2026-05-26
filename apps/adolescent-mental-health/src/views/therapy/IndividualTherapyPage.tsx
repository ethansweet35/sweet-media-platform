import { AutoLinkedText } from "@sweetmedia/blog-core";
import {
  ClinicalMethodsSection,
  GoodFitSection,
  IopModalityContextSection,
  MarketingPage,
  ProgramHeroSection,
  SessionStructureSection,
  TherapyFaqSection,
  TherapyFinalCtaSection,
  TherapyOverviewSection,
} from "@/components/marketing";
import { CONTAINER, INDIVIDUAL_THERAPY_IMGS, SITE } from "@/lib/site";

const IMGS = INDIVIDUAL_THERAPY_IMGS;

const sessionPhases = [
  {
    num: "01",
    icon: "ri-user-heart-line",
    title: "Building rapport",
    body: "First sessions focus on trust—history, communication style, and what your teen wants from therapy—without pressure to disclose everything at once.",
  },
  {
    num: "02",
    icon: "ri-focus-3-line",
    title: "Assessment & goal setting",
    body: "Clinicians run a structured assessment and collaborate with your teen on specific, measurable goals shared with the care team.",
  },
  {
    num: "03",
    icon: "ri-tools-line",
    title: "Skills & processing work",
    body: "The active phase: coping skills, thought challenging, and between-session practice using CBT and DBT techniques.",
  },
  {
    num: "04",
    icon: "ri-refresh-line",
    title: "Progress review & adjustment",
    body: "Regular check-ins keep the plan calibrated as symptoms shift or goals are met.",
  },
];

const fitCriteria = [
  { icon: "ri-emotion-sad-line", label: "Persistent anxiety or depression", sub: "Symptoms that haven't improved with lower levels of support" },
  { icon: "ri-chat-private-line", label: "Needs a private, one-on-one space", sub: "Topics too sensitive to address in a group setting first" },
  { icon: "ri-history-line", label: "Processing past trauma or difficult events", sub: "Experiences that require a trauma-informed relational approach" },
  { icon: "ri-links-line", label: "Part of a Virtual IOP treatment plan", sub: "Individual sessions are a core component of every IOP track" },
  { icon: "ri-seedling-line", label: "Building foundational coping skills", sub: "Learning techniques that transfer to school, home, and relationships" },
];

const approaches = [
  {
    icon: "ri-brain-line",
    tag: "Core modality",
    title: "Cognitive Behavioral Therapy (CBT)",
    body: "CBT helps teens recognize the link between thoughts, feelings, and behaviors. In individual sessions, clinicians use thought records, behavioral experiments, and structured practice to shift unhelpful patterns driving anxiety and depression.",
  },
  {
    icon: "ri-heart-pulse-line",
    tag: "Core modality",
    title: "Dialectical Behavior Therapy (DBT)",
    body: "DBT skills — emotion regulation, distress tolerance, interpersonal effectiveness, mindfulness — are introduced in individual sessions and reinforced in group. Particularly effective for self-harm, mood instability, and intense emotional reactivity.",
  },
  {
    icon: "ri-shield-check-line",
    tag: "Specialized track",
    title: "Trauma-informed care",
    body: "For teens processing trauma, PTSD, or adverse experiences, individual therapy provides the safety and relational consistency that trauma processing requires. Clinicians are trained in trauma-sensitive approaches and pace work carefully.",
  },
  {
    icon: "ri-compass-3-line",
    tag: "Supplemental",
    title: "Acceptance & Commitment Therapy (ACT)",
    body: "ACT helps teens clarify their values and commit to behaviors aligned with who they want to be — even in the presence of difficult thoughts or feelings. Especially useful for chronic anxiety, perfectionism, and avoidance.",
  },
];

const iopContext = [
  {
    icon: "ri-user-line",
    label: "Individual sessions",
    cadence: "2–3× per week",
    desc: "Private one-on-one work with your teen's primary clinician — the relational anchor of the program.",
    active: true,
  },
  {
    icon: "ri-group-line",
    label: "Group therapy",
    cadence: "3–4× per week",
    desc: "Small peer groups for skills practice, peer support, and real-world connection.",
    active: false,
    href: "/therapy/group-therapy-with-adolescents",
  },
  {
    icon: "ri-home-heart-line",
    label: "Family therapy",
    cadence: "1–2× per week",
    desc: "Caregiver coaching and structured family sessions to reinforce progress at home.",
    active: false,
    href: "/therapy/adolescent-family-therapy",
  },
];

const faqs = [
  { q: "How many individual therapy sessions does my teen get per week?", a: "In our Virtual IOP, teens typically receive 2–3 individual therapy sessions per week alongside 3–4 group sessions and 1–2 family sessions. Individual frequency may adjust based on clinical need and phase of treatment." },
  { q: "How do you match my teen with the right therapist?", a: "We match based on clinical presentation, therapy style, and your teen's specific needs — including identity, cultural background, and the nature of their primary concerns. We prioritize genuine therapeutic fit over schedule convenience." },
  { q: "Can my teen request a different therapist if it's not a good fit?", a: "Yes. Therapeutic fit matters, and we take it seriously. If your teen doesn't feel connected to their clinician after a few sessions, we facilitate a rematch within our team without disruption to the rest of their program." },
  { q: "Are individual sessions confidential?", a: "Yes, with standard limits. Content shared in individual sessions is protected by HIPAA and standard confidentiality rules — with exceptions for safety concerns (self-harm, harm to others, child abuse). We explain this clearly at intake." },
  { q: "What does a typical individual session look like?", a: "Sessions are 45–50 minutes via secure HIPAA-compliant video. Early sessions focus on rapport and assessment. Active treatment sessions involve skills practice, thought challenging, or processing difficult experiences, followed by a between-session assignment." },
  { q: "Do parents have access to what's discussed in individual sessions?", a: "Not by default — teen confidentiality is foundational to therapeutic trust. However, clinicians will share safety-relevant information and general progress with caregivers, and family sessions provide a space for caregiver involvement in a structured way." },
];

export default function IndividualTherapyPage() {
  return (
    <MarketingPage currentPath="/therapy/individual-therapy-for-teens">
      <ProgramHeroSection
        eyebrow={`Individual Therapy · Ages ${SITE.ages}`}
        headline={
          <>
            Individual therapy for teens, <span className="text-accent">matched to how your teen thinks</span>
          </>
        }
        body="One-on-one sessions with a licensed clinician who builds real rapport — the relational core of every Virtual IOP treatment plan."
        imageSrc={IMGS.hero}
        imageAlt="Teen in a virtual one-on-one therapy session at home"
        imageClassName="object-cover object-[center_40%]"
        stats={[
          { icon: "ri-calendar-check-line", label: "Frequency", value: "2–3×", unit: "/wk" },
          { icon: "ri-time-line", label: "Sessions", value: "45", unit: "minutes" },
          { icon: "ri-brain-line", label: "Modalities", value: "CBT", unit: "+ DBT" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-user-heart-line", label: "Matched by fit" },
        ]}
        secondaryCta={{ href: "/virtual-iop-for-teens", label: "About Virtual IOP" }}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {[
              { value: "2–3×", unit: "per week", label: "Individual sessions" },
              { value: "45 min", unit: "per session", label: "Session length" },
              { value: "CBT + DBT", unit: "evidence-based", label: "Primary modalities" },
              { value: "Insurance", unit: "most major plans", label: "Coverage accepted" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-6 py-8 lg:px-10">
                <p className="text-3xl font-bold text-ink lg:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent"><AutoLinkedText>{s.unit}</AutoLinkedText></p>
                <p className="mt-1 text-xs text-body"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TherapyOverviewSection
        eyebrow="One-on-one care"
        title="Real therapy—not just a weekly check-in"
        summary="Individual sessions are the relational core of our Virtual IOP: private, consistent, and structured around measurable goals."
        highlights={[
          {
            icon: "ri-user-heart-line",
            title: "One clinician, every time",
            body: "Your teen builds trust with a licensed therapist matched for clinical fit—not whoever has an open slot.",
          },
          {
            icon: "ri-focus-3-line",
            title: "Structured goals, every session",
            body: "Each session moves toward measurable targets—not open-ended check-ins that stall when symptoms spike.",
          },
          {
            icon: "ri-links-line",
            title: "Connected to the full program",
            body: "Individual work coordinates with group and family sessions so every modality reinforces the same goals.",
          },
        ]}
        pullQuote="When a teen trusts their clinician, they do the work—and teens who do the work get better."
        image={{
          src: IMGS.overview,
          alt: "Teen in a calm bedroom speaking openly during a one-on-one virtual therapy session",
        }}
      />

      <SessionStructureSection phases={sessionPhases} />

      <GoodFitSection
        title="Who benefits from individual therapy?"
        description="Individual sessions are well-suited to teens who need a private, consistent therapeutic relationship as the foundation of their care."
        criteria={fitCriteria}
        bg="white"
      />

      <ClinicalMethodsSection
        title={
          <>
            Approaches we use
            <br className="hidden lg:block" /> in individual sessions
          </>
        }
        description="Clinicians draw from evidence-based modalities and adapt to your teen&apos;s specific presentation."
        items={approaches}
      />

      <IopModalityContextSection
        title="Individual therapy within Virtual IOP"
        description="Individual sessions don't exist in isolation. All three modalities coordinate around the same clinical goals."
        items={iopContext}
      />

      <TherapyFaqSection title="Questions about individual therapy" items={faqs} />

      <TherapyFinalCtaSection
        title={
          <>
            Your teen deserves a clinician
            <br />
            <span className="text-accent">who really gets them.</span>
          </>
        }
        description="One-on-one therapy, matched by clinical fit, delivered virtually as part of a comprehensive IOP plan."
        trustItems={[
          { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
          { icon: "ri-time-line", label: "Same-Week Intake" },
          { icon: "ri-user-heart-line", label: "Matched by Fit" },
          { icon: "ri-bank-card-line", label: "Insurance Accepted" },
        ]}
      />
    </MarketingPage>
  );
}
