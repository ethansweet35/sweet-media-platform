"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { usePageEditor } from "../../contexts/PageEditorContext";
import {
  clampIconDimension,
  defaultRemixIcon,
  iconValuesEqual,
  PAGE_EDITOR_ICON_OPTIONS,
  parseIconValue,
  resolveIconValue,
  serializeIconValue,
  type IconOverrideValue,
} from "./iconValue";
import { buildPendingEditKey } from "./routePath";

interface EditableIconClientProps {
  routePath: string;
  fieldKey: string;
  defaultIconClass: string;
  defaultImageSize?: number;
  iconClassName?: string;
  containerClassName?: string;
  publishedValue: string | null;
  draftValue: string | null;
  label?: string;
}

const MAX_BYTES = 12 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp,image/avif,image/svg+xml";

function renderIconGraphic(
  value: IconOverrideValue,
  iconClassName: string,
  useNativeImgForBlob = false,
) {
  if (value.kind === "image") {
    const { src, width, height } = value;
    if (useNativeImgForBlob && src.startsWith("blob:")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          className="max-h-full max-w-full object-contain"
        />
      );
    }
    return (
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="max-h-full max-w-full object-contain"
        unoptimized={src.startsWith("blob:") || src.endsWith(".svg")}
      />
    );
  }
  return <i className={`${value.class} ${iconClassName}`.trim()} aria-hidden />;
}

