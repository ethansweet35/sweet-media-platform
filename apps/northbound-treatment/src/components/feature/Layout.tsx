"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeFooter from "@/views/home/chrome/HomeFooter";
import HomeNavigation from "@/views/home/chrome/HomeNavigation";
import HomeTopBar from "@/views/home/chrome/HomeTopBar";
import RelatedPostsSection from "@/components/feature/RelatedPostsSection";
import VirtualLpChrome from "@/views/virtual-lp/VirtualLpChrome";

/**
 * Global layout wrapper.
 *
 * - Admin routes: children only (AdminGuard + AdminChrome handle their own shell)
 * - Homepage (/): children only — page.tsx renders TopBar + Nav + Footer directly
 * - All other routes: shared Northbound chrome (TopBar, Nav, Footer)
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isReport = pathname?.startsWith("/report");
  const isHome = pathname === "/";
  const isVirtualLp = pathname === "/virtual-lp" || pathname === "/virtual-lp/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Skip homepage (chrome is owned by page.tsx) and avoid smooth scroll — it fights
    // fixed header compositing and causes visible flicker on route changes in dev.
    if (isAdmin || isHome || isReport) return;
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, isAdmin, isHome, isReport]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin || isHome || isReport) return <>{children}</>;

  if (isVirtualLp) {
    return (
      <div className="min-h-screen bg-white">
        <VirtualLpChrome />
        <main className="pt-[4.75rem]">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HomeTopBar />
      <HomeNavigation />
      {/* pt accounts for fixed TopBar (h-10) + Nav (h-20) */}
      <main className="pt-[7.5rem]">{children}</main>
      <RelatedPostsSection />
      <HomeFooter />

      {!isVirtualLp ? (
      <>
      {/* Mobile sticky CTA — fades in after scroll */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 md:hidden ${
          scrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 bg-navy px-4 py-3">
          <a
            href="tel:8663110003"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terracotta py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition active:bg-terracotta-light"
          >
            <i className="ri-phone-line text-sm" />
            Call Now — Free Help
          </a>
          <a
            href="/admissions/"
            className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition active:bg-white/10"
          >
            <i className="ri-file-list-line text-sm" />
            Admissions
          </a>
        </div>
      </div>

      {/* Desktop floating call button — bottom-right, appears after scroll */}
      <div
        className={`fixed bottom-8 right-8 z-50 hidden transition-all duration-500 md:flex ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href="tel:8663110003"
          className="flex items-center gap-3 bg-navy pl-5 pr-6 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-2xl transition hover:bg-terracotta"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta/30">
            <i className="ri-phone-line text-sm" />
          </span>
          (866) 311-0003
        </a>
      </div>
      </>
      ) : null}
    </div>
  );
}
