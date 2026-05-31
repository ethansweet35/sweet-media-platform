"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();

  const isPublicAuthPath =
    pathname === "/admin/login" ||
    pathname === "/admin/login/" ||
    pathname === "/admin/setup" ||
    pathname === "/admin/setup/" ||
    pathname === "/admin/forgot-password" ||
    pathname === "/admin/forgot-password/" ||
    pathname === "/admin/reset-password" ||
    pathname === "/admin/reset-password/";

  useEffect(() => {
    if (!isPublicAuthPath && !isLoading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isPublicAuthPath, isLoading, isAdmin, router]);

  if (isPublicAuthPath) {
    return <>{children}</>;
  }

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#CBD5E1] border-t-[#0A1F44] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
