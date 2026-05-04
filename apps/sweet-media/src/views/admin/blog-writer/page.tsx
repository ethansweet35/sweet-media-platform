"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import { supabase } from "@/lib/supabase";
import Seo from "@/components/feature/Seo";
import { AI_MODELS, DEFAULT_MODEL_ID } from "@sweetmedia/admin-core";

const CATEGORY_OPTIONS = [
  { value: "", label: "Let AI decide" },
  { value: "SEO", label: "SEO" },
  { value: "Paid Media", label: "Paid Media" },
  { value: "Web Development", label: "Web Development" },
  { value: "Social Media", label: "Social Media" },
  { value: "Compliance", label: "Compliance" },
  { value: "Strategy", label: "Strategy" },
] as const;

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID ?? "sweet-media";

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all";

interface FormState {
  topic: string;
  primaryKeyword: string;
  category: string;
  tone: string;
  targetWordCount: number;
  audience: string;
  customInstructions: string;
  model: string;
}

const INITIAL_FORM: FormState = {
  topic: "",
  primaryKeyword: "",
  category: "",
  tone: "",
  targetWordCount: 2000,
  audience: "",
  customInstructions: "",
  model: DEFAULT_MODEL_ID,
};

function buildGeneratePostBody(f: FormState): Record<string, unknown> {
  const topic = f.topic.trim();
  const primaryKeyword = f.primaryKeyword.trim();
  const body: Record<string, unknown> = { topic, primaryKeyword };
  if (f.category.trim()) body.category = f.category.trim();
  if (f.tone.trim()) body.tone = f.tone.trim();
  const tw = Number(f.targetWordCount);
  if (!Number.isNaN(tw) && tw >= 800 && tw <= 4000) body.targetWordCount = tw;
  if (f.audience.trim()) body.audience = f.audience.trim();
  if (f.customInstructions.trim()) body.customInstructions = f.customInstructions.trim();
  if (f.model.trim()) body.model = f.model.trim();
  return body;
}

type GenerationStage = null | "post" | "image";

interface DoneResult {
  postId: string;
  slug: string;
  title: string;
  heroImageUrl: string | null;
  imageWarn: boolean;
}

function parseBackendError(payload: Record<string, unknown>, fallback: string): string {
  const err =
    typeof payload.error === "string"
      ? payload.error
      : typeof payload.detail === "string"
        ? payload.detail
        : fallback;
  return String(err || fallback).slice(0, 2000);
}

