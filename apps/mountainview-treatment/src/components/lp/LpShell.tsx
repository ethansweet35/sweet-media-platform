import Image from "next/image";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { label: "Levels of Care", href: "#levels" },
  { label: "What We Treat",  href: "#overview" },
  { label: "How It Works",   href: "#admissions" },
  { label: "Insurance",      href: "#insurance" },
  { label: "FAQ",            href: "#faq" },
];

export default function LpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--mvt-cream)]">
      {/* LP header — sticky, logo + anchor nav + phone */}
      <header className="sticky top-0 z-50 border-b border-[var(--mvt-cream-2)] bg-white shadow-sm">
        <div className="mx-auto max-w-[1280px] px-6 h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center" aria-label={SITE.brand}>
            <Image
              src={SITE.assets.logoHorizontal}
              alt={SITE.brand}
              width={280}
              height={109}
              className="h-12 w-auto object-contain"
              priority
              loading="eager"
            />
          </a>

          {/* Desktop anchor nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--mvt-muted)] hover:text-[var(--mvt-ink)] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone CTA */}
          <a
            href={SITE.phone.href}
            className="shrink-0 flex items-center gap-2 bg-[var(--mvt-forest)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
          >
            <i className="ri-phone-fill text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">{SITE.phone.display}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Minimal LP footer */}
      <footer className="border-t border-[var(--mvt-cream-2)] bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[var(--mvt-muted)] leading-relaxed">
            <p className="font-medium text-[var(--mvt-ink)]">{SITE.brand} — Seattle Addiction &amp; Mental Health Recovery</p>
            <p>{SITE.address.full}</p>
            <p className="mt-1">Licensed by the Washington State Department of Health</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--mvt-muted)]">
            <a href="/terms-service" className="hover:text-[var(--mvt-ink)] transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="/privacy-policy" className="hover:text-[var(--mvt-ink)] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href={SITE.phone.href} className="hover:text-[var(--mvt-ink)] transition-colors">{SITE.phone.display}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
