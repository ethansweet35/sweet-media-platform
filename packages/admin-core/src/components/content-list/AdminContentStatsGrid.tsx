"use client";

import { adminStatCardCls, adminIconWellCls } from "../../lib/adminTheme";

export interface ContentStatItem {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  bg: string;
}

export default function AdminContentStatsGrid({ stats }: { stats: ContentStatItem[] }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className={adminStatCardCls}>
          <div className={`${adminIconWellCls} ${stat.bg}`}>
            <i className={`${stat.icon} ${stat.color} text-lg`} />
          </div>
          <div>
            <p className="text-2xl font-bold leading-none text-[#0A1F44]">{stat.value}</p>
            <p className="mt-1 text-[11px] tracking-wide text-[#94A3B8]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
