/**
 * Google Cloud Natural Language API — entity extraction.
 *
 * Endpoint: POST https://language.googleapis.com/v2/documents:analyzeEntities
 *
 * Returns the entities mentioned in a document along with their canonical
 * names, types (PERSON, ORGANIZATION, LOCATION, EVENT, CONSUMER_GOOD, etc.)
 * and a salience score in [0..1] indicating how central each entity is to
 * the document. The pipeline merges these with TF-IDF n-grams to build the
 * "important terms" list.
 *
 * Charged in 1000-character units. First 5k units/month free, then $1/1k.
 * Google NLP itself caps payloads at 100,000 characters; we hard-truncate.
 *
 * Auth: API key (server-side; restricted to this API in the GCP console).
 */
import { ContentEditorError } from "./errors";
import {
  GOOGLE_NLP_CHARS_PER_UNIT,
  GOOGLE_NLP_COST_PER_UNIT,
} from "./pricing";
import { withRetry } from "./retry";
import type { NlpEntity, NlpEntityType, VendorCallResult } from "./types";

const ENDPOINT = "https://language.googleapis.com/v2/documents:analyzeEntities";
const MAX_DOCUMENT_CHARS = 100000;

interface GoogleNlpEntityResponse {
  entities?: Array<{
    name?: string;
    type?: string;
    salience?: number;
    mentions?: Array<{
      text?: { content?: string; beginOffset?: number };
      type?: string;
    }>;
  }>;
}

function getApiKey(): string {
  const key = process.env.GOOGLE_NLP_API_KEY?.trim();
  if (!key) {
    throw new ContentEditorError("GOOGLE_NLP_API_KEY is not configured.", {
      source: "google_nlp",
      status: 500,
    });
  }
  return key;
}

function normalizeEntityType(raw: unknown): NlpEntityType {
  if (typeof raw !== "string") return "UNKNOWN";
  const upper = raw.toUpperCase();
  switch (upper) {
    case "PERSON":
    case "LOCATION":
    case "ORGANIZATION":
    case "EVENT":
    case "WORK_OF_ART":
    case "CONSUMER_GOOD":
    case "OTHER":
    case "PHONE_NUMBER":
    case "ADDRESS":
    case "DATE":
    case "NUMBER":
    case "PRICE":
      return upper;
    default:
      return "UNKNOWN";
  }
}

export async function analyzeEntities(
  text: string,
  opts: { languageCode?: string } = {},
): Promise<VendorCallResult<NlpEntity[]>> {
  const content = text.slice(0, MAX_DOCUMENT_CHARS);
  if (!content.trim()) {
    return { data: [], cost_usd: 0 };
  }

  const apiKey = getApiKey();

  const body = {
    document: {
      type: "PLAIN_TEXT",
      content,
      languageCode: opts.languageCode ?? "en",
    },
    encodingType: "UTF8",
  };

  const json = await withRetry(async () => {
    const url = `${ENDPOINT}?key=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      const err = new ContentEditorError(
        `Google NLP responded ${res.status}: ${errText.slice(0, 300)}`,
        { source: "google_nlp", status: 502, detail: errText.slice(0, 800) },
      );
      (err as unknown as { status: number }).status = res.status;
      throw err;
    }
    return (await res.json()) as GoogleNlpEntityResponse;
  });

  const entities: NlpEntity[] = (json.entities ?? [])
    .map((e): NlpEntity | null => {
      const name = typeof e.name === "string" ? e.name.trim() : "";
      if (!name) return null;
      return {
        name,
        type: normalizeEntityType(e.type),
        salience: typeof e.salience === "number" ? e.salience : 0,
        mentionCount: Array.isArray(e.mentions) ? e.mentions.length : 0,
      };
    })
    .filter((e): e is NlpEntity => e !== null)
    .sort((a, b) => b.salience - a.salience);

  // Charged in 1k-char units, rounded up.
  const units = Math.max(1, Math.ceil(content.length / GOOGLE_NLP_CHARS_PER_UNIT));
  const cost_usd = units * GOOGLE_NLP_COST_PER_UNIT;

  return { data: entities, cost_usd };
}
