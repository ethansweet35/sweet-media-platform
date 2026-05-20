import type { BlogSection } from "@sweetmedia/blog-core";

interface ContentBlockProps {
  block: BlogSection;
  index: number;
  total: number;
  onChange: (index: number, updated: BlogSection) => void;
  onDelete: (index: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDuplicate: (index: number) => void;
}

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 focus:outline-none focus:border-[#3d6f7f] focus:ring-1 focus:ring-[#3d6f7f]/10 transition-all resize-none";
const labelCls = "block text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-1.5";

function BlockControls({ index, total, onMoveUp, onMoveDown, onDuplicate, onDelete }: {
  index: number; total: number;
  onMoveUp: () => void; onMoveDown: () => void;
  onDuplicate: () => void; onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={onMoveUp} disabled={index === 0} title="Move up"
        className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
        <i className="ri-arrow-up-line text-xs"></i>
      </button>
      <button onClick={onMoveDown} disabled={index === total - 1} title="Move down"
        className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer">
        <i className="ri-arrow-down-line text-xs"></i>
      </button>
      <button onClick={onDuplicate} title="Duplicate"
        className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all cursor-pointer">
        <i className="ri-file-copy-line text-xs"></i>
      </button>
      <button onClick={onDelete} title="Delete block"
        className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
        <i className="ri-delete-bin-line text-xs"></i>
      </button>
    </div>
  );
}

export default function ContentBlock({ block, index, total, onChange, onDelete, onMoveUp, onMoveDown, onDuplicate }: ContentBlockProps) {
  const update = (patch: Partial<BlogSection>) => onChange(index, { ...block, ...patch });

  const BLOCK_LABELS: Record<BlogSection["type"], string> = {
    paragraph: "Paragraph",
    h2: "Heading 2",
    h3: "Heading 3",
    pullquote: "Pull Quote",
    callout: "Callout",
    list: "Bullet List",
    numbered: "Numbered List",
    "stat-row": "Stat Row",
    divider: "Divider",
    table: "Table",
    image: "Image",
  };

  const BLOCK_ICONS: Record<BlogSection["type"], string> = {
    paragraph: "ri-text",
    h2: "ri-h-2",
    h3: "ri-h-3",
    pullquote: "ri-double-quotes-l",
    callout: "ri-information-line",
    list: "ri-list-check",
    numbered: "ri-list-ordered",
    "stat-row": "ri-bar-chart-box-line",
    divider: "ri-separator",
    table: "ri-table-line",
    image: "ri-image-line",
  };

  return (
    <div className="group relative bg-white border border-neutral-100 rounded-2xl p-5 hover:border-neutral-200 transition-all">
      {/* Block header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center">
            <i className={`${BLOCK_ICONS[block.type]} text-neutral-500 text-xs`}></i>
          </div>
          <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400">
            {BLOCK_LABELS[block.type]}
          </span>
        </div>
        <BlockControls
          index={index} total={total}
          onMoveUp={() => onMoveUp(index)}
          onMoveDown={() => onMoveDown(index)}
          onDuplicate={() => onDuplicate(index)}
          onDelete={() => onDelete(index)}
        />
      </div>

      {/* Block content */}
      {block.type === "paragraph" && (
        <textarea
          value={block.text || ""}
          onChange={(e) => update({ text: e.target.value })}
          rows={4}
          placeholder="Write your paragraph here..."
          className={inputCls}
        />
      )}

      {(block.type === "h2" || block.type === "h3") && (
        <input
          type="text"
          value={block.text || ""}
          onChange={(e) => update({ text: e.target.value })}
          placeholder={block.type === "h2" ? "Section heading..." : "Sub-section heading..."}
          className={`${inputCls} ${block.type === "h2" ? "text-xl font-semibold" : "text-lg font-medium"}`}
        />
      )}

      {block.type === "pullquote" && (
        <textarea
          value={block.text || ""}
          onChange={(e) => update({ text: e.target.value })}
          rows={3}
          placeholder="Enter your pull quote..."
          className={`${inputCls} italic text-lg border-l-4 border-[#3d6f7f] pl-4 rounded-l-none`}
        />
      )}

      {block.type === "callout" && (
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Variant</label>
            <div className="flex gap-2">
              {(["insight", "tip", "warning"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => update({ variant: v })}
                  className={`px-3 py-1.5 rounded-lg text-[11px] tracking-[0.1em] uppercase font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    block.variant === v
                      ? v === "warning" ? "bg-amber-100 text-amber-700 border border-amber-300"
                        : v === "tip" ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                        : "bg-[#3d6f7f]/10 text-[#3d6f7f] border border-[#3d6f7f]/20"
                      : "bg-neutral-100 text-neutral-500 border border-transparent hover:bg-neutral-200"
                  }`}
                >
                  {v === "insight" ? "Info" : v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={block.text || ""}
            onChange={(e) => update({ text: e.target.value })}
            rows={3}
            placeholder="Callout text..."
            className={`${inputCls} ${
              block.variant === "warning" ? "border-amber-200 bg-amber-50/50"
              : block.variant === "tip" ? "border-emerald-200 bg-emerald-50/50"
              : "border-[#3d6f7f]/15 bg-[#3d6f7f]/3"
            }`}
          />
        </div>
      )}

      {(block.type === "list" || block.type === "numbered") && (
        <div className="space-y-2">
          {(block.items || [""]).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-9 flex items-center justify-center flex-shrink-0">
                {block.type === "numbered"
                  ? <span className="w-5 h-5 rounded-full bg-[#3d6f7f] text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  : <span className="w-2 h-2 rounded-full bg-neutral-300 mt-0.5"></span>
                }
              </div>
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const items = [...(block.items || [])];
                  items[i] = e.target.value;
                  update({ items });
                }}
                placeholder={`Item ${i + 1}...`}
                className={inputCls}
              />
              <button
                onClick={() => {
                  const items = (block.items || []).filter((_, idx) => idx !== i);
                  update({ items: items.length ? items : [""] });
                }}
                disabled={(block.items || []).length <= 1}
                className="w-8 h-9 flex items-center justify-center text-neutral-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          ))}
          <button
            onClick={() => update({ items: [...(block.items || []), ""] })}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-semibold text-[#3d6f7f] hover:text-[#35636f] transition-colors cursor-pointer mt-1"
          >
            <i className="ri-add-line text-xs"></i>
            Add item
          </button>
        </div>
      )}

      {block.type === "stat-row" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {(block.stats || [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }]).map((stat, i) => (
              <div key={i} className="bg-[#3d6f7f]/4 rounded-xl p-3 space-y-2">
                <div>
                  <label className={labelCls}>Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...(block.stats || [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }])];
                      stats[i] = { ...stats[i], value: e.target.value };
                      update({ stats });
                    }}
                    placeholder="64%"
                    className={`${inputCls} text-center font-bold`}
                  />
                </div>
                <div>
                  <label className={labelCls}>Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...(block.stats || [{ value: "", label: "" }, { value: "", label: "" }, { value: "", label: "" }])];
                      stats[i] = { ...stats[i], label: e.target.value };
                      update({ stats });
                    }}
                    placeholder="of queries..."
                    className={`${inputCls} text-center text-xs`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {block.type === "image" && (
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Image URL</label>
            <input
              type="text"
              value={block.text || ""}
              onChange={(e) => update({ text: e.target.value })}
              placeholder="https://..."
              className={`${inputCls} font-mono text-xs`}
            />
          </div>
          <div>
            <label className={labelCls}>Alt text</label>
            <input
              type="text"
              value={block.alt || ""}
              onChange={(e) => update({ alt: e.target.value })}
              placeholder="Describe the image..."
              className={inputCls}
            />
          </div>
        </div>
      )}

      {block.type === "divider" && (
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-neutral-200"></div>
          <span className="text-[10px] text-neutral-400 tracking-widest uppercase">Divider</span>
          <div className="flex-1 h-px bg-neutral-200"></div>
        </div>
      )}
    </div>
  );
}