import { AdminGuard } from "@sweetmedia/admin-core";
import { AdminChrome } from "@sweetmedia/admin-core";
import { Providers } from "../providers";

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
