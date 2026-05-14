/**
 * Mountain View Treatment — Financial Concierge / Seamless Verification block.
 *
 * Used on the team page and other interior pages where insurance
 * verification + admissions CTA is desirable. Left column: copy +
 * 3-step process. Right column: dark "Confidential Inquiry" form
 * matching the hero panel.
 */

const STEPS = [
  {
    n: "01",
    title: "Secure Submission",
    body:
      "Provide your basic policy info via our 100% HIPAA-compliant portal. Your data is strictly guarded.",
  },
  {
    n: "02",
    title: "Expert Analysis",
    body:
      "Our financial advocates liaise directly with your provider to uncover the full extent of your coverage.",
  },
  {
    n: "03",
    title: "Clear Guidance",
    body:
      "Within 1-2 hours, we present a completely transparent, commitment-free breakdown of your benefits.",
  },
];

export default function FinancialConcierge() {
  return (
    <section className="bg-[var(--mvt-cream)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        {/* Eyebrow */}
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
          <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          Financial Concierge
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left: Heading + steps */}
          <div>
            <h2 className="font-heading text-[40px] leading-[1.06] tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[52px]">
              Seamless Verification. <br />
              <span className="italic">Absolute Discretion.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--mvt-text)]">
              We believe that navigating the financial aspects of recovery
              should never be a barrier to care. We work intimately with most
              major PPO insurance providers to maximize your benefits and
              minimize out-of-pocket expenses.
            </p>

            <div className="mt-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]">
                How The Process Works
              </p>
              <ol className="mt-7 space-y-7">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-1.5 border-t border-[var(--mvt-ink)]/10 pt-6 first:border-t-0 first:pt-0"
                  >
                    <span className="row-span-2 font-heading text-3xl font-light leading-none text-[var(--mvt-ink)] sm:text-4xl">
                      {s.n}
                    </span>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]">
                      {s.title}
                    </div>
                    <div className="max-w-md text-sm leading-7 text-[var(--mvt-text)]">
                      {s.body}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: Confidential Inquiry form */}
          <aside className="self-start bg-[#1B3540] p-8 text-white sm:p-10 lg:max-w-[480px] lg:justify-self-end">
            <h3 className="font-heading text-3xl font-light leading-tight text-white sm:text-4xl">
              Confidential Inquiry
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Speak directly with our admissions team. Your privacy is our priority.
            </p>

            <form className="mt-7 space-y-6" action="/contact/" method="POST">
              <div className="grid grid-cols-2 gap-5">
                <ConciergeField name="name" placeholder="Name" required />
                <ConciergeField name="phone" placeholder="Phone Number" type="tel" required />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <ConciergeField name="insurance" placeholder="Insurance" />
                <ConciergeField name="policy_id" placeholder="Policy ID" />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] hover:bg-[var(--mvt-cream)]"
              >
                Send
              </button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}

type ConciergeFieldProps = {
  name: string;
  placeholder: string;
  type?: "text" | "tel" | "email";
  required?: boolean;
};

function ConciergeField({ name, placeholder, type = "text", required }: ConciergeFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="block w-full border-0 border-b border-white/30 bg-transparent px-0 pb-2 pt-1 text-base font-light text-white placeholder:text-white/65 focus:border-white focus:outline-none focus:ring-0"
    />
  );
}
