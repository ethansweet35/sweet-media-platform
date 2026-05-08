import { TRUST_SIGNALS } from "@/data/site";

const ITEMS = [
  { icon: "ri-group-line", label: TRUST_SIGNALS.familiesHelpedTagline },
  { icon: "ri-shield-check-line", label: TRUST_SIGNALS.accreditation },
  { icon: "ri-time-line", label: `${TRUST_SIGNALS.availability} crisis line` },
  { icon: "ri-map-pin-line", label: "Nationwide on-site coverage" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[var(--color-divider)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
              <i className={`text-xl ${item.icon}`}></i>
            </div>
            <span className="text-sm font-medium text-[var(--color-ink)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
