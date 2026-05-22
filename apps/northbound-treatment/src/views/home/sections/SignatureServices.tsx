import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SIGNATURE_IMAGES, SIGNATURE_PAGE_IMAGES } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * Signature Services — navy section with a balanced 3+2 grid on desktop:
 * three equal tiles on row one, two wider tiles on row two (no orphan gap).
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
  /** "third" = 1/3 width on md+; "half" = 1/2 width on md+ */
  layout: "third" | "half";
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
    alt: "Outdoor meditation circle with Adirondack seating at The Grove during adventure therapy.",
    layout: "third",
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
    alt: "Wolf ambassador during a supervised wolf-assisted therapy session at Northbound.",
    layout: "third",
  },
  {
    title: "Spiritual Track",
    badge: "Holistic",
    badgeText: "text-sand-light",
    badgeBar: "bg-sand-dark",
    href: "/spiritual-track/",
    description:
      "Sound therapy, breathwork, meditation, and somatic yoga at our Garden Grove campus — integrated practices that regulate the nervous system and support lasting recovery.",
    image: SIGNATURE_PAGE_IMAGES.spiritualWellness,
    alt: "Outdoor meditation circle on the lawn at Northbound's Garden Grove campus.",
    layout: "third",
  },
  {
    title: "Art Therapy",
    badge: "Expressive",
    badgeText: "text-terracotta",
    badgeBar: "bg-terracotta",
    description:
      "A non-verbal outlet allowing clients to safely process complex emotions and trauma through painting and creative design.",
    image: SIGNATURE_IMAGES.artTherapy,
    alt: "Commons area at The Grove with GROVE marquee sign — expressive arts and community spaces.",
    layout: "half",
  },
  {
    title: "Sound Bath Healing",
    badge: "Holistic",
    badgeText: "text-sand-light",
    badgeBar: "bg-sand-dark",
    description:
      "Utilizing vibrational frequencies to guide the mind into deep meditative states, drastically reducing clinical anxiety.",
    image: SIGNATURE_IMAGES.soundBath,
    alt: "Calming lounge with meditation décor at The Grove — sound and mindfulness programming.",
    layout: "half",
  },
];

const LAYOUT_CLASS: Record<Tile["layout"], string> = {
  third: "md:col-span-2",
  half: "md:col-span-3",
};

function ServiceTile({ tile }: { tile: Tile }) {
  const layoutClass = LAYOUT_CLASS[tile.layout];
  const cardClass = `group relative h-[360px] overflow-hidden border border-white/10 bg-navy md:h-[400px] ${layoutClass}`;

  const content = (
    <>
      <Image
        src={tile.image}
        alt={tile.alt}
        fill
        sizes={
          tile.layout === "half"
            ? "(min-width: 768px) 50vw, 100vw"
            : "(min-width: 768px) 33vw, 100vw"
        }
        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-navy/80 via-navy/25 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
        <div className="mb-3 flex items-center gap-4">
          <span className={`h-px w-8 ${tile.badgeBar}`}></span>
          <span
            className={`text-xs font-bold uppercase tracking-[0.22em] ${tile.badgeText}`}
          >
            {tile.badge}
          </span>
        </div>
        <h3
          className={`mb-3 font-serif text-sand-light ${
            tile.layout === "half" ? "text-3xl" : "text-2xl md:text-3xl"
          }`}
        >
          {tile.title}
        </h3>
        <p
          className={`text-sm font-light text-white/70 ${
            tile.layout === "half" ? "max-w-xl" : "max-w-sm"
          }`}
        >
          <AutoLinkedText>{tile.description}</AutoLinkedText>
        </p>
        {tile.href ? (
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-terracotta opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-3">
            Learn More
            <span aria-hidden="true">&rarr;</span>
          </span>
        ) : null}
      </div>
    </>
  );

  if (tile.href) {
    return (
      <Link href={tile.href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

export default function SignatureServices() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-24 text-sand-light"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#F4EFE6 2px, transparent 2px)",
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
              <AutoLinkedText>
                {
                  "Because no two paths to recovery are identical, we offer unique,\n              highly specialized therapeutic modalities. We integrate\n              progressive holistic and experiential methods to help you\n              reconnect your mind, body, and spirit."
                }
              </AutoLinkedText>
            </p>
          </div>
          <div className="flex-shrink-0 pb-2">
            <p className="font-serif text-sm italic text-white/40">
              <AutoLinkedText>{"Curated healing experiences."}</AutoLinkedText>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {TILES.map((tile) => (
            <ServiceTile key={tile.title} tile={tile} />
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-light text-white/50">
            Also offering:{" "}
            <span className="font-medium text-white">
              Faith-Based Recovery, EMDR, Careerbound&reg; & Collegebound&reg;
              (residential only).
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