export default function BlogWriterPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [generationStage, setGenerationStage] = useState<GenerationStage>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [result, setResult] = useState<DoneResult | null>(null);

  const disableForm =
    generationStage === "post" || generationStage === "image";

  const resetToForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setGenerationStage(null);
    setPostError(null);
    setResult(null);
  }, []);

  const retryAfterPostError = useCallback(() => {
    setPostError(null);
    setGenerationStage(null);
  }, []);

  const handleGenerateAnother = useCallback(() => {
    resetToForm();
  }, [resetToForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostError(null);
    setResult(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      setPostError("NEXT_PUBLIC_SUPABASE_URL is not configured.");
      return;
    }

    if (!token) {
      setPostError("You must be logged in.");
      return;
    }

    const postBody = buildGeneratePostBody(form);
    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      "";

    const edgeHeaders = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(anonKey ? { apikey: anonKey } : {}),
    };

    try {
      setGenerationStage("post");

      const postRes = await fetch(`${supabaseUrl}/functions/v1/generate-blog-post`, {
        method: "POST",
        headers: edgeHeaders,
        body: JSON.stringify(postBody),
      });

      let postPayload: Record<string, unknown>;
      try {
        postPayload = (await postRes.json()) as Record<string, unknown>;
      } catch {
        setPostError("Post generation failed — invalid server response.");
        setGenerationStage(null);
        return;
      }

      if (!postRes.ok) {
        setPostError(parseBackendError(postPayload, "Post generation failed."));
        setGenerationStage(null);
        return;
      }

      const postSuccess = postPayload.success === true;
      if (!postSuccess) {
        setPostError(parseBackendError(postPayload, "Post generation failed."));
        setGenerationStage(null);
        return;
      }

      const postId = typeof postPayload.postId === "string" ? postPayload.postId : "";
      const slug = typeof postPayload.slug === "string" ? postPayload.slug : "";
      const title = typeof postPayload.title === "string" ? postPayload.title : "";
      const heroFromFn =
        typeof postPayload.heroImageUrl === "string" ? postPayload.heroImageUrl : "";

      if (!postId || !slug || !title) {
        setPostError("Post generation returned an unexpected payload.");
        setGenerationStage(null);
        return;
      }

      setGenerationStage("image");

      const imgBody: Record<string, unknown> = {
        title,
        excerpt: title,
        postId,
        siteKey: SITE_ID,
      };
      if (form.category.trim()) imgBody.category = form.category.trim();

      let imageUrl: string | null = heroFromFn || null;
      let imageWarn = false;

      try {
        const imgRes = await fetch(`${supabaseUrl}/functions/v1/generate-blog-image`, {
          method: "POST",
          headers: edgeHeaders,
          body: JSON.stringify(imgBody),
        });

        let imgJson: Record<string, unknown>;
        try {
          imgJson = (await imgRes.json()) as Record<string, unknown>;
        } catch {
          imageWarn = true;
          imgJson = {};
        }

        if (imgRes.ok && typeof imgJson.url === "string" && imgJson.url.length > 0) {
          imageUrl = imgJson.url;
        } else if (!imgRes.ok) {
          imageWarn = true;
        } else {
          imageWarn = true;
        }
      } catch {
        imageWarn = true;
      }

      setResult({
        postId,
        slug,
        title,
        heroImageUrl: imageUrl,
        imageWarn,
      });
      setGenerationStage(null);
    } catch (err) {
      console.error("[blog-writer]", err);
      setPostError("Something went wrong. Please try again.");
      setGenerationStage(null);
    }
  };

  return (
    <div className="">
      <Seo title="Blog Writer | Admin" description="AI-assisted blog drafting" noindex />

      <AdminPageHeader
        title="Blog Writer"
        subtitle="Draft long-form posts with AI guidance, then polish in Blog Posts."
      />

      <div className="mx-auto max-w-screen-md py-8">
        {result ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <i className="ri-checkbox-circle-fill text-xl text-emerald-600" />
              </div>
              <div>
                <h2
                  className="text-xl font-semibold text-stone-900"
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                >
                  Draft Created
                </h2>
                <p className="text-sm text-stone-900 font-medium mt-1">{result.title}</p>
              </div>
            </div>

            {result.imageWarn ? (
              <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <i className="ri-alarm-warning-line text-amber-600 text-lg shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900">
                  Post created but image generation timed out or failed. The post is saved as a
                  draft and you can manually trigger image generation later.
                </p>
              </div>
            ) : null}

            {result.heroImageUrl ? (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.heroImageUrl}
                  alt=""
                  className="w-full rounded-xl border border-stone-200 object-cover max-h-80 bg-stone-100"
                />
              </div>
            ) : !result.imageWarn ? (
              <p className="text-sm text-stone-500 italic">
                Image generation is still processing — you can refresh the post page in a moment to
                see it.
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/blog/${result.slug}?preview=admin`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 min-w-[140px] justify-center items-center px-5 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                View Draft
              </Link>
              <button
                type="button"
                onClick={handleGenerateAnother}
                className="inline-flex flex-1 min-w-[140px] justify-center items-center px-5 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm font-medium hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Generate Another
              </button>
            </div>
          </div>
        ) : (
          <>
            {postError ? (
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-start gap-2">
                  <i className="ri-error-warning-line text-red-500 text-xl shrink-0" />
                  <p className="text-sm text-red-900 whitespace-pre-wrap">{postError}</p>
                </div>
                <button
                  type="button"
                  onClick={retryAfterPostError}
                  className="self-start px-4 py-2 text-sm font-medium rounded-lg bg-white border border-red-300 text-red-900 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : null}

            <div
              className={`bg-white rounded-2xl border border-stone-200 p-8 ${disableForm ? "opacity-60 pointer-events-none" : ""}`}
            >
              <h2
                className="text-lg font-semibold text-stone-900 mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              >
                Generate a draft
              </h2>
              <p className="text-sm text-stone-500 mb-6 font-[family-name:var(--font-outfit-sans),sans-serif]">
                Fill out the brief below. Posts are saved as drafts; featured images attach when
                generation completes.
              </p>

              {generationStage ? (
                <div className="mb-8 flex flex-col items-center gap-4 py-10 px-4 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
                  <p className="text-sm text-center text-stone-700 font-medium font-[family-name:var(--font-outfit-sans),sans-serif]">
                    {generationStage === "post"
                      ? "Drafting your post — this takes 30-60 seconds..."
                      : "Post drafted — now creating the featured image (1-2 minutes)..."}
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-5 font-[family-name:var(--font-outfit-sans),sans-serif]">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Topic <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={form.topic}
                    disabled={disableForm}
                    placeholder="e.g. How treatment centers can use Google Business Profile to drive local admissions"
                    onChange={(ev) =>
                      setForm((p) => ({ ...p, topic: ev.target.value }))
                    }
                    className={`${inputCls} resize-y min-h-[4.5rem]`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Primary keyword <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.primaryKeyword}
                    disabled={disableForm}
                    placeholder="e.g. google business profile for treatment centers"
                    onChange={(ev) =>
                      setForm((p) => ({
                        ...p,
                        primaryKeyword: ev.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    disabled={disableForm}
                    onChange={(ev) =>
                      setForm((p) => ({ ...p, category: ev.target.value }))
                    }
                    className={inputCls}
                  >
                    {CATEGORY_OPTIONS.map((o) => (
                      <option key={o.label} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Tone
                  </label>
                  <input
                    type="text"
                    value={form.tone}
                    disabled={disableForm}
                    placeholder="e.g. analytical, conversational, authoritative"
                    onChange={(ev) =>
                      setForm((p) => ({ ...p, tone: ev.target.value }))
                    }
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Target word count
                  </label>
                  <input
                    type="number"
                    min={800}
                    max={4000}
                    value={form.targetWordCount}
                    disabled={disableForm}
                    onChange={(ev) =>
                      setForm((p) => ({
                        ...p,
                        targetWordCount: Number(ev.target.value) || p.targetWordCount,
                      }))
                    }
                    className={inputCls}
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Between 800 and 4000. Default is 2000.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Audience
                  </label>
                  <input
                    type="text"
                    value={form.audience}
                    disabled={disableForm}
                    placeholder="e.g. residential treatment center owners"
                    onChange={(ev) =>
                      setForm((p) => ({ ...p, audience: ev.target.value }))
                    }
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Custom instructions
                  </label>
                  <textarea
                    rows={3}
                    value={form.customInstructions}
                    disabled={disableForm}
                    placeholder="Any specific angles, sources, or emphasis..."
                    onChange={(ev) =>
                      setForm((p) => ({
                        ...p,
                        customInstructions: ev.target.value,
                      }))
                    }
                    className={`${inputCls} resize-y min-h-[4.5rem]`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Model
                  </label>
                  <select
                    value={form.model}
                    disabled={disableForm}
                    onChange={(ev) =>
                      setForm((p) => ({ ...p, model: ev.target.value }))
                    }
                    className={inputCls}
                  >
                    {AI_MODELS.map((m) => (
                      <option key={m.id} value={m.id} title={m.description}>
                        {m.displayName} — {m.description.slice(0, 72)}
                        {m.description.length > 72 ? "…" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed font-[family-name:var(--font-outfit-sans),sans-serif]">
                    {AI_MODELS.find((mod) => mod.id === form.model)?.description ??
                      "Select an OpenRouter model."}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={disableForm || postError !== null}
                    className="w-full py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer font-[family-name:var(--font-outfit-sans),sans-serif]"
                  >
                    Generate Blog Post
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
