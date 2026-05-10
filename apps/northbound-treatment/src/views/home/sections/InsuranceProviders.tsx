import Image from "next/image";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * InsuranceProviders — preferred in-network providers grid.
 * Logos sourced from Northbound's live site, hosted in Supabase storage.
 */
const SUPABASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const PROVIDERS = [
  {
    name: "Aetna",
    logo: `${SUPABASE}/insurance-aetna.png`,
    tagline: "In-Network Preferred",
    description: "Verify your Aetna benefits and begin compassionate, evidence-based care with full confidence in your coverage.",
  },
  {
    name: "Anthem",
    logo: `${SUPABASE}/insurance-anthem.png`,
    tagline: "In-Network Preferred",
    description: "Check your Anthem coverage and take the first step toward healing with a team that maximizes your plan.",
  },
  {
    name: "Beacon Health",
    logo: `${SUPABASE}/insurance-beacon.png`,
    tagline: "In-Network Preferred",
    description: "Confirm your Beacon benefits and start supportive, person-centered treatment at little to no cost.",
  },
  {
    name: "BlueCross BlueShield",
    logo: `${SUPABASE}/insurance-bcbs.png`,
    tagline: "In-Network Preferred",
    description: "BCBS members — check your coverage and start treatment with understanding, compassion, and financial clarity.",
  },
  {
    name: "Cigna",
    logo: `${SUPABASE}/insurance-cigna.png`,
    tagline: "In-Network Preferred",
    description: "Verify your Cigna benefits and begin your recovery journey with an experienced and dedicated clinical team.",
  },
  {
    name: "ComPsych",
    logo: `${SUPABASE}/insurance-compsych.png`,
    tagline: "In-Network Preferred",
    description: "Use your ComPsych benefits to access care that truly meets you where you are, on your timeline.",
  },
  {
    name: "First Health",
    logo: `${SUPABASE}/insurance-first-health.png`,
    tagline: "In-Network Preferred",
    description: "See what your First Health plan covers and move forward with gentle, guided support from day one.",
  },
  {
    name: "MHN Insurance",
    logo: `${SUPABASE}/insurance-mhn.png`,
    tagline: "In-Network Preferred",
    description: "Discover how your MHN plan supports treatment. Quick and confidential verification available 24/7.",
  },
  {
    name: "TriCare",
    logo: `${SUPABASE}/insurance-tricare.png`,
    tagline: "Veterans & Military",
    description: "Verify your Tricare benefits and access steady, veteran-informed support tailored to your service experience.",
  },
  {
    name: "MultiPlan",
    logo: `${SUPABASE}/insurance-multiplan.png`,
    tagline: "In-Network Preferred",
    description: "Explore your MultiPlan benefits and begin recovery with comfort, reassurance, and reduced out-of-pocket costs.",
  },
];

export default function InsuranceProviders() {
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      {/* Background accents */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-terracotta/8 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-terracotta/6 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-terracotta" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              Insurance Coverage
            </p>
            <div className="h-[2px] w-12 bg-terracotta" />
          </div>
          <h2 className="mb-5 font-serif text-4xl text-white lg:text-5xl">
            A Preferred Provider for Most Insurance Plans
          </h2>
          <p className="font-light leading-relaxed text-white/55">
            <AutoLinkedText>{"Northbound Treatment Services is an in-network preferred provider with 15+ major insurance plans. Our admissions team works directly with your insurer to verify benefits, minimize out-of-pocket costs, and remove every financial barrier between you and care."}</AutoLinkedText>
          </p>
        </div>

        {/* Provider grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PROVIDERS.map((provider) => (
            <div
              key={provider.name}
              className="group flex flex-col gap-5 border border-white/10 bg-white p-6 transition-all duration-300 hover:border-terracotta/40 hover:shadow-lg hover:shadow-terracotta/10"
            >
              {/* Logo */}
              <div className="flex h-16 items-center">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={180}
                  height={64}
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-terracotta">
                  {provider.tagline}
                </span>
                <p className="text-xs font-light leading-relaxed text-espresso/60"><AutoLinkedText>{provider.description}</AutoLinkedText></p>
              </div>

              <a
                href="/admissions"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-espresso/30 transition-colors duration-300 group-hover:text-terracotta"
              >
                Verify Benefits
                <i className="ri-arrow-right-s-line text-sm leading-none" />
              </a>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="flex flex-col items-center gap-5 border-t border-white/10 pt-12 text-center">
          <p className="text-sm font-light text-white/50">
            Not sure if your plan is covered?{" "}
            <span className="font-medium text-white">Call us — we verify benefits for free.</span>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/admissions"
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta-light"
            >
              <i className="ri-shield-check-line text-sm leading-none" />
              Verify Your Insurance
            </a>
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <i className="ri-phone-line text-sm leading-none" />
              (866) 311-0003
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
