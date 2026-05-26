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

const IMGS = THERAPY_IMGS.group;

const sessionPhases = [
  {
    num: "01",
    icon: "ri-group-line",
    title: "Group orientation",
    body: "Teens learn group norms, confidentiality limits, and virtual session expectations before any deep work begins.",
  },
  {
    num: "02",
    icon: "ri-book-open-line",
    title: "Skills introduction",
    body: "Clinicians teach CBT and DBT skills in a structured curriculum with examples teens relate to.",
  },
  {
    num: "03",
    icon: "ri-chat-smile-2-line",
    title: "Peer practice & processing",
    body: "Teens rehearse skills together, normalize struggle, and get real-time facilitator guidance.",
  },
  {
    num: "04",
    icon: "ri-refresh-line",
    title: "Integration & carryover",
    body: "Groups close with take-home assignments linked to individual therapy and themes from the IOP curriculum.",
  },
];

const fitCriteria = [
  { icon: "ri-emotion-line", label: "Social anxiety or isolation", sub: "Teens who withdraw but benefit from structured peer contact" },
  { icon: "ri-tools-line", label: "Needs to practice coping skills", sub: "Skills land better when rehearsed with peers before real-world use" },
  { icon: "ri-heart-2-line", label: "Shame about symptoms or diagnosis", sub: "Normalization in a safe group reduces feeling 'broken' or alone" },
  { icon: "ri-links-line", label: "Part of a Virtual IOP treatment plan", sub: "Group sessions are a core component of every IOP track" },
  { icon: "ri-chat-3-line", label: "Stronger in groups than one-on-one", sub: "Some teens open up more when they hear peers share first" },
];

