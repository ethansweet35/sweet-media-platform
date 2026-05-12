/**
 * Server-only Semrush Analytics API client.
 *
 * Reads `SEMRUSH_API_KEY` from process env. Optional `SEMRUSH_DATABASE` (default "us").
 * Never import this from a client component — the API key must stay server-side.
 *
 * Semrush API docs: https://developer.semrush.com/api/
 *
 * Response format: pipe-separated text, semicolon-delimited columns. First line is header.
 * We URL-decode response values via `export_decode=1` and request only the columns we need.
 *
 * Cost discipline (lean integration):
 *   - phrase_this       : ~10 API units per call  (single-keyword overview)
 *   - phrase_fullsearch : ~40 API units per row returned (broad-match suggestions —
 *                          mirrors Keyword Magic Tool's "Broad Match" tab)
 * Callers must request the smallest `displayLimit` they need.
 */

const SEMRUSH_BASE_URL = "https://api.semrush.com/";
const DEFAULT_DATABASE = "us";

export class SemrushApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "SemrushApiError";
    this.status = status;
    this.body = body;
  }
}

interface SemrushEnv {
  apiKey: string;
  database: string;
}

export function getSemrushEnv(): SemrushEnv {
  const apiKey = (process.env.SEMRUSH_API_KEY ?? "").trim();
  if (!apiKey) {
    throw new SemrushApiError(
      "SEMRUSH_API_KEY is not configured. Add it to the app's Vercel environment variables.",
      500,
      null,
    );
  }
  const database = (process.env.SEMRUSH_DATABASE ?? DEFAULT_DATABASE).trim() || DEFAULT_DATABASE;
  return { apiKey, database };
}

// =========================================================
// Low-level transport
// =========================================================

async function semrushFetch(query: Record<string, string | number>): Promise<string> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    params.set(k, String(v));
  }
  const url = `${SEMRUSH_BASE_URL}?${params.toString()}`;

  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    throw new SemrushApiError(
      `Semrush API HTTP ${res.status}: ${text.slice(0, 300)}`,
      res.status,
      text,
    );
  }

  // Semrush returns 200 OK even for many error conditions; the body starts with "ERROR" in those cases.
  // Examples: "ERROR 50 :: NOTHING FOUND", "ERROR 121 :: API_KEY_DISABLED", "ERROR 135 :: API_UNITS_BALANCE_IS_ZERO"
  const trimmed = text.trim();
  if (trimmed.startsWith("ERROR")) {
    // Treat "NOTHING FOUND" as a non-error empty result so callers can render "no suggestions" cleanly.
    if (/NOTHING FOUND/i.test(trimmed)) {
      return ""; // empty body — caller will return [] rows
    }
    throw new SemrushApiError(`Semrush: ${trimmed.slice(0, 300)}`, 502, trimmed);
  }

  return text;
}

/**
 * Parse Semrush semicolon-delimited response into an array of cell rows.
 *
 * IMPORTANT: Semrush echoes columns in the *order requested* via `export_columns`,
 * but the header line uses friendly names (e.g. "Search Volume", "Keyword Difficulty
 * Index") — NOT the short codes you sent. So we parse by position only, and ignore
 * the header line entirely. Callers must request columns in a known order.
 *
 * First line is always the header. Empty input returns [].
 */
function parseSemrushRows(body: string): string[][] {
  const lines = body.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length < 2) return [];
  return lines.slice(1).map((line) => line.split(";"));
}

