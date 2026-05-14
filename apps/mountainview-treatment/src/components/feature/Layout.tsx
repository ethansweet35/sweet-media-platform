"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE } from "@/lib/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, isAdmin]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col bg-white text-[var(--mvt-text)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Mobile sticky CTA */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 lg:hidden ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="pointer-events-auto mx-auto flex max-w-md items-stretch gap-2 bg-[var(--mvt-ink)] p-3 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.45)]">
          <a
            href={SITE.phone.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--mvt-forest)] py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            <i className="ri-phone-fill" aria-hidden="true" /> Call Now
          </a>
          <a
            href="/admissions/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/40 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Verify Insurance
          </a>
        </div>
      </div>
    </div>
  );
}
