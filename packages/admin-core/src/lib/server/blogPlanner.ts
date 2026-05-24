/**
 * Blog Planner — hub topical authority workflow (Semrush + AI discovery,
 * planner items, brief-only Content Editor creation).
 */
import { NextResponse } from "next/server";
import { after } from "next/server";
import { ContentEditorError } from "./contentEditor/errors";
import { getAdminClient } from "./contentEditor/db";
import { createContentEditor, saveDraft } from "./contentEditor/api";
import { runContentEditorPipeline } from "./contentEditor/pipeline";
import { getKeywordSuggestions, SemrushApiError } from "./semrushClient";
import {
  BLOG_PLANNER_MISC_ROUTE,
  type BlogPlannerCoverage,
  type BlogPlannerHub,
  type BlogPlannerHubLink,
  type BlogPlannerHubStats,
  type BlogPlannerHubWithStats,
  type BlogPlannerItem,
  type BlogPlannerItemSource,
} from "../../types/blog-planner";

const MISC_PAGE_TITLE = "Miscellaneous";
const SEMRUSH_DISCOVER_LIMIT = 20;
const AI_TOPIC_COUNT = 14;

type HubRow = {
  id: string;
  route_path: string;
  page_title: string;
  primary_keyword: string | null;
  is_blog_hub: boolean;
  is_blog_hub_misc: boolean;
  blog_hub_target_count: number | null;
};

function hubFromRow(row: HubRow): BlogPlannerHub {
  return {
    id: row.id,
    route_path: row.route_path,
    page_title: row.page_title,
    primary_keyword: row.primary_keyword,
    is_blog_hub: row.is_blog_hub,
    is_blog_hub_misc: row.is_blog_hub_misc,
    blog_hub_target_count: row.blog_hub_target_count,
  };
}

