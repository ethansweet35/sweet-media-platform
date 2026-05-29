import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelOfCareLayout from "@/components/levels-of-care/LevelOfCareLayout";
import LevelOfCareFaq from "@/components/levels-of-care/LevelOfCareFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Partial Hospitalization Program (PHP) | Missouri Behavioral Health",
  description:
    "PHP at Missouri Behavioral Health offers the highest level of outpatient care — 5–7 days per week with medical oversight, group therapy, and psychiatric support in Springfield, MO.",
  alternates: { canonical: "/php-sober-living" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/php-sober-living", fallback);
}

const WHO_ITS_FOR = [
  { icon: "ri-hospital-line",      title: "Recent detox or hospital discharge", desc: "PHP is the ideal step-down from inpatient or medical detox, maintaining clinical intensity while returning to the community." },
  { icon: "ri-mental-health-line", title: "Co-occurring mental health conditions", desc: "Dual-diagnosis clients with bipolar disorder, PTSD, or severe anxiety benefit from PHP's daily psychiatric touchpoints." },
  { icon: "ri-home-2-line",        title: "Stable living environment", desc: "You'll return home or to sober living each evening — PHP works best when your home environment is safe and substance-free." },
  { icon: "ri-alert-line",         title: "High relapse risk", desc: "Daily structure and clinical accountability create a powerful buffer against relapse in the critical early weeks of recovery." },
];

const THERAPIES = [
  { icon: "ri-brain-line",        label: "Cognitive Behavioral Therapy (CBT)" },
  { icon: "ri-heart-pulse-line",  label: "Dialectical Behavior Therapy (DBT)" },
  { icon: "ri-group-line",        label: "Group Process Therapy" },
  { icon: "ri-parent-line",       label: "Family Systems Therapy" },
  { icon: "ri-discuss-line",      label: "Motivational Interviewing" },
  { icon: "ri-leaf-line",         label: "Trauma-Informed Care" },
  { icon: "ri-medicine-bottle-line", label: "Medication Management" },
  { icon: "ri-mental-health-line",   label: "Psychiatric Evaluation & Support" },
];

const FAQS = [
  { q: "What is the difference between PHP and residential treatment?", a: "Residential treatment involves overnight stays at the facility. PHP provides the same clinical intensity during the day — 6+ hours of structured programming — but you return home or to sober living each evening. This allows you to begin re-integrating into daily life while still receiving high-level care." },
  { q: "How long does PHP typically last?", a: "Most clients participate in PHP for 2–4 weeks, though duration is driven entirely by clinical progress. We reassess regularly and will step you down to IOP when it is clinically appropriate to do so." },
  { q: "Does insurance cover PHP?", a: "Yes — most private insurance plans cover PHP at significant benefit levels. We verify your coverage before treatment begins at no cost. We accept Aetna, Anthem, BCBS, Cigna, Beacon, Carelon, GEHA, and Cox Health." },
  { q: "Can I work or have family obligations while in PHP?", a: "PHP's daily schedule (typically 9am–3pm) makes maintaining full-time employment difficult. Some clients take a short leave of absence. However, evening and weekend obligations are generally manageable around the PHP schedule." },
  { q: "What happens after PHP?", a: "After PHP, most clients step down to IOP — 3 days per week with continued group and individual therapy. Some clients also transition into our sober living homes while continuing with IOP for additional structure and community support." },
];

