"use client";

import { useState } from "react";
import type { BlogSection } from "@sweetmedia/blog-core";
import ContentBlock from "./ContentBlock";
import BlockTypeMenu from "./BlockTypeMenu";

interface ContentBlockEditorProps {
  blocks: BlogSection[];
  onChange: (blocks: BlogSection[]) => void;
}

function createDefaultBlock(type: BlogSection["type"]): BlogSection {
  switch (type) {
    case "paragraph": return { type, text: "" };
    case "h2": return { type, text: "" };
    case "h3": return { type, text: "" };
    case "pullquote": return { type, text: "" };
    case "callout": return { type, text: "", variant: "insight" };
    case "list": return { type, items: [""] };
    case "numbered": return { type, items: [""] };
    case "stat-row": return { type, stats: [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }] };
    case "key-takeaway": return { type, text: "", items: [""] };
    case "divider": return { type };
    default: return { type: "paragraph", text: "" };
  }
}

export default function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (index: number, updated: BlogSection) => {
    const next = [...blocks];
    next[index] = updated;
    onChange(next);
  };

  const handleDelete = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...blocks];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const next = [...blocks];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  const handleDuplicate = (index: number) => {
    const next = [...blocks];
    next.splice(index + 1, 0, { ...blocks[index] });
    onChange(next);
  };

  const handleAdd = (type: BlogSection["type"]) => {
    onChange([...blocks, createDefaultBlock(type)]);
  };

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <div className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-10 text-center">
          <i className="ri-article-line text-3xl text-[#CBD5E1] mb-3 block"></i>
          <p className="text-sm text-[#94A3B8] mb-1">No content blocks yet</p>
          <p className="text-xs text-[#CBD5E1]">Click &ldquo;Add Block&rdquo; below to start writing</p>
        </div>
      )}

      {blocks.map((block, i) => (
        <ContentBlock
          key={i}
          block={block}
          index={i}
          total={blocks.length}
          onChange={handleChange}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDuplicate={handleDuplicate}
        />
      ))}

      {/* Add block button */}
      <div className="relative">
        <button
          onClick={() => setShowMenu((v) => !v)}
          className="flex items-center gap-2 w-full border-2 border-dashed border-[#E2E8F0] hover:border-[#0A1F44]/30 rounded-2xl py-3.5 px-5 text-sm text-[#94A3B8] hover:text-[#0A1F44] transition-all cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-[#F4F7FB] group-hover:bg-[#0A1F44]/8 flex items-center justify-center transition-colors">
            <i className="ri-add-line text-xs"></i>
          </div>
          <span className="text-[11px] tracking-[0.15em] uppercase font-semibold">Add Block</span>
        </button>

        {showMenu && (
          <BlockTypeMenu
            onAdd={handleAdd}
            onClose={() => setShowMenu(false)}
          />
        )}
      </div>
    </div>
  );
}