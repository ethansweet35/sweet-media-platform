"use client";

import { useRef, useEffect } from "react";
import type { BlogSection } from "@sweetmedia/blog-core";

interface BlockTypeMenuProps {
  onAdd: (type: BlogSection["type"]) => void;
  onClose: () => void;
}

const BLOCK_TYPES: { type: BlogSection["type"]; label: string; icon: string; desc: string }[] = [
  { type: "paragraph", label: "Paragraph", icon: "ri-text", desc: "Regular body text" },
  { type: "h2", label: "Heading 2", icon: "ri-h-2", desc: "Section heading" },
  { type: "h3", label: "Heading 3", icon: "ri-h-3", desc: "Sub-section heading" },
  { type: "pullquote", label: "Pull Quote", icon: "ri-double-quotes-l", desc: "Highlighted quote" },
  { type: "callout", label: "Callout", icon: "ri-information-line", desc: "Info, tip, or warning box" },
  { type: "list", label: "Bullet List", icon: "ri-list-check", desc: "Unordered list items" },
  { type: "numbered", label: "Numbered List", icon: "ri-list-ordered", desc: "Ordered list items" },
  { type: "stat-row", label: "Stat Row", icon: "ri-bar-chart-box-line", desc: "3-column stat cards" },
  { type: "divider", label: "Divider", icon: "ri-separator", desc: "Horizontal rule" },
];

export default function BlockTypeMenu({ onAdd, onClose }: BlockTypeMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-2 z-30 bg-white border border-neutral-200 rounded-2xl shadow-lg w-72 p-2 animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-neutral-400 px-3 py-2">Add Block</p>
      <div className="grid grid-cols-1 gap-0.5">
        {BLOCK_TYPES.map((bt) => (
          <button
            key={bt.type}
            onClick={() => { onAdd(bt.type); onClose(); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer text-left w-full group"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-[#3d6f7f]/8 flex items-center justify-center flex-shrink-0 transition-colors">
              <i className={`${bt.icon} text-neutral-500 group-hover:text-[#3d6f7f] text-sm transition-colors`}></i>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-800 leading-tight">{bt.label}</p>
              <p className="text-[11px] text-neutral-400">{bt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}