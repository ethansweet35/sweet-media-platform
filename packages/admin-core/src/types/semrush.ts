/**
 * Public types for the Semrush keyword research integration.
 *
 * These shapes are also produced by the server-side client in
 * `lib/server/semrushClient.ts`. They are re-declared (not imported) here so
 * that client components can consume them without pulling the server module
 * into a browser bundle.
 */

export interface SemrushKeywordOverviewDTO {
  phrase: string;
  searchVolume: number;
  cpc: number;
  competition: number;
  results: number;
  difficulty: number;
}

/**
 * One broad-match suggestion row — same shape as the overview (Semrush returns
 * the same column set for both phrase_this and phrase_fullsearch).
 */
export type SemrushKeywordSuggestionDTO = SemrushKeywordOverviewDTO;

/** Response payload of `/api/admin/semrush/overview`. */
export interface SemrushOverviewResponse {
  ok: boolean;
  overview: SemrushKeywordOverviewDTO | null;
  error?: string;
}

/** Response payload of `/api/admin/semrush/suggestions`. */
export interface SemrushSuggestionsResponse {
  ok: boolean;
  /** Overview row for the seed phrase that actually returned data. */
  seed: SemrushKeywordOverviewDTO | null;
  suggestions: SemrushKeywordSuggestionDTO[];
  /** Original seed sent by the client. */
  requestedSeed?: string;
  /** Seed that produced rows — may differ from requestedSeed if a fallback was used. */
  effectiveSeed?: string;
  /** All seed variants tried, in order. */
  triedSeeds?: string[];
  error?: string;
}

/** Numeric intent labels matching Semrush's `In` column. */
export type SemrushIntentDTO = 0 | 1 | 2 | 3;

/** Mode determines how `pickKeyword` scores candidates. */
export type KeywordPickModeDTO = "page" | "blog";

/** Single chosen keyword from the auto-pick algorithm. */
export interface SemrushAutoPickDTO {
  phrase: string;
  searchVolume: number;
  difficulty: number;
  intent: SemrushIntentDTO[];
}

/** Response payload of `/api/admin/semrush/auto-pick`. */
export interface SemrushAutoPickResponse {
  ok: boolean;
  pick: SemrushAutoPickDTO | null;
  reason: string;
  candidates: Array<SemrushAutoPickDTO & { score: number }>;
  error?: string;
}
