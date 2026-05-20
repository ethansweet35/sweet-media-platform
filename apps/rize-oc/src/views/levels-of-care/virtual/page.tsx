import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import IconCircle from "@/components/ui/IconCircle";
import Button from "@/components/ui/Button";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import PageHeroShell, { HERO_LEAD, HERO_SPLIT_LEFT } from "@/components/ui/PageHeroShell";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { CINEMATIC_BOTTOM_HERO_GRADIENT } from "@/lib/cinematicHeroStyles";
import { AutoLinkedText } from "@sweetmedia/blog-core";
import { cn } from "@/lib/cn";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─────────────────────────────────────────────────── Section data ─────── */

const howItWorks = [
  {
    step: "Step 1",
    icon: "ri-shield-check-line",
    title: "Technology Onboarding",
    body: "Before your first session, a dedicated care coordinator walks you through our telehealth platform, confirms your device is compatible, tests your connection, and ensures everything is set up correctly. There are no apps to download — just a secure browser-based link. Insurance is verified and confirmed before day one.",
    tags: ["Care Coordinator", "Platform Setup", "Insurance Confirmed"],
  },
  {
    step: "Step 2",
    icon: "ri-group-line",
    title: "Live Group Sessions",
    body: "Join your scheduled group therapy sessions via secure video with a cohort of Rize clients from across California. Groups are small (8 maximum), facilitated by the same licensed clinicians who run in-person groups, and cover the same clinical curriculum — DBT skills, relapse prevention, peer processing, and trauma psychoeducation.",
    tags: ["Live Video", "≤8 Clients", "Licensed Facilitators"],
  },
  {
    step: "Step 3",
    icon: "ri-user-heart-line",
    title: "Private Individual Therapy",
    body: "Weekly one-on-one sessions with your dedicated licensed therapist via secure video. The therapeutic alliance built in virtual individual therapy is clinically equivalent to in-person work — the research is clear on this point. Your therapist provides the same depth, continuity, and personalization as they would in the office.",
    tags: ["Private Session", "Licensed Therapist", "Weekly Continuity"],
  },
  {
    step: "Step 4",
    icon: "ri-pulse-line",
    title: "Ongoing Progress & Adjustment",
    body: "Your clinical team monitors progress continuously — adjusting session frequency, recommending step-up to higher intensity if indicated, and managing the step-down to less intensive support as stability grows. Virtual care is not a fixed endpoint — it is a responsive clinical relationship.",
    tags: ["Clinical Monitoring", "Flexible Intensity", "Step-Up Available"],
  },
];

const myths = [
  {
    myth: "Virtual therapy isn&apos;t as effective as in-person.",
    reality: "Multiple large-scale studies find equivalence in clinical outcomes between virtual and in-person behavioral health treatment for IOP and OP levels of care. The therapeutic alliance — the most significant predictor of treatment outcomes — forms just as effectively via video.",
    accent: true,
  },
  {
    myth: "You can&apos;t build real relationships in a virtual group.",
    reality: "Virtual groups at Rize OC are small (8 clients maximum), consistent in membership, and facilitated with the same clinical depth as in-person groups. Research on virtual group therapy consistently finds comparable peer connection and therapeutic engagement.",
    accent: true,
  },
  {
    myth: "Insurance won&apos;t cover telehealth.",
    reality: "Since 2020, most major PPO plans are required to cover virtual behavioral health services at parity with in-person care. Rize OC verifies this directly with your insurer before admission — there are typically no coverage surprises.",
    accent: false,
  },
  {
    myth: "It only works for mild cases.",
    reality: "Virtual IOP at Rize OC is clinically equivalent to in-person IOP for individuals who are medically stable. Clients with dual-diagnosis presentations, significant trauma histories, and complex clinical pictures all participate successfully in virtual programming.",
    accent: false,
  },
  {
    myth: "The technology will be complicated.",
    reality: "Our platform is browser-based — no app downloads, no complex setup. If you can video call a family member, you can participate in virtual care at Rize. Our care coordinators provide full technical onboarding before your first session.",
    accent: false,
  },
  {
    myth: "Virtual care means less accountability.",
    reality: "Virtual IOP at Rize includes the same attendance requirements, clinical monitoring, and accountability structures as in-person care. Session attendance is tracked, progress is reviewed, and clinical milestones are monitored with identical rigor.",
    accent: false,
  },
];

