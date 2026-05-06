import type { Metadata } from "next";
import { AdminGuard } from "@sweetmedia/admin-core";
import { AdminChrome } from "@sweetmedia/admin-core";

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
    <AdminGuard>
      <AdminChrome brandName="Client Brand Admin" brandInitial="C">{children}</AdminChrome>
    </AdminGuard>
  );
}
