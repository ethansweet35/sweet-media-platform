import Link from "next/link";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";

interface MarketingPageHeroProps {
  eyebrow?: string;
  title: string;
  body: string;
  variant?: "light" | "dark";
  children?: React.ReactNode;
}

export default function MarketingPageHero({
  eyebrow,
  title,
  body,
  variant = "light",
  children,
}: MarketingPageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        isDark
          ? `bg-deep-navy text-pure-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24`
          : `bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24 lg:pb-28`
      }
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {eyebrow ? (
          <p
            className={`text-[12px] font-body font-semibold uppercase tracking-[0.2em] mb-4 ${
              isDark ? "text-sky-blue" : "text-tfrf-blue"
            }`}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`text-[clamp(32px,4vw,52px)] font-display leading-[1.08] max-w-3xl mb-6 ${
            isDark ? "text-pure-white" : "text-deep-navy"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-[17px] font-body leading-relaxed max-w-2xl ${
            isDark ? "text-pure-white/80" : "text-slate"
          }`}
        >
          {body}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

interface MarketingCtaLinkProps {
  href: string;
  label: string;
  primary?: boolean;
}

export function MarketingCtaLink({ href, label, primary }: MarketingCtaLinkProps) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
          : "inline-flex items-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-mist transition-colors"
      }
    >
      {label}
      <i className="ri-arrow-right-line" />
    </Link>
  );
}