const whyStats = [
  { stat: "98%",   detail: "clinical outcome equivalence between virtual and in-person IOP in a 2024 meta-analysis of randomized controlled trials" },
  { stat: "3×",    detail: "more likely to engage in treatment when virtual options eliminate transportation and geographic barriers" },
  { stat: "40%",   detail: "reduction in treatment dropout rates when clients can participate from a comfortable, private home environment" },
  { stat: "CA",    detail: "state licensed virtual programming — accepted by all major California PPO insurance plans at parity with in-person care" },
];

const candidacyItems = [
  { icon: "ri-map-pin-2-line",      label: "Located outside Orange County but anywhere in California" },
  { icon: "ri-flight-takeoff-line", label: "Frequent travel makes a fixed in-person schedule difficult" },
  { icon: "ri-eye-off-line",        label: "Privacy concerns make attending a physical clinic uncomfortable" },
  { icon: "ri-car-line",            label: "Transportation, disability, or childcare limits in-person attendance" },
  { icon: "ri-building-4-line",     label: "Stepping down from in-person PHP or IOP and transitioning home" },
  { icon: "ri-laptop-line",         label: "Comfortable with technology and self-directed in a home setting" },
  { icon: "ri-shield-check-line",   label: "Medically stable and appropriate for outpatient-level care" },
  { icon: "ri-home-heart-line",     label: "Has a private, quiet space available for sessions at home" },
];

const faqs: FaqItem[] = [
  {
    q: "What technology do I need for virtual care at Rize OC?",
    a: "Any device with a working camera, microphone, and a reliable internet connection works — a smartphone, tablet, laptop, or desktop computer. Our platform is browser-based, so no app downloads are required. We recommend a private space where you can speak freely without interruption. Our care coordinator will walk you through a full technology check before your first session to ensure everything is working correctly.",
  },
  {
    q: "Is virtual treatment as effective as in-person?",
    a: "For IOP and OP levels of care, yes — the clinical evidence is clear. Multiple large-scale studies, including a 2024 meta-analysis of randomized controlled trials, found equivalent clinical outcomes between virtual and in-person behavioral health treatment at outpatient intensity levels. The therapeutic alliance — consistently identified as the most significant predictor of treatment outcomes — forms just as effectively via video. Rize OC&apos;s virtual programming is designed and facilitated to the same clinical standards as our in-person services.",
  },
  {
    q: "Can I do virtual PHP?",
    a: "Virtual PHP is available in limited circumstances — typically for clients who have previously been in PHP and need a short-term virtual return, or for clients with specific medical or geographic situations. Full-day PHP programming (5 to 6 hours daily) is more difficult to sustain virtually and requires careful clinical assessment. Most clients seeking virtual intensive care are best served by in-person PHP followed by virtual IOP or OP for step-down. Contact our admissions team to discuss your specific situation.",
  },
  {
    q: "Does insurance cover virtual care?",
    a: "Since federal parity legislation in 2021, most major PPO insurance plans are required to cover virtual behavioral health services at the same rate as in-person care. Rize OC verifies your specific virtual coverage directly with your insurer before admission. We provide a complete breakdown of expected costs and work to maximize your coverage. We do not accept Medicaid or Medi-Cal.",
  },
  {
    q: "Can I switch from virtual to in-person, or vice versa?",
    a: "Yes — flexibility between virtual and in-person care is one of the advantages of Rize OC&apos;s model. If your circumstances change (you move to Orange County, your schedule opens up, or you decide you&apos;d prefer in-person), transitioning to in-person programming is straightforward. Conversely, if you begin in-person and need to transition to virtual for a period, that is equally available. Your clinical team manages the logistics.",
  },
  {
    q: "How do group sessions work virtually?",
    a: "Virtual groups at Rize are conducted via secure video with a consistent group of 8 or fewer clients. Groups are live, real-time, and interactive — not pre-recorded content. The same licensed clinician who facilitates the group in-person facilitates virtual groups with identical structure, curriculum, and depth. Clients see each other on screen and interact in the same way as in-person groups. Research consistently finds that peer connection and therapeutic engagement in virtual groups is comparable to in-person.",
  },
  {
    q: "What if I need a higher level of care while doing virtual IOP?",
    a: "Your clinical team continuously monitors your progress and will recommend a step-up to in-person IOP or PHP if clinically indicated — a change in psychiatric status, a relapse, a significant life stressor, or a clinical assessment that you need more support than virtual IOP can provide. Step-up is never a setback — it is the clinical team doing its job. Rize&apos;s in-person programming in Orange County is available for any client who needs it.",
  },
  {
    q: "Is my privacy protected in virtual sessions?",
    a: "Yes. Rize OC&apos;s telehealth platform is fully HIPAA-compliant with end-to-end encryption on all video sessions, individual and group. Your participation in virtual programming is protected by the same confidentiality standards as in-person treatment. Group participants are subject to confidentiality agreements regarding other group members&apos; participation and content. We take platform security seriously and conduct regular security assessments of our telehealth infrastructure.",
  },
];

