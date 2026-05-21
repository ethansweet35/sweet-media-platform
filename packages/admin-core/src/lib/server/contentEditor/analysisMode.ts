import type { ContentEditorRow } from "./db";

export type ContentEditorAnalysisMode = "lite" | "deep";

export const LITE_COMPETITOR_POOL_SIZE = 10;
export const DEEP_COMPETITOR_POOL_SIZE = 20;
export const LITE_NLP_WORD_CAP = 3500;
export const LITE_FACT_SOURCE_PAGES = 3;
export const LITE_FACT_WORDS_PER_PAGE = 1500;
export const RULES_CURATION_AI_THRESHOLD = 90;

export function getAnalysisMode(editor: ContentEditorRow): ContentEditorAnalysisMode {
  return editor.analysis_mode === "deep" ? "deep" : "lite";
}

export function defaultPoolSizeForMode(mode: ContentEditorAnalysisMode): number {
  return mode === "deep" ? DEEP_COMPETITOR_POOL_SIZE : LITE_COMPETITOR_POOL_SIZE;
}