const approaches = [
  {
    icon: "ri-brain-line",
    tag: "Core modality",
    title: "CBT skills groups",
    body: "Structured groups focused on thought challenging, behavioral activation, and exposure planning — with in-session practice and peer feedback on homework assignments.",
  },
  {
    icon: "ri-heart-pulse-line",
    tag: "Core modality",
    title: "DBT skills groups",
    body: "Emotion regulation, distress tolerance, interpersonal effectiveness, and mindfulness taught in a repeatable curriculum — the same skills reinforced in individual sessions.",
  },
  {
    icon: "ri-user-voice-line",
    tag: "Process-oriented",
    title: "Peer processing groups",
    body: "Facilitated space for teens to discuss school stress, family conflict, and social dynamics — with clinical framing so processing stays skill-focused and safe.",
  },
  {
    icon: "ri-lightbulb-line",
    tag: "Supplemental",
    title: "Psychoeducation groups",
    body: "Topic-focused sessions on anxiety, depression, sleep, and communication — building a shared vocabulary teens and parents can use at home.",
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
    active: true,
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
  {
    q: "How many group therapy sessions does my teen attend per week?",
    a: "In Virtual IOP, teens typically attend 3–4 group sessions per week alongside 2–3 individual sessions and 1–2 family sessions. Group frequency may adjust based on clinical need and treatment phase.",
  },
  {
    q: "How big are the groups?",
    a: "Groups are intentionally small — typically 6–8 teens — matched by age range and clinical focus. Smaller groups allow facilitators to manage participation and maintain safety.",
  },
  {
    q: "What if my teen is nervous about group therapy?",
    a: "That's common. Facilitators start with structure and skills work before open sharing. Teens can participate at their own pace, and individual clinicians help prepare anxious teens for group entry.",
  },
  {
    q: "Are groups confidential?",
    a: "Yes, with standard limits. What's shared in group stays in group — with exceptions for safety concerns. Facilitators review confidentiality and limits clearly in the first session.",
  },
  {
    q: "What does a typical group session look like?",
    a: "Sessions are 60–90 minutes via secure HIPAA-compliant video. They include a check-in, a skills lesson or exercise, guided practice or processing, and a closing assignment linked to individual therapy goals.",
  },
  {
    q: "Can my teen be in group without individual therapy?",
    a: "In our Virtual IOP model, group and individual sessions work together. Individual therapy provides private space for sensitive work; group provides peer practice. Both are part of the standard IOP plan.",
  },
];

export default function GroupTherapyPage() {
  return (
    <MarketingPage currentPath="/therapy/group-therapy-with-adolescents">
      <ProgramHeroSection
        eyebrow={`Group Therapy · Ages ${SITE.ages}`}
        headline={
          <>
            Group therapy for teens, <span className="text-accent">practiced with peers</span>
          </>
        }
        body="Small peer groups led by licensed clinicians — a core part of Virtual IOP where teens build connection, normalize struggle, and rehearse CBT and DBT skills in real time."
        imageSrc={IMGS.hero}
        imageAlt="Small group of teens participating in a supportive virtual group therapy session"
        imageClassName="object-cover object-[center_40%]"
        stats={[
          { icon: "ri-calendar-check-line", label: "Frequency", value: "3–4×", unit: "/wk" },
          { icon: "ri-group-line", label: "Group size", value: "6–8", unit: "teens" },
          { icon: "ri-book-open-line", label: "Focus", value: "Skills", unit: "based" },
        ]}
        trustItems={[
          { icon: "ri-shield-check-line", label: "Licensed clinicians" },
          { icon: "ri-heart-pulse-line", label: "Insurance accepted" },
          { icon: "ri-lock-line", label: "HIPAA compliant" },
          { icon: "ri-group-line", label: "Small peer groups" },
        ]}
        secondaryCta={{ href: "/virtual-iop-for-teens", label: "About Virtual IOP" }}
      />

      <section className="border-b border-border bg-white px-6 py-0 lg:px-10">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {[
              { value: "3–4×", unit: "per week", label: "Group sessions" },
              { value: "6–8", unit: "teens per group", label: "Group size" },
              { value: "CBT + DBT", unit: "skills-based", label: "Primary focus" },
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
        eyebrow="Peer-based care"
        title="Structured groups—not an open support circle"
        summary="Licensed clinicians lead small adolescent groups where teens practice skills, get real feedback, and feel less alone."
        highlights={[
          {
            icon: "ri-group-line",
            title: "Clinician-led, not peer-only",
            body: "Facilitators keep groups clinical and safe—structured skills work, not unstructured venting.",
          },
          {
            icon: "ri-chat-smile-2-line",
            title: "Practice with peers in real time",
            body: "Teens rehearse coping skills with others who get it—then apply them at home and in individual sessions.",
          },
          {
            icon: "ri-shield-check-line",
            title: "Matched by age and focus",
            body: "Groups are sized and matched so teens relate to who is in the room and what is being worked on.",
          },
        ]}
        pullQuote="Teens often think they're the only one struggling. Group breaks that isolation."
        image={{
          src: IMGS.overview,
          alt: "Teens participating in a supportive virtual group therapy session from home",
        }}
      />

      <SessionStructureSection phases={sessionPhases} />

      <GoodFitSection
        title="Who benefits from group therapy?"
        description="Group sessions help teens who need peer connection and structured skills practice alongside individual work."
        criteria={fitCriteria}
        bg="white"
      />

      <ClinicalMethodsSection
        title={
          <>
            Approaches we use
            <br className="hidden lg:block" /> in group sessions
          </>
        }
        description="Groups combine structured skills training with facilitated peer learning."
        items={approaches}
      />

      <IopModalityContextSection
        title="Group therapy within Virtual IOP"
        description="Group sessions don't exist in isolation. All three modalities coordinate around the same clinical goals."
        items={iopContext}
      />

      <TherapyFaqSection title="Questions about group therapy" items={faqs} />

      <TherapyFinalCtaSection
        title={
          <>
            Your teen doesn&apos;t have to
            <br />
            <span className="text-accent">figure it out alone.</span>
          </>
        }
        description={`Peer-based group therapy as part of a comprehensive Virtual IOP plan for teens ages ${SITE.ages}.`}
        trustItems={[
          { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
          { icon: "ri-time-line", label: "Same-Week Intake" },
          { icon: "ri-group-line", label: "Small Groups" },
          { icon: "ri-bank-card-line", label: "Insurance Accepted" },
        ]}
      />
    </MarketingPage>
  );
}