export default function EditableIconClient({
  routePath,
  fieldKey,
  defaultIconClass,
  defaultImageSize = 44,
  iconClassName = "",
  containerClassName = "",
  publishedValue,
  draftValue,
  label = "icon",
}: EditableIconClientProps) {
  const editor = usePageEditor();
  const editKey = buildPendingEditKey(routePath, fieldKey);
  const pendingEdit = editor.pending.get(editKey);

  const defaultValue = useMemo(
    () => defaultRemixIcon(defaultIconClass),
    [defaultIconClass],
  );

  const overrideRaw = editor.isEditMode
    ? draftValue ?? publishedValue
    : publishedValue;
  const overrideParsed = parseIconValue(overrideRaw);
  const pendingParsed = pendingEdit ? parseIconValue(pendingEdit.value) : null;

  const [optimisticValue, setOptimisticValue] = useState<IconOverrideValue | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  const displayValue = resolveIconValue(
    optimisticValue ?? pendingParsed ?? overrideParsed,
    defaultIconClass,
    defaultImageSize,
  );

  const originalSerialized = useMemo(
    () => serializeIconValue(defaultValue),
    [defaultValue],
  );

  const [panelOpen, setPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [localImageWidth, setLocalImageWidth] = useState(
    displayValue.kind === "image" ? displayValue.width : defaultImageSize,
  );
  const [localImageHeight, setLocalImageHeight] = useState(
    displayValue.kind === "image" ? displayValue.height : defaultImageSize,
  );
  const [lockAspect, setLockAspect] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const slotRef = useRef<HTMLSpanElement | null>(null);

  const clearBlobPreview = useCallback(() => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setOptimisticValue(null);
  }, []);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  useEffect(() => {
    if (displayValue.kind === "image") {
      setLocalImageWidth(displayValue.width);
      setLocalImageHeight(displayValue.height);
    }
  }, [displayValue]);

  const commitValue = useCallback(
    (next: IconOverrideValue) => {
      const serialized = serializeIconValue(next);
      if (serialized === originalSerialized) {
        editor.clearPendingEdit(fieldKey);
        return;
      }
      editor.setPendingEdit({
        fieldKey,
        fieldType: "icon",
        value: serialized,
        originalValue: originalSerialized,
      });
    },
    [editor, fieldKey, originalSerialized],
  );

  const commitImageAtSize = useCallback(
    (src: string) => {
      const w = clampIconDimension(localImageWidth);
      const h = clampIconDimension(localImageHeight);
      commitValue({ kind: "image", src, width: w, height: h });
    },
    [commitValue, localImageHeight, localImageWidth],
  );

  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PAGE_EDITOR_ICON_OPTIONS;
    return PAGE_EDITOR_ICON_OPTIONS.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.class.toLowerCase().includes(q),
    );
  }, [search]);

  const pickRemixIcon = useCallback(
    (iconClass: string) => {
      clearBlobPreview();
      commitValue({ kind: "remix", class: iconClass });
      setPanelOpen(false);
    },
    [clearBlobPreview, commitValue],
  );

  const resetToDefault = useCallback(() => {
    clearBlobPreview();
    editor.clearPendingEdit(fieldKey);
    setPanelOpen(false);
  }, [clearBlobPreview, editor, fieldKey]);

  const handleWidthChange = useCallback(
    (w: number) => {
      const nextW = clampIconDimension(w);
      setLocalImageWidth(nextW);
      const src =
        displayValue.kind === "image"
          ? displayValue.src
          : optimisticValue?.kind === "image"
            ? optimisticValue.src
            : null;
      if (!src) return;
      let nextH = localImageHeight;
      if (lockAspect && displayValue.kind === "image" && displayValue.width > 0) {
        const ratio = displayValue.height / displayValue.width;
        nextH = clampIconDimension(Math.round(nextW * ratio));
        setLocalImageHeight(nextH);
      }
      const next: IconOverrideValue = { kind: "image", src, width: nextW, height: nextH };
      if (optimisticValue?.kind === "image" && src.startsWith("blob:")) {
        setOptimisticValue(next);
      } else {
        commitValue(next);
      }
    },
    [commitValue, displayValue, localImageHeight, lockAspect, optimisticValue],
  );

  const handleHeightChange = useCallback(
    (h: number) => {
      const nextH = clampIconDimension(h);
      setLocalImageHeight(nextH);
      const src =
        displayValue.kind === "image"
          ? displayValue.src
          : optimisticValue?.kind === "image"
            ? optimisticValue.src
            : null;
      if (!src) return;
      let nextW = localImageWidth;
      if (lockAspect && displayValue.kind === "image" && displayValue.height > 0) {
        const ratio = displayValue.width / displayValue.height;
        nextW = clampIconDimension(Math.round(nextH * ratio));
        setLocalImageWidth(nextW);
      }
      const next: IconOverrideValue = { kind: "image", src, width: nextW, height: nextH };
      if (optimisticValue?.kind === "image" && src.startsWith("blob:")) {
        setOptimisticValue(next);
      } else {
        commitValue(next);
      }
    },
    [commitValue, displayValue, localImageWidth, lockAspect, optimisticValue],
  );

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = "";
      setUploadError(null);
      if (file.size > MAX_BYTES) {
        setUploadError("Image too large (max 12MB).");
        return;
      }

      clearBlobPreview();
      const blob = URL.createObjectURL(file);
      blobUrlRef.current = blob;
      const w = clampIconDimension(localImageWidth);
      const h = clampIconDimension(localImageHeight);
      setOptimisticValue({ kind: "image", src: blob, width: w, height: h });

      setUploading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const token = session?.access_token;
        const form = new FormData();
        form.append("file", file);
        form.append("routePath", routePath);
        form.append("fieldKey", fieldKey);
        const res = await fetch("/api/admin/page-content/upload-image", {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: form,
        });
        const json = (await res.json().catch(() => null)) as {
          url?: string;
          error?: string;
        } | null;
        if (!res.ok || !json?.url) {
          setUploadError(json?.error ?? `Upload failed (HTTP ${res.status})`);
          clearBlobPreview();
          return;
        }
        clearBlobPreview();
        commitValue({ kind: "image", src: json.url, width: w, height: h });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
        clearBlobPreview();
      } finally {
        setUploading(false);
      }
    },
    [
      clearBlobPreview,
      commitValue,
      fieldKey,
      localImageHeight,
      localImageWidth,
      routePath,
    ],
  );

  const isDirty =
    (pendingParsed !== null && !iconValuesEqual(pendingParsed, defaultValue)) ||
    optimisticValue !== null;

  if (!editor.isEditMode) {
    return (
      <span className={containerClassName}>
        {renderIconGraphic(displayValue, iconClassName)}
      </span>
    );
  }

  return (
    <span
      ref={slotRef}
      className={`sm-page-edit-icon-slot ${containerClassName} ${isDirty ? "sm-page-edit-icon-dirty" : ""}`}
      data-sm-edit-field={fieldKey}
    >
      <button
        type="button"
        className="sm-page-edit-icon-trigger"
        onClick={() => setPanelOpen((o) => !o)}
        aria-expanded={panelOpen}
        aria-label={`Edit ${label}`}
      >
        <span className="sm-page-edit-icon-trigger-graphic">
          {renderIconGraphic(displayValue, iconClassName, true)}
        </span>
        <span className="sm-page-edit-icon-badge" aria-hidden>
          <i className="ri-palette-line" />
        </span>
      </button>

      {panelOpen ? (
        <div className="sm-page-edit-icon-panel" role="dialog" aria-label={`Edit ${label}`}>
          <div className="sm-page-edit-icon-panel-header">
            <span className="sm-page-edit-icon-panel-title">Change {label}</span>
            <button
              type="button"
              className="sm-page-edit-icon-panel-close"
              onClick={() => setPanelOpen(false)}
              aria-label="Close"
            >
              <i className="ri-close-line" />
            </button>
          </div>

          <div className="sm-page-edit-icon-live-preview">
            <p className="sm-page-edit-icon-panel-label">Live preview</p>
            <p className="sm-page-edit-icon-live-hint">
              This is how the icon appears on the page right now.
              {uploading ? " Uploading…" : ""}
            </p>
            <div
              className="sm-page-edit-icon-live-preview-box"
              style={{
                width: Math.max(
                  displayValue.kind === "image" ? displayValue.width : 44,
                  44,
                ),
                height: Math.max(
                  displayValue.kind === "image" ? displayValue.height : 44,
                  44,
                ),
              }}
            >
              {renderIconGraphic(displayValue, iconClassName, true)}
            </div>
            {displayValue.kind === "image" ? (
              <p className="sm-page-edit-icon-live-size">
                {displayValue.width} × {displayValue.height} px
              </p>
            ) : null}
          </div>

          <div className="sm-page-edit-icon-panel-section">
            <p className="sm-page-edit-icon-panel-label">Icon library</p>
            <input
              type="search"
              className="sm-page-edit-icon-search"
              placeholder="Search icons…"
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
            />
            <div className="sm-page-edit-icon-grid">
              {filteredIcons.map((opt) => (
                <button
                  key={opt.class}
                  type="button"
                  className={`sm-page-edit-icon-option ${
                    displayValue.kind === "remix" && displayValue.class === opt.class
                      ? "sm-page-edit-icon-option-active"
                      : ""
                  }`}
                  onClick={() => pickRemixIcon(opt.class)}
                  title={opt.label}
                >
                  <i className={`${opt.class} text-lg`} aria-hidden />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sm-page-edit-icon-panel-section">
            <p className="sm-page-edit-icon-panel-label">Custom image</p>
            <button
              type="button"
              className="sm-page-edit-icon-upload-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <i className="ri-upload-2-line" aria-hidden />
              {uploading ? "Uploading…" : "Upload image"}
            </button>
            {uploadError ? (
              <p className="sm-page-edit-icon-error" role="alert">
                {uploadError}
              </p>
            ) : null}

            {displayValue.kind === "image" ? (
              <div className="sm-page-edit-icon-size">
                <label className="sm-page-edit-icon-size-row">
                  <span>Width (px)</span>
                  <input
                    type="range"
                    min={16}
                    max={200}
                    value={localImageWidth}
                    onChange={(ev) => handleWidthChange(Number(ev.target.value))}
                  />
                  <input
                    type="number"
                    min={16}
                    max={200}
                    value={localImageWidth}
                    onChange={(ev) => handleWidthChange(Number(ev.target.value))}
                    className="sm-page-edit-icon-size-num"
                  />
                </label>
                <label className="sm-page-edit-icon-size-row">
                  <span>Height (px)</span>
                  <input
                    type="range"
                    min={16}
                    max={200}
                    value={localImageHeight}
                    onChange={(ev) => handleHeightChange(Number(ev.target.value))}
                  />
                  <input
                    type="number"
                    min={16}
                    max={200}
                    value={localImageHeight}
                    onChange={(ev) => handleHeightChange(Number(ev.target.value))}
                    className="sm-page-edit-icon-size-num"
                  />
                </label>
                <label className="sm-page-edit-icon-lock">
                  <input
                    type="checkbox"
                    checked={lockAspect}
                    onChange={(ev) => setLockAspect(ev.target.checked)}
                  />
                  Lock aspect ratio
                </label>
              </div>
            ) : null}
          </div>

          <button type="button" className="sm-page-edit-icon-reset" onClick={resetToDefault}>
            Reset to default icon
          </button>
        </div>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT}
        className="sm-page-edit-image-input"
        onChange={handleFile}
        tabIndex={-1}
        aria-hidden
      />
    </span>
  );
}
