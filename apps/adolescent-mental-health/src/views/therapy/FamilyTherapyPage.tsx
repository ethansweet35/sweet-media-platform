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
import { CONTAINER, SITE, THERAPY_IMGS } from "@/lib/site";

const IMGS = THERAPY_IMGS.family;

const sessionPhases = [
  {
    num: "01",
    icon: "ri-parent-line",
    title: "Caregiver orientation",
    body: "Parents and teens learn how family sessions work, confidentiality limits, and how goals connect to the IOP plan.",
  },
  {
    num: "02",
    icon: "ri-focus-3-line",
    title: "Assessment & family goals",
    body: "Clinicians map communication patterns and home routines, then define measurable family goals.",
  },
  {
    num: "03",
    icon: "ri-home-heart-line",
    title: "Skills & communication work",
    body: "Sessions focus on de-escalation, validation, boundaries, and reinforcing skills from individual and group work.",
  },
  {
    num: "04",
    icon: "ri-refresh-line",
    title: "Progress review & adjustment",
    body: "Family clinicians coordinate with your teen's therapist and adjust focus as home dynamics evolve.",
  },
];

const fitCriteria = [
  { icon: "ri-emotion-unhappy-line", label: "Conflict or tension at home", sub: "Frequent arguments, withdrawal, or walking on eggshells" },
  { icon: "ri-parent-line", label: "Caregivers unsure how to help", sub: "Parents want guidance on boundaries, validation, and support" },
  { icon: "ri-links-line", label: "Part of a Virtual IOP treatment plan", sub: "Family sessions reinforce individual and group progress" },
  { icon: "ri-school-line", label: "School or routine struggles", sub: "Family systems work around attendance, sleep, and structure" },
  { icon: "ri-heart-2-line", label: "Teen returning after crisis or hospitalization", sub: "Families rebuilding trust and communication after acute care" },
];

const approaches = [
  {
    icon: "ri-parent-line",
    tag: "Core modality",
    title: "Caregiver coaching",
    body: "Parent-only sessions teach validation, limit-setting, and crisis de-escalation — so home environments support rather than unintentionally undermine clinical progress.",
  },
  {
    icon: "ri-home-heart-line",
    tag: "Core modality",
    title: "Structured family therapy",
    body: "Full-family sessions address communication patterns, roles, and conflict cycles — with clear agendas and measurable goals tied to your teen's treatment plan.",
  },
  {
    icon: "ri-brain-line",
    tag: "Skills-based",
    title: "DBT-informed family work",
    body: "Families learn the same emotion-regulation and distress-tolerance language teens practice in group — creating shared vocabulary for hard moments at home.",
  },
  {
    icon: "ri-compass-3-line",
    tag: "Supplemental",
    title: "Systems & transition planning",
    body: "Clinicians help families plan for school re-entry, step-down from IOP, and long-term support — so gains made in treatment carry into daily life.",
  },
];

const iopContext = [
  {
    icon: "ri-user-line",
    label: "Individual sessions",
    cadence: "2–3× per week",
    desc: "Private one-on-one work with your teen's primary clinician — the relational anchor of the program.",
    active: false,
    href: "/therapy/individual-therapy-for-teens",
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
    active: true,
    href: "/therapy/adolescent-family-therapy",
  },
];

const faqs = [
  {
    q: "How many family therapy sessions are included per week?",
    a: "In Virtual IOP, families typically receive 1–2 family sessions or caregiver coaching sessions per week, alongside individual and group sessions for your teen. Frequency adjusts based on clinical need.",
  },
  {
    q: "Do both parents need to attend?",
    a: "We encourage all involved caregivers to participate when possible, but sessions are scheduled around real-life constraints. Parent-only coaching sessions are available when full-family attendance isn't feasible.",
  },
  {
    q: "Will I learn what my teen discusses in individual therapy?",
    a: "Individual sessions remain confidential with standard safety limits. Family sessions focus on communication, home routines, and shared goals — not repeating private individual session content.",
  },
  {
    q: "What if family conflict is part of the problem?",
    a: "That's common in adolescent IOP. Family clinicians address conflict patterns directly — with structure, safety, and skills — rather than assigning blame.",
  },
  {
    q: "What does a typical family session look like?",
    a: "Sessions are 45–60 minutes via secure HIPAA-compliant video. They may include full-family work, parent coaching, or a mix — always with a clear agenda tied to your teen's treatment goals.",
  },
  {
    q: "Can family therapy help with school avoidance or crisis recovery?",
    a: "Yes. Family work often focuses on morning routines, re-entry planning, and de-escalation — coordinated with your teen's individual clinician and any school supports.",
  },
];

