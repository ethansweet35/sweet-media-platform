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

export interface SemrushKeywordSuggestionDTO extends SemrushKeywordOverviewDTO {
  relevance: number;
}

/** Response payload of `/api/admin/semrush/overview`. */
export interface SemrushOverviewResponse {
  ok: boolean;
  overview: SemrushKeywordOverviewDTO | null;
  error?: string;
}

/** Response payload of `/api/admin/semrush/suggestions`. */
export interface SemrushSuggestionsResponse {
  ok: boolean;
  /** Overview row for the seed phrase itself (fetched in parallel). */
  seed: SemrushKeywordOverviewDTO | null;
  suggestions: SemrushKeywordSuggestionDTO[];
  error?: string;
}