function titleCasePhrase(phrase: string): string {
  return phrase
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function ensureMiscellaneousHub(client: ReturnType<typeof getAdminClient>): Promise<HubRow> {
  const { data: existing } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, primary_keyword, is_blog_hub, is_blog_hub_misc, blog_hub_target_count")
    .eq("is_blog_hub_misc", true)
    .maybeSingle();

  if (existing) {
    const row = existing as HubRow;
    if (!row.is_blog_hub) {
      await client.from("tracked_pages").update({ is_blog_hub: true }).eq("id", row.id);
      row.is_blog_hub = true;
    }
    return row;
  }

  const { data: inserted, error } = await client
    .from("tracked_pages")
    .insert({
      route_path: BLOG_PLANNER_MISC_ROUTE,
      page_title: MISC_PAGE_TITLE,
      primary_keyword: "addiction recovery news",
      is_blog_hub: true,
      is_blog_hub_misc: true,
      is_active: false,
      display_order: 9999,
      notes: "Blog Planner system hub for news and topics not tied to a service page.",
    })
    .select("id, route_path, page_title, primary_keyword, is_blog_hub, is_blog_hub_misc, blog_hub_target_count")
    .single();

  if (error || !inserted) {
    throw new ContentEditorError(
      `Failed to create Miscellaneous hub: ${error?.message ?? "unknown"}`,
      { source: "blog-planner", status: 500 },
    );
  }
  return inserted as HubRow;
}

export function computeCoverage(
  target: number | null,
  items: BlogPlannerItem[],
  links: BlogPlannerHubLink[],
): BlogPlannerCoverage {
  const activeItems = items.filter((i) => i.status !== "dismissed");
  const ideas = activeItems.filter((i) => i.status === "idea").length;
  const inContentEditor = activeItems.filter((i) => i.status === "content_editor").length;
  const publishedFromItems = activeItems.filter((i) => i.status === "published").length;
  const linkCount = links.length;
  const totalSupporting = inContentEditor + publishedFromItems + linkCount;
  const percentOfTarget =
    target != null && target > 0 ? Math.min(100, Math.round((totalSupporting / target) * 100)) : null;

  return {
    target,
    ideas,
    inContentEditor,
    published: publishedFromItems,
    totalSupporting,
    percentOfTarget,
  };
}

function statsFromCounts(
  target: number | null,
  ideas: number,
  inContentEditor: number,
  published: number,
  attached: number,
): BlogPlannerHubStats {
  const totalSupporting = inContentEditor + published + attached;
  const percentOfTarget =
    target != null && target > 0 ? Math.min(100, Math.round((totalSupporting / target) * 100)) : null;
  return { ideas, inContentEditor, published, attached, totalSupporting, percentOfTarget };
}

async function loadHubStatsMap(
  client: ReturnType<typeof getAdminClient>,
): Promise<Map<string, BlogPlannerHubStats>> {
  const map = new Map<string, BlogPlannerHubStats>();

  const [itemsRes, linksRes] = await Promise.all([
    client.from("blog_planner_items").select("hub_tracked_page_id, status"),
    client.from("blog_planner_hub_links").select("hub_tracked_page_id"),
  ]);

  const bucket = new Map<
    string,
    { ideas: number; inContentEditor: number; published: number; attached: number }
  >();

  const ensure = (hubId: string) => {
    if (!bucket.has(hubId)) {
      bucket.set(hubId, { ideas: 0, inContentEditor: 0, published: 0, attached: 0 });
    }
    return bucket.get(hubId)!;
  };

  for (const row of itemsRes.data ?? []) {
    const r = row as { hub_tracked_page_id: string; status: string };
    if (r.status === "dismissed") continue;
    const b = ensure(r.hub_tracked_page_id);
    if (r.status === "idea") b.ideas += 1;
    else if (r.status === "content_editor") b.inContentEditor += 1;
    else if (r.status === "published") b.published += 1;
  }

  for (const row of linksRes.data ?? []) {
    const hubId = (row as { hub_tracked_page_id: string }).hub_tracked_page_id;
    ensure(hubId).attached += 1;
  }

  for (const [hubId, counts] of bucket) {
    map.set(hubId, statsFromCounts(null, counts.ideas, counts.inContentEditor, counts.published, counts.attached));
  }

  return map;
}

async function loadHub(
  client: ReturnType<typeof getAdminClient>,
  hubId: string,
): Promise<HubRow | null> {
  const { data, error } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, primary_keyword, is_blog_hub, is_blog_hub_misc, blog_hub_target_count")
    .eq("id", hubId)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load hub: ${error.message}`, {
      source: "blog-planner",
      status: 500,
    });
  }
  return (data as HubRow | null) ?? null;
}

async function generateAiTopics(hub: HubRow): Promise<
  Array<{
    primary_keyword: string;
    suggested_title: string;
    suggested_meta_description: string;
    suggested_h1: string;
  }>
> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new ContentEditorError("OPENROUTER_API_KEY is not configured.", {
      source: "blog-planner",
      status: 500,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "this website";
  const hubLabel = hub.is_blog_hub_misc
    ? "miscellaneous blog topics (news, timely resources, not tied to one service page)"
    : `supporting blog articles for the service page "${hub.page_title}" (${hub.route_path})`;

  const prompt = `You are an SEO content strategist for ${siteUrl}.

Generate exactly ${AI_TOPIC_COUNT} blog topic ideas for ${hubLabel}.

Hub primary topic keyword: ${hub.primary_keyword?.trim() || hub.page_title}

Requirements:
- Mix informational FAQs ("what is…", "how does…"), comparison/decision content, and practical guides people ask in Google and AI assistants.
- Each topic must be distinct and useful for topical authority; do NOT repeat near-duplicates.
- Keywords should be natural search phrases (2–8 words), not brand names.
- Titles should be compelling blog H1s (not clickbait).
- Meta descriptions: 1–2 sentences, under 155 characters.

Return ONLY valid JSON: an array of objects with keys:
primary_keyword, suggested_title, suggested_meta_description, suggested_h1`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 4000,
    }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new ContentEditorError(`AI topic generation failed (${res.status}): ${text.slice(0, 400)}`, {
      source: "blog-planner",
      status: 502,
    });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = data?.choices?.[0]?.message?.content?.trim() ?? "";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new ContentEditorError("AI returned no parseable JSON array.", {
      source: "blog-planner",
      status: 502,
    });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonMatch[0]) as unknown;
  } catch {
    throw new ContentEditorError("AI returned invalid JSON.", { source: "blog-planner", status: 502 });
  }

  if (!Array.isArray(parsed)) {
    throw new ContentEditorError("AI JSON was not an array.", { source: "blog-planner", status: 502 });
  }

  const out: Array<{
    primary_keyword: string;
    suggested_title: string;
    suggested_meta_description: string;
    suggested_h1: string;
  }> = [];

  for (const entry of parsed) {
    if (!entry || typeof entry !== "object") continue;
    const o = entry as Record<string, unknown>;
    const primary_keyword = String(o.primary_keyword ?? "").trim();
    const suggested_title = String(o.suggested_title ?? "").trim();
    const suggested_meta_description = String(o.suggested_meta_description ?? "").trim();
    const suggested_h1 = String(o.suggested_h1 ?? suggested_title).trim();
    if (!primary_keyword || !suggested_title) continue;
    out.push({ primary_keyword, suggested_title, suggested_meta_description, suggested_h1 });
  }

  return out.slice(0, AI_TOPIC_COUNT);
}

async function upsertPlannerItems(
  client: ReturnType<typeof getAdminClient>,
  hubId: string,
  source: BlogPlannerItemSource,
  rows: Array<{
    primary_keyword: string;
    suggested_title: string;
    suggested_meta_description?: string | null;
    suggested_h1?: string | null;
    search_volume?: number | null;
    keyword_difficulty?: number | null;
    cpc?: number | null;
  }>,
): Promise<number> {
  let inserted = 0;
  for (const row of rows) {
    const kw = row.primary_keyword.trim().toLowerCase();
    if (!kw) continue;

    const { data: existing } = await client
      .from("blog_planner_items")
      .select("id, status")
      .eq("hub_tracked_page_id", hubId)
      .ilike("primary_keyword", kw)
      .maybeSingle();

    if (existing) {
      const st = (existing as { status: string }).status;
      if (st !== "idea") continue;
      await client
        .from("blog_planner_items")
        .update({
          suggested_title: row.suggested_title,
          suggested_meta_description: row.suggested_meta_description ?? null,
          suggested_h1: row.suggested_h1 ?? null,
          search_volume: row.search_volume ?? null,
          keyword_difficulty: row.keyword_difficulty ?? null,
          cpc: row.cpc ?? null,
          source,
          updated_at: new Date().toISOString(),
        })
        .eq("id", (existing as { id: string }).id);
      continue;
    }

    const { error } = await client.from("blog_planner_items").insert({
      hub_tracked_page_id: hubId,
      source,
      primary_keyword: row.primary_keyword.trim(),
      suggested_title: row.suggested_title,
      suggested_meta_description: row.suggested_meta_description ?? null,
      suggested_h1: row.suggested_h1 ?? null,
      search_volume: row.search_volume ?? null,
      keyword_difficulty: row.keyword_difficulty ?? null,
      cpc: row.cpc ?? null,
      status: "idea",
    });
    if (!error) inserted += 1;
  }
  return inserted;
}

export async function discoverTopicsForHub(hubId: string): Promise<{
  semrushInserted: number;
  aiInserted: number;
}> {
  const client = getAdminClient();
  await ensureMiscellaneousHub(client);
  const hub = await loadHub(client, hubId);
  if (!hub || !hub.is_blog_hub) {
    throw new ContentEditorError("Hub page not found or not marked as a blog hub.", {
      source: "blog-planner",
      status: 404,
    });
  }

  const seed = hub.primary_keyword?.trim() || hub.page_title.trim();
  if (!seed) {
    throw new ContentEditorError("Hub needs a primary keyword or page title for discovery.", {
      source: "blog-planner",
      status: 400,
    });
  }

  let semrushInserted = 0;
  try {
    const { rows } = await getKeywordSuggestions(seed, { displayLimit: SEMRUSH_DISCOVER_LIMIT });
    const semrushRows = rows
      .filter((s) => s.searchVolume >= 10 && s.phrase.toLowerCase() !== seed.toLowerCase())
      .slice(0, SEMRUSH_DISCOVER_LIMIT)
      .map((s) => ({
        primary_keyword: s.phrase,
        suggested_title: titleCasePhrase(s.phrase),
        suggested_meta_description: null as string | null,
        suggested_h1: titleCasePhrase(s.phrase),
        search_volume: s.searchVolume,
        keyword_difficulty: s.difficulty,
        cpc: s.cpc,
      }));
    semrushInserted = await upsertPlannerItems(client, hubId, "semrush", semrushRows);
  } catch (err) {
    if (!(err instanceof SemrushApiError)) throw err;
    console.warn("[blog-planner] Semrush discovery skipped:", err.message);
  }

  const aiTopics = await generateAiTopics(hub);
  const aiInserted = await upsertPlannerItems(
    client,
    hubId,
    "ai",
    aiTopics.map((t) => ({
      primary_keyword: t.primary_keyword,
      suggested_title: t.suggested_title,
      suggested_meta_description: t.suggested_meta_description,
      suggested_h1: t.suggested_h1,
    })),
  );

  return { semrushInserted, aiInserted };
}

export type CreatePlannerEditorResult = {
  editorId: string;
  item: BlogPlannerItem;
  /** Item already had a linked editor — no new row created. */
  alreadyLinked: boolean;
  /** SERP/guidelines pipeline was executed in this request. */
  pipelineCompleted: boolean;
};

export async function createBriefEditorFromPlannerItem(
  itemId: string,
  opts?: { awaitPipeline?: boolean },
): Promise<CreatePlannerEditorResult> {
  const client = getAdminClient();
  const { data: itemRow, error } = await client
    .from("blog_planner_items")
    .select("*")
    .eq("id", itemId)
    .maybeSingle();

  if (error || !itemRow) {
    throw new ContentEditorError("Planner item not found.", { source: "blog-planner", status: 404 });
  }

  const item = itemRow as BlogPlannerItem;
  if (item.status === "dismissed") {
    throw new ContentEditorError("Dismissed items cannot create an editor.", {
      source: "blog-planner",
      status: 400,
    });
  }
  if (item.content_editor_id) {
    let pipelineCompleted = false;
    if (opts?.awaitPipeline) {
      await runContentEditorPipeline({ editorId: item.content_editor_id });
      pipelineCompleted = true;
    }
    return {
      editorId: item.content_editor_id,
      item,
      alreadyLinked: true,
      pipelineCompleted,
    };
  }

  const keyword = item.primary_keyword.trim();
  const editor = await createContentEditor({
    primaryKeyword: keyword,
    analysisMode: "lite",
  });

  await saveDraft({
    editorId: editor.id,
    titleTag: item.suggested_title?.trim() || titleCasePhrase(keyword),
    metaDescription: item.suggested_meta_description?.trim() || null,
    h1Text: item.suggested_h1?.trim() || item.suggested_title?.trim() || titleCasePhrase(keyword),
  });

  const { data: updated, error: updErr } = await client
    .from("blog_planner_items")
    .update({
      content_editor_id: editor.id,
      status: "content_editor",
      updated_at: new Date().toISOString(),
    })
    .eq("id", itemId)
    .select("*")
    .single();

  if (updErr || !updated) {
    throw new ContentEditorError(`Failed to link editor: ${updErr?.message ?? "unknown"}`, {
      source: "blog-planner",
      status: 500,
    });
  }

  let pipelineCompleted = false;
  if (opts?.awaitPipeline) {
    await runContentEditorPipeline({ editorId: editor.id });
    pipelineCompleted = true;
  }

  return {
    editorId: editor.id,
    item: updated as BlogPlannerItem,
    alreadyLinked: false,
    pipelineCompleted,
  };
}

async function loadHubDetail(client: ReturnType<typeof getAdminClient>, hubId: string) {
  const hub = await loadHub(client, hubId);
  if (!hub) return null;

  const [itemsRes, linksRes] = await Promise.all([
    client
      .from("blog_planner_items")
      .select("*")
      .eq("hub_tracked_page_id", hubId)
      .order("created_at", { ascending: false }),
    client.from("blog_planner_hub_links").select("*").eq("hub_tracked_page_id", hubId),
  ]);

  const items = (itemsRes.data ?? []) as BlogPlannerItem[];
  const linkRows = linksRes.data ?? [];

  const editorIds = linkRows
    .map((l) => (l as { content_editor_id: string | null }).content_editor_id)
    .filter(Boolean) as string[];
  const blogIds = linkRows
    .map((l) => (l as { blog_post_id: string | null }).blog_post_id)
    .filter(Boolean) as string[];

  const [editorsRes, blogsRes] = await Promise.all([
    editorIds.length
      ? client
          .from("content_editors")
          .select("id, primary_keyword, status")
          .in("id", editorIds)
      : Promise.resolve({ data: [] }),
    blogIds.length
      ? client.from("blog_posts").select("id, title, slug, status").in("id", blogIds)
      : Promise.resolve({ data: [] }),
  ]);

  const editorMap = new Map(
    ((editorsRes.data ?? []) as { id: string; primary_keyword: string; status: string }[]).map((e) => [
      e.id,
      e,
    ]),
  );
  const blogMap = new Map(
    ((blogsRes.data ?? []) as { id: string; title: string; slug: string; status: string }[]).map((b) => [
      b.id,
      b,
    ]),
  );

  const links: BlogPlannerHubLink[] = linkRows.map((row) => {
    const r = row as {
      id: string;
      hub_tracked_page_id: string;
      content_editor_id: string | null;
      blog_post_id: string | null;
      created_at: string;
    };
    return {
      id: r.id,
      hub_tracked_page_id: r.hub_tracked_page_id,
      content_editor_id: r.content_editor_id,
      blog_post_id: r.blog_post_id,
      created_at: r.created_at,
      content_editor: r.content_editor_id ? editorMap.get(r.content_editor_id) ?? null : null,
      blog_post: r.blog_post_id ? blogMap.get(r.blog_post_id) ?? null : null,
    };
  });

  const coverage = computeCoverage(hub.blog_hub_target_count, items, links);

  return { hub: hubFromRow(hub), items, links, coverage };
}

// ─── Route handlers ─────────────────────────────────────────────────────

export async function handleBlogPlannerHubsGet(): Promise<Response> {
  try {
    const client = getAdminClient();
    await ensureMiscellaneousHub(client);

    const { data, error } = await client
      .from("tracked_pages")
      .select(
        "id, route_path, page_title, primary_keyword, is_blog_hub, is_blog_hub_misc, blog_hub_target_count",
      )
      .order("is_blog_hub_misc", { ascending: true })
      .order("page_title", { ascending: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const hubRows = ((data ?? []) as HubRow[]).filter((r) => r.is_blog_hub);
    const statsMap = await loadHubStatsMap(client);

    const hubs: BlogPlannerHubWithStats[] = hubRows.map((row) => {
      const hub = hubFromRow(row);
      const raw = statsMap.get(hub.id) ?? statsFromCounts(null, 0, 0, 0, 0);
      return {
        ...hub,
        stats: statsFromCounts(
          hub.blog_hub_target_count,
          raw.ideas,
          raw.inContentEditor,
          raw.published,
          raw.attached,
        ),
      };
    });

    const allPages = ((data ?? []) as HubRow[]).map(hubFromRow);

    return NextResponse.json({ ok: true, hubs, allPages });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load hubs.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerHubPatch(request: Request): Promise<Response> {
  let body: {
    tracked_page_id?: string;
    is_blog_hub?: boolean;
    blog_hub_target_count?: number | null;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const id = body.tracked_page_id?.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "tracked_page_id is required." }, { status: 400 });
  }

  try {
    const client = getAdminClient();
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.is_blog_hub === "boolean") updates.is_blog_hub = body.is_blog_hub;
    if (body.blog_hub_target_count !== undefined) {
      const n = body.blog_hub_target_count;
      updates.blog_hub_target_count =
        n == null || Number.isNaN(Number(n)) ? null : Math.max(0, Math.floor(Number(n)));
    }

    const { data, error } = await client
      .from("tracked_pages")
      .update(updates)
      .eq("id", id)
      .select(
        "id, route_path, page_title, primary_keyword, is_blog_hub, is_blog_hub_misc, blog_hub_target_count",
      )
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, hub: hubFromRow(data as HubRow) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerHubDetailGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const hubId = url.searchParams.get("hub_id")?.trim();
  if (!hubId) {
    return NextResponse.json({ ok: false, error: "hub_id is required." }, { status: 400 });
  }

  try {
    const client = getAdminClient();
    await ensureMiscellaneousHub(client);
    const detail = await loadHubDetail(client, hubId);
    if (!detail) {
      return NextResponse.json({ ok: false, error: "Hub not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, ...detail });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load hub.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerDiscoverPost(request: Request): Promise<Response> {
  let body: { hub_tracked_page_id?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const hubId = body.hub_tracked_page_id?.trim();
  if (!hubId) {
    return NextResponse.json({ ok: false, error: "hub_tracked_page_id is required." }, { status: 400 });
  }

  try {
    const result = await discoverTopicsForHub(hubId);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }
    if (err instanceof SemrushApiError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }
    const msg = err instanceof Error ? err.message : "Discovery failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerCreateEditorPost(request: Request): Promise<Response> {
  let body: { item_id?: string; wait_for_pipeline?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const itemId = body.item_id?.trim();
  if (!itemId) {
    return NextResponse.json({ ok: false, error: "item_id is required." }, { status: 400 });
  }

  const waitForPipeline = body.wait_for_pipeline === true;

  try {
    const result = await createBriefEditorFromPlannerItem(itemId, {
      awaitPipeline: waitForPipeline,
    });

    if (!waitForPipeline && !result.pipelineCompleted) {
      after(async () => {
        try {
          await runContentEditorPipeline({ editorId: result.editorId });
        } catch (err) {
          console.error("[blog-planner] content editor pipeline failed:", err);
        }
      });

      return NextResponse.json(
        {
          ok: true,
          editorId: result.editorId,
          item: result.item,
          alreadyLinked: result.alreadyLinked,
          poll_url: `/api/admin/content-editor/${result.editorId}`,
          pipeline_started: true,
        },
        { status: 202 },
      );
    }

    return NextResponse.json({
      ok: true,
      editorId: result.editorId,
      item: result.item,
      alreadyLinked: result.alreadyLinked,
      pipeline_completed: result.pipelineCompleted,
      poll_url: `/api/admin/content-editor/${result.editorId}`,
    });
  } catch (err) {
    if (err instanceof ContentEditorError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: err.status });
    }
    const msg = err instanceof Error ? err.message : "Failed to create editor.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerItemPost(request: Request): Promise<Response> {
  let body: {
    hub_tracked_page_id?: string;
    primary_keyword?: string;
    suggested_title?: string;
    suggested_meta_description?: string;
    suggested_h1?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const hubId = body.hub_tracked_page_id?.trim();
  const kw = body.primary_keyword?.trim();
  const title = body.suggested_title?.trim() || (kw ? titleCasePhrase(kw) : "");
  if (!hubId || !kw || !title) {
    return NextResponse.json(
      { ok: false, error: "hub_tracked_page_id, primary_keyword, and title are required." },
      { status: 400 },
    );
  }

  try {
    const client = getAdminClient();
    const inserted = await upsertPlannerItems(client, hubId, "manual", [
      {
        primary_keyword: kw,
        suggested_title: title,
        suggested_meta_description: body.suggested_meta_description?.trim() || null,
        suggested_h1: body.suggested_h1?.trim() || title,
      },
    ]);
    return NextResponse.json({ ok: true, inserted });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to add item.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerItemPatch(request: Request): Promise<Response> {
  let body: { item_id?: string; status?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const itemId = body.item_id?.trim();
  const status = body.status?.trim();
  if (!itemId || !status) {
    return NextResponse.json({ ok: false, error: "item_id and status are required." }, { status: 400 });
  }

  const allowed = ["idea", "content_editor", "published", "dismissed"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
  }

  try {
    const client = getAdminClient();
    const { data, error } = await client
      .from("blog_planner_items")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", itemId)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, item: data as BlogPlannerItem });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerLinkPost(request: Request): Promise<Response> {
  let body: {
    hub_tracked_page_id?: string;
    content_editor_id?: string;
    blog_post_id?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const hubId = body.hub_tracked_page_id?.trim();
  const editorId = body.content_editor_id?.trim() || null;
  const blogId = body.blog_post_id?.trim() || null;

  if (!hubId || (!editorId && !blogId) || (editorId && blogId)) {
    return NextResponse.json(
      { ok: false, error: "hub_tracked_page_id and exactly one of content_editor_id or blog_post_id required." },
      { status: 400 },
    );
  }

  try {
    const client = getAdminClient();
    const payload = editorId
      ? { hub_tracked_page_id: hubId, content_editor_id: editorId, blog_post_id: null }
      : { hub_tracked_page_id: hubId, content_editor_id: null, blog_post_id: blogId };

    const { error: insErr } = await client.from("blog_planner_hub_links").insert(payload);
    if (insErr && insErr.code !== "23505") {
      return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });
    }

    const detail = await loadHubDetail(client, hubId);
    return NextResponse.json({ ok: true, ...detail });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Link failed.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function handleBlogPlannerAttachablesGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const hubId = url.searchParams.get("hub_id")?.trim();
  if (!hubId) {
    return NextResponse.json({ ok: false, error: "hub_id is required." }, { status: 400 });
  }

  try {
    const client = getAdminClient();

    const { data: linked } = await client
      .from("blog_planner_hub_links")
      .select("content_editor_id, blog_post_id")
      .eq("hub_tracked_page_id", hubId);

    const linkedEditorIds = new Set(
      (linked ?? []).map((r) => (r as { content_editor_id: string | null }).content_editor_id).filter(Boolean),
    );
    const linkedBlogIds = new Set(
      (linked ?? []).map((r) => (r as { blog_post_id: string | null }).blog_post_id).filter(Boolean),
    );

    const { data: itemRows } = await client
      .from("blog_planner_items")
      .select("content_editor_id, blog_post_id")
      .eq("hub_tracked_page_id", hubId);

    for (const row of itemRows ?? []) {
      const r = row as { content_editor_id: string | null; blog_post_id: string | null };
      if (r.content_editor_id) linkedEditorIds.add(r.content_editor_id);
      if (r.blog_post_id) linkedBlogIds.add(r.blog_post_id);
    }

    const [editorsRes, blogsRes] = await Promise.all([
      client
        .from("content_editors")
        .select("id, primary_keyword, status, created_at")
        .order("created_at", { ascending: false })
        .limit(80),
      client
        .from("blog_posts")
        .select("id, title, slug, status, created_at")
        .order("created_at", { ascending: false })
        .limit(80),
    ]);

    const editors = ((editorsRes.data ?? []) as { id: string; primary_keyword: string; status: string }[]).filter(
      (e) => !linkedEditorIds.has(e.id),
    );
    const blogs = ((blogsRes.data ?? []) as { id: string; title: string; slug: string; status: string }[]).filter(
      (b) => !linkedBlogIds.has(b.id),
    );

    return NextResponse.json({ ok: true, editors, blogs });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to load attachables.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
