"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

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
      <div
        className={
          isHome
            ? "flex-1 -mt-[5.25rem] md:-mt-[5.75rem]"
            : "flex-1 pt-[5.25rem] md:pt-[5.75rem]"
        }
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
