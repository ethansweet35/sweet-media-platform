import Link from "next/link";
import { cn } from "@/lib/cn";

export type AmhButtonVariant =
  | "primary"
  | "secondary"
  | "phone"
  | "darkPrimary"
  | "darkSecondary"
  | "textLink";

type AmhButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: AmhButtonVariant;
  icon?: string;
  iconPosition?: "left" | "right";
  className?: string;
  external?: boolean;
};

const variantClasses: Record<AmhButtonVariant, string> = {
  primary:
    "rounded-2xl bg-cta px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  secondary:
    "rounded-2xl border border-border bg-white px-8 py-4 text-sm font-semibold text-ink shadow-sm transition hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  phone:
    "rounded-2xl border border-border bg-white px-8 py-4 text-sm font-semibold text-ink shadow-sm transition hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  darkPrimary:
    "rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
  darkSecondary:
    "rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
  textLink:
    "text-sm font-semibold text-accent-dark transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
};

const iconAccentClasses: Partial<Record<AmhButtonVariant, string>> = {
  primary: "text-accent",
  phone: "text-accent",
  darkPrimary: "text-accent",
  darkSecondary: "text-accent",
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function AmhButton({
  href,
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  className,
  external,
}: AmhButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    variantClasses[variant],
    className,
  );

  const iconEl = icon ? (
    <i className={cn(icon, iconAccentClasses[variant])} aria-hidden />
  ) : null;

  const content = (
    <>
      {icon && iconPosition === "left" ? iconEl : null}
      {children}
      {icon && iconPosition === "right" ? iconEl : null}
    </>
  );

  if (href.startsWith("tel:") || external || isExternalHref(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(external || isExternalHref(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