function toNumber(raw: string | undefined, fallback = 0): number {
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

// =========================================================
// Public types
// =========================================================

/** Single-keyword overview result (from phrase_this). */
export interface SemrushKeywordOverview {
  /** The phrase as Semrush returned it (may differ in casing/spacing from the input). */
  phrase: string;
  /** Monthly search volume (Nq). 0 when unknown. */
  searchVolume: number;
  /** Cost-per-click in USD (Cp). */
  cpc: number;
  /** Paid-search competition density, 0–1 (Co). */
  competition: number;
  /** Number of organic results in SERP (Nr). */
  results: number;
  /** Keyword difficulty index, 0–100 (Kd). 0 when unavailable. */
  difficulty: number;
}

/** A keyword suggestion row (from phrase_fullsearch — broad match). */
export interface SemrushKeywordSuggestion {
  phrase: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  results: number;
  difficulty: number;
}

/**
 * Semrush intent labels (numeric, from the `In` column).
 *   0 = Commercial   (researching to eventually purchase)
 *   1 = Informational (looking up info / how-tos)
 *   2 = Navigational (looking for a specific brand/site)
 *   3 = Transactional (ready to take an action / buy)
 */
export type SemrushIntent = 0 | 1 | 2 | 3;

/** Auto-pick mode for picking a single best-fit keyword. */
export type KeywordPickMode = "page" | "blog";

/** Result of the auto-pick algorithm — null when no acceptable candidate was found. */
export interface SemrushAutoPickResult {
  /** The chosen keyword phrase, or null if nothing met the bar. */
  pick: {
    phrase: string;
    searchVolume: number;
    difficulty: number;
    intent: SemrushIntent[];
  } | null;
  /** Reason a pick was/wasn't made — surfaced to the UI for transparency. */
  reason: string;
  /** All candidates considered, ordered by the algorithm's score. */
  candidates: Array<{
    phrase: string;
    searchVolume: number;
    difficulty: number;
    intent: SemrushIntent[];
    score: number;
  }>;
}

// =========================================================
// Public endpoints
// =========================================================

/**
 * Fetch a single-keyword overview (search volume, KD, CPC, competition).
 * Endpoint: type=phrase_this · cost ≈ 10 API units per call.
 */
export async function getKeywordOverview(
  phrase: string,
  opts?: { database?: string },
): Promise<SemrushKeywordOverview | null> {
  const { apiKey, database } = getSemrushEnv();
  const cleanPhrase = phrase.trim();
  if (!cleanPhrase) {
    throw new SemrushApiError("phrase is required", 400, null);
  }

  // Column order MUST match positional parsing below: Ph, Nq, Cp, Co, Nr, Kd
  const body = await semrushFetch({
    type: "phrase_this",
    key: apiKey,
    phrase: cleanPhrase,
    database: opts?.database ?? database,
    export_columns: "Ph,Nq,Cp,Co,Nr,Kd",
    export_decode: 1,
  });

  const rows = parseSemrushRows(body);
  if (rows.length === 0) return null;
  const [ph, nq, cp, co, nr, kd] = rows[0];
  return {
    phrase: ph || cleanPhrase,
    searchVolume: toNumber(nq),
    cpc: toNumber(cp),
    competition: toNumber(co),
    results: toNumber(nr),
    difficulty: toNumber(kd),
  };
}

/**
 * Fetch broad-match keyword suggestions for a seed phrase.
 *
 * Mirrors Semrush Keyword Magic Tool's "Broad Match" tab — returns every phrase
 * that contains the seed words, not just strict semantic synonyms. This is what
 * the user sees in the Semrush UI and matches the same ordering by volume.
 *
 * Endpoint: type=phrase_fullsearch · cost ≈ 40 API units PER ROW returned.
 *
 * `displayLimit` defaults to 10 — keep it small.
 */
export async function getKeywordSuggestions(
  seedPhrase: string,
  opts?: { displayLimit?: number; database?: string },
): Promise<SemrushKeywordSuggestion[]> {
  const { apiKey, database } = getSemrushEnv();
  const cleanPhrase = seedPhrase.trim();
  if (!cleanPhrase) {
    throw new SemrushApiError("phrase is required", 400, null);
  }

  const limit = Math.max(1, Math.min(50, opts?.displayLimit ?? 10));

  // Column order MUST match positional parsing below: Ph, Nq, Cp, Co, Nr, Kd
  const body = await semrushFetch({
    type: "phrase_fullsearch",
    key: apiKey,
    phrase: cleanPhrase,
    database: opts?.database ?? database,
    display_limit: limit,
    // Sort by search volume descending — same default as Keyword Magic Tool's volume column.
    display_sort: "nq_desc",
    export_columns: "Ph,Nq,Cp,Co,Nr,Kd",
    export_decode: 1,
  });

  const rows = parseSemrushRows(body);
  return rows
    .map((cells) => {
      const [ph, nq, cp, co, nr, kd] = cells;
      return {
        phrase: ph ?? "",
        searchVolume: toNumber(nq),
        cpc: toNumber(cp),
        competition: toNumber(co),
        results: toNumber(nr),
        difficulty: toNumber(kd),
      };
    })
    .filter((row) => row.phrase.length > 0);
}

// =========================================================
// Auto-pick best-fit keyword for a row
// =========================================================

const HIGH_INTENT: ReadonlySet<SemrushIntent> = new Set<SemrushIntent>([0, 3]); // commercial + transactional
const MIN_VOLUME_PAGE = 10;  // pages should target at least 10 monthly searches
const MIN_VOLUME_BLOG = 10;  // blogs likewise — anything lower is noise

function parseIntentCell(raw: string | undefined): SemrushIntent[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n): n is SemrushIntent => n === 0 || n === 1 || n === 2 || n === 3);
}

