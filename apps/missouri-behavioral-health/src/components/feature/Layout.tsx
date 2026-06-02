"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MarketingScrollCta from "./MarketingScrollCta";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <div className="flex-1 pt-[116px] lg:pt-[116px]">{children}</div>
      <Footer />
      <MarketingScrollCta />
    </div>
  );
}
