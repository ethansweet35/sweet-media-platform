import type { Metadata } from "next";
import { AdminGuard } from "@sweetmedia/admin-core";
import { AdminChrome } from "@sweetmedia/admin-core";
import { Providers } from "../providers";

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
    <Providers>
      <AdminGuard>
        <AdminChrome brandName="Inner Peak Admin" brandInitial="I">
          {children}
        </AdminChrome>
      </AdminGuard>
    </Providers>
  );
}
