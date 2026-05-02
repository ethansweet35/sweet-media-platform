import AdminGuard from "@/components/admin/AdminGuard";
import AdminChrome from "@/components/admin/AdminChrome";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminChrome>{children}</AdminChrome>
    </AdminGuard>
  );
}
