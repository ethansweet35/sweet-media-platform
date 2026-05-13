/**
 * E-E-A-T scoring — YMYL (Your Money, Your Life) heuristics.
 *
 * Behavioral health content is YMYL under Google's quality rater
 * guidelines, so this module penalizes drafts missing the
 * Experience / Expertise / Authoritativeness / Trustworthiness signals
 * Google's quality raters look for:
 *
 *   1. Author byline + bio              (E + E + A)
 *   2. Medical reviewer byline          (E + A + T)
 *   3. Last-updated date visible        (T)
 *   4. Citations to authoritative sources (.gov, .edu, etc.)  (A + T)
 *   5. Schema markup hints              (T — helps search engines verify)
 *
 * Score is 0–100, weighted blend of the 5 checks. Pure functions; no I/O.
 */
import { extractDomain } from "./textUtils";

// ───────────────────────────────────────────────────────────────────────
//  Authoritative source detection
// ───────────────────────────────────────────────────────────────────────

/** Top-level domains we always trust for behavioral-health / medical content. */
export const AUTHORITATIVE_TLDS = new Set([".gov", ".edu", ".mil"]);

/**
 * Named domains that get the authoritative bonus even though they're
 * commercial. Curated for behavioral-health niche.
 */
export const AUTHORITATIVE_DOMAINS = new Set([
  // US government health agencies
  "samhsa.gov",
  "nih.gov",
  "niaaa.nih.gov",
  "nida.nih.gov",
  "nimh.nih.gov",
  "cdc.gov",
  "fda.gov",
  "hhs.gov",
  "medlineplus.gov",
  "drugabuse.gov",
  "drugfree.org", // Partnership to End Addiction (well-known non-profit)
  // Major medical professional bodies
  "apa.org",
  "psychiatry.org",
  "asam.org",
  "aacap.org",
  "aafp.org",
  "ama-assn.org",
  // High-authority medical reference sites
  "mayoclinic.org",
  "clevelandclinic.org",
  "hopkinsmedicine.org",
  "uptodate.com",
  "merckmanuals.com",
  "medscape.com",
  "webmd.com",
  // Academic / research
  "pubmed.ncbi.nlm.nih.gov",
  "ncbi.nlm.nih.gov",
  "who.int",
  "thelancet.com",
  "nejm.org",
  "jamanetwork.com",
  "bmj.com",
]);

export function isAuthoritativeDomain(domain: string): boolean {
  const d = domain.toLowerCase().replace(/^www\./, "");
  if (AUTHORITATIVE_DOMAINS.has(d)) return true;
  for (const tld of AUTHORITATIVE_TLDS) {
    if (d.endsWith(tld)) return true;
  }
  return false;
}

export function isAuthoritativeUrl(url: string): boolean {
  const domain = extractDomain(url);
  if (!domain) return false;
  return isAuthoritativeDomain(domain);
}

// ───────────────────────────────────────────────────────────────────────
//  Detection patterns
// ───────────────────────────────────────────────────────────────────────

const AUTHOR_BIO_PATTERNS = [
  /\bauthor\s*[:|]\s*[A-Z][a-z]+\s+[A-Z][a-z]+/i,
  /\bwritten\s+by\s+[A-Z][a-z]+\s+[A-Z][a-z]+/i,
  /\bby\s+(Dr|MD|PhD|LMFT|LCSW|LPC|LADC|PsyD|MSW|MA)\.?\s*[A-Z]/i,
  /\babout\s+the\s+author\b/i,
  /\bauthor\s+bio\b/i,
  /\bclinical\s+staff\b/i,
];

const MEDICAL_REVIEWER_PATTERNS = [
  /\bmedically\s+reviewed\b/i,
  /\bclinically\s+reviewed\b/i,
  /\breviewed\s+by\s+(Dr|MD|PhD|LMFT|LCSW|LPC|PsyD|RN|NP|PA)\.?/i,
  /\breviewer\s*[:|]\s*[A-Z][a-z]+\s+[A-Z][a-z]+,?\s*(MD|PhD|MA|LCSW)/i,
  /\bfact[- ]checked\b/i,
  /\bclinical\s+(reviewer|director|advisor)\b/i,
];

const LAST_UPDATED_PATTERNS = [
  /\b(last\s+)?updated\s*(on)?\s*[:|]?\s*\w+\s+\d+,?\s+\d{4}/i,
  /\b(last\s+)?(updated|revised|reviewed)\s*[:|]\s*\d{4}/i,
  /\bpublished\s*[:|]?\s*\w+\s+\d+,?\s+\d{4}/i,
  /\bdate\s+(modified|updated|revised)\b/i,
];

const SCHEMA_HINT_PATTERNS = [
  /application\/ld\+json/i,
  /"@type"\s*:\s*"(Article|MedicalEntity|MedicalCondition|MedicalProcedure|MedicalTherapy|NewsArticle|BlogPosting)"/i,
  /<faq[> ]/i, // Some sites use <FAQ> custom elements
  /itemtype\s*=\s*"https?:\/\/schema\.org\//i,
];

function anyMatch(patterns: RegExp[], text: string): boolean {
  for (const p of patterns) if (p.test(text)) return true;
  return false;
}

