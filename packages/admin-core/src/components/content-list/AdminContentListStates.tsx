"use client";

import type { ReactNode } from "react";
import { adminEmptyStateCls } from "../../lib/adminTheme";

export function AdminContentLoadingState({ label }: { label: string }) {
  return (
    <div className={adminEmptyStateCls}>
      <i className="ri-loader-4-line mb-3 block animate-spin text-3xl text-[#CBD5E1]" />
      <p className="text-sm text-[#94A3B8]">{label}</p>
    </div>
  );
}

export function AdminContentErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <i className="ri-error-warning-line mb-2 block text-2xl text-red-400" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}

export function AdminContentEmptyState({
  icon,
  message,
  actions,
}: {
  icon: string;
  message: string;
  actions?: ReactNode;
}) {
  return (
    <div className={adminEmptyStateCls}>
      <i className={`${icon} mb-3 block text-3xl text-[#E2E8F0]`} />
      <p className="mb-4 text-sm text-[#64748B]">{message}</p>
      {actions}
    </div>
  );
}
