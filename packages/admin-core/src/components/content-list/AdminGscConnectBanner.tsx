"use client";

import { ADMIN_OCEAN, adminPageCardSmCls } from "../../lib/adminTheme";

interface AdminGscConnectBannerProps {
  entityLabel?: string;
}

export default function AdminGscConnectBanner({
  entityLabel = "item",
}: AdminGscConnectBannerProps) {
  return (
    <div className={`${adminPageCardSmCls} mb-4 flex items-center gap-4`}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F7FB]">
        <i className="ri-google-line text-base text-[#64748B]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#0A1F44]">Connect Google Search Console</p>
        <p className="text-[12px] text-[#64748B]">
          Show live clicks, impressions, and ranking for each {entityLabel}.
        </p>
      </div>
      <a
        href="/admin/search-console"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: ADMIN_OCEAN }}
      >
        <i className="ri-plug-line text-xs" />
        Connect
      </a>
    </div>
  );
}