export default function PHPPage() {
  return (
    <LevelOfCareLayout
      abbr="PHP"
      programName="Partial Hospitalization Program"
      currentPath="/php-sober-living"
      tagline="The highest level of outpatient care — daily programming with full clinical support."
      schedule="5–7 days/week · 6+ hrs/day"
      heroBody="PHP gives you the structure and intensity of residential treatment while allowing you to return home each evening. It is the gold standard for those stepping down from detox or hospital care — and for anyone needing close daily oversight during early recovery."
      quickFacts={[
        { icon: "ri-time-line",         label: "Frequency",   value: "5–7 days per week" },
        { icon: "ri-timer-line",         label: "Hours/day",   value: "6+ hours of programming" },
        { icon: "ri-user-heart-line",    label: "Staff ratio", value: "Licensed clinicians daily" },
        { icon: "ri-calendar-event-line",label: "Duration",    value: "Typically 2–4 weeks" },
      ]}
      daySchedule={[
        { time: "8:30 am",  activity: "Morning Check-In & Goals", detail: "Brief group and individual mood check-in with your primary counselor. Goals are set for the day." },
        { time: "9:00 am",  activity: "Psychoeducation Group", detail: "Didactic session on recovery science — topics include neuroplasticity, cravings, trigger mapping, and sleep hygiene." },
        { time: "10:30 am", activity: "Process Group Therapy", detail: "Facilitated peer group exploring lived experience, relapse patterns, and emotional awareness." },
        { time: "12:00 pm", activity: "Lunch Break", detail: "Community meal time — an important ritual for social reconnection in a safe environment." },
        { time: "1:00 pm",  activity: "Individual Therapy Session", detail: "One-on-one with your primary therapist. CBT, DBT, trauma processing, or motivational work depending on your plan." },
        { time: "2:30 pm",  activity: "Skill-Building or Family Session", detail: "DBT skills group, family therapy session, or holistic activity (yoga, mindfulness, music)." },
        { time: "3:30 pm",  activity: "Wrap-Up & Transition Planning", detail: "Afternoon debrief, evening safety plan review, and next-day schedule confirmation." },
      ]}
    >
      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Who It's For</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Is PHP right for you?
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                PHP is designed for individuals who need more than weekly therapy but don't require 24-hour residential supervision. It's the most clinically intensive outpatient option we offer.
              </p>
              <div className="mt-10 space-y-6">
                {WHO_ITS_FOR.map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                      <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{item.title}</p>
                      <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/8 lg:sticky lg:top-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_IMAGES.therapyGroup} alt="PHP group therapy session at Missouri Behavioral Health" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.4) 0%, transparent 55%)" }} />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">6+ hrs</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">Daily clinical programming</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Therapy modalities ─────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Clinical Approach</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Therapies included in PHP.
              </h2>
            </div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-mbh-body lg:text-right">
              Every PHP client receives a personalized treatment plan drawing from these evidence-based modalities.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THERAPIES.map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-2xl border border-mbh-forest/8 bg-white px-5 py-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${t.icon} text-base text-mbh-green`} aria-hidden />
                </span>
                <span className="font-body text-sm font-medium text-mbh-forest">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Coverage</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Most insurance covers PHP.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                PHP is covered at meaningful benefit levels by most major private insurance plans. We verify your benefits before treatment starts — at no cost — so you know exactly what to expect.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  <i className="ri-shield-check-line" aria-hidden /> Verify my coverage
                </Link>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((c) => (
                <div key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHP + SOBER LIVING ─────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mbh-green/10" aria-hidden />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Recommended Combination
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                PHP paired with sober living — the gold standard for early recovery.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                When PHP is paired with structured sober living housing, clients gain something residential treatment can't always offer: the chance to practice recovery in real-world conditions while still receiving intensive clinical care every day.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/45">
                You leave treatment each afternoon and return to a supervised, substance-free home with peers who share your commitment to recovery. This combination dramatically reduces relapse risk in the vulnerable first weeks of sobriety.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Substance-free housing with recovery-focused housemates",
                  "Evening accountability and peer support structure",
                  "Seamless coordination between sober living and clinical team",
                  "Flexible duration — stay as long as clinically supported",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                      <i className="ri-check-line text-[10px] text-mbh-sage" aria-hidden />
                    </span>
                    <span className="font-body text-sm text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Ask about sober living
                </a>
                <Link
                  href="/php-sober-living"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8"
                >
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { icon: "ri-home-heart-line",   title: "Safe, substance-free home", desc: "Live with housemates who are also in recovery — a built-in community of accountability and peer support from day one." },
                { icon: "ri-sun-line",          title: "Morning-to-evening structure", desc: "PHP programming fills your daytime. Sober living fills your evenings. Zero unstructured time in the highest-risk window." },
                { icon: "ri-stethoscope-line",  title: "Coordinated clinical oversight", desc: "Your sober living staff and PHP clinical team communicate regularly — creating a seamless, unified treatment experience." },
                { icon: "ri-line-chart-line",   title: "Stronger recovery outcomes", desc: "Research consistently shows higher abstinence rates for clients who complete PHP + structured sober living versus PHP alone." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 px-5 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 text-mbh-sage">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MBH PHP ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Why MBH
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What sets our PHP apart.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Not all PHP programs are built the same. Here's what we do differently — and why it matters for your recovery.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "ri-user-heart-line",
                title: "Individualized treatment plans",
                desc: "No two clients follow the same program. Your treatment plan is built around your specific diagnosis, history, and goals — and updated weekly by your primary clinician.",
              },
              {
                icon: "ri-mental-health-line",
                title: "Dual-diagnosis capable",
                desc: "Our PHP is fully equipped to treat co-occurring mental health conditions alongside addiction. Psychiatric evaluation and medication management are integrated into daily programming.",
              },
              {
                icon: "ri-parent-line",
                title: "Family involvement",
                desc: "We actively involve families in the treatment process through scheduled family therapy sessions, educational workshops, and regular clinical updates with your consent.",
              },
              {
                icon: "ri-shield-check-line",
                title: "JCAHO accredited",
                desc: "Missouri Behavioral Health holds Joint Commission accreditation — the gold standard for behavioral health care quality, safety, and clinical outcomes.",
              },
              {
                icon: "ri-refresh-line",
                title: "Seamless level transitions",
                desc: "When you're ready to step down to IOP, the transition happens internally with the same clinical team. No searching for a new provider, no disruption to your progress.",
              },
              {
                icon: "ri-map-pin-2-line",
                title: "Springfield-based, Missouri-focused",
                desc: "We serve the Springfield community and the broader Missouri region — with deep knowledge of local recovery resources, alumni networks, and continuing care options.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{item.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Common questions about PHP.
            </h2>
          </div>
          <LevelOfCareFaq items={FAQS} />
        </div>
      </section>
    </LevelOfCareLayout>
  );
}
