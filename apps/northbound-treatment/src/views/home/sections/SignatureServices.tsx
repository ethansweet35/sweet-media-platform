import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SIGNATURE_IMAGES } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * Signature Services — espresso bg, 6-tile editorial grid using a 12-column
 * grid with mixed widths to create a magazine-style layout. Per Figma
 * SignatureServices.tsx.
 *
 * Tailwind v4 cannot resolve `text-${badgeColor}` dynamically, so each tile
 * carries explicit literal class strings.
 */

type Tile = {
  title: string;
  badge: string;
  badgeText: string;
  badgeBar: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
  /** column-span class (applies on md+) */
  span: string;
  /** card height */
  height: string;
  /** larger headline class for the wider tiles */
  headline: string;
};

const TILES: Tile[] = [
  {
    title: "Adventure Therapy",
    badge: "Experiential",
    badgeText: "text-terracotta",
    badgeBar: "bg-terracotta",
    href: "/adventure-therapy-program/",
    description:
      "Rebuilding confidence, resilience, and trust through guided outdoor challenges, hiking, and deep nature connection in the California landscape.",
    image: SIGNATURE_IMAGES.adventureTherapy,
    alt: "Northbound clients hiking a Southern California coastal trail at golden hour as part of adventure therapy.",
    span: "md:col-span-8",
    height: "h-[400px]",
    headline: "text-3xl",
  },
  {
    title: "Sound Bath Healing",
    badge: "Holistic",
    badgeText: "text-sand-light",
    badgeBar: "bg-sand-dark",
    description:
      "Utilizing vibrational frequencies to guide the mind into deep meditative states, drastically reducing clinical anxiety.",
    image: SIGNATURE_IMAGES.soundBath,
    alt: "Bronze and crystal singing bowls arranged for a sound bath session at Northbound.",
    span: "md:col-span-4",
    height: "h-[400px]",
    headline: "text-2xl",
  },
  {
    title: "Art Therapy",
    badge: "Expressive",
    badgeText: "text-terracotta",
    badgeBar: "bg-terracotta",
    description:
      "A non-verbal outlet allowing clients to safely process complex emotions and trauma through painting and creative design.",
    image: SIGNATURE_IMAGES.artTherapy,
    alt: "Half-finished abstract painting on an easel inside Northbound's warm sunlit art therapy studio.",
    span: "md:col-span-5",
    height: "h-[400px]",
    headline: "text-2xl",
  },
  {
    title: "Wolf Assisted Therapy",
    badge: "Experiential",
    badgeText: "text-sand-light",
    badgeBar: "bg-sand-dark",
    href: "/wolf-assisted-therapy/",
    description:
      "A profound experiential therapy utilizing the highly intuitive pack-nature of wolves to mirror emotions, build boundaries, and address deep-seated trauma safely.",
    image: SIGNATURE_IMAGES.wolfTherapy,
    alt: "Calm gray timber wolf in a sunlit forest clearing during a Northbound wolf-assisted therapy session.",
    span: "md:col-span-7",
    height: "h-[400px]",
    headline: "text-3xl",
  },
  {
    title: "Mindfulness & Somatic Yoga",
    badge: "Holistic",
    badgeText: "text-sand-light",
    badgeBar: "bg-sand-dark",
    description:
      "Integrating breathwork and physical movement to reconnect the mind and body, establishing a foundation for emotional regulation.",
    image: SIGNATURE_IMAGES.yoga,
    alt: "Sage green yoga mat unrolled on warm wood floor in Northbound's mindfulness and somatic yoga studio.",
    span: "md:col-span-6",
    height: "h-[350px]",
    headline: "text-2xl",
  },
];

export default function SignatureServices() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-24 text-sand-light"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#F4EFE6 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 border-b border-white/10 pb-8 md:flex-row">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-terracotta">
              <AutoLinkedText>{"Holistic & Experiential"}</AutoLinkedText>
            </p>
            <h2 className="mb-6 font-serif text-4xl lg:text-5xl">
              Signature Services.
            </h2>
            <p className="font-light leading-relaxed text-white/60">
              <AutoLinkedText>{"Because no two paths to recovery are identical, we offer unique,\n              highly specialized therapeutic modalities. We integrate\n              progressive holistic and experiential methods to help you\n              reconnect your mind, body, and spirit."}</AutoLinkedText>
            </p>
          </div>
          <div className="flex-shrink-0 pb-2">
            <p className="font-serif text-sm italic text-white/40">
              <AutoLinkedText>{"Curated healing experiences."}</AutoLinkedText>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {TILES.map((tile) => {
            const Wrapper = tile.href
              ? ({ children }: { children: ReactNode }) => (
                  <Link href={tile.href!} className={`group relative overflow-hidden border border-white/10 bg-navy ${tile.span} ${tile.height}`}>
                    {children}
                  </Link>
                )
              : ({ children }: { children: ReactNode }) => (
                  <div className={`group relative overflow-hidden border border-white/10 bg-navy ${tile.span} ${tile.height}`}>
                    {children}
                  </div>
                );
            return (
            <Wrapper key={tile.title}>
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-85 grayscale-0 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient only on lower ~55% so photography stays visible; lighter stops for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-navy/75 via-navy/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="mb-3 flex items-center gap-4">
                  <span className={`h-[1px] w-8 ${tile.badgeBar}`}></span>
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.22em] ${tile.badgeText}`}
                  >
                    {tile.badge}
                  </span>
                </div>
                <h3
                  className={`mb-3 font-serif text-sand-light ${tile.headline}`}
                >
                  {tile.title}
                </h3>
                <p
                  className={`text-sm font-light text-white/70 ${
                    tile.span === "md:col-span-8" ||
                    tile.span === "md:col-span-7"
                      ? "max-w-lg"
                      : ""
                  }`}
                ><AutoLinkedText>{tile.description}</AutoLinkedText></p>
              </div>
            </Wrapper>
            );
          })}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-light text-white/50">
            Also offering:{" "}
            <span className="font-medium text-white">
              Faith-Based Recovery, EMDR, Careerbound&reg; & Collegebound&reg;.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
