import type { Metadata } from "next";
import { AdminGuard, AdminChrome, AuthProvider } from "@sweetmedia/admin-core";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <AdminGuard>
        {/*
          Sweet-media's globals.css overrides --font-sans with Outfit, which
          bleeds into the admin UI via Tailwind's font-sans utility. This
          wrapper resets the font stack back to the system UI default used by
          admin-core so columns, tables, and layouts render consistently with
          every other brand admin.
        */}
        <div style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
          <AdminChrome brandName="Sweet Media Admin" brandInitial="S">
            {children}
          </AdminChrome>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
