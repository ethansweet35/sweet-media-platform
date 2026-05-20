import Link from "next/link";

interface MarketingStubPageProps {
  title: string;
  description: string;
  relatedLinks?: { label: string; href: string }[];
}

/** Temporary shell for Squarespace routes not yet ported from Readdy. */
export default function MarketingStubPage({
  title,
  description,
  relatedLinks = [],
}: MarketingStubPageProps) {
  return (
    <main className="bg-soft-white min-h-[60vh]">
      <div className="max-w-content mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-[12px] font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-4">
          The Family Recovery Foundation
        </p>
        <h1 className="font-display text-display-m text-deep-navy mb-6">{title}</h1>
        <p className="text-[17px] font-body text-slate max-w-2xl leading-relaxed mb-10">{description}</p>
        <p className="text-[15px] font-body text-stone-blue mb-8">
          This page is being migrated from the live site with full content and layout parity.
        </p>
        {relatedLinks.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-powder-blue bg-pure-white px-5 py-2.5 text-[14px] font-body font-medium text-deep-navy hover:border-tfrf-blue hover:text-tfrf-blue transition-colors"
                >
                  {link.label}
                  <i className="ri-arrow-right-line" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
