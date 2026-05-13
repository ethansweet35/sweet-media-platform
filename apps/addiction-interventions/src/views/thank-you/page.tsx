import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const NEXT_STEPS = [
  {
    icon: "ri-phone-line",
    title: "We'll call you back today",
    body: "A certified interventionist will reach out from a private number, usually within the hour. If you do not hear from us in 24 hours, call us directly.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Your information is private",
    body: "Everything you share with us is fully confidential. We never share your details with treatment programs or third parties without your explicit permission.",
  },
  {
    icon: "ri-time-line",
    title: "If this is urgent",
    body: "If your loved one is in immediate danger — overdose risk, suicidal ideation, or a recent crisis — please call us right now instead of waiting.",
  },
];

const RESOURCES = [
  {
    href: "/how-to-plan-an-intervention-for-success",
    label: "How to Plan an Intervention for Success",
  },
  {
    href: "/is-it-time-for-an-intervention",
    label: "Is It Time For An Intervention?",
  },
  {
    href: "/intervention-quiz",
    label: "Take the Intervention Readiness Quiz",
  },
  {
    href: "/faqs",
    label: "Read our most common questions",
  },
];

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--color-sage-deep)]">
            <i className="ri-checkbox-circle-line text-4xl"></i>
          </div>
          <p className="brand-eyebrow mt-6 text-[var(--color-sage-deep)]">
            Message Received
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl">
            Thank you for reaching out.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            <AutoLinkedText>{"We have received your message, and a certified interventionist will be in touch shortly. The hardest step is the one you just took — you reached out."}</AutoLinkedText>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)]"
            >
              <i className="ri-phone-fill text-base"></i>
              Call {PHONE_DISPLAY}
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              What Happens Next
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Here is what to expect from us.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-[var(--color-divider)] bg-white p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                  <i className={`text-2xl ${s.icon}`}></i>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]"><AutoLinkedText>{s.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* While you wait */}
      <section className="border-t border-[var(--color-divider)] bg-[var(--color-cream)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="brand-eyebrow text-[var(--color-sage-deep)]">
            <AutoLinkedText>{"While You Wait For Our Call"}</AutoLinkedText>
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
            Resources to help you prepare.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
            <AutoLinkedText>{"These short reads will help you feel more prepared for our conversation."}</AutoLinkedText>
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl gap-3">
            {RESOURCES.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-divider)] bg-white px-6 py-5 text-left transition hover:border-[var(--color-sage)] hover:shadow-md"
              >
                <span className="text-base font-semibold tracking-tight text-[var(--color-ink)]">
                  {r.label}
                </span>
                <i className="ri-arrow-right-line text-[var(--color-sage-deep)] group-hover:translate-x-1 transition-transform"></i>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
