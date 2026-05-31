import type { Metadata } from "next";
import { AdminGuard, AdminChrome, AuthProvider } from "@sweetmedia/admin-core/admin-shell";

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
        <AdminChrome brandName="Northbound Treatment Admin" brandInitial="NT">{children}</AdminChrome>
      </AdminGuard>
    </AuthProvider>
  );
}
