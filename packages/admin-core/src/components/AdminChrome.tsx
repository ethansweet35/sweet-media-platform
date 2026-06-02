"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";
import AdminFonts from "./AdminFonts";
import { AdminCommandPaletteProvider } from "./AdminCommandPalette";
import { BlogPlannerBulkJobProvider } from "../contexts/BlogPlannerBulkJobContext";
import { ContentEditorBulkJobProvider } from "../contexts/ContentEditorBulkJobContext";
import AdminBackgroundActivity from "./admin/AdminBackgroundActivity";
import {
  ADMIN_SURFACE,
  ADMIN_TEXT,
  adminFontSans,
} from "../lib/adminTheme";

export interface AdminChromeProps {
  children: ReactNode;
  brandName?: string;
  brandInitial?: string;
}

export default function AdminChrome({
  children,
  brandName = "Admin",
  brandInitial = "A",
}: AdminChromeProps) {
  const pathname = usePathname();
  const isLogin =
    pathname === "/admin/login" || pathname === "/admin/login/";
  const isSetup =
    pathname === "/admin/setup" || pathname === "/admin/setup/";
  const isForgotPassword =
    pathname === "/admin/forgot-password" || pathname === "/admin/forgot-password/";
  const isResetPassword =
    pathname === "/admin/reset-password" || pathname === "/admin/reset-password/";

  if (isLogin || isSetup || isForgotPassword || isResetPassword) {
    return (
      <>
        <AdminFonts />
        {children}
      </>
    );
  }

  return (
    <>
      <AdminFonts />
      <BlogPlannerBulkJobProvider>
        <ContentEditorBulkJobProvider>
        <AdminCommandPaletteProvider>
          <div
            className={`flex min-h-screen ${adminFontSans}`}
            style={{ color: ADMIN_TEXT }}
          >
            <AdminSidebar brandName={brandName} brandInitial={brandInitial} />
            <div
              className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden"
              style={{ backgroundColor: ADMIN_SURFACE }}
            >
              <AdminTopBar />
              <main className="min-w-0 flex-1 overflow-x-hidden">
                <div className="mx-auto min-w-0 max-w-[1400px] px-4 py-6 sm:px-5 md:px-8 md:py-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <AdminBackgroundActivity />
        </AdminCommandPaletteProvider>
        </ContentEditorBulkJobProvider>
      </BlogPlannerBulkJobProvider>
    </>
  );
}
