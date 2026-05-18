"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
    </div>
  );
}
