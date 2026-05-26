"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, isAdmin]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col bg-white" style={{ fontFamily: "var(--font-montserrat)" }}>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 border-t border-white/10 bg-dark px-4 py-3">
          <a
            href={SITE.phone.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-colors active:bg-white/90"
          >
            <i className="ri-phone-fill text-sm" />
            {SITE.phone.display}
          </a>
          <a
            href="/admissions"
            className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors active:bg-white/10"
          >
            Apply
          </a>
        </div>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 hidden transition-all duration-500 md:flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a
          href={SITE.phone.href}
          className="flex items-center gap-3 rounded-full bg-dark py-4 pl-5 pr-6 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-colors hover:bg-cta-hover"
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
            <i className="ri-phone-fill text-sm" />
          </div>
          Call Now — Free Consult
        </a>
      </div>
    </div>
  );
}