/**
 * Pick the single best-fit keyword for a page or blog post.
 *
 * Algorithm:
 *   1. Pull the top 10 broad-match keywords for the seed (one phrase_fullsearch call).
 *   2. Filter to volume >= MIN and (for "page" mode) high-intent (commercial/transactional).
 *   3. Score each remaining candidate: volume × intent_bonus / (difficulty_factor).
 *   4. Return the highest-scored candidate, or null with a reason.
 *
 * Cost: ~40 × 10 = 400 Semrush API units per call (one phrase_fullsearch only).
 */
export async function pickKeyword(
  seed: string,
  mode: KeywordPickMode,
  opts?: { displayLimit?: number; database?: string },
): Promise<SemrushAutoPickResult> {
  const { apiKey, database } = getSemrushEnv();
  const cleanSeed = seed.trim();
  if (!cleanSeed) {
    throw new SemrushApiError("seed is required", 400, null);
  }

  const limit = Math.max(5, Math.min(25, opts?.displayLimit ?? 10));

  // Column order MUST match positional parsing below: Ph, Nq, Cp, Co, In, Kd
  const body = await semrushFetch({
    type: "phrase_fullsearch",
    key: apiKey,
    phrase: cleanSeed,
    database: opts?.database ?? database,
    display_limit: limit,
    display_sort: "nq_desc",
    export_columns: "Ph,Nq,Cp,Co,In,Kd",
    export_decode: 1,
  });

  const rows = parseSemrushRows(body);
  const minVolume = mode === "page" ? MIN_VOLUME_PAGE : MIN_VOLUME_BLOG;

  const allCandidates = rows
    .map((cells) => {
      const [ph, nq, _cp, _co, intentCell, kd] = cells;
      return {
        phrase: ph ?? "",
        searchVolume: toNumber(nq),
        difficulty: toNumber(kd),
        intent: parseIntentCell(intentCell),
      };
    })
    .filter((c) => c.phrase.length > 0 && c.searchVolume >= minVolume);

  if (allCandidates.length === 0) {
    return {
      pick: null,
      reason: `No broad-match keywords with volume ≥ ${minVolume} were returned for "${cleanSeed}".`,
      candidates: [],
    };
  }

  // Score each candidate. Higher = better.
  //   base score = log2(volume + 1) — diminishing returns on huge numbers
  //   intent bonus: pages get +50% for high-intent (commercial/transactional)
  //                 blogs get a small bonus (+15%) for informational intent
  //   KD penalty: divide by (1 + KD/100) — easier keywords win ties
  const scored = allCandidates.map((c) => {
    const baseScore = Math.log2(c.searchVolume + 1);
    let intentMultiplier = 1;

    if (mode === "page") {
      const isHighIntent = c.intent.some((i) => HIGH_INTENT.has(i));
      intentMultiplier = isHighIntent ? 1.5 : 1.0;
    } else {
      const isInformational = c.intent.includes(1);
      intentMultiplier = isInformational ? 1.15 : 1.0;
    }

    const kdPenalty = 1 + c.difficulty / 100;
    const score = (baseScore * intentMultiplier) / kdPenalty;

    return { ...c, score };
  });

  // For PAGES, hard-prefer high-intent: only fall back to non-high-intent if
  // there are zero high-intent candidates at all.
  let pool = scored;
  if (mode === "page") {
    const highIntent = scored.filter((c) => c.intent.some((i) => HIGH_INTENT.has(i)));
    if (highIntent.length > 0) pool = highIntent;
  }

  pool.sort((a, b) => b.score - a.score);
  const winner = pool[0];

  const reasonParts: string[] = [];
  if (mode === "page") {
    const hadHighIntent = scored.some((c) => c.intent.some((i) => HIGH_INTENT.has(i)));
    reasonParts.push(
      hadHighIntent
        ? "Picked highest-volume keyword with commercial/transactional intent."
        : "No high-intent matches — picked highest-volume keyword instead.",
    );
  } else {
    reasonParts.push("Picked highest-volume broad-match keyword for blog topic.");
  }

  return {
    pick: {
      phrase: winner.phrase,
      searchVolume: winner.searchVolume,
      difficulty: winner.difficulty,
      intent: winner.intent,
    },
    reason: reasonParts.join(" "),
    candidates: scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5),
  };
}
