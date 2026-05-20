"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
    <div className="min-h-screen flex flex-col bg-soft-white">
      <Navbar />
      <div
        className={
          isHome
            ? "flex-1"
            : "flex-1 pt-[5.5rem] md:pt-[6.25rem] lg:pt-[7.25rem]"
        }
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
