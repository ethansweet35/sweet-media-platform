/**
 * Shared types for the Content Editor vendor wrappers.
 *
 * Every wrapper returns a `VendorCallResult<T>` so the pipeline orchestrator
 * can accumulate `total_cost_usd` on the editor row consistently.
 */

/** Every vendor call returns its parsed data and the USD cost it incurred. */
export interface VendorCallResult<T> {
  data: T;
  /** Cost in USD for this single call. 0 when inside a free tier. */
  cost_usd: number;
}

// ────────────────────────────────────────────────────────────────────────
//  DataForSEO
// ────────────────────────────────────────────────────────────────────────

export interface SerpOrganicResult {
  /** 1-indexed rank within organic results. */
  position: number;
  url: string;
  domain: string;
  title: string;
  description: string;
}

export interface SerpFetchResult {
  organicResults: SerpOrganicResult[];
  /** People Also Ask questions, in the order Google returned them. */
  paaQuestions: string[];
}

// ────────────────────────────────────────────────────────────────────────
//  Firecrawl
// ────────────────────────────────────────────────────────────────────────

export interface ScrapedHeading {
  level: number;
  text: string;
  /** 0-indexed position within the document. */
  position: number;
}

export interface ScrapeResult {
  url: string;
  finalUrl: string;
  title: string;
  metaDescription: string;
  cleanedText: string;
  cleanedHtml: string;
  cleanedMarkdown: string;
  wordCount: number;
  h1Text: string;
  h2Count: number;
  h3Count: number;
  paragraphCount: number;
  imageCount: number;
  internalLinkCount: number;
  externalLinkCount: number;
  headings: ScrapedHeading[];
}

// ────────────────────────────────────────────────────────────────────────
//  Google Cloud Natural Language API
// ────────────────────────────────────────────────────────────────────────

/** Mirrors the entity types returned by Google's `analyzeEntities`. */
export type NlpEntityType =
  | "PERSON"
  | "LOCATION"
  | "ORGANIZATION"
  | "EVENT"
  | "WORK_OF_ART"
  | "CONSUMER_GOOD"
  | "OTHER"
  | "PHONE_NUMBER"
  | "ADDRESS"
  | "DATE"
  | "NUMBER"
  | "PRICE"
  | "UNKNOWN";

export interface NlpEntity {
  name: string;
  type: NlpEntityType;
  /** 0..1 — relative importance within the document. */
  salience: number;
  /** Number of times this entity was mentioned (any surface form). */
  mentionCount: number;
}

// ────────────────────────────────────────────────────────────────────────
//  Claude (via OpenRouter)
// ────────────────────────────────────────────────────────────────────────

/** High-level model alias; mapped to a specific OpenRouter model id in the wrapper. */
export type ClaudeModelAlias = "sonnet" | "haiku" | "questions";

export interface ClaudeCallOptions {
  systemPrompt?: string;
  userPrompt: string;
  model: ClaudeModelAlias;
  /** Cap on response tokens. Defaults to 4000. */
  maxTokens?: number;
  /** 0..1 — defaults to 0.3 for analytic tasks. */
  temperature?: number;
  /**
   * If true, the wrapper will validate the response parses as JSON and return
   * the parsed object. If validation fails it retries once with an explicit
   * "your previous output was not valid JSON" follow-up message.
   */
  expectJson?: boolean;
}

export interface ClaudeUsage {
  promptTokens: number;
  completionTokens: number;
}

export interface ClaudeCallResult<T = string> {
  data: T;
  raw: string;
  usage: ClaudeUsage;
}

// ────────────────────────────────────────────────────────────────────────
//  OpenAI embeddings
// ────────────────────────────────────────────────────────────────────────

export interface EmbeddingResult {
  embeddings: number[][];
  totalTokens: number;
}
