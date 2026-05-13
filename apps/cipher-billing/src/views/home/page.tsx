import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const HERO_VIDEO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/video2-compressed.mp4";

const metrics = [
  { value: "$1,821", label: "Inpatient Day Rate" },
  { value: "$1,149", label: "Outpatient Day Rate" },
  { value: "100%", label: "Pre-Payment Review Passing Rate" },
  { value: "30 Days", label: "To Received First Payment" },
];

/** Remix Icon classes (`ri-*`) — platform standard; stylesheet loaded in `src/app/layout.tsx`. */
const differentiators = [
  {
    icon: "ri-team-line",
    title: "Our People Care More",
    body: "We pursue every dollar you're owed with relentless determination, escalating to commissioners when necessary.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Airtight Compliance",
    body: "Our utilization review and compliance teams ensure documentation stays audit-ready and reimbursements fully protected.",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "Partner Experience",
    body: "A dedicated Partner Experience Executive serves as your advocate, delivering real-time insights and proactive guidance.",
  },
];

const processSteps = [
  {
    step: "01",
    icon: "ri-file-search-line",
    title: "Comprehensive Audit",
    body: "We review your current documentation to identify compliance risks and coding errors before they trigger costly denials.",
  },
  {
    step: "02",
    icon: "ri-settings-3-line",
    title: "Workflow Optimization",
    body: "We restructure your billing workflow, implementing airtight best practices tailored to behavioral health.",
  },
  {
    step: "03",
    icon: "ri-plug-line",
    title: "Seamless Integration",
    body: "We establish a frictionless connection with your existing EMR/EHR systems with zero disruption to patient care.",
  },
  {
    step: "04",
    icon: "ri-money-dollar-circle-line",
    title: "Aggressive A/R Pursuit",
    body: "We provide continuous revenue monitoring and relentless follow-up on outstanding claims to maximize cash flow.",
  },
];

const processIntro =
  "We don't just take over your billing; we optimize it. Our proprietary audit-based onboarding ensures your documentation is pristine before a single claim is submitted.";

/** Homepage lead strip — matches live footer CTA (cipherbilling.com) */
const leadIntro =
  "Schedule a complimentary consultation with our billing experts to review your current revenue cycle and identify opportunities for improvement.";

const leadTestimonial = {
  quote:
    "My business was nearly in jeopardy because of the lackluster service from our billing company. Then I switched to Cipher, and they helped turn around our revenue, allowing us to flourish. I am a clinician, not a business person. I needed a billing company that would handle everything billing-related so that I could focus on what mattered — providing exceptional clinical care to patients. Cipher has been that partner for me.",
  attribution: "Dr. Matthew T.",
};

const contactPhoneDisplay = "714-867-1331";
const contactPhoneHref = "tel:+17148671331";
const contactEmail = "info@cipherbilling.com";

