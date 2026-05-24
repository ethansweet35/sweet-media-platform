"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { usePageEditor } from "../../contexts/PageEditorContext";
import { buildPendingEditKey } from "./routePath";

interface EditableImageClientProps {
  routePath: string;
  fieldKey: string;
  defaultSrc: string;
  publishedValue: string | null;
  draftValue: string | null;
  alt: string;
  /**
   * Visible label shown in the hover overlay's "Replace" button to give
   * non-technical editors context (e.g. "hero image").
   */
  label?: string;
  className?: string;
  /** Forwarded to next/image. */
  width?: ImageProps["width"];
  height?: ImageProps["height"];
  fill?: ImageProps["fill"];
  priority?: ImageProps["priority"];
  sizes?: ImageProps["sizes"];
  quality?: ImageProps["quality"];
  placeholder?: ImageProps["placeholder"];
  loading?: ImageProps["loading"];
  style?: ImageProps["style"];
}

const MAX_BYTES = 12 * 1024 * 1024; // 12MB
const ACCEPT = "image/png,image/jpeg,image/webp,image/avif";

export default function EditableImageClient({
  routePath,
  fieldKey,
  defaultSrc,
  publishedValue,
  draftValue,
  alt,
  label,
  className,
  ...imageProps
}: EditableImageClientProps) {
  const editor = usePageEditor();
  const editKey = buildPendingEditKey(routePath, fieldKey);
  const pendingEdit = editor.pending.get(editKey);

  const baseSrc =
    (editor.isEditMode ? draftValue ?? publishedValue : publishedValue) ?? defaultSrc;
  const renderedSrc = pendingEdit?.value || baseSrc;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const openPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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
          return;
        }
        editor.setPendingEdit({
          fieldKey,
          fieldType: "image",
          value: json.url,
          originalValue: baseSrc,
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [baseSrc, editor, fieldKey, routePath],
  );

  if (!editor.isEditMode) {
    return (
      <Image
        src={renderedSrc}
        alt={alt}
        className={className}
        {...imageProps}
      />
    );
  }

  const isDirty = pendingEdit !== undefined;

  return (
    <span
      className="sm-page-edit-image"
      data-sm-edit-field={fieldKey}
      data-sm-edit-key={editKey}
      data-sm-dirty={isDirty ? "1" : undefined}
      style={imageProps.fill ? { position: "absolute", inset: 0 } : { display: "inline-block", position: "relative" }}
    >
      <Image
        src={renderedSrc}
        alt={alt}
        className={className}
        {...imageProps}
      />
      <span className="sm-page-edit-image-overlay">
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          className="sm-page-edit-image-button"
        >
          <i className="ri-image-edit-line" aria-hidden />
          {uploading ? "Uploading..." : `Replace ${label ?? "image"}`}
        </button>
        {uploadError ? (
          <span className="sm-page-edit-image-error" role="alert">
            {uploadError}
          </span>
        ) : null}
        {isDirty ? (
          <span className="sm-page-edit-image-dirty-dot" aria-hidden />
        ) : null}
      </span>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT}
        className="sm-page-edit-image-input"
        onChange={handleFile}
        aria-hidden
        tabIndex={-1}
      />
    </span>
  );
}