/* ─────────────────────────────────────────────────── Page component ────── */

export default function VirtualPage() {
  return (
    <>
      {/* ①  Hero ─────────────────────────────────────────────────────────── */}
      <CinematicHeroSection
        media={
          <>
            <Image
              src={`${BASE}/vop_hero03.jpg`}
              alt="Person participating in secure telehealth therapy session from a comfortable California home"
              fill
              className="object-cover object-[72%_center]"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: CINEMATIC_BOTTOM_HERO_GRADIENT }}
            />
          </>
        }
      >
        <PageHeroShell
          fullBleedBottomBar
          mainClassName="lg:gap-16"
          topSlot={<Eyebrow colorClass="text-accent">Levels of Care — Virtual Option</Eyebrow>}
          bottomBar={
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
              {[
                { value: "HIPAA",  label: "Compliant Platform" },
                { value: "CA",     label: "State Licensed" },
                { value: "IOP+OP", label: "Levels Offered" },
                { value: "Any",    label: "Device Supported" },
              ].map(({ value, label }) => (
                <div key={label} className="px-8 py-5 border-r border-white/10 last:border-r-0 bg-ink/50 backdrop-blur-sm">
                  <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white leading-none"><AutoLinkedText>{value}</AutoLinkedText></p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 mt-1.5"><AutoLinkedText>{label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          }
        >
            <div className={HERO_SPLIT_LEFT}>
              <h1
                className="font-[family-name:var(--font-display)] font-normal text-white"
                style={{ fontSize: "clamp(48px, 5.5vw, 92px)", lineHeight: 0.95 }}
              >
                Virtual Outpatient<br />
                <em className="italic text-white/60">Program</em>
              </h1>
              <p className={cn(HERO_LEAD, "mt-6")}>
                <AutoLinkedText>{"All the clinical depth of in-person IOP and OP — delivered through a HIPAA-compliant telehealth platform from wherever you are in California."}</AutoLinkedText>
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
              <div className="flex flex-wrap gap-3">
                <Button href="#verify" variant="accent" size="md">Verify Insurance — Free</Button>
                <Button href="tel:9494612620" variant="outline-white" size="md">
                  <i className="ri-phone-line mr-2 text-sm" /> (949)-461-2620
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {[
                  { icon: "ri-shield-check-line",    text: "HIPAA Compliant" },
                  { icon: "ri-map-pin-2-line",        text: "California Licensed" },
                  { icon: "ri-checkbox-circle-line",  text: "Insurance Accepted" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5">
                    <i className={`${icon} text-accent text-sm`} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
        </PageHeroShell>
      </CinematicHeroSection>

      {/* ②  What Is Virtual Care? ────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[1fr_400px] gap-16 items-stretch">
          <div className="flex flex-col h-full">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Understanding Virtual Care</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Premium Care, Delivered Remotely
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Virtual care is not a compromise — it is an expansion of access. Rize OC's Virtual Outpatient Program brings our full clinical team, evidence-based curriculum, and community-oriented approach directly to your home, office, or wherever life takes you in California."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Via our secure, HIPAA-compliant telehealth platform, clients participate in live individual therapy, structured group sessions, and psychiatric check-ins with the same licensed clinicians who serve our in-person clients — with no reduction in clinical quality, engagement, or depth."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Virtual IOP and OP at Rize OC are California state licensed and accepted by most major PPO insurance providers. The federal parity requirements enacted since 2021 mean your insurer must cover virtual behavioral health at the same rate as in-person care — and our insurance team verifies this before your first session."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Whether you live outside of Orange County, travel frequently, have childcare or transportation constraints, or simply prefer the privacy and comfort of participating from home — virtual care makes clinical excellence accessible."}</AutoLinkedText>
              </p>
            </div>

            <blockquote className="mt-auto pt-8 border-l-2 border-accent pl-6">
              <p className="text-[17px] font-[family-name:var(--font-display)] font-normal text-ink/70 leading-snug italic">
                <AutoLinkedText>{"\"The research on virtual behavioral health outcomes has been decisive. Distance is no longer a barrier to exceptional care — and for many clients, the comfort and privacy of home actually facilitates deeper therapeutic engagement.\""}</AutoLinkedText>
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink/40">
                <AutoLinkedText>{"Rize OC Clinical Director"}</AutoLinkedText>
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-ink p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
                <AutoLinkedText>{"What Virtual Includes"}</AutoLinkedText>
              </p>
              <div className="flex flex-col gap-5">
                {[
                  { icon: "ri-video-line",        point: "Secure, HIPAA-compliant video platform — browser-based, no app required" },
                  { icon: "ri-group-line",         point: "Live group therapy sessions with consistent, small cohorts (≤8 clients)" },
                  { icon: "ri-user-heart-line",    point: "Weekly individual therapy with your dedicated licensed clinician" },
                  { icon: "ri-stethoscope-line",   point: "Psychiatric check-ins and medication management as clinically indicated" },
                ].map(({ icon, point }) => (
                  <div key={point} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base shrink-0 mt-0.5`} />
                    <p className="text-sm font-light text-white/65 leading-snug"><AutoLinkedText>{point}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-warm p-7 flex flex-col gap-5 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ink/60">Quick Facts</p>
              {[
                { label: "Platform",        value: "Browser-Based" },
                { label: "Compliance",      value: "HIPAA Certified" },
                { label: "Coverage",        value: "California" },
                { label: "Levels",          value: "IOP + OP" },
                { label: "Insurance",       value: "Most PPO Plans" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center border-b border-warm pb-3 last:border-0 last:pb-0">
                  <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/60">{label}</span>
                  <span className="text-[15px] font-medium text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ③  How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Getting Started"
            heading="How Virtual Care Works at Rize"
            body="Starting virtual care is simpler than most people expect. Everything happens through a single secure link — and our care coordinator handles every technical and administrative step before your first session."
            headingStyle={{ fontSize: "clamp(38px, 4vw, 56px)", lineHeight: 1.05 }}
            mb="mb-14"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {howItWorks.map(({ step, icon, title, body, tags }, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col border ${
                  i === 0 || i === 1 ? "border-accent/30 bg-white" : "border-warm bg-white"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    i === 0 || i === 1 ? "bg-accent" : "bg-ink"
                  }`}>
                    <i className={`${icon} text-white text-lg`} />
                  </div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.25em] text-accent">{step}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[26px] font-normal text-ink leading-snug mb-3">{title}</h3>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-5 flex-1"><AutoLinkedText>{body}</AutoLinkedText></p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium uppercase tracking-[0.15em] border border-warm px-3 py-1.5 text-ink/65">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ④  Myths vs. Reality ────────────────────────────────────────────── */}
      <section className="bg-ink">
        <SectionWrapper>
          <div className="text-center mb-12">
            <Eyebrow colorClass="text-accent" className="mb-4">Setting the Record Straight</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white mb-5"
              style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05 }}
            >
              Common Myths About <em className="italic text-white/60">Virtual Care</em>
            </h2>
            <p className="text-[15px] font-light text-white/65 max-w-2xl mx-auto">
              <AutoLinkedText>{"Skepticism about virtual treatment is understandable — but the evidence tells a different story. Here is what the research actually shows."}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myths.map(({ myth, reality, accent }) => (
              <div key={myth} className="bg-white/5 border border-white/10 p-7 flex flex-col hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400/80">Myth</span>
                  {accent && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm bg-accent/15 text-accent">
                      Common Concern
                    </span>
                  )}
                </div>
                <p className="text-[15px] font-[family-name:var(--font-display)] font-normal text-white/60 italic mb-4 leading-snug"
                   dangerouslySetInnerHTML={{ __html: `&ldquo;${myth}&rdquo;` }} />
                <div className="border-t border-white/10 pt-4 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent block mb-2">Reality</span>
                  <p className="text-[14px] font-light leading-relaxed text-white/75">{reality}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑤  The Evidence ─────────────────────────────────────────────────── */}
      <section className="bg-cream-alt">
        <SectionWrapper className="grid lg:grid-cols-[1fr_1fr] gap-16 items-stretch">
          <div>
            <Eyebrow colorClass="text-ink/45" className="mb-5">Clinical Evidence</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-7"
              style={{ fontSize: "clamp(34px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Virtual Care Is Evidence-Based Care
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"The evidence base for virtual behavioral health treatment at outpatient intensity levels has grown dramatically since 2020, and the findings are consistent: clinical outcomes for virtual IOP and OP are equivalent to in-person care across virtually all measured dimensions — engagement, retention, therapeutic alliance, symptom reduction, and long-term sobriety rates."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"For many clients, virtual care produces superior engagement — the elimination of transportation burden, the privacy of a home environment, and the scheduling flexibility that prevents the treatment dropout that frequently occurs with in-person-only programs all contribute to measurably better completion rates."}</AutoLinkedText>
              </p>
              <p className="text-[15px] font-light leading-relaxed text-ink/65">
                <AutoLinkedText>{"Rize OC's virtual programming was not retrofitted from in-person programming after 2020 — it was purpose-designed for the virtual environment, with attention to the specific facilitation techniques, platform features, and clinical adaptations that maximize engagement and therapeutic depth via video."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Therapeutic alliance builds equivalently via video versus in-person",
                "Group cohesion and peer accountability form comparably in virtual groups",
                "Elimination of transportation barrier dramatically reduces treatment dropout",
                "Home environment participation reduces clinical anxiety for many clients",
                "Consistent evidence base across multiple independent randomized trials",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-[15px] font-light text-ink/70"><AutoLinkedText>{item}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            {whyStats.map(({ stat, detail }) => (
              <div key={stat} className="bg-white border border-warm px-8 py-7 flex items-center gap-6 flex-1">
                <p
                  className="font-[family-name:var(--font-display)] font-normal text-accent shrink-0"
                  style={{ fontSize: "clamp(40px, 4vw, 56px)", lineHeight: 1 }}
                ><AutoLinkedText>{stat}</AutoLinkedText></p>
                <p className="text-[15px] font-light leading-relaxed text-ink/65 pt-2"><AutoLinkedText>{detail}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑥  Who Is Virtual Care For? ─────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[400px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Candidacy</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              Virtual Care Is Ideal When…
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/65 mb-8">
              <AutoLinkedText>{"Distance, schedule, and privacy are no longer barriers to receiving exceptional behavioral health care. Virtual IOP and OP are appropriate for a broad range of clients and situations."}</AutoLinkedText>
            </p>
            <Button href="tel:9494612620" variant="ink" size="sm">
              Speak With Admissions
            </Button>
            <p className="mt-4 text-[12px] font-light text-ink/50 leading-relaxed">
              <AutoLinkedText>{"Free &middot; Confidential &middot; No obligation &middot; Same-day response"}</AutoLinkedText>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {candidacyItems.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-4 border border-warm px-5 py-4">
                <IconCircle icon={icon} variant="accent-subtle" size="xs" className="shrink-0" />
                <p className="text-[14px] font-light text-ink/75 leading-snug"><AutoLinkedText>{label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ⑦  Virtual & In-Person Options ──────────────────────────────────── */}
      <section className="bg-cream">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Full Continuum"
            heading="Virtual Alongside the Full Rize Continuum"
            body="Virtual care is not a separate track — it is an access option woven into the full Rize continuum. In-person and virtual programming work together, and transitions between them are seamless."
            headingStyle={{ fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05 }}
            mb="mb-10"
          />

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "ri-building-4-line",
                label: "In-Person Option",
                title: "Partial Hospitalization (PHP)",
                desc: "Full-day in-person programming delivering the most intensive outpatient clinical experience. Best for clients who need or prefer structured in-person treatment.",
                href: "/partial-hospitalization-program-orange-county",
                cta: "Learn About PHP",
                accent: false,
              },
              {
                icon: "ri-group-line",
                label: "In-Person or Virtual",
                title: "Intensive Outpatient (IOP)",
                desc: "Available both in-person in Orange County and virtually throughout California. AM and PM tracks, small groups, weekly individual therapy.",
                href: "/iop-program-orange-county",
                cta: "Learn About IOP",
                accent: true,
              },
              {
                icon: "ri-calendar-line",
                label: "In-Person or Virtual",
                title: "Standard Outpatient (OP)",
                desc: "Ongoing individual therapy and alumni community access — available in-person or via telehealth, with easy transitions between the two.",
                href: "/outpatient-program",
                cta: "Learn About OP",
                accent: false,
              },
            ].map(({ icon, label, title, desc, href, cta, accent }) => (
              <div key={title} className={`flex flex-col p-7 border ${accent ? "border-accent/30 bg-white" : "border-warm bg-white"}`}>
                <div className="flex items-center justify-between mb-5">
                  <IconCircle icon={icon} variant={accent ? "accent-subtle" : "muted-subtle"} size="sm" />
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm ${
                    accent ? "bg-accent/10 text-accent" : "bg-muted/10 text-muted"
                  }`}>
                    {label}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[22px] font-normal text-ink mb-3 leading-snug">{title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-ink/70 flex-1"><AutoLinkedText>{desc}</AutoLinkedText></p>
                <div className="mt-6">
                  <Link href={href} className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-1.5 hover:gap-3 transition-all">
                    {cta} <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-ink px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[15px] font-light text-white/75">
              <span className="text-white font-medium">Flexible between virtual and in-person.</span>{" "}
              Transitions are seamless — your clinical team manages every change, same clinician, same care.
            </p>
            <Link href="/levels-of-care" className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-accent flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
              View All Levels <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </SectionWrapper>
      </section>

      {/* ⑧  FAQs ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <SectionWrapper className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow colorClass="text-ink/45" className="mb-5">Common Questions</Eyebrow>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(30px, 3vw, 42px)", lineHeight: 1.1 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/60 mb-8">
              <AutoLinkedText>{"Our admissions team is available to answer anything you don't find here."}</AutoLinkedText>
            </p>
            <a href="tel:9494612620" className="flex items-center gap-2 text-accent text-[14px] font-medium hover:text-ink transition-colors">
              <i className="ri-phone-line" /> (949)-461-2620
            </a>
          </div>
          <FaqAccordion items={faqs} />
        </SectionWrapper>
      </section>

      {/* ⑨  CTA Banner ───────────────────────────────────────────────────── */}
      <section id="verify" className="bg-ink relative overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #D98A53 0%, transparent 70%)" }}
          aria-hidden
        />
        <SectionWrapper className="text-center relative z-10">
          <Eyebrow colorClass="text-accent" className="mb-6 flex justify-center">
            Start Virtual Care Today
          </Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mx-auto"
            style={{ fontSize: "clamp(38px, 4.5vw, 64px)", lineHeight: 1.05, maxWidth: "760px" }}
          >
            World-Class Care, Wherever You Are
          </h2>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/55 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 to verify your insurance, answer questions, and help you get started — from anywhere in California. All conversations are completely confidential."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="tel:9494612620" variant="accent" size="lg">
              <i className="ri-phone-line mr-2" /> Call Now — (949)-461-2620
            </Button>
            <Button href="/levels-of-care" variant="outline-white" size="lg">
              Explore All Programs
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Free Insurance Verification", "Available Throughout California", "100% Confidential"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <i className="ri-checkbox-circle-line text-accent text-base" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65">{item}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}
