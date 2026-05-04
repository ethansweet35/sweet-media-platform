import { AdminGuard } from "@sweetmedia/admin-core";
import { AdminChrome } from "@sweetmedia/admin-core";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminChrome brandName="Client Brand Admin" brandInitial="I">{children}</AdminChrome>
    </AdminGuard>
  );
}
