import Link from "next/link";
import { INSURANCE_LOGOS_BASE, type InsuranceCarrier } from "@/data/insurance";

type LogoSurface = "dark" | "moss";

type InsuranceLogoProps = {
  carrier: InsuranceCarrier;
  /** dark = hero/charcoal; moss = green tile on light pages */
  surface?: LogoSurface;
  className?: string;
  link?: boolean;
  compact?: boolean;
};

/**
 * Carrier PNGs are white marks on black squares — display with mix-blend-mode: screen
 * so the black disappears on dark/moss backgrounds (same as homepage).
 */
export function InsuranceLogoImage({
  carrier,
  surface = "dark",
  className = "",
  compact = false,
}: Omit<InsuranceLogoProps, "link">) {
  const shell =
    surface === "dark"
      ? compact
        ? "flex h-12 shrink-0 items-center justify-center border border-white/10 bg-black/40 px-3 py-2"
        : "flex h-14 items-center justify-center border border-white/10 bg-black/30 px-4 py-3"
      : compact
        ? "flex h-12 items-center justify-center bg-[var(--sr-moss)] px-4 py-2"
        : "flex h-16 items-center justify-center bg-[var(--sr-moss)] px-6 py-4 md:h-[72px]";

  return (
    <span className={`${shell} ${className}`}>
      {/* Native img — blend mode + external PNG; avoids next/image sizing issues */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${INSURANCE_LOGOS_BASE}/${carrier.file}`}
        alt={`${carrier.name} logo`}
        width={200}
        height={80}
        loading="lazy"
        decoding="async"
        className={
          compact
            ? "max-h-8 w-full max-w-[120px] object-contain object-center md:max-h-9"
            : "max-h-10 w-full max-w-[160px] object-contain object-center md:max-h-11"
        }
        style={{ mixBlendMode: "screen" }}
      />
    </span>
  );
}

export default function InsuranceLogo({
  carrier,
  surface = "dark",
  className = "",
  link = true,
  compact = false,
}: InsuranceLogoProps) {
  const inner = (
    <InsuranceLogoImage
      carrier={carrier}
      surface={surface}
      className={className}
      compact={compact}
    />
  );

  if (!link) return inner;

  return (
    <Link
      href={carrier.href}
      className="block min-w-0 transition hover:opacity-90"
      title={`${carrier.name} rehab coverage`}
    >
      {inner}
    </Link>
  );
}
