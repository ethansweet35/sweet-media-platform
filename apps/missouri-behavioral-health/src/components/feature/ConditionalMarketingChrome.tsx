"use client";

import { usePathname } from "next/navigation";
import Layout from "@/components/feature/Layout";
import { marketingFontClassName } from "@/lib/fonts";

/**
 * Homepage uses `(home)/layout` server chrome; admin uses `admin/layout`.
 * All other marketing routes get the full client Layout + brand fonts.
 */
export default function ConditionalMarketingChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith("/admin") || pathname?.startsWith("/report");
  const isHome = pathname === "/" || pathname === "";

  if (isAdmin || isHome) {
    return <>{children}</>;
  }

  return <div className={marketingFontClassName}>
      <Layout>{children}</Layout>
    </div>;
}
