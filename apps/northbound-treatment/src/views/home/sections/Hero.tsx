import Image from "next/image";
import { HERO_BG } from "../assets";

/**
 * Hero — full-bleed coastal highway image background.
 *
 * Layout:
 *   - Full-bleed photo (nbt_hero_bg01.jpg) sits behind everything.
 *   - Left half: deep espresso→navy gradient overlay so white text is legible.
 *   - Right half: subtler dark overlay so the photo remains visible behind the form.
 *   - Form card: frosted dark panel so form fields stand out cleanly.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-40 lg:pb-32 lg:pt-48">

      {/* ── Full-bleed background photo ───────────────────────────────── */}
      <Image
        src={HERO_BG}
        alt="California coastal highway heading north at golden hour"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Primary overlay: deep navy left → lighter navy right ────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />

      {/* ── Bottom dark band so the section has a grounded feel ──────────── */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/60 to-transparent" />

      {/* ── Terracotta warm glow — top-right, echoes the sunset sky ─────── */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-terracotta/25 blur-[140px]" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left — editorial copy (white on dark) */}
          <div className="relative z-20 lg:col-span-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Evidence-Based Care
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex text-terracotta">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-base leading-none" />
                ))}
              </div>
              <span className="text-sm font-bold tracking-wide text-terracotta lg:hidden">
                224+ On Google
              </span>
              <span className="hidden text-sm font-bold tracking-wide text-terracotta lg:inline">
                4.6/5 on Google from 224+ reviews
              </span>
            </div>

            <h1 className="mb-6 font-serif text-4xl leading-[1.1] text-white lg:text-5xl xl:text-6xl">
              Addiction Treatment Center <br />
              <span className="font-light italic text-terracotta">
                in Orange County
              </span>
            </h1>

            <p className="mb-10 max-w-lg text-lg font-light leading-relaxed text-white/80">
              Transformational recovery is possible. Start on the path to
              feeling better today with Northbound Treatment Services&rsquo;
              safe &amp; supervised{" "}
              <span className="font-medium text-terracotta">
                drug &amp; alcohol addiction treatment programs
              </span>{" "}
              in Southern California.
            </p>

            <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
              <a
                href="tel:8663110003"
                className="inline-block w-max flex-shrink-0 bg-terracotta px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-xl shadow-terracotta/30 transition-all duration-300 hover:-translate-y-1 hover:bg-terracotta-light hover:shadow-2xl hover:shadow-terracotta/40"
              >
                Speak With Admissions
              </a>

              {/* Accreditation badges */}
              <div className="flex items-center gap-3 opacity-90">
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-espresso shadow-md transition-transform duration-300 hover:scale-110">
                  <div className="absolute inset-x-0 bottom-0 flex h-3.5 items-center justify-center bg-[#4CAF50]">
                    <i className="ri-check-line text-[10px] font-bold text-white" />
                  </div>
                  <span className="mb-2 text-[7px] font-bold tracking-tighter text-white">
                    LegitScript
                  </span>
                </div>

                <div className="flex h-11 w-11 flex-shrink-0 rotate-45 items-center justify-center rounded-sm bg-navy shadow-md transition-transform duration-300 hover:scale-110">
                  <div className="-rotate-45 flex flex-col items-center text-center">
                    <div className="mb-0.5 h-3.5 w-3.5 rounded-sm border border-white bg-terracotta" />
                    <span className="block text-[4px] font-bold uppercase leading-none text-white">
                      NAATP
                    </span>
                  </div>
                </div>

                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E5C058] to-[#C0962F] shadow-md transition-transform duration-300 hover:scale-110">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-100/40 text-white/80">
                    <i className="ri-shield-star-line text-base leading-none" />
                  </div>
                </div>

                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                  <i className="ri-award-line text-lg leading-none text-white" />
                </div>
              </div>
            </div>

            {/* Point your compass callout — nods to the live site's brand line */}
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <div className="h-px w-8 bg-white/20" />
              <span className="font-serif text-xs italic tracking-widest text-white/40">
                Point your compass northbound.
              </span>
            </div>
          </div>

          {/* Right — contact + insurance form (dark frosted card) */}
          <div className="relative z-30 mt-12 lg:col-span-6 lg:mt-0">
            <div className="relative overflow-hidden border border-white/10 bg-navy-light/60 p-6 shadow-2xl backdrop-blur-md lg:p-8">
              {/* Top gradient accent bar */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-terracotta via-navy to-espresso" />

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">
                      Available 24/7
                    </span>
                  </div>
                  <h3 className="mb-1 font-serif text-2xl text-white lg:text-3xl">
                    Start Your Recovery
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-white/50">
                    Fill out the form and we&rsquo;ll call you immediately.
                  </p>
                </div>

                <form className="space-y-4">
                  {/* First / Last name */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput id="firstName" label="First Name" type="text" placeholder="John" />
                    <FloatingInput id="lastName" label="Last Name" type="text" placeholder="Doe" />
                  </div>

                  {/* Phone */}
                  <FloatingInput id="phone" label="Phone Number" type="tel" placeholder="(555) 000-0000" />

                  {/* Program interest */}
                  <div className="relative">
                    <select className="w-full cursor-pointer appearance-none border-b border-white/20 bg-transparent px-0 py-3 text-xs text-white/70 transition-all focus:border-terracotta focus:outline-none">
                      <option value="" className="bg-espresso">Program Interest</option>
                      <option className="bg-espresso">Drug or Alcohol Detox</option>
                      <option className="bg-espresso">Residential Treatment</option>
                      <option className="bg-espresso">Outpatient (PHP/IOP)</option>
                      <option className="bg-espresso">Just exploring options</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0 text-white/30">
                      <i className="ri-arrow-down-s-line text-base leading-none" />
                    </div>
                  </div>

                  {/* Insurance divider */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Insurance (optional)
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  {/* Insurance provider */}
                  <div className="relative">
                    <select className="w-full cursor-pointer appearance-none border-b border-white/20 bg-transparent px-0 py-3 text-xs text-white/70 transition-all focus:border-terracotta focus:outline-none">
                      <option value="" className="bg-espresso">Insurance Provider</option>
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
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-0 text-white/30">
                      <i className="ri-arrow-down-s-line text-base leading-none" />
                    </div>
                  </div>

                  {/* Policy ID */}
                  <FloatingInput id="policyId" label="Policy / Member ID" type="text" placeholder="ABC123456789" />

                  {/* Submit */}
                  <button
                    type="button"
                    className="group/btn w-full bg-terracotta py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-light hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Request Call Now
                      <i className="ri-arrow-right-s-line text-sm leading-none transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </button>

                  {/* Trust line */}
                  <div className="flex items-center justify-center gap-4 pt-2 text-[9px] uppercase tracking-[0.18em] text-white/40">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-lock-line text-xs leading-none" />
                      <span className="font-semibold">Confidential</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <i className="ri-shield-check-line text-xs leading-none" />
                      <span className="font-semibold">HIPAA Secure</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <i className="ri-time-line text-xs leading-none" />
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

/** Floating-label input — dark variant for use on espresso/dark backgrounds. */
function FloatingInput({
  id,
  label,
  type,
  placeholder,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
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
