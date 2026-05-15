import { SITE } from "@/lib/site";

export type LocHeroProps = {
  eyebrow: string;
  headline: string;
  body: string;
  metaTags: string[];
  /** Public Supabase URL for the hero backdrop image. */
  backgroundImage: string;
};

export default function LocHero({
  eyebrow,
  headline,
  body,
  metaTags,
  backgroundImage,
}: LocHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--mvt-ink)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-bottom"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[var(--mvt-forest-deep)]/75"
      />

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="self-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-white/85" />
            {eyebrow}
          </p>
          <h1 className="mt-7 font-heading text-[44px] leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[72px]">
            {headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/85 sm:text-[17px]">
            {body}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {metaTags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-2 border border-white/25 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--mvt-teal-light)]"
                />
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill text-base" aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </div>
        </div>

        {/* Confidential inquiry */}
        <aside className="self-center bg-[#1B3540]/85 p-8 backdrop-blur-md sm:p-10 lg:max-w-[460px] lg:justify-self-end">
          <h2 className="font-heading text-4xl font-light leading-tight text-white">
            Confidential Inquiry
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Speak directly with our admissions team. Your privacy is our priority.
          </p>
          <form className="mt-7 space-y-6" action="/contact/" method="POST">
            <InquiryField name="name" type="text" placeholder="Name" required />
            <InquiryField name="email" type="email" placeholder="Email" required />
            <InquiryField name="insurance" type="text" placeholder="Insurance" />
            <InquiryField name="policy_id" type="text" placeholder="Policy ID" />

            <button
              type="submit"
              className="mt-3 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] hover:bg-[var(--mvt-cream)]"
            >
              Send
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

type InquiryFieldProps = {
  name: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  required?: boolean;
};

function InquiryField({ name, type, placeholder, required }: InquiryFieldProps) {
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