export default function FamilyTherapyPage() {
  return (
    <MarketingPage currentPath="/therapy/adolescent-family-therapy">
      <ProgramHeroSection
        eyebrow={`Family Therapy · Ages ${SITE.ages}`}
        headline={
          <>
            Family therapy for teens, <span className="text-accent">with parents as partners in care</span>
          </>
        }
        body="Structured family sessions and caregiver coaching reinforce progress at home — coordinated with your teen's individual and group clinicians in every Virtual IOP plan."
        imageSrc={IMGS.hero}
        imageAlt="Parent and teen in a collaborative virtual family therapy session with a licensed clinician"
        imageClassName="object-cover object-[center_40%]"
        stats={[
          { icon: "ri-calendar-check-line", label: "Frequency", value: "1–2×", unit: "/wk" },
          { icon: "ri-time-line", label: "Sessions", value: "45–60", unit: "minutes" },
          { icon: "ri-parent-line", label: "Includes", value: "Parent", unit: "coaching" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-home-heart-line", label: "Home-focused skills" },
        ]}
        secondaryCta={{ href: "/virtual-iop-for-teens", label: "About Virtual IOP" }}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {[
              { value: "1–2×", unit: "per week", label: "Family sessions" },
              { value: "45–60 min", unit: "per session", label: "Session length" },
              { value: "Parent + teen", unit: "coordinated care", label: "Session formats" },
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
        eyebrow="Family-centered care"
        title="Change at home—not just in session"
        summary="Family therapy and parent coaching help caregivers reinforce the same skills your teen is building in individual and group work."
        highlights={[
          {
            icon: "ri-parent-line",
            title: "Parents as partners",
            body: "Caregiver coaching gives you language and tools to support recovery—not guess what to do between sessions.",
          },
          {
            icon: "ri-home-heart-line",
            title: "Skills that carry home",
            body: "Family sessions focus on communication, boundaries, and routines—not just processing in the therapy room.",
          },
          {
            icon: "ri-links-line",
            title: "Aligned with the care team",
            body: "Family clinicians coordinate with your teen's individual therapist on shared goals and progress.",
          },
        ]}
        pullQuote="Parents aren't the problem—but they are essential to the solution."
        image={{
          src: IMGS.overview,
          alt: "Parent and teen side by side during a virtual family therapy session at home",
        }}
      />

      <SessionStructureSection phases={sessionPhases} />

      <GoodFitSection
        title="Who benefits from family therapy?"
        description="Family sessions help when home dynamics, caregiver stress, or communication patterns are part of the clinical picture."
        criteria={fitCriteria}
        bg="white"
      />

      <ClinicalMethodsSection
        title={
          <>
            Approaches we use
            <br className="hidden lg:block" /> in family sessions
          </>
        }
        description="Family work combines caregiver coaching with structured sessions tied to your teen&apos;s IOP goals."
        items={approaches}
      />

      <IopModalityContextSection
        title="Family therapy within Virtual IOP"
        description="Family sessions don't exist in isolation. All three modalities coordinate around the same clinical goals."
        items={iopContext}
      />

      <TherapyFaqSection title="Questions about family therapy" items={faqs} />

      <TherapyFinalCtaSection
        title={
          <>
            Recovery happens at home
            <br />
            <span className="text-accent">— we help families get there.</span>
          </>
        }
        description="Caregiver coaching and family sessions, coordinated with your teen's full Virtual IOP plan."
        trustItems={[
          { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
          { icon: "ri-time-line", label: "Same-Week Intake" },
          { icon: "ri-parent-line", label: "Caregiver Coaching" },
          { icon: "ri-bank-card-line", label: "Insurance Accepted" },
        ]}
      />
    </MarketingPage>
  );
}
