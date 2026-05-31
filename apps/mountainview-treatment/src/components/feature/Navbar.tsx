"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PRIMARY_NAV } from "@/lib/navigation";
import { SITE } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  return <NavbarInteractive key={pathname} pathname={pathname ?? ""} />;
}

function NavbarInteractive({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility top bar — matches live site: address LEFT, intake + phone RIGHT */}
      <div className="hidden bg-[var(--mvt-ink)] py-2.5 text-[11px] font-semibold tracking-[0.18em] text-white lg:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-12">
          <span className="uppercase text-white/90">{SITE.address.full}</span>
          <div className="flex items-center gap-8">
            <Link
              href="/admissions/"
              className="uppercase text-white underline-offset-4 hover:underline"
            >
              Start Intake Online
            </Link>
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 uppercase text-white hover:text-[var(--mvt-cream)]"
            >
              <i className="ri-phone-fill text-[13px]" aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav — logo left, nav right (no buttons; matches live site) */}
      <div
        className={`bg-white transition-shadow ${
          scrolled ? "shadow-[0_2px_24px_rgba(26,35,30,0.07)]" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-3 lg:px-12 lg:py-4">
          <Link href="/" className="flex items-center" aria-label={SITE.brand}>
            <Image
              src={SITE.assets.logoHorizontal}
              alt={SITE.brand}
              width={400}
              height={156}
              priority
              className="h-12 w-auto lg:h-16"
            />
          </Link>

          {/* Desktop nav (right-aligned to match live) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <NavDropdown key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-[var(--mvt-ink)] lg:hidden"
          >
            <i
              className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--mvt-cream-2)] bg-white shadow-lg lg:hidden">
          <div className="max-h-[80vh] overflow-y-auto px-6 py-4">
            {PRIMARY_NAV.map((item) => (
              <MobileNavItem key={item.href} item={item} pathname={pathname} />
            ))}
            <div className="mt-6 flex flex-col gap-3 border-t border-[var(--mvt-cream-2)] pt-5">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--mvt-forest)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mvt-forest)]"
              >
                <i className="ri-phone-fill" aria-hidden="true" /> {SITE.phone.display}
              </a>
              <Link
                href="/admissions/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mvt-forest)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

type NavDropdownProps = {
  item: (typeof PRIMARY_NAV)[number];
  pathname: string | null;
};

function NavDropdown({ item, pathname }: NavDropdownProps) {
  const hasChildren = (item.children?.length ?? 0) > 0 || (item.groups?.length ?? 0) > 0;
  const active =
    pathname === item.href ||
    (item.href !== "/" && pathname?.startsWith(item.href));

  return (
    <div className="group relative">
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
          active
            ? "text-[var(--mvt-ink)]"
            : "text-[var(--mvt-text)] hover:text-[var(--mvt-ink)]"
        }`}
      >
        {item.label}
        {hasChildren && (
          <i
            className="ri-arrow-down-s-line text-[13px] opacity-60 transition group-hover:rotate-180"
            aria-hidden="true"
          />
        )}
      </Link>

      {hasChildren && (
        <div
          className={`pointer-events-none absolute left-1/2 top-full mt-0 -translate-x-1/2 pt-3 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 ${
            item.groups ? "w-[560px]" : "w-[300px]"
          }`}
        >
          <div className="rounded-2xl border border-[var(--mvt-cream-2)] bg-white p-5 shadow-[0_24px_60px_-20px_rgba(26,35,30,0.25)]">
            {item.groups ? (
              <div className="grid grid-cols-2 gap-4">
                {item.groups.map((group) => (
                  <div key={group.href}>
                    <Link
                      href={group.href}
                      className="mvt-eyebrow block pb-3 hover:text-[var(--mvt-ink)]"
                    >
                      {group.label}
                    </Link>
                    <div className="flex flex-col gap-1.5">
                      {group.children?.map((leaf) => (
                        <Link
                          key={leaf.href}
                          href={leaf.href}
                          className="rounded-md px-2 py-1.5 text-sm text-[var(--mvt-text)] hover:bg-[var(--mvt-cream)] hover:text-[var(--mvt-ink)]"
                        >
                          {leaf.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {item.children?.map((leaf) => (
                  <Link
                    key={leaf.href}
                    href={leaf.href}
                    className="rounded-md px-3 py-2 hover:bg-[var(--mvt-cream)]"
                  >
                    <div className="text-sm font-medium text-[var(--mvt-ink)]">
                      {leaf.label}
                    </div>
                    {leaf.description && (
                      <div className="text-xs text-[var(--mvt-muted)]">
                        {leaf.description}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, pathname }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = (item.children?.length ?? 0) > 0 || (item.groups?.length ?? 0) > 0;
  const active = pathname === item.href;

  return (
    <div className="border-b border-[var(--mvt-cream-2)] last:border-b-0">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className={`flex-1 py-3 text-sm font-semibold uppercase tracking-[0.18em] ${
            active ? "text-[var(--mvt-forest)]" : "text-[var(--mvt-ink)]"
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-2 p-2 text-[var(--mvt-muted)]"
            aria-label={`Toggle ${item.label} submenu`}
          >
            <i
              className={`ri-arrow-down-s-line text-lg transition ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {open && hasChildren && (
        <div className="pb-3 pl-4">
          {item.groups
            ? item.groups.map((group) => (
                <div key={group.href} className="mb-3">
                  <Link
                    href={group.href}
                    className="mvt-eyebrow block py-1"
                  >
                    {group.label}
                  </Link>
                  {group.children?.map((leaf) => (
                    <Link
                      key={leaf.href}
                      href={leaf.href}
                      className="block py-1.5 text-sm text-[var(--mvt-text)]"
                    >
                      {leaf.label}
                    </Link>
                  ))}
                </div>
              ))
            : item.children?.map((leaf) => (
                <Link
                  key={leaf.href}
                  href={leaf.href}
                  className="block py-1.5 text-sm text-[var(--mvt-text)]"
                >
                  {leaf.label}
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
