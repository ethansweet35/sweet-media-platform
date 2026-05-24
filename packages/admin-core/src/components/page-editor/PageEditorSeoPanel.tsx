"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { usePageEditor } from "../../contexts/PageEditorContext";
import {
  SEO_OVERRIDE_KEYS,
  type PageEditorSeoContextResult,
} from "./pageEditorSeoTypes";

interface PageEditorSeoPanelProps {
  open: boolean;
  onClose: () => void;
}

type SeoForm = {
  pageTitle: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
};

function formFromContext(ctx: PageEditorSeoContextResult): SeoForm {
  return {
    pageTitle: ctx.effective.pageTitle,
    seoTitle: ctx.effective.seoTitle,
    metaDescription: ctx.effective.metaDescription,
    slug: ctx.effective.slug,
  };
}

function originalsFromContext(ctx: PageEditorSeoContextResult): SeoForm {
  return {
    pageTitle: ctx.source.pageTitle,
    seoTitle: ctx.source.seoTitle,
    metaDescription: ctx.source.metaDescription,
    slug: ctx.source.slug,
  };
}

export default function PageEditorSeoPanel({ open, onClose }: PageEditorSeoPanelProps) {
  const editor = usePageEditor();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<PageEditorSeoContextResult | null>(null);
  const [form, setForm] = useState<SeoForm | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;
      const params = new URLSearchParams({ routePath: editor.routePath });
      const res = await fetch(`/api/admin/page-content/seo-context?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const json = (await res.json().catch(() => null)) as
        | (PageEditorSeoContextResult & { error?: string })
        | null;
      if (!res.ok || !json || "error" in json) {
        setError(json?.error ?? `Failed to load SEO fields (HTTP ${res.status})`);
        setContext(null);
        setForm(null);
        return;
      }
      setContext(json);
      setForm(formFromContext(json));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load SEO fields");
    } finally {
      setLoading(false);
    }
  }, [editor.routePath]);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  const commitField = useCallback(
    (fieldKey: string, value: string, original: string) => {
      const trimmed = value.trim();
      if (trimmed === original.trim()) {
        editor.clearPendingEdit(fieldKey);
        return;
      }
      editor.setPendingEdit({
        fieldKey,
        fieldType: "text",
        value: trimmed,
        originalValue: original.trim() || null,
      });
    },
    [editor],
  );

  const applyForm = useCallback(
    (next: SeoForm) => {
      if (!context) return;
      const originals = originalsFromContext(context);
      setForm(next);
      commitField(SEO_OVERRIDE_KEYS.pageTitle, next.pageTitle, originals.pageTitle);
      commitField(SEO_OVERRIDE_KEYS.seoTitle, next.seoTitle, originals.seoTitle);
      commitField(SEO_OVERRIDE_KEYS.metaDescription, next.metaDescription, originals.metaDescription);
      commitField(SEO_OVERRIDE_KEYS.slug, next.slug, originals.slug);
    },
    [commitField, context],
  );

  if (!open) return null;

  const slugPrefix =
    context?.entityType === "blog"
      ? "/blog/"
      : context?.entityType === "page"
        ? "/"
        : "";

  const unsupported = context?.entityType === "unsupported";

  return (
    <div className="sm-page-editor-seo-panel" role="dialog" aria-label="Page SEO settings">
      <div className="sm-page-editor-seo-panel-header">
        <div>
          <h2 className="sm-page-editor-seo-panel-title">Page SEO</h2>
          <p className="sm-page-editor-seo-panel-sub">
            Title, meta, and URL slug — saved with <strong>Save draft</strong> /{" "}
            <strong>Publish</strong>.
          </p>
        </div>
        <button
          type="button"
          className="sm-page-edit-icon-panel-close"
          onClick={onClose}
          aria-label="Close SEO panel"
        >
          <i className="ri-close-line" />
        </button>
      </div>

      {loading ? (
        <p className="sm-page-editor-seo-muted">Loading SEO fields…</p>
      ) : null}
      {error ? (
        <p className="sm-page-edit-icon-error" role="alert">
          {error}
        </p>
      ) : null}

      {unsupported ? (
        <p className="sm-page-editor-seo-muted">
          SEO editing is not available on admin or system routes.
        </p>
      ) : null}

      {!loading && !error && form && context && !unsupported ? (
        <div className="sm-page-editor-seo-form">
          {context.entityType === "blog" && !context.blogPostId ? (
            <p className="sm-page-edit-icon-error" role="alert">
              This blog post was not found in the database. Sync or create the post in admin
              first.
            </p>
          ) : null}

          <label className="sm-page-editor-seo-field">
            <span>Page title</span>
            <span className="sm-page-editor-seo-hint">
              {context.entityType === "blog"
                ? "Post title (H1 and default browser title)."
                : "Internal page name in admin; used when SEO title is empty."}
            </span>
            <input
              type="text"
              value={form.pageTitle}
              onChange={(e) => applyForm({ ...form, pageTitle: e.target.value })}
            />
          </label>

          <label className="sm-page-editor-seo-field">
            <span>SEO title</span>
            <span className="sm-page-editor-seo-hint">
              Overrides the &lt;title&gt; tag and social share title when set.
            </span>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => applyForm({ ...form, seoTitle: e.target.value })}
            />
          </label>

          <label className="sm-page-editor-seo-field">
            <span>Meta description</span>
            <span className="sm-page-editor-seo-hint">Search snippet (aim for ~150–160 characters).</span>
            <textarea
              rows={3}
              value={form.metaDescription}
              onChange={(e) => applyForm({ ...form, metaDescription: e.target.value })}
            />
          </label>

          <label className="sm-page-editor-seo-field">
            <span>URL slug</span>
            <span className="sm-page-editor-seo-hint">
              {context.entityType === "blog"
                ? "Post slug only (letters, numbers, hyphens). Changing it changes the live URL."
                : "Path without domain. Changing it changes the live URL — add a redirect in Next if needed."}
            </span>
            <div className="sm-page-editor-seo-slug-row">
              {slugPrefix ? (
                <span className="sm-page-editor-seo-slug-prefix">{slugPrefix}</span>
              ) : null}
              <input
                type="text"
                value={form.slug}
                onChange={(e) => applyForm({ ...form, slug: e.target.value })}
                spellCheck={false}
              />
            </div>
          </label>

          <p className="sm-page-editor-seo-route">
            Route: <code>{editor.routePath}</code>
          </p>
        </div>
      ) : null}
    </div>
  );
}
