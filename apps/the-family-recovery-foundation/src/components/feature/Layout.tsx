"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { LAYOUT_NAV_OVERLAP } from "@/lib/layout";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/report");

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname, isAdmin]);

  if (isAdmin) return <>{children}</>;

  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col",
        isHome ? "bg-deep-navy" : "bg-soft-white",
      )}
    >
      <Navbar />
      <div className={cn("flex-1", LAYOUT_NAV_OVERLAP)}>{children}</div>
      <Footer />
    </div>
  );
}
