/**
 * OpenAI text-embedding-3-small wrapper.
 *
 * Endpoint: POST https://api.openai.com/v1/embeddings
 *
 * Used for:
 *   - Embedding extracted facts so we can dedupe near-duplicates across competitors
 *     and check whether the user's draft "covers" each fact via cosine similarity.
 *   - Embedding draft sentences for the same coverage check (cached on
 *     `content_editor_drafts.sentence_embeddings` to avoid re-embedding
 *     unchanged sentences on every score recomputation).
 *
 * Pricing: $0.02 / 1M tokens (input). The wrapper batches up to 100 inputs
 * per request — OpenAI's hard cap is 2048 but 100 keeps individual requests
 * small enough that a transient failure costs little.
 */
import { ContentEditorError } from "./errors";
import {
  OPENAI_EMBEDDING_COST_PER_MTOKEN,
  OPENAI_EMBEDDING_DIMENSIONS,
  OPENAI_EMBEDDING_MODEL,
} from "./pricing";
import { withRetry } from "./retry";
import type { EmbeddingResult, VendorCallResult } from "./types";

const ENDPOINT = "https://api.openai.com/v1/embeddings";
const BATCH_SIZE = 100;

interface OpenAiEmbeddingResponse {
  data?: Array<{ embedding?: number[]; index?: number }>;
  usage?: { prompt_tokens?: number; total_tokens?: number };
  error?: { message?: string };
}

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new ContentEditorError("OPENAI_API_KEY is not configured.", {
      source: "openai_embeddings",
      status: 500,
    });
  }
  return key;
}

async function embedBatch(
  inputs: string[],
  apiKey: string,
): Promise<{ embeddings: number[][]; tokens: number }> {
  const json = await withRetry(async () => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_EMBEDDING_MODEL,
        input: inputs,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new ContentEditorError(
        `OpenAI embeddings responded ${res.status}: ${text.slice(0, 300)}`,
        { source: "openai_embeddings", status: 502, detail: text.slice(0, 800) },
      );
      (err as unknown as { status: number }).status = res.status;
      throw err;
    }
    return (await res.json()) as OpenAiEmbeddingResponse;
  });

  if (!json.data || !Array.isArray(json.data)) {
    throw new ContentEditorError(
      `OpenAI embeddings returned no data${json.error?.message ? `: ${json.error.message}` : ""}.`,
      { source: "openai_embeddings", status: 502, detail: json },
    );
  }

  // OpenAI guarantees order matches input order but we sort defensively in case.
  const sorted = json.data.slice().sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const embeddings: number[][] = sorted.map((d) => {
    const vec = d.embedding ?? [];
    if (vec.length !== OPENAI_EMBEDDING_DIMENSIONS) {
      throw new ContentEditorError(
        `Unexpected embedding dimension: got ${vec.length}, expected ${OPENAI_EMBEDDING_DIMENSIONS}.`,
        { source: "openai_embeddings", status: 502 },
      );
    }
    return vec;
  });

  const tokens = json.usage?.prompt_tokens ?? json.usage?.total_tokens ?? 0;
  return { embeddings, tokens };
}

/**
 * Embed an array of texts. Returns embeddings in input order.
 * Empty strings get an all-zero vector so callers don't have to filter.
 */
export async function embedTexts(
  texts: string[],
): Promise<VendorCallResult<EmbeddingResult>> {
  if (!texts.length) {
    return { data: { embeddings: [], totalTokens: 0 }, cost_usd: 0 };
  }

  const apiKey = getApiKey();

  // Track which originals are empty and substitute a placeholder for the API
  // (OpenAI rejects empty strings). We'll replace these with zero vectors below.
  const nonEmptyIdx: number[] = [];
  const nonEmptyTexts: string[] = [];
  texts.forEach((t, i) => {
    const trimmed = t?.trim();
    if (trimmed) {
      nonEmptyIdx.push(i);
      nonEmptyTexts.push(trimmed);
    }
  });

  const zeros = (): number[] => new Array(OPENAI_EMBEDDING_DIMENSIONS).fill(0);
  const allEmbeddings: number[][] = texts.map(() => zeros());
  let totalTokens = 0;

  for (let i = 0; i < nonEmptyTexts.length; i += BATCH_SIZE) {
    const slice = nonEmptyTexts.slice(i, i + BATCH_SIZE);
    const sliceIdx = nonEmptyIdx.slice(i, i + BATCH_SIZE);
    const { embeddings, tokens } = await embedBatch(slice, apiKey);
    totalTokens += tokens;
    embeddings.forEach((vec, j) => {
      const originalIdx = sliceIdx[j];
      allEmbeddings[originalIdx] = vec;
    });
  }

  const cost_usd = (totalTokens / 1_000_000) * OPENAI_EMBEDDING_COST_PER_MTOKEN;

  return {
    data: { embeddings: allEmbeddings, totalTokens },
    cost_usd,
  };
}

/** Cosine similarity between two equal-length vectors. */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom > 0 ? dot / denom : 0;
}
