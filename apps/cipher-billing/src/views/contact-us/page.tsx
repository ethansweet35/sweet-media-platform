import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

import ContactUsForm from "./components/ContactUsForm";

const IMG_HERO =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-09T173830.974.png";

const contactPhoneDisplay = "949-676-2252";
const contactPhoneHref = "tel:949-676-2252";
const contactEmail = "info@cipherbilling.com";

const processSteps = [
  {
    icon: "ri-checkbox-circle-line",
    step: "Step 01 • Instant",
    title: "Submission Received",
    body: "Your inquiry is instantly logged into our secure HIPAA-compliant system and assigned to a senior billing specialist.",
  },
  {
    icon: "ri-search-eye-line",
    step: "Step 02 • Within 4 Hours",
    title: "Initial Audit & Research",
    body: "Our analysts conduct a preliminary review of your facility type and market location to identify common regional billing leaks.",
  },
  {
    icon: "ri-calendar-event-line",
    step: "Step 03 • Next 24 Hours",
    title: "Discovery Call",
    body: "We connect for a 30-minute deep dive to review your audit results and map out a customized revenue recovery plan.",
  },
] as const;

export default function ContactUsPage() {
  return (
    <main className="bg-[#F5F7FA] text-[#0D1833]">
      {/* Hero — post-75 container a656aa5 */}
      <section className="relative min-h-[410px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(270deg, rgba(11, 26, 46, 0.62) 0%, rgba(16, 30, 63, 0.92) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto flex min-h-[410px] max-w-[1140px] flex-col justify-center px-5 py-16 md:py-24">
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="h-px w-12 min-w-[48px] bg-white/80" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">Get In Touch</p>
              <span className="h-px w-12 min-w-[48px] bg-white/80" aria-hidden />
            </div>
            <h1 className="font-[var(--font-heading)] text-4xl font-medium tracking-[-0.02em] text-white md:text-5xl">
              Contact Us
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              <AutoLinkedText>{"Ready to eliminate billing complexity and maximize your clinic's revenue? Our team of behavioral health\n              billing specialists is standing by. Reach out and receive a free practice audit within 24 hours."}</AutoLinkedText>
            </p>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="mx-auto max-w-[1140px] px-5 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
          <ContactUsForm />

          <div className="flex flex-col gap-8">
            <div className="rounded-xl border border-[#166C96]/15 bg-white p-8 shadow-sm">
              <h3 className="font-marcellus text-xl font-medium text-[#0D1833]">Contact Information</h3>

              <div className="mt-8 flex gap-4 border-b border-[#e5eaf0] pb-8">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#166C96]/25 bg-[#166C96]/08 text-[#166C96]"
                  aria-hidden
                >
                  <i className="ri-phone-line text-lg leading-none" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]">Phone</p>
                  <a
                    href={contactPhoneHref} suppressHydrationWarning
                    className="mt-1 block text-sm font-semibold text-[#0D1833] hover:text-[#166C96]"
                  >
                    {contactPhoneDisplay}
                  </a>
                  <p className="mt-1 text-xs leading-relaxed text-[#6b7580]"><AutoLinkedText>{"Mon–Fri, 8AM–5:30PM PST"}</AutoLinkedText></p>
                </div>
              </div>

              <div className="mt-8 flex gap-4 border-b border-[#e5eaf0] pb-8">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#166C96]/25 bg-[#166C96]/08 text-[#166C96]"
                  aria-hidden
                >
                  <i className="ri-mail-line text-lg leading-none" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]">Email</p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-1 block text-sm font-semibold text-[#0D1833] hover:text-[#166C96]"
                  >
                    {contactEmail}
                  </a>
                  <p className="mt-1 text-xs leading-relaxed text-[#6b7580]">General inquiries</p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#166C96]/25 bg-[#166C96]/08 text-[#166C96]"
                  aria-hidden
                >
                  <i className="ri-building-line text-lg leading-none" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]">Office</p>
                  <p className="mt-1 text-sm font-semibold text-[#0D1833]"><AutoLinkedText>{"1665 Scenic Ave suite 250"}</AutoLinkedText></p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6b7580]"><AutoLinkedText>{"Costa Mesa, CA 92626"}</AutoLinkedText></p>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl border border-white/10 p-8 text-white shadow-lg"
              style={{
                backgroundImage: "linear-gradient(145deg, #101E3F 0%, #166C96 100%)",
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90">Free Practice Audit</p>
              <h4 className="mt-3 font-marcellus text-lg font-medium leading-snug md:text-xl">
                Not Sure Where Your Revenue Is Leaking?
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                <AutoLinkedText>{"We'll audit your current billing workflow at no cost and show you exactly where you're losing revenue —\n                no strings attached."}</AutoLinkedText>
              </p>
              <Link
                href="#contact-form"
                className="mt-6 inline-flex w-full items-center justify-center rounded bg-white px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#101E3F] hover:bg-white/95"
              >
                Claim Your Free Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="border-t border-[#e2e8ef] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1140px] px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#166C96]">The Cipher Process</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-medium text-[#0D1833] md:text-[2.25rem]">
            What Happens <span className="text-[#246D92]">Next?</span>
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {processSteps.map((s) => (
              <div key={s.title} className="relative">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#166C96]/12 text-[#166C96]"
                  aria-hidden
                >
                  <i className={`${s.icon} text-xl`} />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#246D92]"><AutoLinkedText>{s.step}</AutoLinkedText></p>
                <h3 className="mt-2 font-[var(--font-body)] text-lg font-semibold text-[#0D1833]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4a5565]"><AutoLinkedText>{s.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