function formLabel(id: string, text: string) {
  return (
    <label
      htmlFor={id}
      className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AAB3B9]"
    >
      {text}
    </label>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#101E3F]">
      {/* Hero — video background (matches Elementor) */}
      <section className="relative min-h-[min(70vh,560px)] overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            poster="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T202355.948.png"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#101E3F]/80" />
        </div>
        <div className="relative mx-auto flex min-h-[min(70vh,560px)] max-w-[1140px] flex-col items-center justify-center px-6 py-20 text-center text-white">
          <h1 className="font-[var(--font-heading)] text-4xl font-medium tracking-[-0.02em] md:text-6xl md:leading-[1.05]">
            A Higher-Level Partnership
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase leading-normal tracking-[0.28em] text-white/95 md:text-sm">
            <AutoLinkedText>{"Your Partner In Behavioral Health Billing"}</AutoLinkedText>
          </p>
          <p className="mt-4 max-w-2xl font-[var(--font-heading)] text-base italic leading-[1.42] text-white/90 md:text-lg">
            <AutoLinkedText>{"Delivering Airtight Compliance &amp; Real Financial Results"}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Shared Background Wrapper */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[url('https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/cb_home_dotted-world-map.png')] bg-[length:1200px] md:bg-cover bg-center bg-fixed bg-no-repeat opacity-[0.06] mix-blend-screen z-0"
        />

        {/* Welcome + By the numbers — two-column stats (matches WP) */}
        <section className="relative z-10 overflow-hidden text-white">
          <div className="mx-auto max-w-[1140px] px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                <AutoLinkedText>{"WELCOME TO CIPHER BILLING"}</AutoLinkedText>
              </p>
              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-tight text-white md:text-5xl">
                The Trusted Experts In Behavioral Health Billing Services
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-[1.42] text-white/85 md:text-base">
                <AutoLinkedText>{"Cipher Billing is your trusted partner in behavioral health billing services — delivering airtight\n                compliance, transparent service, and maximized revenue so you can focus on patient care."}</AutoLinkedText>
              </p>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-start">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                  BY THE NUMBERS
                </p>
                <h3 className="font-marcellus mt-4 text-3xl font-medium text-white md:text-4xl">
                  Why Cipher Billing
                </h3>
                <p className="mt-5 text-sm leading-[1.42] text-white/85 md:text-base">
                  <AutoLinkedText>{"We believe in delivering unmatched service, airtight compliance, and real financial results for our\n                  partners."}</AutoLinkedText>
                </p>
                <p className="mt-5 text-sm leading-[1.42] text-white/85 md:text-base">
                  <AutoLinkedText>{"Our numbers reflect our dedication, with an eligibility turnaround averaging just 9 minutes compared to\n                  the industry standard 30 minutes. To maximize your revenue, request a consultation today."}</AutoLinkedText>
                </p>
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
                >
                  <span aria-hidden className="text-sm">
                    ›
                  </span>
                  Contact Us
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex flex-col items-center justify-center border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-8 text-center"
                  >
                    <p className="font-marcellus text-3xl font-medium tracking-[-0.02em] text-white md:text-4xl md:leading-[1.1]"><AutoLinkedText>{metric.value}</AutoLinkedText></p>
                    <p className="mt-3 max-w-[11rem] text-center font-[var(--font-body)] text-[11px] font-normal uppercase leading-snug tracking-[0.12em] text-white/95"><AutoLinkedText>{metric.label}</AutoLinkedText></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Unique — 3 cols + circular image */}
        <section className="relative z-10 overflow-hidden text-white">
          <div className="mx-auto max-w-[1140px] px-6 py-20 md:py-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
              BY THE NUMBERS
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium md:text-5xl">What Makes Us Unique</h2>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr_1fr_280px] lg:items-start">
              {differentiators.map((item) => (
                <article key={item.title}>
                  <div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#166C96] text-[#D7BDA6]"
                    aria-hidden
                  >
                    <i className={`${item.icon} text-[1.65rem] leading-none`} />
                  </div>
                  <h3 className="font-[var(--font-body)] text-lg font-semibold text-white md:text-xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-[1.42] text-white/85"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                </article>
              ))}
              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full border border-white/15 lg:mx-0 lg:justify-self-end">
                <Image
                  src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T202055.743.png"
                  alt="Cipher Billing team member"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="relative z-10 overflow-hidden text-white">
          <div className="mx-auto grid max-w-[1140px] gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">ABOUT US</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium md:text-5xl">Who We Are</h2>
              <p className="mt-6 text-sm leading-[1.42] text-white/85 md:text-base">
                <AutoLinkedText>{"We are trusted experts in behavioral health billing. We take pride in having a seamless partnership with\n                our clients, working closely with you and your team to understand your business&apos;s unique needs and\n                goals. We operate with the end in mind, optimizing your billing process to increase revenue so you can\n                focus on your patients."}</AutoLinkedText>
              </p>
              <Link
                href="/our-company"
                className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
              >
                <span aria-hidden className="text-sm">
                  ›
                </span>
                Our Company
              </Link>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-sm border border-white/10">
              <Image
                src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T201810.850.png"
                alt="Cipher Billing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </section>

        {/* What You Can Expect */}
        <section className="relative z-10 overflow-hidden text-white">
          <div className="relative mx-auto grid max-w-[1140px] gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
            <div className="relative order-2 aspect-[4/3] w-full max-w-lg overflow-hidden rounded-sm border border-white/10 md:order-1">
              <Image
                src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-15T202055.743.png"
                alt="Partnership at Cipher Billing"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <div className="order-1 max-w-xl md:order-2 md:ml-auto md:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">OUR PARTNERSHIP</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium md:text-5xl">What You Can Expect</h2>
              <p className="mt-6 text-sm leading-[1.42] text-white/85 md:text-base">
                <AutoLinkedText>{"Our job is to deliver an unparalleled experience to our clients. A Higher-Level Partnership means we go\n                above and beyond to ensure maximum reimbursement for our clients and leave no stone unturned in pursuing\n                successful claims. You can expect a simple, transparent service when you choose Cipher as your billing\n                partner."}</AutoLinkedText>
              </p>
              <Link
                href="/our-solution"
                className="mt-8 inline-flex items-center gap-2 rounded-[3px] bg-[#166C96] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[#145a82]"
              >
                <span aria-hidden className="text-sm">
                  ›
                </span>
                Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Our Process — headline + intro row, then 4 steps */}
        <section className="relative z-10 overflow-hidden text-white">
          <div className="mx-auto max-w-[1140px] px-6 py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]"><AutoLinkedText>{"SIMPLE &amp; EFFECTIVE"}</AutoLinkedText></p>
                <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium md:text-5xl">
                  Our{" "}
                  <span className="text-[#166C96]">Process.</span>
                </h2>
              </div>
              <p className="text-sm leading-[1.42] text-white/85 md:text-base lg:pb-2"><AutoLinkedText>{processIntro}</AutoLinkedText></p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <article
                  key={step.step}
                  className="flex min-h-full flex-col border border-white/25 bg-white/5 backdrop-blur-sm p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#166C96] text-[#D7BDA6]"
                      aria-hidden
                    >
                      <i className={`${step.icon} text-lg leading-none`} />
                    </div>
                    <span className="font-[var(--font-heading)] text-4xl font-medium text-white/90">{step.step}</span>
                  </div>
                  <h3 className="mt-6 font-[var(--font-heading)] text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-[1.42] text-white/75"><AutoLinkedText>{step.body}</AutoLinkedText></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Lead / form — matches live footer CTA */}
        <section className="relative z-10 text-white">
          <div className="mx-auto grid max-w-[1140px] gap-14 px-6 py-20 md:grid-cols-[1.08fr_0.92fr] md:items-start md:py-28">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">
                <AutoLinkedText>{"READY TO TRANSFORM YOUR REVENUE CYCLE?"}</AutoLinkedText>
              </p>
              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-[1.15] md:text-[2.65rem]">
                Let&apos;s Discuss How We Can{" "}
                <span className="text-[#166C96]">Maximize Your Revenue.</span>
              </h2>
              <p className="mt-6 text-sm leading-[1.42] text-white/90"><AutoLinkedText>{leadIntro}</AutoLinkedText></p>

              <blockquote className="mt-10 border-none p-0">
                <p className="font-[var(--font-body)] text-sm italic leading-[1.35] text-white/95 md:text-[15px]">
                  &ldquo;{leadTestimonial.quote}&rdquo;
                </p>
                <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96]">
                  {leadTestimonial.attribution.toUpperCase()}
                </footer>
              </blockquote>

              <div className="mt-12">
                <h3 className="font-marcellus text-xl font-medium text-white md:text-2xl">Contact Information</h3>

                <div className="mt-8 flex gap-4 border-b border-white/15 pb-8">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white"
                    aria-hidden
                  >
                    <i className="ri-phone-line text-lg leading-none" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Phone</p>
                    <a href={contactPhoneHref} className="mt-1 block text-sm font-medium text-white hover:text-[#166C96]">
                      {contactPhoneDisplay}
                    </a>
                    <p className="mt-1 text-xs leading-[1.35] text-white/75"><AutoLinkedText>{"Mon–Fri, 8AM–5:30PM PST"}</AutoLinkedText></p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white"
                    aria-hidden
                  >
                    <i className="ri-mail-line text-lg leading-none" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Email</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-1 block text-sm font-medium text-white hover:text-[#166C96]"
                    >
                      {contactEmail}
                    </a>
                    <p className="mt-1 text-xs leading-[1.35] text-white/75">General inquiries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#0a1428]/80 backdrop-blur-md p-8 shadow-lg md:p-10">
              <h3 className="font-marcellus text-2xl font-medium text-white md:text-[1.75rem]">Get Started Today</h3>
              <p className="mt-3 max-w-md font-[var(--font-body)] text-sm leading-[1.42] text-white/85">
                <AutoLinkedText>{"Fill out the form below and we&apos;ll contact you within 24 hours."}</AutoLinkedText>
              </p>

              <form className="mt-8 grid gap-5" action="/api/contact" method="post">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    {formLabel("lead-first-name", "First Name")}
                    <input
                      id="lead-first-name"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      placeholder="First Name"
                      className="rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                    />
                  </div>
                  <div className="grid gap-2">
                    {formLabel("lead-last-name", "Last Name")}
                    <input
                      id="lead-last-name"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      placeholder="Last Name"
                      className="rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  {formLabel("lead-email", "Email Address")}
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email Address"
                    className="rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>

                <div className="grid gap-2">
                  {formLabel("lead-phone", "Phone Number")}
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className="rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>

                <div className="grid gap-2">
                  {formLabel("lead-service", "Practice / Facility Name")}
                  <input
                    id="lead-service"
                    name="service"
                    autoComplete="organization"
                    placeholder="Practice / Facility Name"
                    className="rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>

                <div className="grid gap-2">
                  {formLabel("lead-message", "How Can We Help?")}
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={4}
                    placeholder="Message"
                    className="min-h-[120px] rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-[#166C96] py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#145a82]"
                >
                  Send
                </button>

                <p className="text-center text-[11px] leading-[1.35] text-[#AAB3B9]">
                  <AutoLinkedText>{"By submitting this form, you agree to our privacy policy and consent to be contacted by Cipher Billing."}</AutoLinkedText>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
