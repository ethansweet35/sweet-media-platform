"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PHONE_DISPLAY = "949-676-2252";
const PHONE_HREF = "tel:9496762252";

function FloatingCallButton() {
  return (
    <a
      href={PHONE_HREF}
      suppressHydrationWarning
      aria-label={`Call Cipher Billing — ${PHONE_DISPLAY}`}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2.5
        rounded-full bg-[#166C96] shadow-[0_4px_20px_rgba(22,108,150,0.45)]
        px-5 py-3.5
        text-white
        transition-all duration-200
        hover:bg-[#145a82] hover:shadow-[0_6px_28px_rgba(22,108,150,0.6)] hover:scale-[1.03]
        active:scale-[0.97]
        group
      "
    >
      {/* Phone icon */}
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
        <i className="ri-phone-fill text-sm leading-none" />
      </span>

      {/* Text — visible on all screen sizes */}
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
          Call Now
        </span>
        <span className="text-sm font-bold tabular-nums tracking-tight">
          {PHONE_DISPLAY}
        </span>
      </span>
    </a>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isLandingPage = pathname === "/behavioral-health-rcm-lp";

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, isAdmin]);

  if (isAdmin || isLandingPage) return <>{children}</>;

  return (
    <div className="cipher-site min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}
