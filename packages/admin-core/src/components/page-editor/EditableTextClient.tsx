"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePageEditor } from "../../contexts/PageEditorContext";
import { buildPendingEditKey } from "./routePath";

interface EditableTextClientProps {
  routePath: string;
  fieldKey: string;
  /** Static default baked into the source (TS constant). */
  defaultValue: string;
  /** Published value from Supabase (live). */
  publishedValue: string | null;
  /** Pending draft value from Supabase (admin-only fetch). */
  draftValue: string | null;
  /** Tag to render (h1, p, span, etc.). Defaults to span. */
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  style?: CSSProperties;
  /**
   * Optional richer JSX fallback rendered when no override exists. Useful
   * when the default content contains inline JSX (italic spans, etc.) that
   * the plain-text default can't represent. Ignored in edit mode and once
   * an override is set.
   */
  children?: ReactNode;
}

const EDIT_HIGHLIGHT_CLASS = "sm-page-edit-target";
const EDIT_ACTIVE_CLASS = "sm-page-edit-active";

export default function EditableTextClient({
  routePath,
  fieldKey,
  defaultValue,
  publishedValue,
  draftValue,
  as = "span",
  className,
  style,
  children,
}: EditableTextClientProps) {
  const editor = usePageEditor();
  const editKey = buildPendingEditKey(routePath, fieldKey);
  const pendingEdit = editor.pending.get(editKey);

  // Effective override value coming from Supabase, respecting whether the
  // viewer is in edit mode (admins see drafts first when in edit mode).
  const overrideValue = editor.isEditMode
    ? draftValue ?? publishedValue
    : publishedValue;

  // Final text to display: pending in-memory edit > override > default.
  const displayText = pendingEdit?.value ?? overrideValue ?? defaultValue;

  // We prefer the rich JSX `children` fallback ONLY when there is no
  // override, no pending edit, and we're not in edit mode (contentEditable
  // doesn't play nicely with nested JSX from the server).
  const hasOverride = overrideValue !== null || pendingEdit !== undefined;
  const useRichChildren =
    !editor.isEditMode &&
    !hasOverride &&
    children !== undefined &&
    children !== null;

  const elRef = useRef<HTMLElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const localOriginalRef = useRef<string>(displayText);
  const reactId = useId();

  // Keep originalValue stable so typing back to the original clears the
  // pending edit cleanly.
  useEffect(() => {
    if (pendingEdit === undefined) {
      localOriginalRef.current = overrideValue ?? defaultValue;
    }
  }, [defaultValue, overrideValue, pendingEdit]);

  // Sync DOM textContent in edit mode whenever the canonical value changes
  // from outside the contenteditable (e.g. discard, publish, route change).
  useLayoutEffect(() => {
    if (!editor.isEditMode) return;
    if (!elRef.current) return;
    if (isFocused) return; // never overwrite while user is typing
    if (elRef.current.textContent !== displayText) {
      elRef.current.textContent = displayText;
    }
  }, [displayText, isFocused, editor.isEditMode]);

  const handleInput = useCallback(() => {
    const node = elRef.current;
    if (!node) return;
    const newValue = (node.textContent ?? "").replace(/\u00a0/g, " ");
    editor.setPendingEdit({
      fieldKey,
      fieldType: "text",
      value: newValue,
      originalValue: localOriginalRef.current,
    });
  }, [editor, fieldKey]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLElement>) => {
      // Strip formatting from pastes to keep design clean.
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      handleInput();
    },
    [handleInput],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      // Block Enter for inline elements (acts as commit instead of newline).
      const block =
        as === "p" || as === "div" || (typeof as === "string" && /^h[1-6]$/.test(as));
      if (e.key === "Enter" && !e.shiftKey && !block) {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
    },
    [as],
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    handleInput();
  }, [handleInput]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // ────────────────────────────────────────────────────────────────────
  // View mode: render exactly what the server rendered — zero overhead.
  // ────────────────────────────────────────────────────────────────────
  if (!editor.isEditMode) {
    return createElement(
      as,
      { className, style },
      useRichChildren ? children : displayText,
    );
  }

  // ────────────────────────────────────────────────────────────────────
  // Edit mode: contenteditable wrapper with subtle outline + dirty dot.
  // ────────────────────────────────────────────────────────────────────
  const isDirty = pendingEdit !== undefined;
  const editorClasses = [
    className ?? "",
    EDIT_HIGHLIGHT_CLASS,
    isFocused ? EDIT_ACTIVE_CLASS : "",
    isDirty ? "sm-page-edit-dirty" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(
    as,
    {
      ref: (node: HTMLElement | null) => {
        elRef.current = node;
      },
      className: editorClasses,
      style,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onInput: handleInput,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onPaste: handlePaste,
      onKeyDown: handleKeyDown,
      spellCheck: true,
      "data-sm-edit-field": fieldKey,
      "data-sm-edit-key": editKey,
      "aria-label": `Edit text: ${fieldKey}`,
      id: `sm-edit-${reactId}`,
    },
    displayText,
  );
}
