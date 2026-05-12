"use client";

import { useEffect, useRef, useState } from "react";
import KeywordSuggestPopover from "../../../../KeywordSuggestPopover";
import { ADMIN_OCEAN } from "../../../../../lib/adminTheme";

interface InlineKeywordCellProps {
  /** Current saved keyword for this row (null = not set yet). */
  value: string | null;
  /** Title of the row — used as the seed when the user has no keyword yet. */
  rowTitle: string;
  /** Persist a new value (or null to clear). Returns true on success. */
  onSave: (next: string | null) => Promise<boolean>;
  /** Disable interaction (e.g. while bulk operation is running). */
  disabled?: boolean;
}

/**
 * Inline-editable primary-keyword cell for the blog admin table.
 *
 *   Display state  → shows the value (or muted "Set keyword") and a Suggest button.
 *   Editing state  → text input with Save / Cancel buttons. Enter saves, Escape cancels.
 *   Saving state   → spinner inside the input.
 *
 * Picking a keyword from the Suggest popover saves it immediately.
 */
export default function InlineKeywordCell({
  value,
  rowTitle,
  onSave,
  disabled,
}: InlineKeywordCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // When the saved value changes externally, reset our draft.
  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing]);

  const commit = async (next: string | null) => {
    setSaving(true);
    setError(null);
    const ok = await onSave(next);
    setSaving(false);
    if (ok) {
      setEditing(false);
    } else {
      setError("Save failed");
    }
  };

  const handleSave = () => {
    const trimmed = draft.trim();
    void commit(trimmed.length > 0 ? trimmed : null);
  };

  const handleCancel = () => {
    setDraft(value ?? "");
    setError(null);
    setEditing(false);
  };

  const handleSuggestionPick = (phrase: string) => {
    setDraft(phrase);
    void commit(phrase);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            } else if (e.key === "Escape") {
              e.preventDefault();
              handleCancel();
            }
          }}
          disabled={saving || disabled}
          placeholder="Primary keyword…"
          className="flex-1 min-w-0 px-2 py-1 text-[12px] border border-neutral-300 rounded-md bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#3d6f7f]"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || disabled}
          title="Save (Enter)"
          className="w-7 h-7 flex items-center justify-center rounded-md text-white cursor-pointer disabled:opacity-50 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ADMIN_OCEAN }}
        >
          {saving ? (
            <i className="ri-loader-4-line animate-spin text-xs" />
          ) : (
            <i className="ri-check-line text-xs" />
          )}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={saving || disabled}
          title="Cancel (Esc)"
          className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer disabled:opacity-50 transition-colors"
        >
          <i className="ri-close-line text-xs" />
        </button>
        {error && (
          <span className="text-[10px] text-red-500 ml-1 whitespace-nowrap">{error}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <button
        type="button"
        onClick={() => !disabled && setEditing(true)}
        disabled={disabled}
        title={value ? `Click to edit "${value}"` : "Click to set primary keyword"}
        className={`flex-1 min-w-0 text-left text-[12px] px-2 py-1 rounded-md transition-colors cursor-pointer ${
          value
            ? "text-neutral-700 hover:bg-neutral-100"
            : "text-neutral-400 italic hover:bg-neutral-100"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span className="block truncate">{value || "Set keyword"}</span>
      </button>
      <KeywordSuggestPopover
        currentKeyword={value || rowTitle}
        onSelect={handleSuggestionPick}
        disabled={disabled}
      />
    </div>
  );
}
