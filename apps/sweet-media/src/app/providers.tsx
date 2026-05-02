"use client";

import { AuthProvider } from "@sweetmedia/admin-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
