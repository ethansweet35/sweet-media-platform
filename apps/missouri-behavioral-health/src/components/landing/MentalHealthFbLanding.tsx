import Link from "next/link";
import Image from "next/image";
import LeadForm from "@/components/forms/LeadForm";
import MedicaidMedicareNotice from "@/components/landing/MedicaidMedicareNotice";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const SUPABASE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_IMAGE = `${SUPABASE}/mbh_facility_IMG_6017.jpg`;

const CONDITIONS = [
  { label: "Anxiety", href: "/anxiety-therapist-springfield-mo-3", icon: "ri-windy-line" },
  { label: "Depression", href: "/depression-therapist-springfield-mo", icon: "ri-cloudy-line" },
  { label: "PTSD", href: "/ptsd-counseling-springfield-mo", icon: "ri-shield-flash-line" },
  { label: "Bipolar", href: "/bipolar-treatment-centers-in-missouri-2-2", icon: "ri-contrast-2-line" },
  { label: "OCD", href: "/ocd-treatment-in-missouri", icon: "ri-loop-right-line" },
  { label: "Trauma", href: "/trauma-therapist-springfield-mo-2", icon: "ri-heart-pulse-line" },
  { label: "ADD", href: "/add-therapist-springfield-mo", icon: "ri-focus-3-line" },
  { label: "ADHD", href: "/adhd-treatment-springfield-mo", icon: "ri-focus-line" },
  { label: "BPD", href: "/bpd-treatment-missouri", icon: "ri-mental-health-line" },
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "Structured daytime programming with close clinical oversight for moderate to severe symptoms.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "Flexible group and individual therapy — often 9–15 hours per week while you live at home.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Outpatient Program",
    desc: "Ongoing weekly care for maintenance, skill-building, and relapse prevention.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Secure telehealth for clients across Missouri who need flexible access to care.",
  },
];

const MODALITIES = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "EMDR for trauma",
  "Family therapy",
  "Group counseling",
  "Holistic supports (yoga, music therapy, mindfulness)",
];

const FAQS = [
  {
    q: "What mental health conditions do you treat?",
    a: "We treat depression, anxiety, PTSD, trauma, bipolar disorder, OCD, ADD/ADHD, BPD, and co-occurring substance use disorders. Each person receives a comprehensive assessment and individualized treatment plan.",
  },
  {
    q: "Do you serve clients outside Springfield?",
    a: "Yes. Our Springfield campus provides in-person PHP, IOP, and outpatient care. Virtual outpatient programming is available statewide for eligible clients in Missouri.",
  },
  {
    q: "Does insurance cover mental health treatment?",
    a: "Most private insurance plans cover mental health treatment as an essential benefit. We accept major carriers including Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health — and verify benefits at no cost.",
  },
];

export default function MentalHealthFbLanding() {
  return (
    <main className="bg-cream">
      <MedicaidMedicareNotice />

      <section className="relative overflow-hidden bg-mbh-forest-deep text-white">
        <div className={`${CONTAINER} relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20`}>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                Free Assessment
              </span>
            </div>
            <h1
              className="font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
            >
              Mental health facilities in Missouri
            </h1>
            <p className="mt-5 max-w-lg font-body text-[1.0625rem] leading-relaxed text-white/65">
              Evidence-based outpatient mental health care in Springfield — with PHP, IOP, and virtual
              options for clients across the state. Start with a confidential assessment today.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
              >
                <i className="ri-phone-fill" aria-hidden />
                Call 24/7 — {PHONE_DISPLAY}
              </a>
              <Link
                href="/verify-insurance-fb"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/8"
              >
                <i className="ri-shield-check-line" aria-hidden />
                Verify insurance
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-mbh-forest">
              Request a free assessment
            </h2>
            <p className="mt-1.5 font-body text-sm text-mbh-body">
              Tell us how we can help — our team will follow up to discuss care options and insurance.
            </p>
            <div className="mt-6">
              <LeadForm
                source="Mental Health FB Landing"
                submitLabel="Get my free assessment"
                fields={["name", "email", "phone", "insurance_provider", "message"]}
                successTitle="We’ve received your request."
                successBody="A coordinator will reach out shortly to discuss treatment options."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
              <Image
                src={HERO_IMAGE}
                alt="Clinical therapy space at Missouri Behavioral Health in Springfield, Missouri"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Mental Health in Missouri
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight text-mbh-forest">
                Conditions we treat
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
                Missouri&apos;s mental health system faces real resource constraints. Our outpatient
                programs focus on safety, personalized care, and evidence-based recovery — whether you
                are managing anxiety, depression, trauma, or co-occurring substance use.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CONDITIONS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 rounded-xl border border-mbh-forest/10 bg-cream px-3 py-3 font-body text-sm font-medium text-mbh-forest transition hover:border-mbh-green hover:bg-white"
                  >
                    <i className={`${c.icon} text-mbh-green`} aria-hidden />
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-alt py-[88px]">
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Programs
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
              Mental health treatment programs
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
              Every plan is tailored to your needs — from intensive day programming to flexible
              outpatient and telehealth support.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PROGRAMS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mbh-forest/8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${p.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{p.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/levels-of-care-missouri"
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline"
            >
              Compare levels of care <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-white py-[88px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Treatment Approaches
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight text-mbh-forest">
                Why choose Missouri Behavioral Health
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
                Our dedicated clinical team combines a focus on safety with personalized treatment for
                genuine recovery. Family therapy, group support, and holistic options help you rebuild
                emotional balance and long-term wellness.
              </p>
              <ul className="mt-8 space-y-3">
                {MODALITIES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                      <i className="ri-check-line text-[10px] text-mbh-green" aria-hidden />
                    </span>
                    <span className="font-body text-sm text-mbh-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-mbh-forest-deep p-8 text-white lg:p-10">
              <h3 className="font-display text-xl font-semibold">Insurance &amp; cost</h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/65">
                We accept private health insurance from major carriers and help verify your benefits
                before admission. Our team explains coverage in plain language — with no obligation to
                enroll.
              </p>
              <Link
                href="/verify-insurance-fb"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint"
              >
                <i className="ri-shield-check-line" aria-hidden />
                Verify my insurance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[88px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  FAQ
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight text-mbh-forest">
                Common questions
              </h2>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>
    </main>
  );
}
