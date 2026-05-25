import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.995575348495!2d-117.65351502430251!3d33.60541927332847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce9f278ef551d%3A0xe80a87b145363965!2sSullivan%20Recovery%20Detox%20Drug%20%26%20Alcohol%20Rehab%20Center!5e0!3m2!1sen!2sus!4v1723581418551!5m2!1sen!2sus";

const ADDRESS = "24731 Via San Fernando, Mission Viejo, CA 92692";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=24731+Via+San+Fernando,+Mission+Viejo,+CA+92692";
const STEPS = [
  {
    label: "From John Wayne Airport (SNA)",
    text: "Get on I-405 N toward Long Beach.",
  },
  {
    label: "Merge north",
    text: "Follow I-405 N to CA-73 N in Mission Viejo. Take exit 79.",
  },
  {
    label: "CA-73 N",
    text: "Merge onto CA-73 N. Take exit 5 for Oso Pkwy toward Mission Viejo / Laguna Niguel.",
  },
  {
    label: "Final turns",
    text: "Turn left onto Oso Pkwy, then left onto Marguerite Pkwy. Turn right onto Via San Fernando — Sullivan Recovery is on the left.",
  },
];

export default function HomeLocation() {
  return (
    <section className="bg-[var(--sr-parchment)] py-[100px]">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-px bg-[var(--sr-sand)] lg:grid-cols-12">

          {/* Map column */}
          <div className="relative bg-[var(--sr-parchment)] lg:col-span-7">
            <div className="relative h-[360px] w-full overflow-hidden md:h-[480px] lg:h-full lg:min-h-[560px]">
              <iframe
                title="Sullivan Recovery location on Google Maps"
                src={MAP_EMBED}
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Address card overlay */}
              <div className="absolute left-0 top-0 max-w-sm border border-[var(--sr-sand)] bg-[var(--sr-parchment)]/95 p-6 shadow-lg backdrop-blur-sm">
                <p
                  className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--sr-fern)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Visit Us
                </p>
                <p
                  className="mb-3 text-xl font-light text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Sullivan Recovery
                </p>
                <p
                  className="mb-4 text-[13px] leading-relaxed text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {ADDRESS}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-fern)] transition hover:text-[var(--sr-ink)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <i className="ri-map-pin-line" />
                    Directions
                  </a>
                  <CallRailPhoneLink
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--sr-fern)] transition hover:text-[var(--sr-ink)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <i className="ri-phone-line" aria-hidden />
                    {CALLRAIL_PHONE_DISPLAY}
                  </CallRailPhoneLink>
                </div>
              </div>
            </div>
          </div>

          {/* Directions column */}
          <div className="flex flex-col justify-center bg-white px-8 py-12 lg:col-span-5 lg:px-10 lg:py-14">
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Location
            </p>
            <h2
              className="mb-4 text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Drug detox in <br />
              <em className="italic text-[var(--sr-fern)]">Mission Viejo</em>
            </h2>
            <p
              className="mb-10 text-[14px] leading-[1.85] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sullivan Recovery is located in the heart of South Orange County —
              minutes from the 73 freeway and a short drive from John Wayne Airport.
            </p>

            <ol className="mb-10 space-y-0">
              {STEPS.map((step, i) => (
                <li
                  key={step.label}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-[var(--sr-sand)] py-5 first:border-t-0 first:pt-0"
                >
                  <span
                    className="text-[11px] font-medium tabular-nums tracking-[0.15em] text-[var(--sr-clay)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      className="mb-1 text-sm font-medium text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-[13px] leading-relaxed text-[var(--sr-muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/insurance/"
              className="sr-btn-primary inline-flex w-fit items-center gap-2 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.12em]"
            >
              Contact Us
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
