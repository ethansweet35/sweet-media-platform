import { cn } from "@/lib/cn";
import Link from "next/link";

type Variant = "accent" | "ink" | "outline-ink" | "outline-white";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantMap: Record<Variant, string> = {
  accent:        "bg-accent text-white hover:bg-accent/90",
  ink:           "bg-ink text-white hover:bg-ink/85",
  "outline-ink": "border border-ink/30 text-ink hover:bg-ink hover:text-white",
  "outline-white":"border border-white/30 text-white hover:bg-white/10",
};

const sizeMap: Record<Size, string> = {
  sm: "px-7 py-3.5 text-[11px]",
  md: "px-8 py-4 text-[11px]",
  lg: "px-10 py-4 text-[11px]",
};

const BASE = "inline-flex items-center font-medium uppercase tracking-[0.2em] transition-all";

/**
 * Reusable brand button.
 *
 * Variants:
 *  - accent       → amber fill (primary CTA on light bg)
 *  - ink          → charcoal fill (primary CTA on light bg, nav phone)
 *  - outline-ink  → charcoal outline (secondary CTA on light bg)
 *  - outline-white → white outline (secondary CTA on dark bg)
 */
export default function Button({
  children,
  href,
  variant = "ink",
  size = "sm",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(BASE, variantMap[variant], sizeMap[size], className);

  if (href) {
    if (href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} suppressHydrationWarning>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
