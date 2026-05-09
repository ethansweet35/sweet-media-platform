import Image from "next/image";
import Link from "next/link";

const ADMISSIONS_HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_admissions_hero01.jpg";

export default function AdmissionsHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pb-20 pt-36 lg:pb-28 lg:pt-44">
      {/* Background photo */}
      <Image
        src={ADMISSIONS_HERO}
        alt="Northbound admissions counselor meeting with a new client"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />

      {/* Terracotta glow */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ───────────────────────────────────────────── */}
          <div>
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              <Link href="/" className="transition hover:text-terracotta">Home</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-white/70">Admissions</span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
                Start Your Recovery Today
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Admissions:{" "}
              <span className="italic text-terracotta">What to Expect</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
              Whether you're seeking help for yourself or for someone you love,
              you are likely experiencing one of the most challenging times in
              your life. Our admissions team will work through every step with
              you — from your first call through long-term aftercare.
            </p>

            {/* Quick trust points */}
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Free, confidential pre-admission assessment",
                "Insurance verified at no cost to you",
                "Travel coordination available nationwide",
                "24/7 admissions line — real people, not bots",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta/20">
                    <i className="ri-check-line text-xs text-terracotta" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Call CTA */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-line" />
                (866) 311-0003
              </a>
              <span className="text-xs text-white/40">Available 24/7</span>
            </div>

            {/* DHCS badge */}
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
              DHCS Licensed #300661CP · NAATP Member · 38+ Years
            </p>
          </div>

          {/* ── Right: form card ─────────────────────────────────────── */}
          <div className="relative">
            <div className="relative overflow-hidden border border-white/10 bg-navy-light/60 p-6 shadow-2xl backdrop-blur-md lg:p-8">
              {/* Top accent bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-terracotta via-navy to-espresso" />

              <div className="relative z-10">
                {/* Form header */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">
                      Available 24/7 — No Obligation
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-white lg:text-3xl">
                    Request a Free Assessment
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">
                    Fill out the form and we'll call you immediately.
                  </p>
                </div>

                <form className="space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput id="adm-firstName" label="First Name" type="text" placeholder="John" />
                    <FloatingInput id="adm-lastName" label="Last Name" type="text" placeholder="Doe" />
                  </div>

                  {/* Phone */}
                  <FloatingInput id="adm-phone" label="Phone Number" type="tel" placeholder="(555) 000-0000" />

                  {/* Program interest */}
                  <SelectField label="Program Interest">
                    <option className="bg-espresso">Drug or Alcohol Detox</option>
                    <option className="bg-espresso">Residential Treatment</option>
                    <option className="bg-espresso">Partial Hospitalization (PHP)</option>
                    <option className="bg-espresso">Intensive Outpatient (IOP)</option>
                    <option className="bg-espresso">Sober Living</option>
                    <option className="bg-espresso">Just exploring options</option>
                  </SelectField>

                  {/* Insurance divider */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Insurance (optional)
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Insurance provider */}
                  <SelectField label="Insurance Provider">
                    <option className="bg-espresso">Aetna</option>
                    <option className="bg-espresso">Anthem</option>
                    <option className="bg-espresso">Beacon Health</option>
                    <option className="bg-espresso">BlueCross BlueShield</option>
                    <option className="bg-espresso">Cigna</option>
                    <option className="bg-espresso">Compsych</option>
                    <option className="bg-espresso">First Health Network</option>
                    <option className="bg-espresso">GEHA</option>
                    <option className="bg-espresso">Health Net</option>
                    <option className="bg-espresso">Magellan</option>
                    <option className="bg-espresso">MHN Insurance</option>
                    <option className="bg-espresso">Premera Blue Cross</option>
                    <option className="bg-espresso">TriCare</option>
                    <option className="bg-espresso">USAMCA</option>
                    <option className="bg-espresso">Other</option>
                    <option className="bg-espresso">No insurance / self-pay</option>
                  </SelectField>

                  {/* Policy ID */}
                  <FloatingInput id="adm-policyId" label="Policy / Member ID" type="text" placeholder="ABC123456789" />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group/btn w-full bg-terracotta py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-md transition hover:bg-terracotta-light"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Request Free Assessment
                      <i className="ri-arrow-right-s-line text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </button>

                  {/* Trust strip */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-lock-line text-xs" />
                      <span className="font-semibold">Confidential</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <i className="ri-shield-check-line text-xs" />
                      <span className="font-semibold">HIPAA Secure</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line text-xs" />
                      <span className="font-semibold">Instant Response</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function FloatingInput({
  id, label, type, placeholder,
}: {
  id: string; label: string; type: string; placeholder: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="peer w-full border-b border-white/20 bg-transparent px-0 pb-2 pt-4 text-sm text-white transition-all placeholder:text-transparent focus:border-terracotta focus:outline-none"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-4 text-xs font-semibold text-white/40 transition-all duration-200 peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-terracotta peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-white/60"
      >
        {label}
      </label>
    </div>
  );
}

function SelectField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select className="w-full cursor-pointer appearance-none border-b border-white/20 bg-transparent px-0 py-3 text-xs text-white/70 transition-all focus:border-terracotta focus:outline-none">
        <option value="" className="bg-espresso">{label}</option>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-white/30">
        <i className="ri-arrow-down-s-line text-base" />
      </div>
    </div>
  );
}
