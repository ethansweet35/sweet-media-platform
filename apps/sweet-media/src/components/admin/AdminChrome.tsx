"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ADMIN_CREAM_MAIN, adminFontSans } from "@sweetmedia/admin-core";

export default function AdminChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className={`flex min-h-screen ${adminFontSans}`}>
      <AdminSidebar />
      <main className="min-h-screen flex-1 min-w-0" style={{ backgroundColor: ADMIN_CREAM_MAIN }}>
        <div className="mx-auto min-h-screen max-w-[1400px] px-5 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
