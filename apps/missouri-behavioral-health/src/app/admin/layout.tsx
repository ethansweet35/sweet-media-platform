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
        <AdminChrome brandName="Missouri Behavioral Health Admin" brandInitial="MB">{children}</AdminChrome>
      </AdminGuard>
    </AuthProvider>
  );
}
