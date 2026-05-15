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
        {/* Top row: eyebrow + headline (left)  |  body paragraph (right) */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span
                aria-hidden="true"
                className="inline-block h-px w-7 bg-[var(--mvt-ink)]"
              />
              Financial Concierge
            </p>
            <h2 className="mt-8 font-heading text-[44px] leading-[1.05] tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[60px]">
              Seamless Verification.
              <br />
              <span className="italic">Absolute Discretion.</span>
            </h2>
          </div>

          <div className="lg:pt-12">
            <p className="max-w-md text-base leading-7 text-[var(--mvt-text)]">
              We believe that navigating the financial aspects of recovery
              should never be a barrier to care. We work intimately with most
              major PPO insurance providers to maximize your benefits and
              minimize out-of-pocket expenses.
            </p>
          </div>
        </div>

        {/* Bottom row: process steps (left)  |  Confidential Inquiry form (right) */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:pl-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]">
              How The Process Works
            </p>
            <div
              aria-hidden="true"
              className="mt-4 h-px w-12 bg-[var(--mvt-ink)]/40"
            />

            <ol className="mt-8 space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-6"
                >
                  <span className="font-heading text-[32px] font-light leading-none text-[var(--mvt-teal)]">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)]">
                      {s.title}
                    </p>
                    <p className="mt-2 max-w-md text-[13px] leading-6 text-[var(--mvt-text)]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Confidential Inquiry */}
          <aside className="self-start bg-[#0F1F1A] p-8 text-white sm:p-10">
            <h3 className="font-heading text-3xl font-light leading-tight text-white sm:text-4xl">
              Confidential Inquiry
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Speak directly with our admissions team. Your privacy is our
              priority.
            </p>

            <form className="mt-7 space-y-6" action="/contact/" method="POST">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ConciergeField name="name" placeholder="Name" required />
                <ConciergeField
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

function ConciergeField({
  name,
  placeholder,
  type = "text",
  required,
}: ConciergeFieldProps) {
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
