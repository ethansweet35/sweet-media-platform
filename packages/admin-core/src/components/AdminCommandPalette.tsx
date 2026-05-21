"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_CARD,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSans,
} from "../lib/adminTheme";
import {
  blogPostToCommandItem,
  buildStaticCommandItems,
  filterCommandItems,
  groupCommandResults,
  trackedPageToCommandItem,
  type CommandPaletteItem,
} from "../lib/adminCommandPalette";

interface AdminCommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const AdminCommandPaletteContext = createContext<AdminCommandPaletteContextValue | null>(null);

export function useAdminCommandPalette(): AdminCommandPaletteContextValue {
  const ctx = useContext(AdminCommandPaletteContext);
  if (!ctx) {
    throw new Error("useAdminCommandPalette must be used within AdminCommandPaletteProvider");
  }
  return ctx;
}

function CommandPaletteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [dynamicItems, setDynamicItems] = useState<CommandPaletteItem[]>([]);
  const [searching, setSearching] = useState(false);

  const staticItems = useMemo(() => buildStaticCommandItems(), []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      setDynamicItems([]);
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q.length < 2) {
      setDynamicItems([]);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const pattern = `%${q.replace(/[%_,]/g, "")}%`;
        const [postsRes, pagesRes] = await Promise.all([
          supabase
            .from("blog_posts")
            .select("id, title, slug, status")
            .or(`title.ilike.${pattern},slug.ilike.${pattern}`)
            .order("updated_at", { ascending: false })
            .limit(6),
          supabase
            .from("tracked_pages")
            .select("id, page_title, route_path")
            .eq("is_active", true)
            .or(`page_title.ilike.${pattern},route_path.ilike.${pattern}`)
            .order("display_order", { ascending: true })
            .limit(5),
        ]);

        if (cancelled) return;

        const postItems = ((postsRes.data ?? []) as { id: string; title: string; slug: string; status?: string }[]).map(
          blogPostToCommandItem,
        );
        const pageItems = ((pagesRes.data ?? []) as { id: string; page_title: string; route_path: string }[]).map(
          trackedPageToCommandItem,
        );
        setDynamicItems([...postItems, ...pageItems]);
      } catch {
        if (!cancelled) setDynamicItems([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [open, query]);

  const allItems = useMemo(() => {
    const merged = [...staticItems];
    const seen = new Set(merged.map((i) => i.id));
    for (const item of dynamicItems) {
      if (!seen.has(item.id)) merged.push(item);
    }
    return filterCommandItems(merged, query, 14);
  }, [staticItems, dynamicItems, query]);

  const grouped = useMemo(() => groupCommandResults(allItems), [allItems]);
  const flatItems = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector(`[data-cmd-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const runItem = useCallback(
    (item: CommandPaletteItem) => {
      onClose();
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(item.href);
    },
    [onClose, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) runItem(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] ${adminFontSans}`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-0 bg-[#040e20]/55 backdrop-blur-[2px]"
        aria-hidden
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border shadow-[0_24px_80px_rgba(10,31,68,0.28)]"
        style={{ backgroundColor: ADMIN_CARD, borderColor: ADMIN_BORDER }}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: ADMIN_BORDER }}>
          <i className="ri-search-line text-lg shrink-0" style={{ color: ADMIN_ACCENT }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, posts, actions…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#94A3B8]"
            style={{ color: ADMIN_TEXT }}
            autoComplete="off"
            spellCheck={false}
          />
          {searching ? (
            <i className="ri-loader-4-line animate-spin text-base" style={{ color: ADMIN_TEXT_MUTED }} />
          ) : (
            <kbd
              className="hidden sm:inline rounded-md border px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
            >
              esc
            </kbd>
          )}
        </div>

        <div ref={listRef} className="max-h-[min(420px,50vh)] overflow-y-auto p-2">
          {flatItems.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm" style={{ color: ADMIN_TEXT_MUTED }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            grouped.map(([group, items]) => (
              <div key={group} className="mb-2 last:mb-0">
                <p
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: ADMIN_TEXT_MUTED }}
                >
                  {group}
                </p>
                <ul>
                  {items.map((item) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    const active = idx === activeIndex;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          data-cmd-index={idx}
                          onClick={() => runItem(item)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer"
                          style={{
                            backgroundColor: active ? `${ADMIN_ACCENT}18` : "transparent",
                          }}
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{
                              backgroundColor: active ? `${ADMIN_NAVY}12` : "#F4F7FB",
                              color: active ? ADMIN_NAVY : ADMIN_TEXT_MUTED,
                            }}
                          >
                            <i className={`${item.icon} text-base`} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className="block truncate text-sm font-semibold"
                              style={{ color: ADMIN_TEXT }}
                            >
                              {item.label}
                            </span>
                            {item.subtitle ? (
                              <span
                                className="block truncate text-[11px] mt-0.5"
                                style={{ color: ADMIN_TEXT_MUTED }}
                              >
                                {item.subtitle}
                              </span>
                            ) : null}
                          </span>
                          {active ? (
                            <kbd
                              className="hidden sm:inline shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
                            >
                              ↵
                            </kbd>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div
          className="flex items-center justify-between gap-3 border-t px-4 py-2.5 text-[10px]"
          style={{ borderColor: ADMIN_BORDER, color: ADMIN_TEXT_MUTED }}
        >
          <span>
            <kbd className="font-semibold">↑↓</kbd> navigate · <kbd className="font-semibold">↵</kbd> open
          </span>
          <span>Type 2+ chars to search posts &amp; pages</span>
        </div>
      </div>
    </div>
  );
}

export function AdminCommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const mod = e.metaKey || e.ctrlKey;
      if (mod && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, toggle }),
    [open, toggle],
  );

  return (
    <AdminCommandPaletteContext.Provider value={value}>
      {children}
      <CommandPaletteModal open={open} onClose={() => setOpen(false)} />
    </AdminCommandPaletteContext.Provider>
  );
}
