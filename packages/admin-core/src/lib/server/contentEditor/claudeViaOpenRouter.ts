/**
 * Claude (Sonnet + Haiku) — invoked through OpenRouter.
 *
 * OpenRouter passes through to Anthropic. We use:
 *   - Claude Sonnet 4.5 for outline + question synthesis (long context, nuance)
 *   - Claude Haiku 4.5 for fact extraction (high-volume, parallelizable)
 *
 * When `expectJson: true` is set, the wrapper:
 *   1. Strips markdown code fences from the response.
 *   2. Attempts JSON.parse on the full response.
 *   3. On parse failure, extracts the first balanced JSON object/array and retries parse.
 *   4. On final failure, makes one additional model call with an explicit
 *      "your previous response was not valid JSON, please correct it" follow-up.
 *
 * Cost is computed from `usage.prompt_tokens` and `usage.completion_tokens`
 * returned by OpenRouter, using `claudeCallCost()` in pricing.ts.
 */
import { ContentEditorError } from "./errors";
import { CLAUDE_MODELS, claudeCallCost } from "./pricing";
import { withRetry } from "./retry";
import type {
  ClaudeCallOptions,
  ClaudeCallResult,
  ClaudeModelAlias,
  VendorCallResult,
} from "./types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

interface OpenRouterChoice {
  message?: { content?: string };
}
interface OpenRouterUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
}
interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  usage?: OpenRouterUsage;
  error?: { message?: string };
}

function stripCodeFences(raw: string): string {
  return raw
    .trim()
    .replace(/^```(?:json|JSON)?\s*\n?/, "")
    .replace(/\n?```\s*$/, "")
    .trim();
}

/** Extract the first balanced JSON value (object or array) from arbitrary text. */
function extractFirstJsonValue(raw: string): string | null {
  const openIdx = raw.search(/[{[]/);
  if (openIdx === -1) return null;
  const opener = raw[openIdx];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = openIdx; i < raw.length; i++) {
    const ch = raw[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\") {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === opener) depth++;
    else if (ch === closer) {
      depth--;
      if (depth === 0) return raw.slice(openIdx, i + 1);
    }
  }
  return null;
}

function tryParseJson<T>(raw: string): T | null {
  const stripped = stripCodeFences(raw);
  try {
    return JSON.parse(stripped) as T;
  } catch {
    // fall through
  }
  const extracted = extractFirstJsonValue(stripped);
  if (!extracted) return null;
  try {
    return JSON.parse(extracted) as T;
  } catch {
    return null;
  }
}

function getApiKey(): string {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) {
    throw new ContentEditorError("OPENROUTER_API_KEY is not configured.", {
      source: "openrouter",
      status: 500,
    });
  }
  return key;
}

interface RawCallResult {
  raw: string;
  promptTokens: number;
  completionTokens: number;
}

async function rawCall(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  alias: ClaudeModelAlias,
  maxTokens: number,
  temperature: number,
): Promise<RawCallResult> {
  const apiKey = getApiKey();
  const modelId = CLAUDE_MODELS[alias].id;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sweetmediaservices.com";
  const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim() || "admin";

  const json = await withRetry(async () => {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": `${siteId} - Content Editor`,
      },
      body: JSON.stringify({
        model: modelId,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new ContentEditorError(
        `OpenRouter responded ${res.status}: ${text.slice(0, 300)}`,
        { source: "openrouter", status: 502, detail: text.slice(0, 800) },
      );
      (err as unknown as { status: number }).status = res.status;
      throw err;
    }
    return (await res.json()) as OpenRouterResponse;
  });

  const content = json.choices?.[0]?.message?.content ?? "";
  if (!content.trim()) {
    throw new ContentEditorError(
      `Claude returned an empty completion${json.error?.message ? `: ${json.error.message}` : ""}.`,
      { source: "openrouter", status: 502, detail: json },
    );
  }

  return {
    raw: content,
    promptTokens: json.usage?.prompt_tokens ?? 0,
    completionTokens: json.usage?.completion_tokens ?? 0,
  };
}

/**
 * Call Claude with optional JSON-mode retry.
 *
 * - When `expectJson: false` (default), returns `{ data: raw, raw, usage }`.
 * - When `expectJson: true`, returns `{ data: T, raw, usage }` where T is
 *   the parsed JSON value. On parse failure, retries once with feedback.
 */
export async function callClaude<T = string>(
  opts: ClaudeCallOptions,
): Promise<VendorCallResult<ClaudeCallResult<T>>> {
  const maxTokens = opts.maxTokens ?? 4000;
  const temperature = opts.temperature ?? 0.3;
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];
  if (opts.systemPrompt) messages.push({ role: "system", content: opts.systemPrompt });
  messages.push({ role: "user", content: opts.userPrompt });

  let result = await rawCall(messages, opts.model, maxTokens, temperature);
  let totalPrompt = result.promptTokens;
  let totalCompletion = result.completionTokens;

  if (opts.expectJson) {
    let parsed = tryParseJson<T>(result.raw);
    if (parsed === null) {
      // One repair attempt with explicit feedback.
      messages.push({ role: "assistant", content: result.raw });
      messages.push({
        role: "user",
        content:
          "Your previous response was not valid JSON. Please return ONLY the JSON value, " +
          "with no markdown fences, preamble, or trailing commentary.",
      });
      result = await rawCall(messages, opts.model, maxTokens, temperature);
      totalPrompt += result.promptTokens;
      totalCompletion += result.completionTokens;
      parsed = tryParseJson<T>(result.raw);
      if (parsed === null) {
        throw new ContentEditorError(
          "Claude did not return valid JSON after one repair attempt.",
          { source: "openrouter", status: 502, detail: result.raw.slice(0, 800) },
        );
      }
    }
    const cost_usd = claudeCallCost(opts.model, totalPrompt, totalCompletion);
    return {
      data: {
        data: parsed,
        raw: result.raw,
        usage: { promptTokens: totalPrompt, completionTokens: totalCompletion },
      },
      cost_usd,
    };
  }

  const cost_usd = claudeCallCost(opts.model, totalPrompt, totalCompletion);
  return {
    data: {
      data: result.raw as unknown as T,
      raw: result.raw,
      usage: { promptTokens: totalPrompt, completionTokens: totalCompletion },
    },
    cost_usd,
  };
}
