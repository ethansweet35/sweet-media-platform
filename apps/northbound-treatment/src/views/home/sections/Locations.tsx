import Image from "next/image";
import { LOCATION_IMAGES } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * Locations — 4 facility cards in a 2-col grid. Each card has hero image
 * with a state badge overlay, then copy + checklist + CTA. Per Figma
 * Locations.tsx.
 *
 * Tailwind v4 cannot resolve dynamic class strings, so each location
 * carries explicit literal class names for the badge / link colors.
 */

type ColorTone = {
  /** State badge text + border color */
  badgeText: string;
  badgeBorder: string;
  /** Bullet swatch colors for the feature list */
  bullets: string[];
  /** "Tour Campus" link color */
  link: string;
};

const TONES = {
  terracotta: {
    badgeText: "text-terracotta",
    badgeBorder: "border-terracotta/20",
    bullets: ["bg-terracotta", "bg-terracotta", "bg-terracotta"],
    link: "text-navy",
  } as ColorTone,
  navy: {
    badgeText: "text-navy",
    badgeBorder: "border-navy/20",
    bullets: ["bg-navy", "bg-navy", "bg-navy"],
    link: "text-terracotta",
  } as ColorTone,
} as const;

const LOCATIONS = [
  {
    name: "Newport Beach",
    state: "California",
    description:
      "Located just steps from the coastline, our Newport Beach campus offers a calm, restorative Southern California setting. Designed to seamlessly blend indoor and outdoor living to maximize natural sunlight and ocean breezes.",
    image: LOCATION_IMAGES.newportBeach,
    alt: "Sun-drenched Spanish-Mediterranean Northbound campus exterior in Newport Beach with palm trees and ocean view.",
    features: [
      "Executive En-Suite Rooms",
      "Private On-Site Chef",
      "Oceanview Meditation Spaces",
    ],
    badge: TONES.terracotta,
  },
  {
    name: "Garden Grove",
    state: "California",
    description:
      "Nestled in the heart of Orange County, this expansive campus provides a welcoming and nurturing space. It serves as our primary hub for comprehensive medical detoxification and residential care.",
    image: LOCATION_IMAGES.gardenGrove,
    alt: "Modern stone-clad Northbound treatment campus in Garden Grove, Orange County, with mature olive trees and warm afternoon light.",
    features: [
      "24/7 Medical Detox Wing",
      "State-of-the-Art Fitness Center",
      "Expansive Recreation Grounds",
    ],
    badge: TONES.navy,
  },
  {
    name: "San Diego",
    state: "La Jolla, CA",
    description:
      "Situated in beautiful La Jolla, surrounded by coastal calm and a strong, vibrant local recovery community. This boutique facility specializes in personalized outpatient and transitional living programs.",
    image: LOCATION_IMAGES.sanDiego,
    alt: "Coastal Northbound boutique facility exterior in La Jolla with Pacific ocean view, terracotta planters, and sage green coastal landscaping.",
    features: [
      "Somatic Yoga Studio",
      "Outdoor Therapy Lounges",
      "Careerbound® Resource Center",
    ],
    badge: TONES.terracotta,
  },
  {
    name: "Seattle",
    state: "Washington",
    description:
      "A highly supportive hub for individuals and families across the Pacific Northwest. Bringing Northbound's evidence-based care models into a lush, grounding environment tailored for long-term healing.",
    image: LOCATION_IMAGES.seattle,
    alt: "Cedar-clad Northbound campus exterior nestled in Pacific Northwest evergreen forest with ferns and warm misty light.",
    features: [
      "Pacific NW Nature Integration",
      "Family Support & Education Hub",
      "Modern Therapeutic Interiors",
    ],
    badge: TONES.navy,
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="architectural-border-top bg-sand-light py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-navy">
              Our Campuses
            </p>
            <h2 className="font-serif text-4xl text-espresso lg:text-5xl">
              Facilities near you.
            </h2>
          </div>
          <p className="max-w-md text-sm font-light text-espresso/70">
            <AutoLinkedText>{"We believe your environment dictates your healing. Our meticulously\n            designed, sun-drenched campuses are spread across the West Coast\n            to provide a restorative sanctuary away from the chaos of everyday\n            life."}</AutoLinkedText>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="architectural-border group overflow-hidden bg-sand transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden border-b border-sand-dark lg:h-72">
                <div className="absolute inset-0 z-10 bg-espresso/20 transition-colors duration-500 group-hover:bg-transparent"></div>
                <Image
                  src={loc.image}
                  alt={loc.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  className={`absolute right-4 top-4 z-20 border bg-sand-light/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur ${loc.badge.badgeText} ${loc.badge.badgeBorder}`}
                >
                  {loc.state}
                </div>
              </div>
              <div className="relative p-8 lg:p-10">
                <h4 className="mb-4 font-serif text-3xl text-espresso">
                  {loc.name}
                </h4>
                <p className="mb-6 text-sm font-light leading-relaxed text-espresso/70"><AutoLinkedText>{loc.description}</AutoLinkedText></p>
                <ul className="mb-8 space-y-2 border-t border-sand-dark pt-6">
                  {loc.features.map((feature, fi) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-espresso/80"
                    >
                      <span
                        className={`h-1.5 w-1.5 ${loc.badge.bullets[fi]}`}
                      ></span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors group-hover:text-espresso ${loc.badge.link}`}
                >
                  Tour Campus <span className="text-lg">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
