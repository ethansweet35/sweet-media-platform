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
        <AdminChrome brandName="An Invite To Life Admin" brandInitial="AI">{children}</AdminChrome>
      </AdminGuard>
    </AuthProvider>
  );
}