// ───────────────────────────────────────────────────────────────────────
//  Public types
// ───────────────────────────────────────────────────────────────────────

export type EeatCheckKey =
  | "author_bio"
  | "medical_reviewer"
  | "last_updated_visible"
  | "authoritative_citations"
  | "schema_markup";

export interface EeatCheck {
  key: EeatCheckKey;
  passed: boolean;
  /** Short note for the UI (e.g. "3 citations to .gov/.edu sources"). */
  detail?: string;
  /** Per-check weight applied to the final score. */
  weight: number;
}

export interface EeatBreakdown {
  /** 0-100, weighted blend of all 5 checks. */
  score: number;
  checks: EeatCheck[];
  /** Number of links to authoritative domains found in the draft. */
  authoritative_citation_count: number;
}

// Weights sum to 100. Tuned for behavioral health: author bio + medical
// reviewer + authoritative citations are the strongest YMYL signals.
const WEIGHTS: Record<EeatCheckKey, number> = {
  author_bio: 25,
  medical_reviewer: 25,
  last_updated_visible: 10,
  authoritative_citations: 30,
  schema_markup: 10,
};

// ───────────────────────────────────────────────────────────────────────
//  computeEeatScore
// ───────────────────────────────────────────────────────────────────────

export interface EeatScoreInput {
  /** Plain text body of the draft. */
  body: string;
  /** Markdown source (more reliable for link extraction than plaintext). */
  markdown?: string | null;
  /** Optional raw HTML (gives us schema markup detection). */
  html?: string | null;
  /** Optional author metadata explicitly attached to the draft. */
  authorMeta?: {
    name?: string | null;
    bio?: string | null;
    title?: string | null;
  } | null;
}

export function computeEeatScore(input: EeatScoreInput): EeatBreakdown {
  const body = input.body ?? "";
  const md = input.markdown ?? "";
  const html = input.html ?? "";
  const combined = `${body}\n${md}\n${html}`;

  // 1. Author bio
  const hasAuthorMeta = !!(input.authorMeta?.name && input.authorMeta.name.trim().length > 0);
  const authorBioPresent = hasAuthorMeta || anyMatch(AUTHOR_BIO_PATTERNS, combined);

  // 2. Medical reviewer
  const medicalReviewerPresent = anyMatch(MEDICAL_REVIEWER_PATTERNS, combined);

  // 3. Last-updated date
  const lastUpdatedPresent = anyMatch(LAST_UPDATED_PATTERNS, combined);

  // 4. Authoritative citations
  // Extract URLs from markdown link syntax + plain URLs in body
  const urlMatches: string[] = [];
  const mdLinkRe = /\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;
  const plainUrlRe = /https?:\/\/[^\s)]+/g;
  let m: RegExpExecArray | null;
  while ((m = mdLinkRe.exec(md)) !== null) urlMatches.push(m[1]);
  while ((m = plainUrlRe.exec(body)) !== null) urlMatches.push(m[0]);

  let authoritativeCount = 0;
  const seenAuthoritative = new Set<string>();
  for (const u of urlMatches) {
    if (isAuthoritativeUrl(u)) {
      const dom = extractDomain(u);
      if (dom && !seenAuthoritative.has(dom)) {
        seenAuthoritative.add(dom);
        authoritativeCount++;
      }
    }
  }
  // 1+ unique authoritative domain = passed.
  const authoritativeCitationsPresent = authoritativeCount >= 1;

  // 5. Schema markup hints
  const schemaPresent = anyMatch(SCHEMA_HINT_PATTERNS, combined);

  const checks: EeatCheck[] = [
    {
      key: "author_bio",
      passed: authorBioPresent,
      detail: authorBioPresent
        ? hasAuthorMeta
          ? `Author: ${input.authorMeta?.name}`
          : "Author byline detected"
        : "Add an author byline (and bio if possible)",
      weight: WEIGHTS.author_bio,
    },
    {
      key: "medical_reviewer",
      passed: medicalReviewerPresent,
      detail: medicalReviewerPresent
        ? "Medical reviewer detected"
        : "Add a 'Medically reviewed by …' line",
      weight: WEIGHTS.medical_reviewer,
    },
    {
      key: "last_updated_visible",
      passed: lastUpdatedPresent,
      detail: lastUpdatedPresent
        ? "Last-updated date visible"
        : "Add a visible 'Updated: …' date",
      weight: WEIGHTS.last_updated_visible,
    },
    {
      key: "authoritative_citations",
      passed: authoritativeCitationsPresent,
      detail: authoritativeCount > 0
        ? `${authoritativeCount} unique authoritative source${authoritativeCount === 1 ? "" : "s"} cited`
        : "Link to .gov/.edu/SAMHSA/NIH/Mayo/APA sources",
      weight: WEIGHTS.authoritative_citations,
    },
    {
      key: "schema_markup",
      passed: schemaPresent,
      detail: schemaPresent
        ? "Schema markup found"
        : "Add Article or MedicalEntity JSON-LD",
      weight: WEIGHTS.schema_markup,
    },
  ];

  const score = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);

  return {
    score: Math.round(score * 10) / 10,
    checks,
    authoritative_citation_count: authoritativeCount,
  };
}
