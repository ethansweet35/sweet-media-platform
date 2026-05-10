"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, isLoading } = useAuth();

  const isLoginPath =
    pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    if (!isLoginPath && !isLoading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isLoginPath, isLoading, isAdmin, router]);

  if (isLoginPath) {
    return <>{children}</>;
  }

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
