"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "What We Treat", path: "/what-we-treat" },
  { label: "Levels Of Care", path: "/levels-of-care" },
  { label: "Resources", path: "/resources" },
  { label: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-primary)]/10 bg-[var(--color-background)]/95 backdrop-blur-xl">
      <div className="border-b border-[var(--color-primary)]/10 bg-white/70 px-6 py-2 text-xs text-[var(--color-muted)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>San Diego based, serving families across California</span>
          <Link href="/contact" className="font-medium text-[var(--color-primary)] hover:text-[#0f2e40]">
            Confidential support inquiry
          </Link>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        <Link href="/" className="group">
          <div className="text-xl font-semibold tracking-tight text-[var(--color-primary)]">
            Mental Health For Teens
          </div>
          <div className="mt-0.5 text-xs tracking-wide text-[var(--color-muted)]">
            Warm, clinically grounded virtual care
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(23,59,79,0.2)] hover:bg-[#0f2e40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] lg:inline-flex"
        >
          Start Here
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--color-primary)]/20 p-2 text-[var(--color-primary)] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-menu"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation-menu" className="border-t border-[var(--color-primary)]/10 bg-white px-6 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-primary)] hover:bg-[var(--color-background)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
